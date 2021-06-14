import { Question } from 'src/module/question/interfaces/Question';

export interface Answer {
  _id: string;
  answer: string;
  lawyerId: string;
  question: Question;
}
