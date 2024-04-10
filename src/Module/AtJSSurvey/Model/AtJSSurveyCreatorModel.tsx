import { SurveyCreator } from "survey-creator-react";

export interface AtJSSurveyCreatorModel {
  content: string;
  creator?: SurveyCreator; // 會自動生成
}
export interface AtJSSurveyCreatorRef {
  getContent: () => string;
}
