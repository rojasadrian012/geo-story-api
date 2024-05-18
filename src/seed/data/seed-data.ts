import { ValidRoles } from 'src/auth/interface/valid-roles';

interface SeedUser {
  nickname: string;
  password: string;
  fullName: string;
  roles: string[];
}

interface Quizz {
  title: string;
}

interface SeedData {
  users: SeedUser[];
  quizzes: Quizz[]
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
    },
    {
      title: 'Historia',
    }, 
    {
      title: 'Geografia',
    }, 
    {
      title: 'Economia',
    }, 
    {
      title: 'Cultura',
    }, 
    {
      title: 'Turismo',
    },
  ],
};
