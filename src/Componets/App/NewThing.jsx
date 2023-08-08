import React, { useState, useEffect } from "react";

function AllergyComparison() {
  const [apiData, setApiData] = useState([]);
  const [filters] = useState([
    "dairy",
    "eggs",
    "gluten",
    "peanuts",
    "soy",
    "wheat",
    "fish",
  ]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Simulating API data fetch (replace with your actual API call)
    const fetchedData = [
      { id: 1, name: "Item 1", allergies: ["dairy", "peanuts"] },
      { id: 2, name: "Item 2", allergies: ["eggs"] },
      { id: 3, name: "Item 3", allergies: ["gluten"] },
      { id: 4, name: "Item 4", allergies: ["soy"] },
      { id: 5, name: "Item 5", allergies: ["wheat"] },
      { id: 6, name: "Item 6", allergies: ["fish"] },
      { id: 7, name: "Item 7", allergies: ["dairy", "eggs"] },
      { id: 8, name: "Item 8", allergies: ["dairy", "gluten"] },
      { id: 9, name: "Item 9", allergies: ["dairy", "soy"] },
      { id: 10, name: "Item 10", allergies: ["dairy", "wheat"] },
      { id: 11, name: "Item 11", allergies: ["dairy", "fish"] },
      { id: 12, name: "Item 12", allergies: ["eggs", "gluten"] },
    ];

    setApiData(fetchedData);
  }, []);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const filtered = apiData.filter((item) => {
        return selectedFilters.every(
          (filter) => !item.allergies.includes(filter)
        );
      });
      setFilteredItems(filtered);
    } else {
      setFilteredItems(apiData);
    }
  }, [selectedFilters, apiData]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  return (
    <div>
      <h1>Allergy Comparison</h1>
      <div>
        <h2>Filters</h2>
        {filters.map((filter) => (
          <label key={filter}>
            <input
              type="checkbox"
              value={filter}
              checked={selectedFilters.includes(filter)}
              onChange={handleFilterChange}
            />
            {filter}
          </label>
        ))}
      </div>
      <h2>Filtered Items</h2>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllergyComparison;
