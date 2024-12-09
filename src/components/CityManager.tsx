import React, { useState } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Navigation } from 'lucide-react';
import useTSPStore from '../store/tspStore';
import CityEditor from './CityEditor';

const CityManager: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const { 
    cities, 
    addCity, 
    removeCity, 
    updateCity,
    findShortestPath,
    isCalculating 
  } = useTSPStore();

  const handleAddCity = () => {
    if (!cityName.trim()) return;

    const newCity = {
      id: crypto.randomUUID(),
      name: cityName,
      x: Math.random(),
      y: Math.random(),
    };
    
    addCity(newCity);
    setCityName('');
    setExpandedCity(newCity.id);
  };

  const toggleExpand = (cityId: string) => {
    setExpandedCity(expandedCity === cityId ? null : cityId);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Cities</h2>
      
      <div className="flex items-center gap-2 mb-4 ">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
          className="lg:w-2/3 lg:flex-auto flex-1 flex px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleAddCity}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>


      <button
        onClick={findShortestPath}
        disabled={cities.length < 2 || isCalculating}
        className={`w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
          cities.length < 2 || isCalculating
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        <Navigation size={18} />
        Find Shortest Path
      </button>

      <ul className="space-y-2">
        {cities.map((city) => (
          <li
            key={city.id}
            className="bg-gray-50 rounded-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-2">
              <button
                onClick={() => toggleExpand(city.id)}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <span>{city.name}</span>
                {expandedCity === city.id ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              <button
                onClick={() => removeCity(city.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            {expandedCity === city.id && (
              <div className="px-2 pb-2 border-t border-gray-200">
                <CityEditor city={city} onUpdate={updateCity} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityManager;