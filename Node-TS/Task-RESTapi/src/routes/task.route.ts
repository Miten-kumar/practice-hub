import { Router } from 'express';
import { createTask, deleteTask, getTask, updateTask} from '../controllers/task.controller';
 
const router = Router();
 
router.post('/', createTask);
router.get('/:taskId', getTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);
 
export default router;