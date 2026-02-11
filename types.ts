
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum LessonStep {
  OxidationState = 'OXIDATION_STATE',
  RedoxConcept = 'REDOX_CONCEPT',
  BalancingSteps = 'BALANCING_STEPS',
  Practice = 'PRACTICE'
}

export interface ReactionExample {
  equation: string;
  difficulty: string;
}

export type BalancingStepId = 1 | 2 | 3 | 4;

export interface ValidationResult {
  isCorrect: boolean;
  feedback: string;
  hint?: string;
}
