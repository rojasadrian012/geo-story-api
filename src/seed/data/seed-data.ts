import { ValidRoles } from 'src/auth/interface/valid-roles';

export enum levels {
  'l1' = 1,
  'l2' = 2,
  'l3' = 3,
  'l4' = 4,
  'l5' = 5,
  'l6' = 6,
}

export enum AchievementCode {
  // Respuestas
  RESPONDER_10 = 'RESPONDER_10',
  RESPONDER_15 = 'RESPONDER_15',
  RESPONDER_20 = 'RESPONDER_20',

  // Racha
  RACHA_3 = 'RACHA_3',
  RACHA_6 = 'RACHA_6',
  RACHA_9 = 'RACHA_9',

  // Precisión
  PRECISION_5 = 'PRECISION_5',
  PRECISION_10 = 'PRECISION_10',
  PRECISION_15 = 'PRECISION_15',

  // Otros
  PERFECCIONISTA = 'PERFECCIONISTA',
  MAESTRO = 'MAESTRO',
  COLECCIONISTA = 'COLECCIONISTA',
}

interface SeedUser {
  nickname: string;
  password: string;
  fullName: string;
  roles: string[];
}

interface Quizz {
  difficulty: levels;
  title: string;
  questions: Question[];
  image: string;
}

interface Question {
  title: string;
  hint: string;
  answers: Answer[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Achievement {
  name: string;
  description: string;
  image: string;
  code: string;
}

interface Survey {
  question: string;
  isFirstSurvey?: boolean;
  surveyOptions: SurveyOption[];
}

interface SurveyOption {
  name: string;
  value: string;
}

interface Config {
  name: string;
  value: boolean;
  description: string;
}

interface SeedData {
  users: SeedUser[];
  quizzes: Quizz[];
  achievements: Achievement[];
  surveys: Survey[];
  configs: Config[];
}

export const initialData: SeedData = {
  users: [
    {
      nickname: 'admin',
      fullName: 'User Admin',
      password: 'admin123#',
      roles: [ValidRoles.admin],
    },
    {
      nickname: '7611058',
      fullName: 'Alderete Gimenez Tobias Alexander',
      password: '7611058',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7488999',
      fullName: 'Barreto Caballero Zulma Noemi',
      password: '7488999',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7230113',
      fullName: 'Barreto Mendez Cristobal Gabriel',
      password: '7230113',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7438035',
      fullName: 'Barreto Ruiz Ezequiel',
      password: '7438035',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7393866',
      fullName: 'Britez Insfran Jeremias Benjamin',
      password: '7393866',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7820840',
      fullName: 'Cardozo Estigarribia Rodrigo Misael',
      password: '7820840',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7597627',
      fullName: 'Cardozo Portillo Angel David',
      password: '7597627',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7215585',
      fullName: 'Castro Florentin Leryn Aylen',
      password: '7215585',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7454947',
      fullName: 'Cespedes Villalba Ruth Guadalupe',
      password: '7454947',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7285535',
      fullName: 'Da Silva Felippe Lucas Benjamin',
      password: '7285535',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7489603',
      fullName: 'De Paula Gonzalez Mathias Jose',
      password: '7489603',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7503236',
      fullName: 'Duarte Enciso Jackelin Abigail',
      password: '7503236',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7624069',
      fullName: 'Falcon Escobar Samira Magali',
      password: '7624069',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7865104',
      fullName: 'Fariña Gimenez Luz Yamila',
      password: '7865104',
      roles: [ValidRoles.user],
    },
    {
      nickname: '506IV795195',
      fullName: 'Gaona Barrios Deisy Jazmin',
      password: '506IV795195',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7174199',
      fullName: 'Gauto Sosa Ciro Samir',
      password: '7174199',
      roles: [ValidRoles.user],
    },
    {
      nickname: '8026230',
      fullName: 'Goncalves De Oliveira Kemily Victoria',
      password: '8026230',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7366851',
      fullName: 'Jara Zaracho Jonathan David',
      password: '7366851',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7425623',
      fullName: 'Lezcano Avalos Matheo Agustin',
      password: '7425623',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7450560',
      fullName: 'Lezcano Vera Alejandra Anahi',
      password: '7450560',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7501439',
      fullName: 'Lopez Carmona Alan Gabriel',
      password: '7501439',
      roles: [ValidRoles.user],
    },
    {
      nickname: '52701250',
      fullName: 'Lopez Romero Elias',
      password: '52701250',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7263887',
      fullName: 'Martinez Caceres Lucas Ignacio',
      password: '7263887',
      roles: [ValidRoles.user],
    },
    {
      nickname: '8179330',
      fullName: 'Medina Espinola Naomi Anahir',
      password: '8179330',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7432659',
      fullName: 'Mendoza Cardozo Iker Josias',
      password: '7432659',
      roles: [ValidRoles.user],
    },
    {
      nickname: '536I60186',
      fullName: 'Noguera Solis Tamara Lujan',
      password: '536I60186',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7516849',
      fullName: 'Parra Franco Fiorella Jazmin',
      password: '7516849',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7325044',
      fullName: 'Pereira Romero Cristhian David',
      password: '7325044',
      roles: [ValidRoles.user],
    },
    {
      nickname: '506VI90631',
      fullName: 'Romero Vega Lucas Daniel',
      password: '506VI90631',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7226422',
      fullName: 'Vallejos Aguirre Juan Angel',
      password: '7226422',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7414003',
      fullName: 'Vargas Cristaldo Oscar Daniel',
      password: '7414003',
      roles: [ValidRoles.user],
    },
    {
      nickname: '7489622',
      fullName: 'Zamphiropolos Sanchez Ares Nahuel',
      password: '7489622',
      roles: [ValidRoles.user],
    },
  ],
  quizzes: [
    {
      difficulty: levels.l1,
      title: 'Curiosidades',
      questions: [
        {
          title: '¿Cuál es la capital del Departamento de San Pedro?',
          hint: 'Antiguamente conocida como Ycuamandy-yú.',
          answers: [
            { text: 'San Pedro de Ycuamandiyú', isCorrect: true },
            { text: 'Villa del Rosario', isCorrect: false },
            { text: 'Choré', isCorrect: false },
            { text: 'Lima', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué planta le dio el nombre a la ciudad de San Pedro de Ycuamandiyú?',
          hint: 'Es algo de color blanco.',
          answers: [
            { text: 'Algodón', isCorrect: true },
            { text: 'Yerba mate', isCorrect: false },
            { text: 'Sandias', isCorrect: false },
            { text: 'Naranja', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es la ciudad más poblada del Departamento de San Pedro?',
          hint: 'No es la capital departamental.',
          answers: [
            { text: 'San Pedro de Ycuamandiyú', isCorrect: false },
            { text: 'San Estanislao', isCorrect: true },
            { text: 'Villa del Rosario', isCorrect: false },
            { text: 'Lima', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuántos kilómetros separan Minga Guazú de la capital de San Pedro?',
          hint: 'Un poco más de 400 km.',
          answers: [
            { text: '401 km', isCorrect: true },
            { text: '308 km', isCorrect: false },
            { text: '450 km', isCorrect: false },
            { text: '100 km', isCorrect: false },
          ],
        },
        {
          title: '¿Qué especie vegetal está en vías de extinción en San Pedro?',
          hint: 'Es una cuestión compleja, ya que varias especies nativas están en peligro.',
          answers: [
            { text: 'Todas son correctas.', isCorrect: true },
            { text: 'Pino', isCorrect: false },
            { text: 'Yvyra Pyta', isCorrect: false },
            { text: 'Lapacho', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuántos kilómetros separan Asunción de la capital de San Pedro?',
          hint: 'Casi 300 km.',
          answers: [
            { text: '298 km', isCorrect: true },
            { text: '400 km', isCorrect: false },
            { text: '300 km', isCorrect: false },
            { text: '200 km', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/curiosidades.svg',
    },
    {
      difficulty: levels.l2,
      title: 'Historia',
      questions: [
        {
          title: '¿En qué año se fundó la ciudad de San Pedro de Ycuamandiyú?',
          hint: 'Fue a finales del siglo XVII.',
          answers: [
            { text: '1786', isCorrect: true },
            { text: '1800', isCorrect: false },
            { text: '1811', isCorrect: false },
            { text: '1750', isCorrect: false },
          ],
        },
        {
          title: '¿Cuál era el nombre antiguo de la ciudad de Antequera?',
          hint: 'El nombre está relacionado con una cruz.',
          answers: [
            { text: 'Curuzú-chica', isCorrect: true },
            { text: 'Villa Rosario', isCorrect: false },
            { text: 'San Antonio', isCorrect: false },
            { text: 'Ycuamandyju', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué ley determinó los limites actuales del departamento de San Pedro?',
          hint: 'Es es ley con numeración más baja.',
          answers: [
            { text: 'Ley Nº 426', isCorrect: true },
            { text: 'Ley Nº 1786', isCorrect: false },
            { text: 'Ley Nº 1906', isCorrect: false },
            { text: 'Ley Nº 1037', isCorrect: false },
          ],
        },
        {
          title:
            '¿Quién fundó la ciudad de Lima en el Departamento de San Pedro?',
          hint: 'La fundación se atribuye a un franciscano.',
          answers: [
            { text: 'Fray Pedro Bartolomé', isCorrect: true },
            { text: 'Pedro Melo de Portugal', isCorrect: false },
            { text: 'José Ferreira', isCorrect: false },
            { text: 'Sebastián Yegros', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es la iglesia declarada monumento histórico en San Estanislao?',
          hint: 'Es el mismo nombre de la ciudad.',
          answers: [
            { text: 'Iglesia de San Estanislao', isCorrect: true },
            { text: 'Catedral de San Pedro', isCorrect: false },
            { text: 'Iglesia de Villa del Rosario', isCorrect: false },
            { text: 'Iglesia de Lima', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué población fue fundada en 1799 bajo el nombre "Capilla de las Mercedes de los Guaná de Tacuatí"?',
          hint: 'Es un lugar que empieza con ‘T’.',
          answers: [
            { text: 'Tacuatí', isCorrect: true },
            { text: 'Choré', isCorrect: false },
            { text: 'San Vicente Pancholo', isCorrect: false },
            { text: 'Capiibary', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/historia.svg',
    },
    {
      difficulty: levels.l3,
      title: 'Geografía',
      questions: [
        {
          title:
            '¿Qué río bordea toda la zona oeste del Departamento de San Pedro?',
          hint: 'Este Río separa de la Región Occidental y Oriental del país.',
          answers: [
            { text: 'Río Paraguay', isCorrect: true },
            { text: 'Río Pilcomayo', isCorrect: false },
            { text: 'Río Paraná', isCorrect: false },
            { text: 'Río Apa', isCorrect: false },
          ],
        },
        {
          title: '¿En qué región de Paraguay se encuentra San Pedro?',
          hint: 'No es la región Occidental.',
          answers: [
            { text: 'Región Oriental', isCorrect: true },
            { text: 'Región Occidental', isCorrect: false },
            { text: 'Región Este', isCorrect: false },
            { text: 'Región Norte', isCorrect: false },
          ],
        },
        {
          title: '¿Cuántos distritos conforman el Departamento de San Pedro?',
          hint: 'Es más de 20.',
          answers: [
            { text: '19', isCorrect: false },
            { text: '21', isCorrect: true },
            { text: '23', isCorrect: false },
            { text: '18', isCorrect: false },
          ],
        },
        {
          title: '¿Qué departamento limita al norte con San Pedro?',
          hint: 'Es el primer departamento de Paraguay.',
          answers: [
            { text: 'Concepción', isCorrect: true },
            { text: 'Amambay', isCorrect: false },
            { text: 'Caaguazú', isCorrect: false },
            { text: 'Cordillera', isCorrect: false },
          ],
        },
        {
          title: '¿Cuál es la elevación más importante en San Pedro?',
          hint: 'Su nombre hacer referencia a una cruz.',
          answers: [
            { text: 'Cerro Curuzú', isCorrect: true },
            { text: 'Cerro Tres Kandu', isCorrect: false },
            { text: 'Cerro Lambaré', isCorrect: false },
            { text: 'Cerro Ñemby', isCorrect: false },
          ],
        },
        {
          title: '¿Cuál es la temperatura media anual en San Pedro?',
          hint: 'Es un clima templado, incluye el número 20.',
          answers: [
            { text: '22,5°C', isCorrect: true },
            { text: '18,3°C', isCorrect: false },
            { text: '31,6°C', isCorrect: false },
            { text: '30,0°C', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/geografia.svg',
    },
    {
      difficulty: levels.l4,
      title: 'Economía',
      questions: [
        {
          title:
            '¿Cuáles son las principales actividades económicas en el Departamento de San Pedro?',
          hint: 'Son dos actividades.',
          answers: [
            { text: 'Agricultura y Ganadería', isCorrect: true },
            { text: 'Minería', isCorrect: false },
            { text: 'Comercio', isCorrect: false },
            { text: 'Turismo', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué cultivo es significativo en la agricultura de San Pedro?',
          hint: 'Es utilizado para hacer mate.',
          answers: [
            { text: 'Soja', isCorrect: false },
            { text: 'Algodón', isCorrect: false },
            { text: 'Yerba Mate', isCorrect: true },
            { text: 'Trigo', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es el porcentaje de tierras en San Pedro aptas para la agricultura y ganaderia?',
          hint: 'Es más de la mitad del territorio.',
          answers: [
            { text: '62%', isCorrect: true },
            { text: '48%', isCorrect: false },
            { text: '35%', isCorrect: false },
            { text: '75%', isCorrect: false },
          ],
        },
        {
          title:
            '¿En qué es considerado el primer productor del País San Pedro?',
          hint: 'Materia prima de los cigarrillos.',
          answers: [
            { text: 'Tabaco', isCorrect: true },
            { text: 'Pepino', isCorrect: false },
            { text: 'Tomate', isCorrect: false },
            { text: 'Zanahoria', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué puerto de San Pedro era conocido por la exportación de madera?',
          hint: 'Está situado sobre el río Paraguay.',
          answers: [
            { text: 'Puerto Rosario', isCorrect: true },
            { text: 'Puerto Antequera', isCorrect: false },
            { text: 'Puerto Milagro', isCorrect: false },
            { text: 'Puerto Santa Rosa', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es la principal actividad económica en el distrito de Lima?',
          hint: 'La actividad se centra en la elaboración de un producto tradicional paraguayo.',
          answers: [
            { text: 'Agricultura', isCorrect: true },
            { text: 'Ganadería', isCorrect: false },
            { text: 'Minería', isCorrect: false },
            { text: 'Avicultura', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/economia.svg',
    },
    {
      difficulty: levels.l5,
      title: 'Cultura',
      questions: [
        {
          title: '¿Quién es un prócer paraguayo originario de San Pedro?',
          hint: 'Participó en la independencia de Paraguay.',
          answers: [
            { text: 'Vicente Ignacio Iturbe', isCorrect: true },
            { text: 'Mario Abdo Benítez', isCorrect: false },
            { text: 'Carlos Antonio López', isCorrect: false },
            { text: 'Santiago Peña Palacios', isCorrect: false },
          ],
        },
        {
          title: '¿Qué músico nació en San Pedro?',
          hint: 'Su hace referencia a una Rosa.',
          answers: [
            { text: 'Rosita Melo', isCorrect: true },
            { text: 'Agustín Barrios', isCorrect: false },
            { text: 'Félix Pérez Cardozo', isCorrect: false },
            { text: 'José Asunción Flores', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es el festival anual que se realiza en Itacurubí del Rosario?',
          hint: 'Su nombre incluye "Agujero de agua" en guarani.',
          answers: [
            { text: 'Festival Ycuá Salas', isCorrect: true },
            { text: 'Festival del Lago Ypacaraí', isCorrect: false },
            { text: 'Festival del Takuare’ê', isCorrect: false },
            { text: 'Festival de la Tradición Misionera', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué iglesia eregida en tiempos de colonia aún conserva Lima?',
          hint: 'Es una iglesia.',
          answers: [
            { text: 'Iglesia de Adobe', isCorrect: true },
            { text: 'Casa de la Cultura', isCorrect: false },
            { text: 'Museo Histórico', isCorrect: false },
            { text: 'Iglesia de Caacupé', isCorrect: false },
          ],
        },
        {
          title: '¿De donde es originario Kamba’i Echeverría?',
          hint: 'Fruta bastante agria.',
          answers: [
            { text: 'Lima', isCorrect: true },
            { text: 'Antequera', isCorrect: false },
            { text: 'Choré', isCorrect: false },
            { text: '25 de Diciembre', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué iglesia en San Estanislao ha sido declarada monumento histórico?',
          hint: 'Incluye el nombre de la ciudad más poblada.',
          answers: [
            { text: 'Iglesia de San Estanislao', isCorrect: true },
            { text: 'Catedral de San Pedro', isCorrect: false },
            { text: 'Iglesia de Villa del Rosario', isCorrect: false },
            { text: 'Iglesia de Santa Rosa', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/cultura.svg',
    },
    {
      difficulty: levels.l6,
      title: 'Turismo',
      questions: [
        {
          title:
            '¿Qué ciudad en San Pedro es conocida por su festival anual Ycuá Salas?',
          hint: 'Está situada al sur del departamento.',
          answers: [
            { text: 'Itacurubí del Rosario', isCorrect: true },
            { text: 'San Estanislao', isCorrect: false },
            { text: 'Santa Rosa del Aguaray', isCorrect: false },
            { text: 'Villa del Rosario', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué catedral en San Pedro, construida en 1854, es un atractivo turístico importante?',
          hint: 'Está ubicada en la capital departamental.',
          answers: [
            { text: 'Catedral de San Pedro', isCorrect: true },
            { text: 'Catedral de San Estanislao', isCorrect: false },
            { text: 'Catedral de Villa del Rosario', isCorrect: false },
            { text: 'Catedral de Santa Rosa', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué cerro en San Pedro es una elevación importante en el distrito de Capiibary?',
          hint: 'Incluye un número en el nombre.',
          answers: [
            { text: 'Cerro Dos de Oro', isCorrect: true },
            { text: 'Cerro Curuzú', isCorrect: false },
            { text: 'Cerro Lambaré', isCorrect: false },
            { text: 'Cerro Ñemby', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué distrito posee un hermoso balneario sobre el arroyo Mbutuy?',
          hint: 'Su nombre es una fecha festiva importante.',
          answers: [
            { text: '25 de Diciembre', isCorrect: true },
            { text: 'Tacuatí', isCorrect: false },
            { text: 'Antequera', isCorrect: false },
            { text: 'San Pablo', isCorrect: false },
          ],
        },
        {
          title: '¿Qué río en San Pedro es conocido por la pesca deportiva?',
          hint: 'Es uno de los principales ríos del país.',
          answers: [
            { text: 'Río Paraguay', isCorrect: true },
            { text: 'Río Paraná', isCorrect: false },
            { text: 'Río Pilcomayo', isCorrect: false },
            { text: 'Río Tebicuary', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué arroyo en San Estanislao es conocido por las leyendas que giran en torno a sus aguas?',
          hint: 'Actualmente está muy contaminado por la urbanización.',
          answers: [
            { text: 'Arroyo Tapiracuái', isCorrect: true },
            { text: 'Arroyo Ybytyty', isCorrect: false },
            { text: 'Arroyo Pytá', isCorrect: false },
            { text: 'Arroyo Guazú', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/turismo.svg',
    },
  ],
  achievements: [
    {
      name: 'Curioso',
      description:
        'Has respondido 10 preguntas. Sigue explorando y aprendiendo.',
      image: 'assets/images/achievement/respuestas-10.svg',
      code: AchievementCode.RESPONDER_10, // Usa el enum
    },
    {
      name: 'Persistente',
      description:
        'Has respondido 15 preguntas. Tú dedicación está dando frutos.',
      image: 'assets/images/achievement/respuestas-15.svg',
      code: AchievementCode.RESPONDER_15, // Usa el enum
    },
    {
      name: 'Dedicado',
      description: 'Has respondido 20 preguntas. Tú esfuerzo es admirable.',
      image: 'assets/images/achievement/respuestas-20.svg',
      code: AchievementCode.RESPONDER_20, // Usa el enum
    },
    {
      name: 'Constante',
      description: 'Has acertado 3 preguntas consecutivas. Mantén el ritmo.',
      image: 'assets/images/achievement/trofeo-racha-3.svg',
      code: AchievementCode.RACHA_3, // Usa el enum
    },
    {
      name: 'Imparable',
      description: 'Has acertado 6 preguntas consecutivas. No te detengas.',
      image: 'assets/images/achievement/premio-del-campeonato-racha-5.svg',
      code: AchievementCode.RACHA_6, // Usa el enum
    },
    {
      name: 'Leyenda',
      description: 'Has acertado 9 preguntas consecutivas. ¡Eres imparable!',
      image: 'assets/images/achievement/icono-de-trofeo-racha-10.svg',
      code: AchievementCode.RACHA_9, // Usa el enum
    },
    {
      name: 'Preciso',
      description:
        'Has respondido correctamente 5 preguntas. Tú precisión es impresionante.',
      image: 'assets/images/achievement/icono-de-exito-5-preguntas.svg',
      code: AchievementCode.PRECISION_5, // Usa el enum
    },
    {
      name: 'Experto',
      description:
        'Has respondido correctamente 10 preguntas. Eres un verdadero experto.',
      image: 'assets/images/achievement/estrella-del-trofeo-10-preguntas.svg',
      code: AchievementCode.PRECISION_10, // Usa el enum
    },
    {
      name: 'Maestro',
      description:
        'Has respondido correctamente 15 preguntas. Tú conocimiento es profundo.',
      image:
        'assets/images/achievement/icono-de-trofeo-correcto-15-preguntas.svg',
      code: AchievementCode.PRECISION_15, // Usa el enum
    },
    {
      name: 'Perfeccionista',
      description:
        'Has obtenido el 100% de aciertos en una categoría usando al menos una pista. Tú atención al detalle es excepcional.',
      image: 'assets/images/achievement/copa-de-plata.svg',
      code: AchievementCode.PERFECCIONISTA, // Usa el enum
    },
    {
      name: 'Dios Terrenal',
      description:
        'Has obtenido el 100% de aciertos en una categoría. Eres un verdadero maestro.',
      image: 'assets/images/achievement/trofeo.svg',
      code: AchievementCode.MAESTRO, // Usa el enum
    },
    // {
    //   name: 'Coleccionista',
    //   description:
    //     'Has desbloqueado todos los logros. Eres un verdadero coleccionista de conocimientos.',
    //   image: 'assets/images/achievement/linea-de-meta.svg',
    //   code: AchievementCode.COLECCIONISTA, // Usa el enum
    // },
  ],
  surveys: [
    // Pre-encuesta
    {
      question:
        '¿Qué tanto te gusta aprender sobre la historia y geografía del Departamento de San Pedro?',
      surveyOptions: [
        { name: 'Me gusta mucho', value: '5' },
        { name: 'Me gusta un poco', value: '3' },
        { name: 'No me gusta', value: '1' },
      ],
      isFirstSurvey: true,
    },
    {
      question: '¿Qué tanto conoces las páginas web para aprender?',
      surveyOptions: [
        { name: 'Mucho', value: '5' },
        { name: 'Poco', value: '3' },
        { name: 'Nada', value: '1' },
      ],
      isFirstSurvey: true,
    },
    {
      question:
        '¿Qué tanto sabes sobre la historia y geografía del Departamento de San Pedro?',
      surveyOptions: [
        { name: 'Sé mucho', value: '5' },
        { name: 'Sé un poco', value: '3' },
        { name: 'No sé nada', value: '1' },
      ],
      isFirstSurvey: true,
    },
    {
      question:
        '¿Qué tan importante es aprender sobre la historia y geografía de San Pedro?',
      surveyOptions: [
        { name: 'Muy importante', value: '5' },
        { name: 'Algo importante', value: '3' },
        { name: 'Poco importante', value: '1' },
      ],
      isFirstSurvey: true,
    },
    {
      question: '¿Qué tanto te gustaría usar una página web para aprender?',
      surveyOptions: [
        { name: 'Me gustaría mucho', value: '5' },
        { name: 'Me gustaría un poco', value: '3' },
        { name: 'No me gustaría', value: '1' },
      ],
      isFirstSurvey: true,
    },
    {
      question: '¿Esperas que la página web que vamos a usar sea buena?',
      surveyOptions: [
        { name: 'Espero que sea muy buena', value: '5' },
        { name: 'Espero que sea buena', value: '3' },
        { name: 'No espero mucho', value: '1' },
      ],
      isFirstSurvey: true,
    },
    // Post-encuesta
    {
      question:
        '¿Después de usar la página web, te gusta más aprender sobre la historia y geografía del Departamento de San Pedro?',
      surveyOptions: [
        { name: 'Me gusta mucho más', value: '5' },
        { name: 'Me gusta un poco más', value: '3' },
        { name: 'No me gusta más', value: '1' },
      ],
    },
    {
      question:
        '¿Qué tan contento(a) estás con la página web para aprender historia y geografía?',
      surveyOptions: [
        { name: 'Muy contento(a)', value: '5' },
        { name: 'Algo contento(a)', value: '3' },
        { name: 'No contento(a)', value: '1' },
      ],
    },
    {
      question:
        '¿Te resultó entretenido utilizar la página web para aprender sobre historia y geografía?',
      surveyOptions: [
        { name: 'Muy entretenido', value: '5' },
        { name: 'Algo entretenido', value: '3' },
        { name: 'Nada entretenido', value: '1' },
      ],
    },
    {
      question:
        '¿Qué tan útil fue la página web para aprender?',
      surveyOptions: [
        { name: 'Muy útil', value: '5' },
        { name: 'Algo útil', value: '3' },
        { name: 'Poco útil', value: '1' },
      ],
    },
    {
      question:
        '¿Te parece más importante aprender historia y geografía después de usar la página web?',
      surveyOptions: [
        { name: 'Sí, mucho más importante', value: '5' },
        { name: 'Un poco más importante', value: '3' },
        { name: 'No cambió', value: '1' },
      ],
    },
    {
      question:
        '¿Te sentiste motivado a seguir utilizando la herramienta web después de tu primera experiencia?',
      surveyOptions: [
        { name: 'Sí, muy motivado', value: '5' },
        { name: 'Algo motivado', value: '3' },
        { name: 'Nada motivado', value: '1' },
      ],
    },
  ],
  configs: [
    {
      name: 'firstSurvey',
      value: true,
      description: 'Primera encuesta activada',
    },
    {
      name: 'showSurveyInMenu',
      value: true,
      description: 'Mostrar "Encuestas" en el menú',
    },
  ],
};
