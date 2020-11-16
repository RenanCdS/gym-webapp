import { UserRoleEnum } from '../enums/user-role.enum';

const studentMenu = [
  { name: 'Home', icon: 'house', url: '/home' },
  { name: 'Meu treino', icon: 'fitness_center', url: '/atleta' },
];
const teacherMenu = [
  { name: 'Cadastrar aluno', icon: 'person_add', url: '/atleta' },
  { name: 'Cadastrar treino', icon: 'create', url: '/treinador/cadastro-treino' },
  { name: 'Meus alunos', icon: 'groups', url: '/treinador/meus-atletas' },
];
export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_MENU = 'user_menu';
export const MENU_OPTIONS = new Map([
  [
    UserRoleEnum.STUDENT,
    [
      { name: 'Home', icon: 'anchor', url: '/home' },
      ...studentMenu
    ]
  ],
  [
    UserRoleEnum.STAFF,
    [
      { name: 'Home', icon: 'anchor', url: '/home' },
      { name: 'Cadastrar treinador', icon: 'anchor', url: '/treinador' },
      { name: 'Treinadores', icon: 'group', url: '/treinador/lista' },
    ]
  ],
  [
    UserRoleEnum.TEACHER,
    [
      { name: 'Home', icon: 'anchor', url: '/home' },
      { name: 'Cadastrar aluno', icon: 'anchor', url: '/atleta' },
      { name: 'Meus alunos', icon: 'groups', url: '/treinador/meus-atletas' },
    ]
  ],

]);
