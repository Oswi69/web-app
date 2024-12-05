const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
};

exports.addItem = async (req, res) => {
  const { name, description } = req.body;
  const newItem = await Item.create({ name, description });
  res.json(newItem);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await Item.update({ name, description }, { where: { id } });
  res.json({ message: "Item updated successfully." });
};

exports.patchItem = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  await Item.update(updateData, { where: { id } });
  res.json({ message: "Item patched successfully." });
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.destroy({ where: { id } });
  res.json({ message: "Item deleted successfully." });
};
