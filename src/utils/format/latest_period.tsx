import { Grade } from "../../types/types";
import { decodeGrade } from "../decode/decode_grade";

export default function getLatestPeriod(data: any, subject?: string) {
  let latestPeriod = "";
  let latestDate = new Date(0); // January 1, 1970
  let periods = [];

  for (let key in data) {
    if (key !== "Année" && data[key].donneesSec.data.listeDevoirs.V.map((g: any) => decodeGrade(g)).filter((g: Grade) => !subject || g.subject.name === subject).length > 0) periods.push(key)
  }

  for (let period of periods) {
    let rawGrades = data[period]?.donneesSec?.data?.listeDevoirs?.V.map((g: any) => decodeGrade(g)).filter((g: Grade) => !subject || g.subject.name === subject);

    if (subject) console.log(rawGrades)

    if (rawGrades && rawGrades.length > 0) {
      // Find the most recent grade date in this period
      let mostRecentGradeDate = rawGrades
        .map((grade: any) => grade.date)
        .reduce(
          (latest: any, current: any) => (current > latest ? current : latest),
          new Date(0), // Start with oldest date as initial value
        );

      if (mostRecentGradeDate > latestDate) {
        latestDate = mostRecentGradeDate;
        latestPeriod = period;
      }
    }
  }

  return {latestPeriod, periods};
}
