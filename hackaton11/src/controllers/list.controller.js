import { Item } from '../models/Item.js';

export const getLists = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createList = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const newItem = new Item({ name, description });
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;

    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.deleteOne();
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.isCompleted = true;
    item.dateCompleted = new Date();

    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
