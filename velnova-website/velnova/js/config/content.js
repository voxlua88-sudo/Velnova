/* ==========================================================
   VELNOVA – CONTENT
   Edit text, products, steps and industries here.
   Text in [square brackets] is a placeholder for real facts.
   ========================================================== */
window.CONTENT = {
  contact: {
    email: 'velnovahq@gmail.com',
    whatsappNumber: '601126190874' // Temporary business number; replace before launch.
  },

  company: {
    title: 'Everyday cleaning, powered by chemistry.',
    lead: 'VELNOVA makes practical hygiene and cleaning solutions for homes and businesses, including hand soap, detergent, dishwash and other chemical formulations.',
    about: [
      'VELNOVA develops effective cleaning products that make daily hygiene simple. Our range covers hand care, laundry care, kitchen cleaning and dependable everyday chemical solutions.',
      'Each formula is designed around real use — clean hands, fresh laundry, sparkling dishes and safe, consistent performance at home or in commercial spaces.'
    ],
    facts: [
      ['Founded', '2026'],
      ['Focus', 'Hand soap, detergent, dishwash and hygiene chemicals'],
    ]
  },

  aboutPage: {
    title: 'The people behind everyday care.',
    lead: 'VELNOVA is built around the products people reach for every day — with a focus on thoughtful essentials and clear choices.',
    founders: 'SMS Team',
    storyTitle: 'A thoughtful approach to everyday essentials.',
    story: [
      'Founded by SMS Team, VELNOVA brings everyday hygiene and cleaning essentials together under one brand.',
      'We believe the products people rely on every day should be easy to understand and dependable in use. That point of view shapes how we present our range and the experience we want to offer.'
    ],
    principles: [
      { t: 'Made for real routines', d: 'We focus on the everyday tasks that matter at home and in the places people work.' },
      { t: 'Clarity comes first', d: 'Straightforward product information helps people find and understand the right essentials.' },
      { t: 'Care in the details', d: 'From the product range to the way it is presented, the small details are part of the experience.' }
    ]
  },

  pillars: [
    { t: 'Effective formulations', d: 'Practical cleaning formulas developed for hands, laundry, dishes and everyday surfaces.' },
    { t: 'Consistent quality', d: 'Reliable performance, clear product information and careful attention to every batch.' },
    { t: 'Everyday reliability', d: 'Dependable supply and responsive support for households, retailers and commercial customers.' }
  ],

  products: [
    {
      name: 'Hand Soap', slug: 'hand-soap', category: 'Hand care', accent: '#57c3a5',
      desc: 'A refreshing wash for hands, made for frequent daily use.',
      items: [
        { id: 'normal-hand-soap', name: 'VELNOVA Normal Hand Soap', desc: 'A balanced everyday formula that removes dirt and leaves hands feeling fresh.', price: 30, accent: '#57c3a5', scent: 'Clean Aloe' },
        { id: 'premium-hand-soap', name: 'VELNOVA Premium Hand Soap', desc: 'A luxurious conditioning wash with a rich, creamy lather and lasting softness.', price: 30, accent: '#d5b57c', scent: 'Silk Citrus' }
      ]
    },
    {
      name: 'Multi-Purpose', slug: 'multi-purpose', category: 'Surface care', accent: '#3b82a0',
      desc: 'One adaptable cleaner for the washable surfaces in your home or workspace.',
      items: [
        { id: 'multi-purpose-cleaner', name: 'VELNOVA Multi-Purpose Cleaner', desc: 'Cuts through everyday grime on most washable surfaces for a streak-free finish.', price: 30, accent: '#3b82a0', scent: 'Fresh Mint' }
      ]
    },
    {
      name: 'Detergent', slug: 'detergent', category: 'Fabric care', accent: '#6b74c9',
      desc: 'Everyday laundry cleaning that leaves fabrics fresh and rinses away with ease.',
      items: [
        { id: 'laundry-detergent', name: 'VELNOVA Laundry Detergent', desc: 'An effective laundry formula designed to lift stains and protect everyday fabrics.', price: 30, accent: '#6b74c9', scent: 'Ocean Breeze' }
      ]
    },
    {
      name: 'Dishwash', slug: 'dishwash', category: 'Dish care', accent: '#df9b55',
      desc: 'A kitchen essential that tackles greasy dishes and leaves them shining.',
      items: [
        { id: 'dishwash-liquid', name: 'VELNOVA Dishwash Liquid', desc: 'Concentrated dishwashing liquid that removes grease while keeping a soft hand feel.', price: 30, accent: '#df9b55', scent: 'Lemon Zest' }
      ]
    }
  ],

  steps: [
    { t: '1. Understand', d: 'Tell us how the products will be used and what your operation needs.' },
    { t: '2. Recommend', d: 'We help identify a suitable product and format for your requirements.' },
    { t: '3. Prepare', d: 'We share the relevant product and safety information available for your selection.' },
    { t: '4. Supply', d: 'We coordinate your order and remain available when it arrives.' }
  ],

  industries: [
    { t: 'Homes', d: 'Practical essentials for handwashing, laundry, dishes and routine cleaning.' },
    { t: 'Shops and wholesalers', d: 'Everyday cleaning ranges for retail shelves and distribution.' },
    { t: 'Guest accommodation', d: 'Hand and cleaning products for hotel rooms and shared guest spaces.' },
    { t: 'Workplaces', d: 'Useful hygiene supplies for shared kitchens, washrooms and offices.' },
    { t: 'Commercial sites', d: 'Cleaning products for the day-to-day needs of business facilities.' },
    { t: 'Professional kitchens', d: 'Dish and surface care for kitchens with busy service routines.' }
  ]
};
