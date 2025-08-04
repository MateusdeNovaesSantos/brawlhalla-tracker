import { Router } from 'express';
import { ColorController } from '../controllers/color.controller';

const router = Router();

router.get('/colors', ColorController.getAll);
router.get('/legends/:legendId/colors', ColorController.getByLegendId);

router.put('/colors/ownership', ColorController.updateOwnership);
router.put('/colors/ownership/universal', ColorController.updateUniversalOwnership);

export { router as colorRouter };