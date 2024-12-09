export interface City {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface Connection {
  from: string;
  to: string;
  distance: number;
}

export interface PathNode {
  cityId: string;
  g: number;  // Cost from start to current node
  h: number;  // Estimated cost from current node to goal
  f: number;  // Total cost (g + h)
  parent?: PathNode;
}

export interface PathDetails {
  path: string[];
  cost: number;
  cityNames: string[];
  exploredPaths: {
    path: string[];
    cost: number;
    heuristic: number;
    total_cost: number;
  }[];
}

export interface TSPState {
  cities: City[];
  connections: Connection[];
  selectedCity: string | null;
  path: string[];
  pathDetails: PathDetails | null;
  isCalculating: boolean;
  error: string | null;
  addCity: (city: City) => void;
  removeCity: (id: string) => void;
  updateCity: (city: City) => void;
  addConnection: (connection: Connection) => void;
  setSelectedCity: (id: string | null) => void;
  setPath: (path: string[], details?: PathDetails) => void;
  startCalculation: () => void;
  findShortestPath: () => void;
}