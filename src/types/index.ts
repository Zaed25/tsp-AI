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

export interface TSPState {
  cities: City[];
  connections: Connection[];
  selectedCity: string | null;
  path: string[];
  isCalculating: boolean;
  addCity: (city: City) => void;
  removeCity: (id: string) => void;
  updateCity: (city: City) => void;
  addConnection: (connection: Connection) => void;
  setSelectedCity: (id: string | null) => void;
  setPath: (path: string[]) => void;
  startCalculation: () => void;
  findShortestPath: () => void;
}