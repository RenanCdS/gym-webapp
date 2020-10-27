import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from './exercise';

export interface MyTrainingResponse {
  trainingId: number;
  isStarted: boolean;
  isFinished: boolean;
  trainingType: TrainingTypeEnum;
  exercises: Exercise[];
}
