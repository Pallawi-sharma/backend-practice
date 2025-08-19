const { placesModel } = require("../models");

// Create
exports.create = async (req, res) => {
  try {
    const { name, description, title, location, status } = req.body;
    if (
      !name ||
      !description ||
      !title ||
      !Array.isArray(location) ||
      location.length !== 2 ||
      typeof location[0] !== "number" ||
      typeof location[1] !== "number"
    ) {
      return res.status(400).json({
        message:
          "Invalid input. Please provide name, description, title, and a valid location array with two numeric coordinates.",
      });
    }
    const newPlace = await placesModel.create({
      name,
      description,
      title,
      status,
      location: [location[0], location[1]],
    });

    res.status(201).json(newPlace);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating place", error: err.message });
  }
};

// Read all
exports.findAll = async (req, res) => {
  try {
    const data = await placesModel.findAll();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching places", error: err.message });
  }
};

// Read one
exports.findOne = async (req, res) => {
  try {
    const data = await placesModel.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Place not found" });
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching place", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const { name, description, title, location, status, reviewercomment } =
      req.body;
    const { id } = req.params;
    // Validate ID
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid or missing place ID." });
    }

    // Prepare the update data only from defined fields
    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (reviewercomment !== undefined)
      updateData.reviewercomment = reviewercomment.trim();
    if (status !== undefined) updateData.status = status;

    if (location !== undefined) {
      if (
        !Array.isArray(location) ||
        location.length !== 2 ||
        typeof location[0] !== "number" ||
        typeof location[1] !== "number"
      ) {
        return res.status(400).json({
          message: "Location must be an array of two numbers [lat, lng].",
        });
      }
      updateData.location = [location[0], location[1]];
    }

    // If no valid fields were provided, return early
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid data provided for update." });
    }

    // Perform the update
    const [updated] = await placesModel.update(updateData, {
      where: { id },
    });

    if (updated === 0) {
      return res
        .status(404)
        .json({ message: "Place not found or no changes applied." });
    }

    res.json({ message: "Place updated successfully." });
  } catch (err) {
    console.error("Update error:", err);
    res
      .status(500)
      .json({ message: "Error updating place", error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const result = await placesModel.destroy({ where: { id: req.params.id } });
    if (result === 0)
      return res.status(404).json({ message: "Place not found" });
    res.json({ message: "Place deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting place", error: err.message });
  }
};
