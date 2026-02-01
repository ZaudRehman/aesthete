<div align="center">

# Aesthete<span style="color: #D4AF37">.</span>

<p align="center">
  <b>A L G O R I T H M I C &nbsp;&nbsp; V I S U A L I Z A T I O N &nbsp;&nbsp; E N G I N E</b>
</p>



<p align="center">
  <a href="#-system-status">System Status</a> •
  <a href="#-features">Features</a> •
  <a href="#-algorithm-catalog">Algorithms</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)](https://threejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

---

## ✺ System Status

**Current Status:**
> We are currently operating at **Tier 2** capacity, focusing on complex Dynamic Programming and Optimization problems. The engine has been upgraded to support 2D matrix visualizations with backtracking capabilities.

| Metric | Status |
| :--- | :--- |
| **Algorithms Implemented** | `25 / 150` Ready |
| **Engine Version** | `v2.4.0` |
| **Current Focus** | `Dynamic Programming` |
| **Visual Primitives** | `Pillars`, `Orbs`, `Glass Tiles`, `Window Frames` |
| **Supported Languages** | `Python`, `JavaScript`, `C++`, `Rust`, `Go` |
| **3D Performance** | `60 FPS` @ 1080p, `144 FPS` capable |

<br>

---

## ❖ Features

### **1. The Controller**
Unlike standard visualizers that simply swap array elements, **Aesthete** employs a sophisticated generator-based `AlgorithmController` that yields precise animation frames. This architecture enables:

- **Time-Travel Debugging:** Step forward/backward through algorithm execution with frame-perfect precision
- **Contextual Narratives:** Real-time explanations of algorithmic decisions (e.g., *"Taking Item 4: Value 6 > Skip value 5"*)
- **State-Aware Materials:** Entities dynamically change appearance (Gold → Marble → Glass) based on their role in the algorithm
- **Variable Speed Control:** 0.5x to 2x playback with maintained visual fidelity
- **Code Highlighting:** Synchronized line-by-line highlighting across 5 programming languages

### **2. Multi-Language Code Display**
Every algorithm includes production-ready implementations in:
- **Python** (Primary teaching language)
- **JavaScript** (Web-native)
- **C++** (Performance-critical applications)
- **Rust** (Memory-safe systems)
- **Go** (Concurrent processing)

### **3. Tier System**
Algorithms are organized by complexity and concept:

**Tier 1: Foundations**
- Sorting: Bubble, Selection, Insertion, Merge, Quick
- Searching: Binary Search, Boyer-Moore
- Array Manipulation: Reverse, Dutch Flag, Kadane's, Two Pointers

**Tier 2: Dynamic Programming**
- 0/1 Knapsack
- Longest Common Subsequence (LCS)
- Longest Increasing Subsequence (LIS)
- Coin Change
- House Robber

**Tier 3: Graph Algorithms**
- BFS, DFS
- Dijkstra's Shortest Path
- A* Pathfinding

**Tier 4–7:** *Coming Soon* (See [Roadmap](#-roadmap))

### **4. 3D Visual Grammar**
Each algorithm uses a carefully designed visual metaphor:

| Algorithm Type | Visual Representation |
| :--- | :--- |
| **Sorting** | Pillars rising/falling in height |
| **Graph Traversal** | Orbs connected by glowing edges |
| **Pathfinding** | Glass tiles forming terrain maps |
| **DP Matrices** | 2D grids with growing pillars |
| **Sliding Window** | Translucent frames sweeping across arrays |

<br>

---

## Algorithm Catalog

### **Tier 1: Foundations**

<details>
<summary><b>Sorting Algorithms (5)</b></summary>

| Algorithm | Time | Space | Visual Metaphor |
|:---|:---:|:---:|:---|
| Bubble Sort | O(n²) | O(1) | Adjacent pillars swap like bubbles rising |
| Selection Sort | O(n²) | O(1) | Minimum element "selected" and placed |
| Insertion Sort | O(n²) | O(1) | Cards being inserted into sorted hand |
| Merge Sort | O(n log n) | O(n) | Recursive tree splitting and merging |
| Quick Sort | O(n log n) avg | O(log n) | Pivot-based partitioning with color zones |

</details>

<details>
<summary><b>Searching & Patterns (3)</b></summary>

| Algorithm | Time | Space | Use Case |
|:---|:---:|:---:|:---|
| Binary Search | O(log n) | O(1) | Sorted array lookup |
| Boyer-Moore | O(n/m) best | O(1) | String pattern matching |
| Two Pointers | O(n) | O(1) | Array pair finding |

</details>

<details>
<summary><b>Array Techniques (4)</b></summary>

| Algorithm | Complexity | Key Concept |
|:---|:---:|:---|
| Reverse Array | O(n) | In-place swapping |
| Dutch National Flag | O(n) | 3-way partitioning |
| Kadane's Algorithm | O(n) | Maximum subarray sum (DP) |
| Sliding Window Max | O(n) | Deque-based optimization |

</details>

### **Tier 2: Dynamic Programming**

<details>
<summary><b>Complete DP Suite (5)</b></summary>

| Algorithm | DP Type | Visualization |
|:---|:---:|:---|
| **0/1 Knapsack** | 2D Grid | Pillars grow as value accumulates; Green = item taken, Blue = skipped |
| **LCS** | 2D Grid | Diagonal matches create "mountains"; Backtracking path highlighted |
| **LIS** | 1D Array | Towers stack as subsequence extends |
| **Coin Change** | 1D Array | Minimum coins visualized as pillar heights |
| **House Robber** | 1D Array | Decision tree: Rob (green glow) vs Skip (fade) |

**Visual Innovation:** All 2D DP problems use a unified grid metaphor where:
- **Height = Value/Length accumulated**
- **Color = Decision made** (Gold = comparing, Green = optimal choice, Blue = inherited)
- **Path Tracing = Solution reconstruction** via backtracking

</details>

### **Tier 3: Graph Algorithms**

<details>
<summary><b>Traversal & Pathfinding (5)</b></summary>

| Algorithm | Graph Type | Visual |
|:---|:---:|:---|
| BFS | Unweighted | Wave propagation from source |
| DFS | Unweighted | Deep tunnel exploration |
| Dijkstra | Weighted | Shortest path with priority queue |
| A* Pathfinding | Weighted + Heuristic | Manhattan distance guides search |
| (More coming) | - | - |

</details>

<br>

---

## ⌬ Architecture

### **Tech Stack**
```javascript
const stack = {
  frontend:   "React 18.2",
  renderer:   "Three.js r160 / @react-three/fiber 8.15",
  animation:  "@react-spring/three 9.7",
  styling:    "TailwindCSS 3.4",
  state:      "Zustand 4.4",
  language:   "JavaScript ES2023"
};
```

### **Core Philosophy**
1. **Generators Over Imperative Loops:** Every algorithm is a `function*` generator that `yield`s animation frames
2. **Immutable State Updates:** Zustand store ensures React can diff changes efficiently
3. **Material-Based State:** Visual changes are CSS-like "material swaps," not property mutations
4. **Decoupled Logic:** Algorithm files contain *zero* rendering code

### **Directory Structure**
```text
aesthete/
├── src/
│   ├── algorithms/
│   │   ├── tier1/              # Sorting, Searching, Arrays
│   │   │   ├── BubbleSort.js
│   │   │   ├── MergeSort.js
│   │   │   └── ...
│   │   ├── tier2/              # Dynamic Programming
│   │   │   ├── Knapsack.js
│   │   │   ├── LongestCommonSubsequence.js
│   │   │   └── ...
│   │   └── tier3/              # Graphs
│   │       ├── AStarGrid.js
│   │       ├── DijkstraGrid.js
│   │       └── ...
│   ├── core/
│   │   ├── AlgorithmController.js   # Generator executor & frame processor
│   │   ├── AlgorithmBase.js         # Abstract class all algos inherit
│   │   └── StudioScene.jsx          # 3D lighting & camera setup
│   ├── engine/
│   │   ├── primitives/
│   │   │   ├── Pillar.jsx           # Height-based data visualization
│   │   │   ├── Orb.jsx              # Graph nodes / labels
│   │   │   ├── GlassTile.jsx        # Grid cells for pathfinding
│   │   │   └── WindowFrame.jsx      # Sliding window indicator
│   │   └── Materials.js             # Shared PBR materials
│   ├── components/
│   │   ├── NavigationMenu.jsx       # Tier/algorithm selector
│   │   ├── CodeCard.jsx             # Multi-language code display
│   │   ├── NarrativeLog.jsx         # Real-time explanation feed
│   │   ├── PlaybackControls.jsx     # Play/Pause/Reset/Speed
│   │   └── InfoPanel.jsx            # Complexity & use cases
│   ├── store/
│   │   └── useAlgoStore.js          # Zustand global state
│   └── App.jsx                      # Main composition
├── public/
└── package.json
```

### **How It Works: The Generator Pattern**

**1. Algorithm defines execution as a generator:**
```javascript
*execute(data) {
  yield { type: 'compare', targets:, narrative: 'Comparing...' };
  yield { type: 'swap', targets:  };
  yield { type: 'complete', narrative: 'Sorted!' };
}
```

**2. Controller consumes the generator:**
```javascript
async play() {
  while (true) {
    const { value: frame, done } = this.generator.next();
    if (done) break;
    await this.processFrame(frame); // Renders visual changes
  }
}
```

**3. React components respond to state:**
```javascript
const { visualState } = useAlgoStore();
return visualState.entities.map(e => <Pillar {...e} />);
```

This architecture enables **complete separation of concerns**: algorithms are pure logic, the controller orchestrates timing, and React handles rendering.

<br>

---

## Getting Started

### **Prerequisites**
- Node.js 18+ and npm 9+
- A GPU-capable browser (Chrome 90+, Firefox 88+, Safari 15+)

### **Installation**

**1. Clone the Repository**
```bash
git clone https://github.com/ZaudRehman/aesthete.git
cd aesthete
```

**2. Install Dependencies**
```bash
npm install
```

**3. Start Development Server**
```bash
npm run dev
```

The engine will launch at `http://localhost:5173`

### **Project Commands**
```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint check
```

### **Adding a New Algorithm**

**1. Create the algorithm file:**
```javascript
// src/algorithms/tier1/MySort.js
import { AlgorithmBase } from '../AlgorithmBase';

export class MySort extends AlgorithmBase {
  constructor() {
    super();
    this.name = "My Sort";
    this.tier = 1;
    this.category = "Sorting";
    // ... details, code examples
  }

  initialize() {
    return { array:  };
  }

  mapToVisual(data) {
    return data.array.map((val, i) => ({
      id: i,
      type: 'pillar',
      height: val,
      position: [i * 2, 0, 0],
      state: 'default'
    }));
  }

  *execute(data) {
    // Your algorithm logic with yield statements
  }
}
```

**2. Register in NavigationMenu:**
```javascript
import { MySort } from '../algorithms/tier1/MySort';

// Add to tier1Algorithms array
```

That's it! The engine handles visualization, controls, and code display automatically.

<br>

---

## Roadmap

### **Completed**
- [x] Core 3D engine with generator-based control
- [x] Tier 1: All fundamental sorting & searching algorithms
- [x] Tier 2: Complete Dynamic Programming suite with 2D grids
- [x] Multi-language code display (5 languages)
- [x] Narrative logging system
- [x] Backtracking visualization for DP

### Current Focus
- [ ] **Tier 3: Advanced Graphs**
  - [ ] Bellman-Ford
  - [ ] Floyd-Warshall
  - [ ] Kruskal's MST
  - [ ] Prim's MST
  - [ ] Topological Sort
- [ ] **Visual Enhancements**
  - [ ] Camera keyframe animations for complex algos
  - [ ] Particle effects for "eureka" moments
  - [ ] Trail rendering for path algorithms


<br>

---

## Contributing

We welcome contributions! Here's how:

### **Bug Reports**
Open an issue with:
- Browser & OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshot/video if visual bug

### **New Algorithms**
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/dijkstra-algorithm`
3. Follow the [Adding a New Algorithm](#adding-a-new-algorithm) guide
4. Ensure your algorithm includes:
   - All 5 language implementations
   - Detailed `details.keyConcept` explanation
   - Complexity analysis
   - Real-world use cases
5. Submit a PR with a clear description

### **Code Style**
- Use ESLint config (run `npm run lint`)
- Prefer `const` over `let`
- Use descriptive variable names (`currentNodeIndex` not `i`)
- Add comments for non-obvious algorithmic decisions

<br>

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- Use commercially
- Modify and distribute
- Use in private projects

With the condition that you:
- Include the original license and copyright notice

<br>

---

## Acknowledgments

**Inspiration:**
- [Visualgo](https://visualgo.net/) - Pioneering algorithm visualization
- [Algorithm Visualizer](https://algorithm-visualizer.org/) - Open-source community effort
- [Manim](https://www.manim.community/) - Mathematical animation engine by 3Blue1Brown

**Technology:**
- [Three.js](https://threejs.org/) - The WebGL library that powers our 3D rendering
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
- [Zustand](https://github.com/pmndrs/zustand) - Minimal state management

**Design Philosophy:**
- *Dieter Rams' "Less, but better"* - Minimalist UI approach
- *Edward Tufte's "Data-Ink Ratio"* - Maximize information, minimize decoration
- *Bret Victor's "Explorable Explanations"* - Interactive learning

<br>

---

<div align="center">


**Aesthete** is an ongoing project exploring the intersection of computer science education and interactive 3D visualization.

<br>

<sub>*Started January 2026 • 25 algorithms and counting*</sub>

**[⬆ Back to Top](#aesthetespan-stylecolor-d4af37span)**

</div>
