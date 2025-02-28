import { Grade } from "../../types/types";
import { decodeGradeValue } from "./decode_grade-value";
import { decodePronoteDate } from "./decode_pronote-date";
import { decodeSubject } from "./decode_subject";

export const decodeGrade = (grade: any): Grade => {
  const id = grade.N;
  const isBonus = grade.estBonus;

  return {
    id,
    value: decodeGradeValue(grade.note.V),
    outOf: decodeGradeValue(grade.bareme.V),
    defaultOutOf: decodeGradeValue(grade.baremeParDefaut.V),
    date: decodePronoteDate(grade.date.V),
    subject: decodeSubject(grade.service.V),
    average: grade.moyenne && decodeGradeValue(grade.moyenne.V),
    max: grade.noteMax && decodeGradeValue(grade.noteMax.V),
    min: grade.noteMin && decodeGradeValue(grade.noteMin.V),
    coefficient: grade.coefficient,
    comment: grade.commentaire,
    commentaireSurNote: grade.commentaireSurNote,
    isBonus,
    isOptional: grade.estFacultatif && !isBonus,
    isOutOf20: grade.estRamenerSur20,
  };
};