// controllers/carparksController.js
const supabase = require('../db');

// Get all carparks
exports.getAllCarparks = async (req, res) => {
  const { data, error } = await supabase.from('carparks').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get carparks by region
exports.getCarparksByRegion = async (req, res) => {
  const { region } = req.params;
  const { data, error } = await supabase
    .from('carparks')
    .select('*')
    .eq('region', region);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get carparks by name
exports.getCarparksByName = async (req, res) => {
  const { name } = req.params;
  const { data, error } = await supabase
    .from('carparks')
    .select('*')
    .ilike('name', `%${name}%`);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get filtered carparks based on MULTIPLE query parameters
exports.getFilteredCarparks = async (req, res) => {
  const { name, region, nightParking } = req.query;

  let query = supabase.from('carparks').select('*');

  if (name) {
    query = query.ilike('name', `%${name}%`); // case-insensitive LIKE
  }

  if (region) {
    query = query.eq('region', region);
  }

  // Convert nightParking from Boolean to string for comparison
  // If nightParking is 'true', we want to filter by night_parking != "Not Available"
  // If nightParking is 'false', we want to filter by night_parking = "Not Available"
  if (nightParking === 'true') {
    query = query.not('night_parking', 'eq', 'Not Available');
  } else if (nightParking === 'false') {
    query = query.eq('night_parking', 'Not Available');
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};
