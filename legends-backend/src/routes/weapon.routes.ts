import { Router } from 'express';
import { WeaponController } from '../controllers/weapon.controller';

const router = Router();

router.get('/weapons', WeaponController.getAll);

export { router as weaponRouter };