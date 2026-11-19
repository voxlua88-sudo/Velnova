/* ==========================================================
   VELNOVA – CONTENT
   Edit text, products, steps and industries here.
   Text in [square brackets] is a placeholder for real facts.
   "variants" in each product are indexes into BOTTLE.variants.
   ========================================================== */
window.CONTENT = {
  contact: { email: 'sales@velnova.example' },   // quote buttons open an email to this address

  company: {
    title: 'A chemical company built on precision.',
    lead: 'VELNOVA develops and supplies chemical solutions for industry, with a focus on consistency, clear information and dependable service.',
    about: [
      'VELNOVA exists to make chemistry simpler to specify, order and trust. We combine careful formulation with clear product information, so customers know what they are buying and how to use it.',
      'Every product is presented with its variants, applications and packaging in one place, supported by technical and safety documentation where it is available.',
      'Replace this text with VELNOVA’s real story: who you are, what you make and why customers choose you.'
    ],
    facts: [
      ['Headquarters', '[City, country]'],
      ['Founded', '[Year]'],
      ['Focus', 'Industrial and commercial chemical solutions'],
      ['Customers', '[Describe your customers]'],
      ['Certifications', '[Add verified certifications only]']
    ]
  },

  pillars: [
    { t: 'Scientific innovation', d: 'A research-led approach to formulation, always working toward better performance and safer handling.' },
    { t: 'Quality and precision', d: 'Consistent products, clearly labelled and documented. Add your verified quality processes here.' },
    { t: 'Commitment to excellence', d: 'Responsive support from first enquiry to delivery, built around what each customer needs.' }
  ],

  products: [
    { name: 'Industrial Cleaner Concentrate', category: 'Cleaning and sanitation', variants: [1, 3],
      desc: 'A concentrated cleaning solution for routine facility and equipment cleaning.',
      apps: ['Facility cleaning', 'Equipment maintenance', 'Workshop floors'], packaging: 'To be confirmed', docs: 'Technical data sheet: coming soon' },
    { name: 'Water Treatment Solution', category: 'Water treatment', variants: [1, 3],
      desc: 'A treatment chemical for industrial and commercial water systems.',
      apps: ['Cooling systems', 'Process water', 'Commercial plant rooms'], packaging: 'To be confirmed', docs: 'Technical data sheet: coming soon' },
    { name: 'Descaling Agent', category: 'Industrial manufacturing', variants: [0, 3],
      desc: 'A descaling product for removing mineral build-up from equipment.',
      apps: ['Boilers and heat exchangers', 'Production equipment'], packaging: 'To be confirmed', docs: 'Technical data sheet: coming soon' },
    { name: 'Agricultural Solution', category: 'Agriculture', variants: [2, 0],
      desc: 'A solution supporting agricultural and processing operations.',
      apps: ['Farm equipment', 'Processing sites'], packaging: 'To be confirmed', docs: 'Technical data sheet: coming soon' },
    { name: 'Laboratory Grade Solvent', category: 'Laboratory and research', variants: [3],
      desc: 'A clear solvent supplied for laboratory and research use.',
      apps: ['Sample preparation', 'Equipment cleaning', 'Research'], packaging: 'To be confirmed', docs: 'Technical data sheet: coming soon' },
    { name: 'Heavy-Duty Degreaser', category: 'Industrial manufacturing', variants: [0, 2],
      desc: 'A degreasing product for machinery, tools and workshop surfaces.',
      apps: ['Machinery', 'Tools', 'Workshop surfaces'], packaging: 'To be confirmed', docs: 'Technical data sheet: coming soon' }
  ],

  steps: [
    { t: '1. Consult', d: 'We learn about your application, volumes and requirements.' },
    { t: '2. Specify', d: 'We recommend the right product and variant for the job.' },
    { t: '3. Document', d: 'You receive technical and safety documentation where available.' },
    { t: '4. Deliver', d: 'Your order is packaged, shipped and supported after delivery.' }
  ],

  industries: [
    { t: 'Industrial manufacturing', d: 'Process chemistry for production lines.' },
    { t: 'Cleaning and sanitation', d: 'Solutions for facilities and hygiene.' },
    { t: 'Water treatment', d: 'Chemistry for municipal and industrial water.' },
    { t: 'Agriculture', d: 'Products supporting growers and processors.' },
    { t: 'Laboratory and research', d: 'Reagents and materials for scientific work.' },
    { t: 'Commercial applications', d: 'Everyday chemistry for businesses.' }
  ]
};
