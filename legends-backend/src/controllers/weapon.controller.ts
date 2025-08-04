import { Request, Response } from 'express';
import { WeaponService } from '../services/weapon.service';

export const WeaponController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const weapons = await WeaponService.getAll();
            res.status(200).json(weapons);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch armas" });
        }
    },
};