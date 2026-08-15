export const inventoryCategories = [
  'Telescopes',
  'Mounts',
  'Eyepieces',
  'Cameras',
  'Filters'
];

export const inventorySections = [
  {
    category: 'Telescopes',
    filter: 'Telescopes',
    items: [
      { company: 'GSO', model: '8" f/4 Newtonian', quantity: 2 },
      { company: 'SVBony', model: '80mm f/7 Refractor' },
      { model: '12" Dobsonian' },
      { model: '4" Newtonian', quantity: 4 }
    ]
  },
  {
    category: 'Mounts',
    filter: 'Mounts',
    items: [
      { company: 'Bresser', model: 'EQ Mount' },
      { company: 'Explore Scientific', model: 'PMC8 GoTo Mount' }
    ]
  },
  {
    category: 'Eyepieces',
    filter: 'Eyepieces',
    items: [
      { model: '4mm - 25mm Eyepiece Range' },
      { model: 'Variable Zoom Eyepiece' }
    ]
  },
  {
    category: 'Cameras & Gear',
    filter: 'Cameras',
    items: [
      { company: 'ZWO', model: 'ASI183mm', tag: 'Main AP Camera' },
      { company: 'ZWO', model: 'ASI120mm', tag: 'Guider Camera' },
      { company: 'ZWO', model: 'Electronic Filter Wheel' }
    ]
  },
  {
    category: 'Filters',
    filter: 'Filters',
    items: [
      { model: 'RGB Filters' },
      { model: 'S(III), H-alpha, O(III) Narrowband 7nm Filters' },
      { model: 'UHC Filter' },
      { model: 'Solar Filter' }
    ]
  }
];