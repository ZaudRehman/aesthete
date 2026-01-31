export class AlgorithmBase {
    constructor() {
        this.name = "Untitled Algorithm";
        this.tier = 1;
        this.category = "Uncategorized";
        this.description = "";
        this.code = ""; // Source code string (Rust, Python, etc.)
        this.codeLanguage = "rust";
    }

    // Must return initial data structure
    // e.g., { type: 'array', values: [5,2,8,1,9] }
    initialize() {
        throw new Error("initialize() must be implemented");
    }

    // Generator function that yields animation frames
    // Each frame: { type: 'compare'|'swap'|'set'|'highlight', targets: [...], narrative: "" }
    *execute(data) {
        throw new Error("execute() must be implemented");
    }

    // Convert logical data into visual entities
    // e.g., array -> pillars with positions
    mapToVisual(data) {
        throw new Error("mapToVisual() must be implemented");
    }
}
