import { Router } from 'express';
import { legendRouter } from './legend.routes';
import { weaponRouter } from './weapon.routes';
import { colorRouter } from './color.routes';
import { gameRouter } from './game.routes';

const router = Router();

router.use(legendRouter);
router.use(weaponRouter);
router.use(colorRouter);
router.use(gameRouter);

export { router };