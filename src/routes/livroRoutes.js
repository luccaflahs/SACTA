import { Router } from 'express';
import * as livroController from '../controllers/livroController.js';

const router = Router();

router.post('/', livroController.cadastrar);
router.get('/:id', livroController.detalhar);

export default router;
