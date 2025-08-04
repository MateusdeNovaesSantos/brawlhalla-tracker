import { Router } from 'express';
import { LegendController } from '../controllers/legend.controller';

const router = Router();

router.get('/legends', LegendController.getAll);

export { router as legendRouter };