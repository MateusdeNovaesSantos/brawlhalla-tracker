import { prisma } from '../lib/prisma'

export const WeaponService = {
    getAll: async () => {
        return prisma.weapon.findMany({
            orderBy: {
                name:'asc',
            },
        });
    },
};