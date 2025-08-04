import { Request, Response } from 'express';
import { ColorService } from '../services/color.service';

export const ColorController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const colors = await ColorService.getAll();
            res.status(200).json(colors);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch colors" });
        }
    },

    // Lida com a requisição para buscar cores de um legend
    getByLegendId: async (req: Request, res: Response) => {
        try {
            const legendId = parseInt(req.params.legendId, 10);

            if (isNaN(legendId)) {
                return res.status(400).json({ error: "Invalid legend ID" });
            }

            const legendColors = await ColorService.getByLegendId(legendId);
            res.status(200).json(legendColors);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch legend colors" });
        }
    },

    // Requisição de update
    updateOwnership: async (req: Request, res: Response) => {
        try {
            const { legendId, colorId, hasColor } = req.body;

            if (typeof legendId !== 'number' || typeof colorId !== 'number' || typeof hasColor !== 'boolean') {
                return res.status(400).json({ error: 'Parâmetros inválidos.' });
            }

            const updatedOwnership = await ColorService.updateOwnership(legendId, colorId, hasColor);
            res.status(200).json(updatedOwnership);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Falha ao atualizar a cor.' });
        }
    },

    updateUniversalOwnership: async (req: Request, res: Response) => {
        try {
            const { colorId, hasColor } = req.body;

            if (typeof colorId !== 'number' || typeof hasColor !== 'boolean') {
                return res.status(400).json({ error: 'Parâmetros inválidos.' });
            }

            const result = await ColorService.updateUniversalOwnership(colorId, hasColor);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Falha ao atualizar a cor universalmente.' })
        }
    },
};