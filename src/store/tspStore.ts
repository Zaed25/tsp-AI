import { create } from 'zustand';
import { City, Connection, TSPState } from '../types';
import { calculateDistance } from '../utils/pathFinding';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://zaid25.pythonanywhere.com'  // Updated to your actual PythonAnywhere domain
  : 'http://localhost:5000';

const useTSPStore = create<TSPState>((set, get) => ({
  cities: [],
  connections: [],
  selectedCity: null,
  path: [],
  isCalculating: false,

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
      };
    });
  },

  addConnection: (connection: Connection) => {
    set((state) => ({
      connections: [...state.connections, connection],
    }));
  },

  setSelectedCity: (id: string | null) => {
    set({ selectedCity: id });
  },

  setPath: (path: string[]) => {
    set({ path });
  },

  startCalculation: () => {
    set({ isCalculating: true });
  },

  findShortestPath: async () => {
    const { cities, startCalculation, setPath } = get();
    
    if (cities.length < 2) return;
    
    try {
      startCalculation();
      
      const response = await fetch(`${API_URL}/api/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to calculate path');
      }
      
      const data = await response.json();
      setPath(data.path);
    } catch (error) {
      console.error('Error finding shortest path:', error);
      setPath([]);
    } finally {
      set({ isCalculating: false });
    }
  },
}));

export default useTSPStore;
