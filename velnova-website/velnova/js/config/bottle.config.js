/* ==========================================================
   VELNOVA – BOTTLE CONFIGURATION
   Change the container here. No other file needs touching.
   ========================================================== */
window.BOTTLE = {
  // Use your own 3D model: put a .glb in /assets and set the path, e.g. 'assets/bottle.glb'.
  // Name the liquid mesh "Liquid" inside the GLB so the colour changer can find it.
  // Needs a local server (see README). Leave null to use the built-in jerrycan.
  modelUrl: null,
  modelHeight: 3.2,          // height of your GLB in scene units

  defaultVariant: 2,         // index into "variants" below (0 = first)

  // Outer plastic body (built-in jerrycan only)
  body: { width: 2.2, height: 2.5, depth: 0.9, radius: 0.3, color: '#f2f6f5', opacity: 0.34 },

  // Liquid inside. Keep it smaller than the body. Taller = fuller container.
  liquid: { width: 1.9, height: 1.6, depth: 0.62 },

  capColor: '#0a7b5c',
  handleColor: '#e9f1ef',

  // Text printed on the label
  label: { title: 'VELNOVA', subtitle: 'INDUSTRIAL CHEMICAL SOLUTION', tag: 'SAMPLE PRODUCT' },

  // Liquid colours. c = surface colour, c2 = deep colour, a = opacity (lower = clearer)
  variants: [
    { n: 'Sapphire',   d: 'Yellow chemical', c: '#f2c230', c2: '#a87000', a: 0.9  },
    { n: 'Ocean Blue', d: 'Blue chemical',   c: '#2b86e8', c2: '#0a3a8a', a: 0.92 },
    { n: 'Emerald',    d: 'Green chemical',  c: '#18c08f', c2: '#05583f', a: 0.92 },
    { n: 'Crystal',    d: 'Clear chemical',  c: '#dff4f8', c2: '#8fc3d1', a: 0.5  }
  ]
};
