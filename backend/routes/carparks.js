const express = require('express');
const router = express.Router();
const supabase = require('../db');
const carparksController = require('../controllers/carparksController');

// ONLY READ OPERATIONS, NO NEED FOR CREATE, UPDATE, DELETE

// GET all carparks
// router.get('/', async (req, res) => {
//   const { data, error } = await supabase.from('carparks').select('*');
//   if (error) return res.status(500).json({ error: error.message });
//   res.json(data);
// });

// // GET carparks by region
// router.get('/region/:region', async (req, res) => {
//     const { region } = req.params;
//     const { data, error } = await supabase
//         .from('carparks')
//         .select('*')
//         .eq('region', region);
//     if (error) return res.status(500).json({ error: error.message });
//     res.json(data);
//     });

// // GET carparks by name
// router.get('/name/:name', async (req, res) => {
//   const { name } = req.params;
//   const { data, error } = await supabase
//     .from('carparks')
//     .select('*')
//     .ilike('name', `%${name}%`);
//   if (error) return res.status(500).json({ error: error.message });
//   res.json(data);
// });

// multi-query endpoints below
// using the carparksController to handle the logic

// GET filtered carparks based on multiple query parameters
router.get('/', carparksController.getFilteredCarparks);

// GET carparks by region
router.get('/region/:region', carparksController.getCarparksByRegion);

// GET carparks by name
router.get('/name/:name', carparksController.getCarparksByName);

// GET all carparks
router.get('/', carparksController.getAllCarparks);

module.exports = router;
