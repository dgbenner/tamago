// Regional twins (Dan, 2026-11-15): Spanish is Mexican-standard and the Spain word is accepted wherever the Mexican
// one is taught. One list for the app and the scripts: Type the Word accepts the Spain form (coche for carro), as the
// sentences already do through their accepted answers, and scripts/a1-coverage.mjs counts the Mexican word for its
// Spain headword in the PCIC list. Each row: [the course's form, the Spain form, the PCIC headword when it differs].
export const REGIONAL = {
  es: [
    ['carro', 'coche'], ['lentes', 'gafas'], ['departamento', 'apartamento'], ['mesero', 'camarero'], ['bolsa', 'bolso'],
    ['manejar', 'conducir'], ['maneja', 'conduce', 'conducir'], ['rentar', 'alquilar'], ['renta', 'alquiler', 'alquilar'],
    ['credencial', 'carné'], ['licencia', 'carné'], ['timbre', 'sello'], ['recámara', 'dormitorio'], ['clóset', 'armario'],
    ['librero', 'estantería'], ['borrador', 'goma'], ['pizarrón', 'pizarra'], ['tarea', 'deberes'], ['básquetbol', 'baloncesto'],
    ['café', 'marrón'], ['cafés', 'marrones', 'marrón'], ['derecho', 'recto'], ['guion', 'guión'], ['video', 'vídeo'],
    ['piso', 'planta'], ['sala', 'salón'],
  ],
}
// The Spain forms accepted for a course form ([] when none).
export const twinsOf = (lang, form) => (REGIONAL[lang] ?? []).filter(([m]) => m === form).map(([, spain]) => spain)
