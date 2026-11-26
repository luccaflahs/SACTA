import { Router } from 'express';
import * as livroController from '../controllers/livroController.js';
import autenticar from '../middlewares/autenticar.js';

const router = Router();

router.post('/', autenticar, livroController.cadastrar);
router.get('/:id', livroController.detalhar);

export default router;
