
import { EncyclopediaEntry } from './types';

export const encyclopediaData: Record<string, EncyclopediaEntry> = {
  "Cardiólogo": {
    title: "Cardiólogo",
    summary: "Son médicos especiales que se encargan de cuidar tu corazón y los conductos (venas y arterias) que transportan la sangre por todo tu cuerpo.",
    whatTheyDo: [
      "Revisan tus latidos: Se aseguran de que tu corazón lata a la velocidad adecuada.",
      "Solucionan problemas cardíacos: Ayudan a personas cuyo corazón es débil o tiene dificultades para bombear sangre.",
      "Te mantienen sano: Te aconsejan sobre cómo mantener tu corazón fuerte, como comer alimentos saludables y hacer ejercicio."
    ],
    howTheyCheck: [
      "Escuchando: Utilizan un estetoscopio para oír cómo tu corazón hace 'lub-dub'.",
      "Imágenes: Usan máquinas especiales para tomar fotos o videos de tu corazón mientras trabaja.",
      "Pruebas: Pueden observar tu corazón mientras corres en una cinta para ver cómo maneja el esfuerzo intenso."
    ],
    whenToSee: [
      "Dolor en el pecho.",
      "Sensación de mareo intenso.",
      "Falta de aire con mucha facilidad mientras juegas o haces ejercicio."
    ]
  },
  "Pediatra": {
    title: "Pediatra",
    summary: "Es el médico especialista que cuida la salud de los bebés, niños y adolescentes hasta que crecen.",
    whatTheyDo: [
      "Monitorean el crecimiento: Se aseguran de que crezcas alto y fuerte.",
      "Previenen enfermedades: Administran vacunas para protegerte de gérmenes.",
      "Curan malestares: Tratan desde un resfriado hasta dolores de barriga."
    ],
    howTheyCheck: [
      "Midiendo y pesando: Llevan un registro de tu desarrollo físico.",
      "Revisión de oídos y garganta: Usan luces pequeñitas para ver que todo esté bien.",
      "Plática con los papás: Resuelven dudas sobre alimentación y sueño."
    ],
    whenToSee: [
      "Revisiones de rutina anuales.",
      "Fiebre persistente o sarpullidos.",
      "Dudas sobre el desarrollo o comportamiento infantil."
    ]
  },
  "Dermatólogo": {
    title: "Dermatólogo",
    summary: "Son los expertos en cuidar el órgano más grande de tu cuerpo: ¡tu piel! También cuidan tu cabello y tus uñas.",
    whatTheyDo: [
      "Tratan el acné: Ayudan a limpiar los granitos de la cara.",
      "Revisan lunares: Se aseguran de que las manchitas de tu piel sean seguras.",
      "Curan alérgenos: Ayudan cuando algo te causa picazón o enrojecimiento."
    ],
    howTheyCheck: [
      "Observación detallada: Usan lupas especiales con luz para ver de cerca tu piel.",
      "Biopsias: A veces toman una muestra mínima para analizarla en el laboratorio.",
      "Pruebas de parche: Para descubrir a qué eres alérgico."
    ],
    whenToSee: [
      "Si un lunar cambia de forma o color.",
      "Si tienes la piel muy seca o con manchas extrañas.",
      "Caída excesiva de cabello."
    ]
  }
};
