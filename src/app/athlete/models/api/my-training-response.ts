import { Exercise } from './exercise';

export interface TrainingStatusResponse {
  dailyTrainingId: number;
  trainingId: number;
  isStarted: boolean;
  isFinished: boolean;
  exercises: Exercise[];
}
