import { Router } from 'express';
import * as turmaController from '../controllers/turmaController.js';
import autenticar from '../middlewares/autenticar.js';

const router = Router();

router.get('/', autenticar, turmaController.listar);
router.post('/', autenticar, turmaController.criar);
router.get('/:id/frequencia', turmaController.listarFrequencias);
router.post('/:id/frequencia', autenticar, turmaController.criarFrequencia);
router.get('/:id', autenticar, turmaController.detalhar);
router.put('/:id', autenticar, turmaController.atualizar);
router.delete('/:id', autenticar, turmaController.remover);

export default router;
