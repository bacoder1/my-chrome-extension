export type GradeValue = {
  kind: GradeKind;
  points: number;
};

export const GradeKind = {
  Error: -1,
  Grade: 0,
  Absent: 1,
  Exempted: 2,
  NotGraded: 3,
  Unfit: 4,
  Unreturned: 5,
  AbsentZero: 6,
  UnreturnedZero: 7,
  Congratulations: 8
} as const;

export type GradeKind = typeof GradeKind[keyof typeof GradeKind];

export class UnreachableError extends Error {
  constructor(fn: string) {
    super(`Unreachable code reached in '${fn}' function, please open an issue on GitHub (LiterateInk/Pawnote)`);
    this.name = "UnreachableError";
  }
}

export type Grade ={
  /** the id of the grade (used internally) */
  id: string;
  /** the actual grade */
  value: GradeValue;
  /** the maximum amount of points */
  outOf: GradeValue;
  /** the default maximum amount of points */
  defaultOutOf?: GradeValue;
  /** the date on which the grade was given */
  date: Date;
  /** the subject in which the grade was given */
  subject: Subject;
  /** the average of the class */
  average?: GradeValue;
  /** the highest grade */
  max?: GradeValue;
  /** the lowest grade */
  min?: GradeValue;
  /** the coefficient of the grade */
  coefficient: number;
  /** comment on the grade description */
  comment: string;
  /** note on the grade */
  commentaireSurNote?: string;
  /** is the grade bonus : only points above 10 count */
  isBonus: boolean;
  /** is the grade optional : the grade only counts if it increases the average */
  isOptional: boolean;
  /** is the grade out of 20. Example 8/10 -> 16/20 */
  isOutOf20: boolean;
  /** the file of the subject */
  subjectFile?: Attachment;
  /** the file of the correction */
  correctionFile?: Attachment;
};

export type Attachment = {
  kind: AttachmentKind
  name: string
  url: string
  id: string
};

export const AttachmentKind = {
  Link: 0,
  File: 1
} as const;

export type AttachmentKind = typeof AttachmentKind[keyof typeof AttachmentKind];

export type Subject = Readonly<{
  id: string
  name: string

  /**
   * Whether the subject is only within groups.
   */
  inGroups: boolean
}>;

export type SubjectAverage = Readonly<{
  /** students average in the subject */
  student?: GradeValue;
  /** classes average in the subject */
  class_average?: GradeValue;
  /** highest average in the class */
  max?: GradeValue;
  /** lowest average in the class */
  min?: GradeValue;
  /** maximum amount of points */
  outOf?: GradeValue;
  /** the default maximum amount of points */
  defaultOutOf?: GradeValue;
  /** subject the average is from */
  subject: Subject;
  /** background color of the subject */
  backgroundColor: string;
}>;