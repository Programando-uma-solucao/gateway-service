export interface RecoverQuestionResponseDTO {
  hasResponse: boolean;
  tags: string[];
  _id: string;
  question: string;
  accountId: string;
  questionerName: string;
}
