// Cubic Easing
export const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const easeOutElastic = (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export class TweenManager {
    constructor() {
        this.tweens = [];
    }

    add(config) {
        const tween = {
            id: Math.random().toString(36).substr(2, 9),
            startTime: performance.now(),
            duration: config.duration || 800,
            from: config.from,
            to: config.to,
            easing: config.easing || easeInOutCubic,
            onUpdate: config.onUpdate,
            onComplete: config.onComplete,
            active: true
        };
        
        this.tweens.push(tween);
        return tween.id;
    }

    update() {
        const now = performance.now();
        
        for (let i = this.tweens.length - 1; i >= 0; i--) {
            const tween = this.tweens[i];
            if (!tween.active) continue;

            const elapsed = now - tween.startTime;
            const progress = Math.min(elapsed / tween.duration, 1);
            const easedProgress = tween.easing(progress);

            // Interpolate values
            if (typeof tween.from === 'number') {
                const value = tween.from + (tween.to - tween.from) * easedProgress;
                if (tween.onUpdate) tween.onUpdate(value);
            } else if (Array.isArray(tween.from)) {
                // Vector interpolation
                const value = tween.from.map((v, idx) => 
                    v + (tween.to[idx] - v) * easedProgress
                );
                if (tween.onUpdate) tween.onUpdate(value);
            }

            if (progress >= 1) {
                if (tween.onComplete) tween.onComplete();
                this.tweens.splice(i, 1);
            }
        }
    }

    clear() {
        this.tweens = [];
    }
}
