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
  RACHA_5 = 'RACHA_5',
  RACHA_10 = 'RACHA_10',

  // Precisión
  PRECISION_5 = 'PRECISION_5',
  PRECISION_10 = 'PRECISION_10',
  PRECISION_15 = 'PRECISION_15',

  // Otros
  PERFECCIONISTA = 'PERFECCIONISTA',
  MAESTRO = 'MAESTRO',
  EXPLORADOR = 'EXPLORADOR',
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

interface SeedData {
  users: SeedUser[];
  quizzes: Quizz[];
  achievements: Achievement[];
}

export const initialData: SeedData = {
  users: [
    {
      nickname: 'admin',
      fullName: 'Adrian Rojas',
      password: 'admin123',
      roles: [ValidRoles.admin],
    },
    {
      nickname: 'luis',
      fullName: 'Luis Acosta',
      password: 'admin123',
      roles: [ValidRoles.admin],
    },
    {
      nickname: 'adrian',
      fullName: 'Adrian Portillo',
      password: 'admin123',
      roles: [ValidRoles.user, ValidRoles.admin],
    },
    {
      nickname: 'osvaldo',
      fullName: 'Osvaldo Gonzalez',
      password: 'admin123',
      roles: [ValidRoles.user],
    },
  ],
  quizzes: [
    {
      difficulty: levels.l1,
      title: 'Curiosidades',
      questions: [
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
        {
          title:
            '¿Qué río bordea toda la zona oeste del Departamento de San Pedro?',
          hint: 'Este río lo separa de la Región Occidental.',
          answers: [
            { text: 'Río Paraguay', isCorrect: true },
            { text: 'Río Pilcomayo', isCorrect: false },
            { text: 'Río Paraná', isCorrect: false },
            { text: 'Río Apa', isCorrect: false },
          ],
        },
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
          hint: 'La planta está relacionada con un pozo.',
          answers: [
            { text: 'Algodón', isCorrect: true },
            { text: 'Yerba mate', isCorrect: false },
            { text: 'Tabaco', isCorrect: false },
            { text: 'Soja', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es un recurso hídrico importante del Departamento de San Pedro?',
          hint: 'Es un afluente del río Paraguay.',
          answers: [
            { text: 'Río Jejuí', isCorrect: true },
            { text: 'Río Paraná', isCorrect: false },
            { text: 'Río Pilcomayo', isCorrect: false },
            { text: 'Río Tebicuary', isCorrect: false },
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
          hint: 'Fue durante el gobierno de Pedro Melo de Portugal.',
          answers: [
            { text: '1786', isCorrect: true },
            { text: '1800', isCorrect: false },
            { text: '1811', isCorrect: false },
            { text: '1750', isCorrect: false },
          ],
        },
        {
          title: '¿Cuál tribu indígena se sublevó en Arecayá en 1660?',
          hint: 'Se rebelaron contra el sistema de encomiendas.',
          answers: [
            { text: 'Mbayá', isCorrect: true },
            { text: 'Guaraní', isCorrect: false },
            { text: 'Toba', isCorrect: false },
            { text: 'Payaguá', isCorrect: false },
          ],
        },
        {
          title: '¿Qué ley creó el Departamento de San Pedro en 1906?',
          hint: 'La ley también abarcaba territorios de otros departamentos.',
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
            '¿Cuál es una de las ciudades fundadas en 1786 en el Departamento de San Pedro?',
          hint: 'Es conocida por su nombre en guaraní.',
          answers: [
            { text: 'Villa del Rosario', isCorrect: true },
            { text: 'Choré', isCorrect: false },
            { text: 'Itacurubí del Rosario', isCorrect: false },
            { text: 'San Estanislao', isCorrect: false },
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
            '¿Qué río desemboca en el río Paraguay a 12 km de Puerto Antequera?',
          hint: 'Es un importante recurso hídrico de la zona.',
          answers: [
            { text: 'Río Jejuí', isCorrect: true },
            { text: 'Río Paraná', isCorrect: false },
            { text: 'Río Tebicuary', isCorrect: false },
            { text: 'Río Pilcomayo', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es la elevación importante en el distrito de Capiibary?',
          hint: 'Es conocido como Cerro Dos de Oro.',
          answers: [
            { text: 'Cerro Dos de Oro', isCorrect: true },
            { text: 'Sierra de San Joaquín', isCorrect: false },
            { text: 'Cerro Corá', isCorrect: false },
            { text: 'Cerro León', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué río riega una considerable extensión del territorio de San Pedro?',
          hint: 'Es uno de los ríos más importantes del Paraguay.',
          answers: [
            { text: 'Río Paraguay', isCorrect: true },
            { text: 'Río Paraná', isCorrect: false },
            { text: 'Río Pilcomayo', isCorrect: false },
            { text: 'Río Tebicuary', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es el afluente del río Paraguay que desemboca a la altura de Puerto Rosario?',
          hint: 'Es conocido localmente.',
          answers: [
            { text: 'Río Cuarepotí', isCorrect: true },
            { text: 'Río Jejuí', isCorrect: false },
            { text: 'Río Manduvirá', isCorrect: false },
            { text: 'Río Ypané', isCorrect: false },
          ],
        },
        {
          title: '¿Qué arroyo es un punto de atracción en Choré?',
          hint: 'Es conocido por su nombre local.',
          answers: [
            { text: 'Arroyo Choré', isCorrect: true },
            { text: 'Arroyo Tapiracuai', isCorrect: false },
            { text: 'Arroyo Aguaray', isCorrect: false },
            { text: 'Arroyo Mbutuy', isCorrect: false },
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
            '¿Cuál es uno de los sectores industriales presentes en San Pedro?',
          hint: 'Es un sector relacionado con productos lácteos.',
          answers: [
            { text: 'Industrias lácteas', isCorrect: true },
            { text: 'Industrias de aceite', isCorrect: false },
            { text: 'Industrias textiles', isCorrect: false },
            { text: 'Industrias mineras', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué producto es común en la producción agrícola de Colonia Volendam?',
          hint: 'Es un cultivo importante para la región.',
          answers: [
            { text: 'Trigo', isCorrect: true },
            { text: 'Algodón', isCorrect: false },
            { text: 'Soja', isCorrect: false },
            { text: 'Maíz', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué industria es notable en el distrito de Itacurubí del Rosario?',
          hint: 'Es un vehículo tradicional y antiguo.',
          answers: [
            { text: 'Fabricación de cachapé', isCorrect: true },
            { text: 'Industria de yerba mate', isCorrect: false },
            { text: 'Industria textil', isCorrect: false },
            { text: 'Industria del cuero', isCorrect: false },
          ],
        },
        {
          title:
            '¿Cuál es una de las fuentes principales de ingreso en San Pedro?',
          hint: 'Está relacionado con productos agrícolas.',
          answers: [
            { text: 'Agricultura y ganadería', isCorrect: true },
            { text: 'Minería', isCorrect: false },
            { text: 'Pesca', isCorrect: false },
            { text: 'Manufactura', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué industria se destaca en el procesamiento de alimentos en San Pedro?',
          hint: 'Se enfoca en un subproducto del coco.',
          answers: [
            { text: 'Procesamiento de aceite de coco', isCorrect: true },
            { text: 'Procesamiento de soja', isCorrect: false },
            { text: 'Procesamiento de trigo', isCorrect: false },
            { text: 'Procesamiento de yerba mate', isCorrect: false },
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
          title: '¿Dónde se encuentra el Museo Histórico en San Estanislao?',
          hint: 'Fue el primer colegio jesuita.',
          answers: [
            { text: 'Casa de la Cultura', isCorrect: true },
            { text: 'Catedral San Pedro Apóstol', isCorrect: false },
            { text: 'Kurusu García', isCorrect: false },
            { text: 'Plaza Gral. Marcial Samaniego', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué patrimonio de imágenes se encuentra en la Catedral de San Pedro?',
          hint: 'Son imágenes del siglo XVIII.',
          answers: [
            { text: 'Imágenes barrocas', isCorrect: true },
            { text: 'Imágenes modernas', isCorrect: false },
            { text: 'Imágenes coloniales', isCorrect: false },
            { text: 'Imágenes góticas', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué festival se celebra anualmente en Itacurubí del Rosario?',
          hint: 'Reúne a artistas de música y danza.',
          answers: [
            { text: 'Festival Ycuá Salas', isCorrect: true },
            { text: 'Festival de San Pedro', isCorrect: false },
            { text: 'Festival de la Yerba Mate', isCorrect: false },
            { text: 'Festival de la Mandioca', isCorrect: false },
          ],
        },
        {
          title: '¿Cuál es el principal atractivo cultural de Lima?',
          hint: 'Es una iglesia construida en tiempos de la colonia.',
          answers: [
            { text: 'Iglesia de adobe', isCorrect: true },
            { text: 'Casa de la Cultura', isCorrect: false },
            { text: 'Museo Histórico', isCorrect: false },
            { text: 'Plaza principal', isCorrect: false },
          ],
        },
        {
          title: '¿Qué emisora de radio es conocida en San Pedro?',
          hint: 'La emisora lleva el nombre de la ciudad.',
          answers: [
            { text: 'Radio Ycuamandiyú', isCorrect: true },
            { text: 'Radio San Pedro', isCorrect: false },
            { text: 'Radio Jejuí', isCorrect: false },
            { text: 'Radio Lima', isCorrect: false },
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
          title: '¿Qué balneario es una atracción turística en Lima?',
          hint: 'Es conocido por su playa.',
          answers: [
            { text: 'Balneario de Lima', isCorrect: true },
            { text: 'Balneario de San Pedro', isCorrect: false },
            { text: 'Balneario de Choré', isCorrect: false },
            { text: 'Balneario de Itacurubí', isCorrect: false },
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
            '¿Qué lugar en San Estanislao es conocido como un sitio histórico?',
          hint: 'Es el lugar donde murió el explorador Alejo García.',
          answers: [
            { text: 'Kurusu García', isCorrect: true },
            { text: 'Plaza Libertad', isCorrect: false },
            { text: 'Catedral San Pedro Apóstol', isCorrect: false },
            { text: 'Ykua Kuéra', isCorrect: false },
          ],
        },
        {
          title:
            '¿Qué sierra marca los límites con el departamento de Caaguazú?',
          hint: 'Es una elevación importante en el horizonte.',
          answers: [
            { text: 'Sierra de San Joaquín', isCorrect: true },
            { text: 'Cerro Dos de Oro', isCorrect: false },
            { text: 'Cerro Corá', isCorrect: false },
            { text: 'Cerro León', isCorrect: false },
          ],
        },
        {
          title: '¿Qué río en San Pedro es un afluente del río Paraguay?',
          hint: 'Desemboca en el río Paraguay cerca de Puerto Rosario.',
          answers: [
            { text: 'Río Cuarepotí', isCorrect: true },
            { text: 'Río Jejuí', isCorrect: false },
            { text: 'Río Manduvirá', isCorrect: false },
            { text: 'Río Ypané', isCorrect: false },
          ],
        },
      ],
      image: 'assets/images/options-images/turismo.svg',
    },
  ],
  achievements: [
    {
      name: 'Curioso',
      description: 'Has respondido 10 preguntas. Sigue explorando y aprendiendo.',
      image: 'assets/images/achievement/respuestas-10.svg',
      code: AchievementCode.RESPONDER_10, // Usa el enum
    },
    {
      name: 'Persistente',
      description: 'Has respondido 15 preguntas. Tú dedicación está dando frutos.',
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
      description: 'Has acertado 5 preguntas consecutivas. Mantén el ritmo.',
      image: 'assets/images/achievement/premio-del-campeonato-racha-5.svg',
      code: AchievementCode.RACHA_5, // Usa el enum
    },
    {
      name: 'Imparable',
      description: 'Has acertado 10 preguntas consecutivas. No te detengas.',
      image: 'assets/images/achievement/icono-de-trofeo-racha-10.svg',
      code: AchievementCode.RACHA_10, // Usa el enum
    },
    {
      name: 'Preciso',
      description: 'Has respondido correctamente 5 preguntas. Tú precisión es impresionante.',
      image: 'assets/images/achievement/icono-de-exito-5-preguntas.svg',
      code: AchievementCode.PRECISION_5, // Usa el enum
    },
    {
      name: 'Experto',
      description: 'Has respondido correctamente 10 preguntas. Eres un verdadero experto.',
      image: 'assets/images/achievement/estrella-del-trofeo-10-preguntas.svg',
      code: AchievementCode.PRECISION_10, // Usa el enum
    },
    {
      name: 'Maestro',
      description: 'Has respondido correctamente 15 preguntas. Tú conocimiento es profundo.',
      image: 'assets/images/achievement/icono-de-trofeo-correcto-15-preguntas.svg',
      code: AchievementCode.PRECISION_15, // Usa el enum
    },
    {
      name: 'Perfeccionista',
      description: 'Has obtenido el 100% de aciertos en una categoría usando al menos una pista. Tú atención al detalle es excepcional.',
      image: 'assets/images/achievement/copa-de-plata.svg',
      code: AchievementCode.PERFECCIONISTA, // Usa el enum
    },
    {
      name: 'Dios Terrenal',
      description: 'Has obtenido el 100% de aciertos en una categoría. Eres un verdadero maestro.',
      image: 'assets/images/achievement/trofeo.svg',
      code: AchievementCode.MAESTRO, // Usa el enum
    },
    {
      name: 'Coleccionista',
      description: 'Has desbloqueado todos los logros. Eres un verdadero coleccionista de conocimientos.',
      image: 'assets/images/achievement/linea-de-meta.svg',
      code: AchievementCode.COLECCIONISTA, // Usa el enum
    },
  ]
};
