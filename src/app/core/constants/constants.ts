import { UserRoleEnum } from '../enums/user-role.enum';
export const allMenuItems = [
  { name: 'Home', icon: 'house', url: '/home' },
  { name: 'Meu treino', icon: 'fitness_center', url: '/atleta/treino' },
  { name: 'Cadastrar aluno', icon: 'person_add', url: '/atleta' },
  { name: 'Cadastrar treinador', icon: 'person_add', url: '/treinador' },
  { name: 'Meus alunos', icon: 'groups', url: '/treinador/meus-atletas' },
  { name: 'Treinadores', icon: 'group', url: '/treinador/lista' },
];
const studentMenu = [
  { name: 'Home', icon: 'house', url: '/home' },
  { name: 'Meu treino', icon: 'fitness_center', url: '/atleta/treino' },
];
const teacherMenu = [
  { name: 'Home', icon: 'house', url: '/home' },
  { name: 'Cadastrar aluno', icon: 'person_add', url: '/atleta' },
  { name: 'Meus alunos', icon: 'groups', url: '/treinador/meus-atletas' },
  { name: 'Exercicios', icon: 'anchor', url: '/exercicio' },
];

const staffMenu = [
  { name: 'Home', icon: 'house', url: '/home' },
  { name: 'Cadastrar treinador', icon: 'person_add', url: '/treinador' },
  { name: 'Treinadores', icon: 'group', url: '/treinador/lista' },
];
export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_MENU = 'user_menu';
export const MENU_OPTIONS = new Map([
  [
    UserRoleEnum.STUDENT,
    [
      ...studentMenu
    ]
  ],
  [
    UserRoleEnum.STAFF,
    [
      ...staffMenu
    ]
  ],
  [
    UserRoleEnum.TEACHER,
    [
      ...teacherMenu
    ]
  ],

]);
