import { prisma } from '../lib/prisma'

export const ColorService = {
    getAll: async () => {
        return prisma.color.findMany({
            orderBy: { name: 'asc' },
        });
    },
    
    // Busca as cores para um Legend específico
    getByLegendId: async (legendId: number) => {
        return prisma.legendColorOwnership.findMany({
            where: {
                legendId: legendId,
            },
            include: {
                color: true,
            },
        });
    },

    //Atualiza registros
    updateOwnership: async (legendId: number, colorId: number, hasColor: boolean) => {
        return prisma.legendColorOwnership.upsert({
            where: {
                legendId_colorId: {
                    legendId,
                    colorId,
                },
            },
            update: {
                hasColor,
            },
            create: {
                legendId,
                colorId,
                hasColor,
            },
        });
    },

    updateUniversalOwnership: async (colorId: number, hasColor: boolean) => {
        return prisma.legendColorOwnership.updateMany({
            where: {
                colorId: colorId,
            },
            data: {
                hasColor: hasColor,
            },
        });
    },
};