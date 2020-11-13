export interface Exercise {
  exerciseId: number;
  exerciseName: string;
  weight: number;
  repetions: number;
  series: number;
  description: string;
  teacherName: string;
  exerciseImage: string;
  completed: boolean; // propriedade não mapeada na api
}
