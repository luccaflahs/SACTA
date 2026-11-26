import { Router } from 'express';
import * as frequenciaController from '../controllers/frequenciaController.js';
import autenticar from '../middlewares/autenticar.js';

const router = Router();

router.post('/', autenticar, frequenciaController.criar);
router.get('/', autenticar, frequenciaController.listar);
router.get('/:id', autenticar, frequenciaController.detalhar);
router.put('/:id', autenticar, frequenciaController.atualizar);
router.delete('/:id', autenticar, frequenciaController.remover);

export default router;
