import { Router } from 'express';
import { GameController } from '../controllers/game.controller';

const router = Router();

router.get('/games', GameController.getStats);

router.post('/games', GameController.create);

export { router as gameRouter}