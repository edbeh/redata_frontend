export declare module Citation {
  export interface Citations {
    all: number;
    since_2018: number;
  }

  export interface HIndex {
    all: number;
    since_2018: number;
  }

  export interface I10Index {
    all: number;
    since_2018: number;
  }

  export interface Table {
    citations: Citations;
    h_index: HIndex;
    i10_index: I10Index;
  }

  export interface Graph {
    year: number;
    citations: number;
  }

  export interface CitedBy {
    table: [Table];
    graph: Graph[];
  }

  export interface Data {
    cited_by: CitedBy;
  }
}
