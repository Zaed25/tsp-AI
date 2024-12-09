import React from 'react';
import useTSPStore from '../store/tspStore';

const PathDetails: React.FC = () => {
  const { pathDetails } = useTSPStore();

  if (!pathDetails) return null;

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Path Analysis</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Optimal Path</h3>
        <p className="text-gray-600">
          {pathDetails.cityNames.join(' → ')}
        </p>
        <p className="text-gray-600 mt-2">
          Total Distance: <span className="font-semibold">{pathDetails.cost.toFixed(2)} units</span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Path Finding Process</h3>
        <p className="text-sm text-gray-600 mb-3">
          A* algorithm explored multiple paths before finding the optimal solution. Here are some of the explored paths:
        </p>
        
        <div className="space-y-3">
          {pathDetails.exploredPaths.map((explored, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                Path {index + 1}: {explored.path.map(id => 
                  pathDetails.cityNames[pathDetails.path.indexOf(id)]
                ).join(' → ')}
              </p>
              <div className="mt-1 text-sm grid grid-cols-3 gap-2">
                <div>
                  <span className="text-gray-500">Cost:</span>{' '}
                  <span className="font-medium">{explored.cost.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Heuristic:</span>{' '}
                  <span className="font-medium">{explored.heuristic.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Total:</span>{' '}
                  <span className="font-medium">{explored.total_cost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathDetails;