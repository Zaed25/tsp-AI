import React from 'react';
import { City } from '../types';

interface CityEditorProps {
  city: City;
  onUpdate: (city: City) => void;
}

const CityEditor: React.FC<CityEditorProps> = ({ city, onUpdate }) => {
  const handleCoordinateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    coord: 'x' | 'y'
  ) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    
    onUpdate({
      ...city,
      [coord]: Math.min(Math.max(value / 100, 0), 1), // Normalize to 0-1 range
    });
  };

  return (
    <div className="flex gap-2 items-center mt-2">
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">X coordinate (0-100)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={Math.round(city.x * 100)}
          onChange={(e) => handleCoordinateChange(e, 'x')}
          className="w-full px-2 py-1 text-sm border rounded"
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">Y coordinate (0-100)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={Math.round(city.y * 100)}
          onChange={(e) => handleCoordinateChange(e, 'y')}
          className="w-full px-2 py-1 text-sm border rounded"
        />
      </div>
    </div>
  );
};

export default CityEditor;