const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const emissionFactors = {
  Excavation: { 'Diesel Excavator': 2.5 },
  Transportation: { 'Diesel Truck': 3.0 },
  // Add other activities and equipment types as needed
};

app.post('/calculate-emissions', (req, res) => {
  const { activities } = req.body;
  let totalEmissions = 0;

  activities.forEach((activity) => {
    const { activityType, quantity, equipmentType } = activity;
    const emissionFactor = emissionFactors[activityType][equipmentType];
    totalEmissions += quantity * emissionFactor;
  });

  res.json({ totalEmissions });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
