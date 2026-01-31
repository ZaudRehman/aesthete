import { useAlgoStore } from '../store/useAlgoStore';

export class AlgorithmController {
    constructor() {
        this.generator = null;
        this.isExecuting = false;
        this.currentData = null;
    }

    async loadAlgorithm(AlgorithmClass) {
        this.CurrentAlgoClass = AlgorithmClass;
        
        const algo = new AlgorithmClass();
        const initialData = algo.initialize();
        this.currentData = initialData;

        const entities = algo.mapToVisual(initialData);
        
        useAlgoStore.getState().setAlgorithm(algo);
        useAlgoStore.getState().updateVisualState({ 
            entities,
            narrative: `Loaded: ${algo.name}`
        });

        this.generator = algo.execute(initialData);
    }

    async play() {
        if (!this.generator || this.isExecuting) return;
        
        this.isExecuting = true;
        useAlgoStore.getState().play();

        while (this.isExecuting) {
            const { value: frame, done } = this.generator.next();
            
            if (done) {
                useAlgoStore.getState().setComplete();
                this.isExecuting = false;
                break;
            }

            await this.processFrame(frame);

            // Respect pause
            while (useAlgoStore.getState().isPaused) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Check if stopped
            if (!useAlgoStore.getState().isPlaying) {
                this.isExecuting = false;
                break;
            }
        }
    }

    async processFrame(frame) {
        const store = useAlgoStore.getState();
        const speed = store.speed;
        const baseDuration = 800 / speed;

        switch (frame.type) {
            case 'compare':
                this.updateEntityStates(frame.targets, 'compare');
                store.updateVisualState({ 
                    activeIndices: frame.targets,
                    narrative: frame.narrative 
                });
                await this.wait(baseDuration * 0.5);
                this.updateEntityStates(frame.targets, 'default');
                break;

            case 'swap':
                this.updateEntityStates(frame.targets, 'swap');
                store.updateVisualState({ narrative: frame.narrative });
                await this.animateSwap(frame.targets, baseDuration);
                this.updateEntityStates(frame.targets, 'default');
                break;

            case 'highlight_code':
                store.updateVisualState({ highlightedCode: frame.line });
                break;

            case 'delay':
                await this.wait(frame.duration / speed);
                break;

            case 'celebrate':
                this.updateEntityStates(frame.targets, 'sorted');
                await this.wait(50 / speed);
                break;

            case 'complete':
                store.updateVisualState({ narrative: frame.narrative });
                break;

            case 'activate_node':
            case 'visit_node':
                // Find entity by ID suffix (e.g. "node-0")
                this.updateNodeState(frame.id, 'active');
                store.updateVisualState({ narrative: frame.narrative });
                await this.wait(500 / speed);
                if (frame.type === 'visit_node') {
                     this.updateNodeState(frame.id, 'visited');
                }
                break;

            case 'highlight_edge':
                // Find the edge entity (id format: edge-from-to)
                const edgeId = `edge-${frame.from}-${frame.to}`;
                this.updateEdgeState(edgeId, true);
                store.updateVisualState({ narrative: frame.narrative });
                await this.wait(300 / speed);

                break;

            case 'update_tile':
                this.updateTileState(frame.id, frame.state);
                if(frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                break;

             case 'update_visual':
                this.updateEntityProps(frame.id, frame);
                if (frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                await this.wait(100 / speed);
                break;

            case 'activate_pillar':
                this.updatePillarState(frame.id, frame.state);
                if (frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                break;

            case 'activate_sphere':
                this.updateSphereState(frame.id, frame.state);
                if (frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                break;

            case 'move':
                this.updateFramePosition(frame.id, frame.position);
                if (frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                break;

            case 'activate_orb':
                this.updateOrbState(frame.id, frame.state);
                if (frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                break;

            case 'update_height':
                this.updatePillarHeightById(frame.id, frame.height);
                if (frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                await this.wait(200 / speed);
                break;

            case 'overwrite':
                this.updatePillarHeight(frame.index, frame.value);
                if(frame.narrative) store.updateVisualState({ narrative: frame.narrative });
                await this.wait(150 / speed);
                break;
        }

        store.nextStep();
    }

    updateEntityStates(indices, state) {
        const store = useAlgoStore.getState();
        const entities = [...store.visualState.entities];
        
        indices.forEach(idx => {
            if (entities[idx]) {
                entities[idx] = { ...entities[idx], state };
            }
        });

        store.updateVisualState({ entities });
    }

    updateNodeState(nodeId, state) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === `node-${nodeId}`) {
                return { ...e, state };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updateEdgeState(edgeId, active) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === edgeId) {
                return { ...e, active };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updateTileState(tileId, state) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === `tile-${tileId}`) {
                return { ...e, state };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updatePillarState(indexOrId, state) {
        const store = useAlgoStore.getState();
        const entities = [...store.visualState.entities];
        
        // Check if it's a numeric index or an ID string
        if (typeof indexOrId === 'number') {
            // Old behavior: index-based
            if (entities[indexOrId]) {
                entities[indexOrId] = { ...entities[indexOrId], state };
            }
        } else {
            // New behavior: ID-based (for LCS cells)
            const index = entities.findIndex(e => e.id === indexOrId);
            if (index !== -1) {
                entities[index] = { ...entities[index], state };
            }
        }
        
        store.updateVisualState({ entities });
    }

    updatePillarHeight(index, height) {
        const store = useAlgoStore.getState();
        const entities = [...store.visualState.entities];
    
        if (entities[index]) {
            entities[index] = { 
                ...entities[index],
                height: height,
                value: height,
                state: 'overwrite' 
            };
        }

        store.updateVisualState({ entities });

        setTimeout(() => {
            const currentEntities = useAlgoStore.getState().visualState.entities;
            if(currentEntities[index]) {
                const resetEntities = [...currentEntities];
                resetEntities[index] = { ...resetEntities[index], state: 'default' };
                useAlgoStore.getState().updateVisualState({ entities: resetEntities });
            }
        }, 300);
    }

    updateSphereState(indexOrId, state) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            // Check if it matches by index (sphere-0) or if the ID was passed directly
            if (e.id === `sphere-${indexOrId}` || e.id === indexOrId) {
                return { ...e, state };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updateFramePosition(frameId, position) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === frameId) {
                return { ...e, position };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updateEntityProps(id, props) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === id) {
                const { type: _t, narrative: _n, duration: _d, ...visualUpdates } = props;
                return { ...e, ...visualUpdates };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updateOrbState(orbId, state) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === orbId) {
                return { ...e, state };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }

    updatePillarHeightById(pillarId, height) {
        const store = useAlgoStore.getState();
        const entities = store.visualState.entities.map(e => {
            if (e.id === pillarId) {
                return { ...e, height };
            }
            return e;
        });
        store.updateVisualState({ entities });
    }


    async animateSwap(indices, duration) {
        const store = useAlgoStore.getState();
        const entities = [...store.visualState.entities];
        const [idxA, idxB] = indices;

        // Swap positions in the data
        [entities[idxA], entities[idxB]] = [entities[idxB], entities[idxA]];
        
        // Update positions for smooth transition
        const tempPos = entities[idxA].position;
        entities[idxA].position = entities[idxB].position;
        entities[idxB].position = tempPos;

        store.updateVisualState({ entities });
        
        await this.wait(duration);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    pause() {
        useAlgoStore.getState().pause();
    }

    reset() {
        // 1. Stop everything
        this.isExecuting = false;
        this.generator = null;
        
        // 2. Clear State
        useAlgoStore.getState().reset();
        
        // 3. RELOAD immediately
        if (this.CurrentAlgoClass) {
            // Small delay to let the clear animation play (optional)
            setTimeout(() => {
                this.loadAlgorithm(this.CurrentAlgoClass);
            }, 100);
        }
    }
}
