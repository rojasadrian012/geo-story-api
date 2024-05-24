import { ValidRoles } from 'src/auth/interface/valid-roles';

interface SeedUser {
  nickname: string;
  password: string;
  fullName: string;
  roles: string[];
}

interface Quizz {
  title: string;
  questions: Question[];
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

interface SeedData {
  users: SeedUser[];
  quizzes: Quizz[];
}

export const initialData: SeedData = {
  users: [
    {
      nickname: 'admin',
      fullName: 'Adrian Rojas',
      password: 'admin123',
      roles: [ValidRoles.superUser],
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
      title: 'Curiosidades',
      questions: [
        {
          title: '¿Cuál es la principal actividad económica en el distrito de Lima?',
          hint: ' La actividad se centra en la elaboración de un producto tradicional paraguayo.',
          answers: [
            {
              text: 'Agricultura',
              isCorrect: true
            },
            {
              text: 'Ganadería',
              isCorrect: false
            },
            {
              text: 'Minería',
              isCorrect: false
            },
            {
              text: 'Avicultura',
              isCorrect: false
            },
          ]
        },
        {
          title: '¿Cuál de las siguientes lagunas es conocida por sus playas de arena blanca en San Pedro?',
          hint: 'Esta laguna es un importante destino turístico nacional, declarada por la Secretaría Nacional de Turismo.',
          answers: [
            {
              text: 'Laguna Blanca',
              isCorrect: true
            }, {
              text: 'Lago Ypacaraí',
              isCorrect: false
            },
            {
              text: 'Laguna Verde',
              isCorrect: false
            },
            {
              text: 'Laguna Azul',
              isCorrect: false
            },
          ]
        },
        {
          title: '¿Cuántos distritos conforman el Departamento de San Pedro?',
          hint: 'Es el segundo departamento más extenso de la región Oriental del Paraguay.',
          answers: [
            {
              text: '21',
              isCorrect: true
            },
            {
              text: '18',
              isCorrect: false
            },
            {
              text: '27',
              isCorrect: false
            },
            {
              text: '24',
              isCorrect: false
            },
          ]
        },
        {
          title: '¿Cuál de los siguientes es un importante recurso hídrico del Departamento de San Pedro?',
          hint: 'Este río bordea toda la zona oeste del Departamento y lo separa de la Región Occidental.',
          answers: [
            {
              text: 'Río Paraguay',
              isCorrect: true
            },
            {
              text: 'Río Pilcomayo',
              isCorrect: false
            },
            {
              text: 'Río Paraná',
              isCorrect: false
            },
            {
              text: 'Río Apa',
              isCorrect: false
            },
          ]
        },
        {
          title: '¿En qué año fue fundada la ciudad de San Pedro de Ycuamandiyú?',
          hint: 'Fue fundada en el siglo XVIII, durante el gobierno de Pedro Melo de Portugal.',
          answers: [
            {
              text: '1800',
              isCorrect: false
            },
            {
              text: '1786',
              isCorrect: true
            },
            {
              text: '1811',
              isCorrect: false
            },
            {
              text: '1700',
              isCorrect: false
            },
          ]
        },
      ]
    },
    {
      title: 'Historia',
      questions: []
    },
    {
      title: 'Geografia',
      questions: []

    },
    {
      title: 'Economia',
      questions: []

    },
    {
      title: 'Cultura',
      questions: []

    },
    {
      title: 'Turismo',
      questions: []

    },
  ],
};
