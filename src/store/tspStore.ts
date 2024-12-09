import { create } from 'zustand';
import { City, Connection, TSPState, PathDetails } from '../types';
import { calculateDistance } from '../utils/pathFinding';

// Update this to your PythonAnywhere URL
const API_URL = 'https://zaid25.pythonanywhere.com';

const useTSPStore = create<TSPState>((set, get) => ({
  cities: [],
  connections: [],
  selectedCity: null,
  path: [],
  pathDetails: null,
  isCalculating: false,
  error: null,

  addCity: (city: City) => {
    set((state) => {
      const newConnections = state.cities.map((existingCity) => ({
        from: existingCity.id,
        to: city.id,
        distance: calculateDistance(existingCity, city),
      }));

      return {
        cities: [...state.cities, city],
        connections: [...state.connections, ...newConnections],
        error: null,
      };
    });
  },

  removeCity: (id: string) => {
    set((state) => ({
      cities: state.cities.filter((city) => city.id !== id),
      connections: state.connections.filter(
        (conn) => conn.from !== id && conn.to !== id
      ),
      path: state.path.filter((cityId) => cityId !== id),
      pathDetails: null,
      error: null,
    }));
  },

  updateCity: (updatedCity: City) => {
    set((state) => {
      const newConnections = state.connections.map((conn) => {
        if (conn.from === updatedCity.id || conn.to === updatedCity.id) {
          const otherCityId = conn.from === updatedCity.id ? conn.to : conn.from;
          const otherCity = state.cities.find((c) => c.id === otherCityId)!;
          return {
            ...conn,
            distance: calculateDistance(updatedCity, otherCity),
          };
        }
        return conn;
      });

      return {
        cities: state.cities.map((city) =>
          city.id === updatedCity.id ? updatedCity : city
        ),
        connections: newConnections,
        error: null,
      };
    });
  },

  addConnection: (connection: Connection) => {
    set((state) => ({
      connections: [...state.connections, connection],
      error: null,
    }));
  },

  setSelectedCity: (id: string | null) => {
    set({ selectedCity: id, error: null });
  },

  setPath: (path: string[], details?: PathDetails) => {
    set({ path, pathDetails: details || null, error: null });
  },

  startCalculation: () => {
    set({ isCalculating: true, pathDetails: null, error: null });
  },

  findShortestPath: async () => {
    const { cities, startCalculation, setPath } = get();
    
    if (cities.length < 2) {
      set({ error: 'At least 2 cities are required', isCalculating: false });
      return;
    }
    
    try {
      startCalculation();
      
      const response = await fetch(`${API_URL}/api/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'omit',
        mode: 'cors',
        body: JSON.stringify({ cities }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.path || !data.pathDetails) {
        throw new Error('Invalid response from server');
      }
      
      setPath(data.path, data.pathDetails);
    } catch (error) {
      console.error('Error finding shortest path:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        path: [],
        pathDetails: null
      });
    } finally {
      set({ isCalculating: false });
    }
  },
}));

export default useTSPStore;