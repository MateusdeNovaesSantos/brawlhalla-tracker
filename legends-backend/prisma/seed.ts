import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const legendsData = [
    { name: 'Bödvar', weapons: ['Hammer', 'Sword'] },
    { name: 'Cassidy', weapons: ['Blasters', 'Hammer'] },
    { name: 'Orion', weapons: ['Rocket Lance', 'Spear'] },
    { name: 'Lord Vraxx', weapons: ['Rocket Lance', 'Blasters'] },
    { name: 'Gnash', weapons: ['Hammer', 'Spear'] },
    { name: 'Queen Nai', weapons: ['Spear', 'Katars'] },
    { name: 'Hattori', weapons: ['Sword', 'Spear'] },
    { name: 'Sir Roland', weapons: ['Rocket Lance', 'Sword'] },
    { name: 'Scarlet', weapons: ['Hammer', 'Rocket Lance'] },
    { name: 'Thatch', weapons: ['Sword', 'Blasters'] },
    { name: 'Ada', weapons: ['Blasters', 'Spear'] },
    { name: 'Sentinel', weapons: ['Hammer', 'Katars'] },
    { name: 'Lucien', weapons: ['Katars', 'Blasters'] },
    { name: 'Teros', weapons: ['Axe', 'Hammer'] },
    { name: 'Brynn', weapons: ['Axe', 'Spear'] },
    { name: 'Asuri', weapons: ['Katars', 'Sword'] },
    { name: 'Barraza', weapons: ['Axe', 'Blasters'] },
    { name: 'Ember', weapons: ['Bow', 'Katars'] },
    { name: 'Azoth', weapons: ['Bow', 'Axe'] },
    { name: 'Koji', weapons: ['Bow', 'Sword'] },
    { name: 'Ulgrim', weapons: ['Axe', 'Rocket Lance'] },
    { name: 'Diana', weapons: ['Bow', 'Blasters'] },
    { name: 'Jhala', weapons: ['Axe', 'Sword'] },
    { name: 'Kor', weapons: ['Gauntlets', 'Hammer'] },
    { name: 'Wu Shang', weapons: ['Gauntlets', 'Spear'] },
    { name: 'Val', weapons: ['Gauntlets', 'Sword'] },
    { name: 'Ragnir', weapons: ['Katars', 'Axe'] },
    { name: 'Cross', weapons: ['Blasters', 'Gauntlets'] },
    { name: 'Mirage', weapons: ['Scythe', 'Spear'] },
    { name: 'Nix', weapons: ['Scythe', 'Blasters'] },
    { name: 'Mordex', weapons: ['Scythe', 'Gauntlets'] },
    { name: 'Yumiko', weapons: ['Bow', 'Hammer'] },
    { name: 'Artemis', weapons: ['Rocket Lance', 'Scythe'] },
    { name: 'Caspian', weapons: ['Gauntlets', 'Katars'] },
    { name: 'Sidra', weapons: ['Cannon', 'Sword'] },
    { name: 'Xull', weapons: ['Cannon', 'Axe'] },
    { name: 'Kaya', weapons: ['Spear', 'Bow'] },
    { name: 'Isaiah', weapons: ['Cannon', 'Blasters'] },
    { name: 'Jiro', weapons: ['Sword', 'Scythe'] },
    { name: 'Lin Fei', weapons: ['Katars', 'Cannon'] },
    { name: 'Zariel', weapons: ['Gauntlets', 'Bow'] },
    { name: 'Rayman', weapons: ['Gauntlets', 'Axe'] },
    { name: 'Dusk', weapons: ['Spear', 'Orb'] },
    { name: 'Fait', weapons: ['Scythe', 'Orb'] },
    { name: 'Thor', weapons: ['Hammer', 'Orb'] },
    { name: 'Petra', weapons: ['Gauntlets', 'Orb'] },
    { name: 'Vector', weapons: ['Rocket Lance', 'Bow'] },
    { name: 'Volkov', weapons: ['Axe', 'Scythe'] },
    { name: 'Onyx', weapons: ['Gauntlets', 'Cannon'] },
    { name: 'Jaeyun', weapons: ['Sword', 'Greatsword'] },
    { name: 'Mako', weapons: ['Katars', 'Greatsword'] },
    { name: 'Magyar', weapons: ['Hammer', 'Greatsword'] },
    { name: 'Reno', weapons: ['Blasters', 'Orb'] },
    { name: 'Munin', weapons: ['Bow', 'Scythe'] },
    { name: 'Arcadia', weapons: ['Spear', 'Greatsword'] },
    { name: 'Ezio', weapons: ['Sword', 'Orb'] },
    { name: 'Tezca', weapons: ['Battle Boots', 'Gauntlets'] },
    { name: 'Thea', weapons: ['Battle Boots', 'Rocket Lance'] },
    { name: 'Red Raptor', weapons: ['Battle Boots', 'Orb'] },
    { name: 'Loki', weapons: ['Katars', 'Scythe'] },
    { name: 'Seven', weapons: ['Spear', 'Cannon'] },
    { name: 'Vivi', weapons: ['Battle Boots', 'Blasters'] },
    { name: 'Imugi', weapons: ['Axe', 'Greatsword'] },
    { name: 'King Zuva', weapons: ['Hammer', 'Battle Boots'] },
    { name: 'Priya', weapons: ['Chakram', 'Sword'] },
    { name: 'Ransom', weapons: ['Chakram', 'Bow'] },
]

const colorsData = [
    // Event Colors
    { name: 'Winter Holidays', category: 'Event Colors' },
    { name: 'Lovestruck', category: 'Event Colors' },
    { name: 'Lucky Clover', category: 'Event Colors' },
    { name: 'Heatwave', category: 'Event Colors' },
    { name: 'Haunting', category: 'Event Colors' },
    { name: 'Home Team', category: 'Event Colors' },
    { name: 'Gala', category: 'Event Colors' },
    { name: 'Verdant Bloom', category: 'Event Colors' },
    { name: 'Charged OG', category: 'Event Colors' },
    { name: 'Raven\'s Honor', category: 'Event Colors' },
    { name: 'Bifrost', category: 'Event Colors' },
    { name: 'Art Deco', category: 'Event Colors' },
    { name: 'Pool Party', category: 'Event Colors' },
    
    // Battle Pass Colors
    { name: 'Soul Fire', category: 'Battle Pass Colors'},
    { name: 'Synthwave', category: 'Battle Pass Colors'},
    { name: 'Frozen Forest', category: 'Battle Pass Colors'},
    { name: 'Coat of Lions', category: 'Battle Pass Colors'},
    { name: 'Starlight', category: 'Battle Pass Colors'},
    { name: 'Willow Leaves', category: 'Battle Pass Colors'},
    { name: 'Pact of Poison', category: 'Battle Pass Colors'},
    { name: 'Darkheart', category: 'Battle Pass Colors'},
    { name: 'Armageddon', category: 'Battle Pass Colors'},
    { name: 'Kira-kira', category: 'Battle Pass Colors'},
    { name: 'Ancient Curse', category: 'Battle Pass Colors'},

    // Other Colors
    { name: 'White', category: 'Other Colors'},
    { name: 'Black', category: 'Other Colors'},
    { name: 'Skyforged', category: 'Other Colors'},
    { name: 'Goldforged', category: 'Other Colors'},
    { name: 'Community Colors', category: 'Other Colors'},
    { name: 'Community Colors v.2', category: 'Other Colors'},
    { name: 'Esports', category: 'Other Colors'},
    { name: 'Esports v.2', category: 'Other Colors'},
    { name: 'Esports v.3', category: 'Other Colors'},
    { name: 'Esports v.4', category: 'Other Colors'},
    { name: 'Esports v.5', category: 'Other Colors'},
    { name: 'Esports v.6', category: 'Other Colors'},
]

async function main() {
    console.log('Start seeding ...');


    // LIMPEZA COMPLETA
    console.log('Cleaning database...');
    await prisma.game.deleteMany();
    await prisma.legendColorOwnership.deleteMany();
    // Desconectar a relação M-M entre Legend e Arma
    const legendsToDisconnect = await prisma.legend.findMany({ select: { id: true } });
    for (const legend of legendsToDisconnect) {
        await prisma.legend.update({
            where: { id: legend.id },
            data: { weapons: { set: [] } },
        });
    }
    // limpar as tabelas principais
    await prisma.color.deleteMany();
    await prisma.weapon.deleteMany();
    await prisma.legend.deleteMany();
    console.log('Database cleaned.');


    // CRIAR ARMAS (sem duplicatas)
    const weaponNames = new Set(legendsData.flatMap(l => l.weapons));
    const weaponData = Array.from(weaponNames).map(name => ({ name }));
    await prisma.weapon.createMany({ data: weaponData });
    console.log(`${weaponData.length} weapons created.`);
    

    // CRIAR LEGEND E CONECTAR A WEAPONS
    const allWeapons = await prisma.weapon.findMany();
    const weaponMap = new Map(allWeapons.map(w => [w.name, w.id]));

    for (const legend of legendsData) {
        await prisma.legend.create({
            data: {
                name: legend.name,
                weapons: {
                    connect: legend.weapons.map(w => ({ id: weaponMap.get(w) })),
                },
            },
        });
    }

    console.log(`${legendsData.length} legends created and linked to weapons.`);


    // CRIAR CORES
    await prisma.color.createMany({ data: colorsData });
    console.log(`${colorsData.length} colors crated.`);


    // CRIAR RELAÇÕES DE CORES PARA TODOS OS LEGENDS
    const allLegends = await prisma.legend.findMany();
    const allColors = await prisma.color.findMany();
    const ownershipData = [];
    for (const legend of allLegends) {
        for (const color of allColors) {
            ownershipData.push({
                legendId: legend.id,
                colorId: color.id,
                hasColor: false,
            });
        }
    }
    await prisma.legendColorOwnership.createMany({ data: ownershipData });
    console.log(`${ownershipData.length} color ownership records created.`)


    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })