'use strict';

const express = require('express');
const app = express();

app.get('/math/circle/:r', (req, res) => {
  const r = parseFloat(req.params.r);
  if (isNaN(r) || r < 0) return res.status(400).json({ error: 'Invalid input' });

  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;

  res.json({
    area: area.toFixed(2),
    circumference: circumference.toFixed(2)
  });
});

//TODO2


//TODO3


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});