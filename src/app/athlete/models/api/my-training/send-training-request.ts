export interface SendTrainingRequest {
  dailyTrainingId: number;
  isFinished: boolean;
  exercises: ExerciseStatus[];
}

export interface ExerciseStatus {
  exerciseId: number;
  completed: boolean;
}
