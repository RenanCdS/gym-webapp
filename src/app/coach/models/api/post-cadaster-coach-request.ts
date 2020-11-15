import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { Coach } from '../coach';

export interface PostCadasterCoachRequest extends Coach {
  roleId: UserRoleEnum;
}
