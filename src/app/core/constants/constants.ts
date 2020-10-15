import { UserRoleEnum } from '../enums/user-role.enum';

const studentMenu = [
  { name: 'Home', icon: 'house', url: '/home' },
  { name: 'Meu treino', icon: 'fitness_center', url: '/atleta/treino' },
  { name: 'Cadastrar metas', icon: 'anchor', url: '/metas' },
];
const teacherMenu = [
  { name: 'Cadastrar aluno', icon: 'person_add', url: '/atleta' },
  { name: 'Meu treino', icon: 'person_add_alt_1', url: '/treinador/cadastro-treinador' },
  { name: 'Cadastrar treino', icon: 'create', url: '/treinador/cadastro-treino' },
  { name: 'Meus alunos', icon: 'groups', url: '/treinador/meus-atletas' },
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
      ...studentMenu,
      ...teacherMenu,
      { name: 'Cadastrar treinador', icon: 'anchor', url: '/metas' },
      { name: 'Treinadores', icon: 'group', url: '/treinador/lista' },
    ]
  ],
  [
    UserRoleEnum.TEACHER,
    [
      ...studentMenu,
      ...teacherMenu
    ]
  ],

]);
