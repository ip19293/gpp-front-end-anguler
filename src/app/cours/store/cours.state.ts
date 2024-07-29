import { CoursInterface } from 'src/app/shared/types/cours.interface';

export interface CoursState {
  cours?: CoursInterface;
  message?: string;
  status?: string;
}
export const CoursInitState: CoursState = {
  message: '',
  status: '',
};
