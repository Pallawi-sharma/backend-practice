const {placesModel} = require('../models');
// const Place = db.place;

// Create
exports.create = async (req, res) => {
  try {
    const { name, description, title, latitude, longitude, status } = req.body;

    const newPlace = await placesModel.create({
      name,
      description,
      title,
      status,
      location: [longitude, latitude] ,
    });

    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ message: 'Error creating place', error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const data = await placesModel.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching places', error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const data = await placesModel.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Place not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching place', error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const { name, description, title, latitude, longitude, status } = req.body;

    const updated = await placesModel.update({
      name,
      description,
      title,
      status,
      location: latitude && longitude ? [longitude, latitude] : [],
    }, {
      where: { id: req.params.id },
    });

    if (updated[0] === 0) return res.status(404).json({ message: 'Place not found or not updated' });

    res.json({ message: 'Place updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating place', error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const result = await placesModel.destroy({ where: { id: req.params.id } });
    if (result === 0) return res.status(404).json({ message: 'Place not found' });
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting place', error: err.message });
  }
};