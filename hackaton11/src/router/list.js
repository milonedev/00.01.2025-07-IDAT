import express from 'express';
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from '../controllers/list.controller.js';
import { completeTask } from '../controllers/list.controller.js';

const router = express.Router();

router.get('/', getLists);
router.post('/', createList);
router.get('/:id', getListById);
router.put('/', updateList);
router.delete('/', deleteList);
router.post('/completeTask', completeTask);

export default router;
