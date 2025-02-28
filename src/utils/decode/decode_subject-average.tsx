import { SubjectAverage } from "../../types/types";
import { decodeGradeValue } from "./decode_grade-value";
import { decodeSubject } from "./decode_subject";

export const decodeSubjectAverage = (average: any): SubjectAverage => {
  return {
    student: average.moyEleve && decodeGradeValue(average.moyEleve.V),
    outOf: average.baremeMoyEleve && decodeGradeValue(average.baremeMoyEleve.V),
    defaultOutOf: average.baremeMoyEleveParDefaut && decodeGradeValue(average.baremeMoyEleveParDefaut.V),
    class_average: average.moyClasse && decodeGradeValue(average.moyClasse.V),
    min: average.moyMin && decodeGradeValue(average.moyMin.V),
    max: average.moyMax && decodeGradeValue(average.moyMax.V),
    subject: decodeSubject(average),
    backgroundColor: average.couleur
  };
};