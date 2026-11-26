import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import autenticar from '../middlewares/autenticar.js';

const router = Router();

router.post('/cadastro', authController.cadastrar);
router.post('/login', authController.login);
router.get('/perfil', autenticar, authController.perfil);

export default router;
