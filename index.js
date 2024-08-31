const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// code to remove  cors 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// app.use(cors());
app.use(express.json());

const emissionFactors = {
  Excavation: { 'Diesel Excavator': 2.5 },
  Transportation: { 'Diesel Truck': 3.0 },
  // Add other activities and equipment types as needed
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));});


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