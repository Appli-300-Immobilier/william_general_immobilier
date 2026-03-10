// Catalogue de 100 biens pour William General Immobilier
// Images générées dynamiquement par mots-clés pour assurer pertinence et unicité

const SECTOR_KEYWORDS = {
  'Nos Services': 'maison,moderne,appartement,villa,de,luxe,immobilier,résidentiel',
  'Opportunités': 'maison,moderne,appartement'
};

const sectorKeys = Object.keys(SECTOR_KEYWORDS);

const generateProducts = () => {
  const products = [];
  const sectors = ["Vente de Terrains", "Location d'Appartements", "Villas de Luxe", "Gestion Immobilière", "Conseil en Investissement", "Architecture & Design", "Rénovation & BTP", "Expertise Foncière", "Promotion Immobilière", "Locations de Vacances"];
  const locations = ["Douala (Akwa)","Yaoundé (Bastos)","Kribi","Douala (Bonapriso)","Yaoundé (Golf)","Douala (Logpom)","Edea","Limbe","Bafoussam","Dschang"];
  for (let i = 1; i <= 100; i++) {
    const sector = sectors[i % sectors.length];
    const productName = `${sector} ${i}`;
    const location = locations[i % locations.length];
    products.push({
      id: `prod-${i}`,
      name: productName,
      description: `Cette opportunité ${productName} dans le secteur ${sector} à ${location} représente un investissement stratégique.`,
      price: 5000000 + (Math.floor(Math.random() * 100) * 1000000),
      category: sector,
      imageUrl: `https://loremflickr.com/1200/1200/luxury,home,architecture?lock=${i}`,
      stock: 1,
      featured: i % 8 === 0,
      location: location,
      beds: i % 2 === 0 ? 3 : 4,
      baths: i % 2 === 0 ? 2 : 3,
      sqft: 150 + Math.floor(Math.random() * 350)
    });
  }
  return products;
};

export const MOCK_PRODUCTS = generateProducts();
export const CATEGORIES = ["Vente de Terrains", "Location d'Appartements", "Villas de Luxe", "Gestion Immobilière", "Conseil en Investissement", "Architecture & Design", "Rénovation & BTP", "Expertise Foncière", "Promotion Immobilière", "Locations de Vacances"];

export const MOCK_DELIVERERS = [
  { id: 'dev-1', name: 'Abdoulaye', phone: '+237 670 00 00 01', zone: 'Douala (Akwa/Deido)' },
  { id: 'dev-2', name: 'Samuel', phone: '+237 690 00 00 02', zone: 'Yaoundé (Bastos/Mvan)' },
  { id: 'dev-3', name: 'Christian', phone: '+237 650 00 00 03', zone: 'Douala (Bonapriso/Logbessou)' }
];

export const MOCK_USERS_LIST = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'user', status: 'Actif', joinDate: '12/01/2026' },
  { id: 'u2', name: 'Marie Sissoko', email: 'marie.s@email.com', role: 'user', status: 'Actif', joinDate: '15/01/2026' },
  { id: 'u3', name: 'Aubry Admin', email: 'admin@example.cm', role: 'admin', status: 'Actif', joinDate: '01/01/2026' }
];

export const MOCK_ORDERS = [
  { id: 'ORD-2026-001', customer: 'Jean Dupont', date: '2026-02-04', total: 450000, status: 'En préparation', items: [{ name: 'Terrain Résidentiel 1', quantity: 1, price: 450000 }] }
];
