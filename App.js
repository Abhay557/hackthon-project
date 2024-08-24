import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState([{ activityType: '', quantity: '', equipmentType: '' }]);
  const [totalEmissions, setTotalEmissions] = useState(null);

  const handleInputChange = (index, event) => {
    const newActivities = [...activities];
    newActivities[index][event.target.name] = event.target.value;
    setActivities(newActivities);
  };

  const addActivity = () => {
    setActivities([...activities, { activityType: '', quantity: '', equipmentType: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate-emissions', { activities });
      setTotalEmissions(response.data.totalEmissions);
    } catch (error) {
      console.error('Error calculating emissions:', error);
    }
  };

  return (
    <div className="App">
      <h1>Emission Estimation</h1>
      <form onSubmit={handleSubmit}>
        {activities.map((activity, index) => (
          <div key={index}>
            <label>
              Activity Type:
              <select name="activityType" value={activity.activityType} onChange={(e) => handleInputChange(index, e)}>
                <option value="">Select...</option>
                <option value="Excavation">Excavation</option>
                <option value="Transportation">Transportation</option>
                <option value="Equipment Usage">Equipment Usage</option>
              </select>
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={activity.quantity}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            <label>
              Equipment Type:
              <input
                type="text"
                name="equipmentType"
                value={activity.equipmentType}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addActivity}>Add Another Activity</button>
        <button type="submit">Calculate Emissions</button>
      </form>
      {totalEmissions !== null && <h2>Total Emissions: {totalEmissions} kg CO₂</h2>}
    </div>
  );
}

export default App;
