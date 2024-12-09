import React, { Suspense } from 'react';
import CityGraph from './components/CityGraph';
import CityManager from './components/CityManager';
import { Info } from 'lucide-react';
import PathDetails from './components/PathDetails';
import useTSPStore from './store/tspStore';

function App() {
  const { cities } = useTSPStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            TSP Solver with A* Algorithm
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CityManager />
            
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Info size={20} />
                <h2 className="text-lg font-semibold">How it works</h2>
              </div>
              <p className="text-gray-600 text-sm">
                The A* algorithm finds the optimal path between cities by combining:
                <br />
                • g(n): Cost from start to current node
                <br />
                • h(n): Estimated cost to goal
                <br />
                • f(n) = g(n) + h(n): Total estimated cost
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Suspense fallback={<div>Loading graph...</div>}>
                <CityGraph />
              </Suspense>
            </div>
            {cities.length > 0 && <PathDetails />}
          </div>
        </div>
      </main>
    </div>
  );
}