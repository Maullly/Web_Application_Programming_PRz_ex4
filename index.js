'use strict';
const { categories, funnyJoke, lameJoke } = require('./data');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

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
//4_1.2
app.get('/math/rectangle/:width/:height', (req, res) => {
  const w = parseFloat(req.params.width);
  const h = parseFloat(req.params.height);
  if (isNaN(w) || isNaN(h) || w < 0 || h < 0)
    return res.status(400).json({ error: 'Invalid input' });

  res.json({
    area: w * h,
    perimeter: 2 * (w + h)
  });
});

//4_1.3
app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  if (isNaN(base) || isNaN(exponent)) return res.status(400).json({ error: 'Invalid input' });

  const result = Math.pow(base, exponent);
  const response = { result };

  if (req.query.root === 'true') {
    if (base < 0) return res.status(400).json({ error: 'Invalid input' });
    response.root = Math.sqrt(base);
  }

  res.json(response);
});
//4_2_1 
app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const { category } = req.params;

  if (!categories.includes(category)) {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  let jokeList = category === 'funnyJoke' ? funnyJoke : lameJoke;

  const randomJoke = jokeList[Math.floor(Math.random() * jokeList.length)];

  res.json(randomJoke);
});


//4_3_1 żeby poprawnie wyświetlało html'a trzeba go ręcznie uruchomić z folderu


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});