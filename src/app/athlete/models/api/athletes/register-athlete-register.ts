import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';

export interface RegisterAthleteRequest {
  roleId: UserRoleEnum;
  name: string;
  age: number;
  email: string;
  phone: string;
  weight: number;
  height: number;
  password: string;
}
