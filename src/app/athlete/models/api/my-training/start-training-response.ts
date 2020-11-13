import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from '../exercise';

export interface StartTrainingResponse {
  trainingId: number;
  dailyTrainingId: number;
  isStarted: boolean;
  isFinished: boolean;
  exercises: Exercise[];
  trainingType: TrainingTypeEnum;
}
