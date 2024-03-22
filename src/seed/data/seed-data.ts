import { ValidRoles } from 'src/auth/interface/valid-roles';

interface SeedUser {
  nickname: string;
  password: string;
  fullName: string;
  roles: string[];
}

interface SeedQuestion {
  questionText: string;
}

interface SeedData {
  users: SeedUser[];
  questions: SeedQuestion[];
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
  questions: [
    {
      questionText: '¿MARCA CHEQUIN?',
    },
    {
      questionText: 'RADIO/TV',
    },
    {
      questionText: 'INSIGNIA TRASERA',
    },
    {
      questionText: 'INSIGNIA DELANTERA',
    },
    {
      questionText: 'CABECERAS',
    },
    {
      questionText: 'BOCINA',
    },
    {
      questionText: 'AIRE',
    },
    {
      questionText: 'BLOQUEO DE PUERTA',
    },
    {
      questionText: 'TAPIZADOS',
    },
    {
      questionText: 'CUENTA CON SUFICIENTE ACEITE?',
    },
    {
      questionText: 'MOTOR FUNCIONA BIEN?',
    },
    {
      questionText: 'CAJA FUNCIONA BIEN?',
    },
    {
      questionText: '¿TIENE TAPA LLANTA?',
    },
    {
      questionText: '¿FUNCIONA SENSOR DE LUZ AL QUITAR LA LLAVE?',
    },
    {
      questionText: '¿FUNCIONA LUZ DE GUANTERA?',
    },
    {
      questionText: '¿TIENE GOMA CANO DE VOLANTE?',
    },
    {
      questionText: '¿TIENE TAPA TABLERO ABAJO?',
    },
    {
      questionText: '¿TIENE FILTRO DE AIRE?',
    },
    {
      questionText: '¿FALTA ANTENA?',
    },
    {
      questionText: '¿FUNCIONAN ESPEJOS?',
    },
    {
      questionText: '¿PARABRISA ROTO?',
    },
    {
      questionText: '¿FARO ROTO?',
    },
    {
      questionText: '¿TIENE BATERIA?',
    },
    {
      questionText: '¿TIENE SOPORTE BATERIA?',
    },
    {
      questionText: '¿TIENE LIMPIA PARABRISA DEI-ANTERO?',
    },
    {
      questionText: '¿TIENE I-IMPIA PARABRISA TRASERO?',
    },
    {
      questionText: '¿TIENE CUBRE BARRO LH?',
    },
    {
      questionText: '¿TIENE CUBRE BARRO RH?',
    },
    {
      questionText: '¿TIENE CATALIZADOR?',
    },
    {
      questionText: 'OBSERVACION',
    },
  ],
};
