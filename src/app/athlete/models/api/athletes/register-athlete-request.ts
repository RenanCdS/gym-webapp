import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { ExerciseToRegister } from './exercise-to-register';

export interface RegisterAthleteRequest {
  roleId: UserRoleEnum;
  name: string;
  age: number;
  email: string;
  phone: string;
  weight: number;
  height: number;
  password: string;
  trainingA: Training;
  trainingB: Training;
  trainingC: Training;
  ValidityDate: string;
}

export interface Training {
  exercises: ExerciseToRegister[];
}
