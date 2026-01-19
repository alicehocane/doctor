
import { Doctor, Lookups, ResolvedDoctor, ResolvedLocation } from './types';

export const lookups: Lookups = {
  specialties: ["Angiólogo", "Cardiólogo", "Alergólogo", "Pediatra", "Internista", "Inmunólogo", "Algólogo", "Anestesiólogo", "Cirujano general", "Cirujano vascular", "Cardiólogo pediátrico", "Homeópata", "Acupuntor", "Audiólogo", "Médico general", "Cirujano cardiovascular y torácico", "Especialista en Medicina Crítica y Terapia Intensiva", "Cirujano de la mano", "Ortopedista", "Cirujano plástico", "Anatomopatólogo", "Foniatra", "Especialista en Medicina del Trabajo", "Especialista en Obesidad y Delgadez", "Psicólogo", "Cirujano cardiovascular", "Cirujano torácico", "Patólogo clínico", "Dermatólogo", "Diabetólogo", "Ginecólogo", "Gastroenterólogo", "Gastroenterólogo pediátrico", "Endocrinólogo", "Endoscopista", "Geriatra", "Ginecólogo oncológico", "Cirujano bariatra", "Cirujano pediátrico", "Cirujano oncólogo", "Cirujano maxilofacial", "Dentista - Odontólogo", "Podólogo", "Fisioterapeuta", "Cirujano estético y cosmético", "Proctólogo", "Dermatólogo pediátrico", "Urólogo pediátrico", "Nefrólogo", "Otorrinolaringólogo", "Endocrinólogo pediátrico", "Médico de familia", "Enfermero", "Nutricionista", "Médico estético", "Especialista en Medicina Integrada", "Podiatra", "Urólogo", "Genetista", "Urgenciólogo", "Nutriólogo clínico", "Terapeuta complementario", "Neumólogo", "Hematólogo", "Oncólogo médico", "Especialista en Medicina del Deporte", "Neurocirujano", "Traumatólogo", "Ortopedista infantil", "Neurólogo pediatra", "Hematólogo pediatra", "Oftalmólogo", "Neonatólogo", "Neurólogo", "Infectólogo", "Reumatólogo", "Neumólogo pediatra", "Odontólogo pediatra", "Especialista en Rehabilitación y Medicina Física", "Especialista en Retina Médica y Quirúrgica", "Oftalmólogo pediátrico", "Psiquiatra", "Ortodoncista", "Nefrólogo pediatra", "Patólogo Bucal", "Radio Oncólogo", "Radioterapeuta", "Neurofisiólogo", "Técnico en diagnóstico e imagen", "Oncólogo pediátrico", "Infectólogo pediatra", "Logopeda", "Nutriólogo", "Optometrista", "Terapeuta ocupacional", "Sexólogo", "Naturista", "Psicoanalista", "Otorrinolaringólogo Pediátrico", "Radiólogo", "Quiropráctico", "Especialidad en Medicina del Enfermo Pediátrico en Estado Crítico", "Psiquiatra infantil", "Psicopedagogo", "Reumatólogo pediátrico", "gerontologo"],
  cities: ["Monterrey", "San Pedro Garza Garcia", "Torreon", "Hidalgo", "General Escobedo", "Santa Catarina", "San Nicolás", "Saltillo", "Apodaca", "León", "Nuevo León", "García", "Matamoros", "Guadalupe", "Morelia", "Acapulco", "Chilpancingo", "Durango", "Oaxaca", "Xalapa", "Reynosa", "Soledad", "Guadalajara", "Nuevo Leon", "Hermosillo", "Coyoacán", "Nuevo Laredo", "Ciudad de México", "fresnillo", "Guerrero", "Toluca", "Naucalpan", "Guanajuato", "Morelos", "Zacatecas", "Veracruz", "Benito Juárez", "linares", "San Luis Potosi", "Ciudad Victoria", "Ciudad Acuña", "Monclova", "Baja California", "Querétaro", "Juriquilla", "Michoacán", "La Piedad", "Irapuato", "Ensenada", "Cadereyta Jimenez", "Colima", "Tamaulipas", "Zamora", "Quintana Roo", "Tabasco", "La Paz", "Magdalena Contreras", "Campeche", "Mérida", "Villahermosa", "Culiacan", "Nuevo Casas Grandes", "Yucatán", "Metepec", "Puerto Vallarta", "Nogales", "Tapachula", "Tlaquepaque", "Coahuila", "Gómez Palacio", "Ciudad Benito Juárez", "Puebla", "Tijuana", "Torreón", "Mexicali", "Sonora", "Guaymas", "Cancún", "Ciudad Obregón", "Mazatlán", "Iztapalapa", "Chihuahua", "Salamanca", "Tepic", "Manzanillo", "Pachuca", "Aguascalientes", "Chiapas", "Jalisco", "Nezahualcóyotl", "Uruapan", "Zapotlanejo", "Cabo San Lucas", "Tlalnepantla", "Ojo de Agua", "Chalco", "Tehuacán", "Miramar", "Poza Rica", "Cuernavaca", "Ciudad Apodaca", "Apizaco", "Coatzacoalcos", "Nayarit", "Sinaloa", "Ciudad Madero", "Ecatepec"],
  diseases: ["Flebitis", "Venas varicosas", "Trombosis venosa profunda", "Insuficiencia venosa crónica", "Coágulo en las piernas", "Enfermedad vascular periférica", "Pie Diabético", "Insuficiencia arterial", "Insuficiencia venosa", "Aneurisma", "Insuficiencia cardíaca", "Infarto agudo de miocardio", "Hipertensión", "Angina", "Cardiomiopatía isquémica", "Bradicardia", "Cardiopatía hipertensiva", "Infarto de miocardio", "Tromboembolia venosa", "Tromboflebitis", "Gangrena de tejidos blandos", "Linfedema", "Embolia arterial", "Síndrome de oclusión de la arteria carótida", "Arterioesclerosis de las extremidades", "Enfermedad cerebrovascular", "Cardiomiopatía dilatada", "Arritmias", "Niveles elevados de colesterol y triglicéridos", "Síncope", "Fibrilación auricular", "Hipertensión pulmonar", "Angina inestable", "Rinitis alérgica", "Alergia alimentaria", "Urticaria", "Asma", "Dermatitis atópica", "Alergias", "Alergias a fármacos", "Asma pediátrico", "Dermatitis por contacto", "Trastornos por inmunodeficiencia", "Infecciones de vías respiratorias de repetición (o recurrentes)", "Accidente cerebrovascular cardioembólico", "Accidente cerebrovascular secundario a fibrilación auricular"],
  focus: ["Hemodinamia", "Cirugía Arterial", "Cirugía Endovascular", "Flebología", "Diagnóstico Vascular No Invasivo", "Arritmias", "Cardiología Intervencionista", "Cardiopatía Isquémica", "Ecocardiografía", "Cardiología clínica", "Cardiología y Ecocardiografía adultos", "Desensibilización - Inmunoterapia", "Inmunología Clínica y Alergia", "Alergología pediátrica", "Electrocardiogramas", "Electrofisiología", "Electrofisiología Cardíaca", "Alergología ambulatoria", "Inmuno Alergología Pediátrica", "Pruebas Diagnósticas", "Cardiólogo Intervencionista", "Hipertensión", "Obesidad", "Diabetes", "Pruebas de Esfuerzo", "Urgencias", "Tratamiento del Dolor", "Medicina del Dolor", "Cuidados Paliativos", "Dolor Crónico", "Intervencionismo en Dolor", "Algólogo Intervencionista", "Medicina Paliativa y del Dolor", "Tratamiento para Pie Diabético", "Cirugía Gastrointestinal", "Cirugía de Vesícula y Vía Biliar", "Ultrasonografía diagnóstica", "Inmunodeficiencias", "Enfermedades por Hipersensibilidad", "Pediatría Extrahospitalaria", "Test de provocación", "Angiología", "Cardiología Pediátrica", "Ecocardiografía Pediátrica", "Rehabilitación cardíaca y cardiología", "Emocional", "Organoterapia", "Homeopatía Clásica Avanzada", "Medicina Funcional", "Rehabilitación Integral", "Otoneurología Clínica", "Neurofisiología Otológica"]
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Raw data uses minified keys to save bundle size
// n: name, l: license, p: phones, lo: locations, s: specialties, c: cities, d: diseases, f: focus
export const doctors: Doctor[] = [
  {"n": "Dr. Jose Alonzo Leal Franco", "l": "12036598 8962718", "p": ["+528118288676"], "lo": [{"n": "CLIEMED", "a": "Av. Prof. Moisés Sáenz 1500, Monterrey"}, {"n": "Christus Muguerza Clínica San Pedro", "a": "Calzada San Pedro 325, San Pedro Garza Garcia"}], "s": [0], "c": [0, 1], "d": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {"n": "Dr. Eduardo Heberto Herrera Garza", "l": "0012401 0012402 1385660", "p": ["+528180203952", "+528113639916", "+524622885539"], "lo": [{"n": "TORRE JOSE A MUGUERZA", "a": "BELISARIO DOMINGUEZ  2602, Monterrey"}], "s": [1], "c": [0], "d": [10, 11, 12, 13, 14, 15, 16, 17], "f": [0]},
  {"n": "Dr. José Oscar Castrejón", "l": "12257129", "p": ["+528116277279", "+528135607116", "+528125730020"], "lo": [{"n": "Centro Medico Torreon", "a": "Av Allende Oriente 351, Primero de Cobián Centro, Torreon"}, {"n": "Christus Muguerza Hospital Cumbres", "a": "Av. Paseo de los Leones No.8001, Col. Valle de Cumbres, Monterrey"}, {"n": "Hospital San Felipe de Jesús", "a": "Av. Paseo de los Leones #2508 Cumbres 3er sector, Monterrey"}], "s": [0], "c": [0, 2], "d": [2, 3, 6, 18, 19, 20, 21, 22, 23, 5, 24, 25], "f": [1, 2, 3, 4]},
  {"n": "Dr. Noe Alfredo Guzman Padilla", "l": "14724181 9567827", "p": ["+528147944045"], "lo": [{"n": "CLIEMED Servicios Médicos de Alta Especialidad", "a": "Avenida Profesor Moisés Sáenz 1510, Monterrey"}], "s": [1], "c": [0], "d": [26, 14, 27, 12, 13, 11, 28, 29, 16, 30, 31], "f": [5, 6, 7, 8]},
  {"n": "Dra. Yinna Shayuri Cermeño Carrazco", "l": "9563881 12278741", "p": ["+528125598349", "+528125598350"], "lo": [{"n": "Centro Médico Monterrey Consultorio 209", "a": "Andador Hidalgo 2480, Monterrey"}], "s": [1], "c": [3, 0], "d": [10, 11, 30, 14, 16, 17, 32], "f": [9, 10]},
  {"n": "Dra. María del Rocío Salinas Díaz", "l": "10389057 12400069 13282283", "p": ["+528119885844", "+528115668135"], "lo": [{"n": "Centro Médico Hospitaria", "a": "Avenida Nexxus 104, General Escobedo"}, {"n": "Médica Génesis", "a": "Cuauhtémoc 101, Rio Bravo"}, {"n": "Paralelo Obispado", "a": "Belisario Domínguez 2725, Obispado, Monterrey"}], "s": [2], "c": [4, 0], "d": [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43], "f": [11, 12, 13]}
];

export const resolveDoctor = (doctor: Doctor, index: number): ResolvedDoctor => ({
  id: String(index),
  slug: `${slugify(doctor.n)}-${slugify(lookups.specialties[doctor.s[0]])}`,
  name: doctor.n,
  license: doctor.l,
  phones: doctor.p,
  specialties: doctor.s.map(id => lookups.specialties[id]),
  cities: doctor.c.map(id => lookups.cities[id]),
  diseases: doctor.d.map(id => lookups.diseases[id]),
  focus: doctor.f?.map(id => lookups.focus[id]) || [],
  locations: doctor.lo.map(loc => ({
    name: loc.n,
    address: loc.a,
    map_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.n + ' ' + loc.a)}`
  }))
});

export const getDoctorBySlug = (slug: string): ResolvedDoctor | null => {
  const docIdx = doctors.findIndex((d, idx) => {
    const resolved = resolveDoctor(d, idx);
    return resolved.slug === slug;
  });
  return docIdx !== -1 ? resolveDoctor(doctors[docIdx], docIdx) : null;
};
