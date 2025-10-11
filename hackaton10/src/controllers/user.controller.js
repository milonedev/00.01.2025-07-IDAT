import User from '../models/user.model.js';
import { Op } from 'sequelize';

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const q = (req.query.q || '').trim();
    const role = req.query.role;

    const where = {};
    if (role) where.role = role;
    if (q) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${q}%` } },
        { lastName: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      attributes: { exclude: ['passwordHash'] },
    });

    return res.status(200).json({ total: count, page, pageSize, data: rows });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, passwordHash, role, email } = req.body;

    const user = await User.create({ firstName, lastName, email, passwordHash, role });

    return res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getUserById = (req, res) => {
  try {
    const { id } = req.params;

    const user = User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, passwordHash, role, email } = req.body;

    const user = User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.passwordHash = passwordHash || user.passwordHash;
    user.role = role || user.role;
    user.email = email || user.email;

    await user.save();

    return res.status(200).send({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await user.destroy();

    return res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
