import React, { useState } from "react";

const FilterState = ({ states, setSelectedState }: any) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value); 
    setSelectedState(value); 
  };

  const handleSelectClick = () => {
    
    setSelectedValue("");
    setSelectedState("");
  };

  return (
    <div className="filter-state mb-4">
      <select
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={handleStateChange}
        value={selectedValue}
      >
        <option value="" onClick={handleSelectClick}>
          Select State
        </option>
        {states.map((state: any, index: any) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterState;
