import React, { useEffect, useState } from "react";
import "../../styles/app/globals.css";
import { Heading, List, ListItem } from "../Components";
import { decodeGrade } from "../../utils/decode/decode_grade";
import { getPronoteAverage } from "../../utils/calc/pronote_average";
import { Grade, SubjectAverage } from "../../types/types";
import getAveragesHistory from "../../utils/calc/average_history";
import _ from "lodash";
import { motion } from "motion/react";
import { decodeSubjectAverage } from "../../utils/decode/decode_subject-average";
import { getSubjectEmoji } from "../../utils/emoji/get_subject_emoji";
import { formatSubjectName } from "../../utils/format/format_subject_name";
import { Subject } from "./SubjectsSettings";
import Drawer from "../custom/Drawer";
import AverageHistoryGraph from "../custom/AverageHistoryGraph";
import { getAverageDiff } from "../../utils/calc/average_diff";
import { adjustColor } from "../../utils/color/adjust_color";
import Picker from "../custom/Picker";
import { ChevronDown } from "lucide-react";
import { getSubjectAverage } from "../../utils/calc/subject_average";

const GradesSettings: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjectAverages, setSubjectAverages] = useState<SubjectAverage[]>([]);
  const [studentAverage, setStudentAverage] = useState<number | null>(null); // Initialize as null
  const [classAverage, setClassAverage] = useState<number | null>(null); // Initialize as null
  const [studentHistory, setStudentHistory] = useState<any>([]);
  const [classHistory, setClassHistory] = useState<any>([]);

  const [periods, setPeriods] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    chrome.storage.local.get("DernieresNotes", async (result) => {
      let rawGrades = result.DernieresNotes[selectedPeriod];
      const isYear = selectedPeriod === "Année";
      let latestPeriod = "";
      let latestDate = new Date(0); // January 1, 1970
      let periods = Object.keys(result.DernieresNotes).filter(
        (key) => key !== "Année",
      );

      for (let period of periods) {
        let rawGrades =
          result.DernieresNotes[period]?.donneesSec?.data?.listeDevoirs?.V;

        if (rawGrades && rawGrades.length > 0) {
          // Find the most recent grade date in this period
          let mostRecentGradeDate = rawGrades
            .map((grade: any) => {
              const [day, month, year] = grade.date.V.split("/").map(Number);

              return new Date(year, month - 1, day);
            })
            .reduce(
              (latest: any, current: any) =>
                current > latest ? current : latest,
              new Date(0), // Start with oldest date as initial value
            );

          if (mostRecentGradeDate > latestDate) {
            latestDate = mostRecentGradeDate;
            latestPeriod = period;
          }
        }
      }

      // Only set the selected period if it hasn't been set already
      if (selectedPeriod === "") {
        setSelectedPeriod(latestPeriod || "Année"); // Fallback to "Année" if no period has grades
      }

      setPeriods([...periods, "Année"]);

      if (isYear) {
        let grades = [];

        for (let key in result.DernieresNotes) {
          grades.push(
            ...result.DernieresNotes[key].donneesSec.data.listeDevoirs.V.map(
              (grade: any) => decodeGrade(grade),
            ),
          );
        }

        console.log(grades);
        const student_average = getPronoteAverage(grades, "value");
        const class_average = getPronoteAverage(grades, "average");
        console.log(student_average);

        const groupedBySubject = grades.reduce(
          (acc: Record<string, Grade[]>, grade) => {
            (acc[grade.subject.name] ||= []).push(grade);
            return acc;
          },
          {},
        );

        let subject_averages = [];

        for (let key in groupedBySubject) {
          const grades = groupedBySubject[key];
          const result = await chrome.storage.local.get("subjectData");
          const color = result.subjectData?.[key]?.color; // Use optional chaining to avoid errors if undefined

          subject_averages.push({
            student: { kind: 0, points: getSubjectAverage(grades, "value") },
            outOf: { kind: 0, points: 20 },
            defaultOutOf: { kind: 0, points: 20 },
            class_average: {
              kind: 0,
              points: getSubjectAverage(grades, "average"),
            },
            min: { kind: 0, points: getSubjectAverage(grades, "min") },
            max: { kind: 0, points: getSubjectAverage(grades, "max") },
            subject: {
              id: key,
              name: key,
              inGroups: false,
            },
            backgroundColor: color,
          });
        }

        console.log(subject_averages);
        let studentHistory = [];
        let classHistory = [];

        for (let key in result.DernieresNotes) {
          const grades = result.DernieresNotes[
            key
          ].donneesSec.data.listeDevoirs.V.map((grade: any) =>
            decodeGrade(grade),
          );

          studentHistory.push(...getAveragesHistory(grades, "value"));
          classHistory.push(...getAveragesHistory(grades, "average"));
        }

        setStudentHistory(studentHistory);
        setClassHistory(classHistory);

        setSubjectAverages(subject_averages as any);

        console.log(
          grades,
          student_average,
          class_average,
          studentHistory,
          classHistory,
          subject_averages,
        );

        setGrades(grades);
        setStudentAverage(student_average); // Update state with fetched average
        setClassAverage(class_average); // Update state with fetched average
      } else if (rawGrades) {
        const student_average = Number(
          rawGrades.donneesSec.data.moyGenerale.V.replace(",", "."),
        );
        const class_average = Number(
          rawGrades.donneesSec.data.moyGeneraleClasse.V.replace(",", "."),
        );

        const grades = rawGrades.donneesSec.data.listeDevoirs.V.map(
          (grade: any) => decodeGrade(grade),
        );

        const subject_averages = rawGrades.donneesSec.data.listeServices.V.map(
          (subject: any) => decodeSubjectAverage(subject),
        );

        const studentHistory = getAveragesHistory(
          grades,
          "value",
          student_average,
        );
        const classHistory = getAveragesHistory(
          grades,
          "average",
          class_average,
        );

        setStudentHistory(studentHistory);
        setClassHistory(classHistory);

        setSubjectAverages(subject_averages);

        setGrades(grades);
        setStudentAverage(student_average); // Update state with fetched average
        setClassAverage(class_average); // Update state with fetched average
      }
    });
  }, [selectedPeriod]); // Empty dependency array to run only once

  return (
    <div className="flex flex-col p-2">
      {/* Only render Graph if averages are loaded */}
      <Picker
        selected={async () => {
          return { label: selectedPeriod };
        }}
        onSelect={(item) => item && setSelectedPeriod(item.label)}
        data={periods.map((period) => ({ label: period }))}
      >
        <div className="card flex h-9 cursor-pointer items-center justify-center gap-2 text-sm font-semibold transition-colors ease-in-out hover:bg-black/5">
          <span>{selectedPeriod}</span>
          <ChevronDown size={20} />
        </div>
      </Picker>
      <div className="h-5" />
      {studentAverage && classAverage ? (
        <AverageHistoryGraph
          overall={studentAverage}
          classAverage={classAverage}
          studentData={studentHistory}
          classData={classHistory}
          studentLabel="Moyenne gén."
          classLabel="Moyenne classe"
        />
      ) : null}
      <Subjects subjectAverages={subjectAverages} grades={grades} />
    </div>
  );
};

interface SubjectsProps {
  subjectAverages: SubjectAverage[];
  grades: Grade[];
  isYear?: boolean;
}

interface SubjectData {
  [key: string]: Subject;
}

const Subjects: React.FC<SubjectsProps> = ({
  subjectAverages,
  grades,
}: SubjectsProps) => {
  const [subjectData, setSubjectData] = useState<SubjectData>({});
  const [selectedSubject, setSelectedSubject] = useState<SubjectAverage | null>(
    null,
  );

  const studentHistory = getAveragesHistory(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    "value",
    selectedSubject?.student?.points,
  );
  const classHistory = getAveragesHistory(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    "average",
    selectedSubject?.class_average?.points,
  );

  const studentDiff = getAverageDiff(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    grades,
  );
  const classDiff = getAverageDiff(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    grades,
    "average",
  );

  useEffect(() => {
    chrome.storage.sync.get("subjectData", (result) => {
      let subjectData = result.subjectData;

      setSubjectData(subjectData);
    });
  }, []);

  return (
    <div className="mt-4 flex flex-col">
      <Drawer state={[selectedSubject, setSelectedSubject]}>
        <div className="flex flex-col px-4 pb-2">
          {selectedSubject && (
            <>
              <AverageHistoryGraph
                overall={selectedSubject.student?.points || NaN}
                classAverage={selectedSubject.class_average?.points || NaN}
                studentData={studentHistory}
                classData={classHistory}
                studentLabel="Moyenne"
                classLabel="Moyenne classe"
                color={
                  subjectData[selectedSubject.subject.name]?.color
                    ? subjectData[selectedSubject.subject.name].color
                    : selectedSubject.backgroundColor
                }
              />
              <List className="mt-4">
                {selectedSubject.max && (
                  <ListItem
                    className="px-3 py-1 !font-medium text-black/50"
                    trailing={
                      <div className="text-lg !font-bold text-black">
                        {selectedSubject.max.points.toFixed(2)}
                      </div>
                    }
                    title={"Moyenne la plus haute"}
                    index={0}
                  />
                )}
                {selectedSubject.min && (
                  <ListItem
                    className="px-3 py-1 !font-medium text-black/50"
                    trailing={
                      <div className="text-lg !font-bold text-black">
                        {selectedSubject.min.points.toFixed(2)}
                      </div>
                    }
                    title={"Moyenne la plus basse"}
                    index={1}
                  />
                )}
              </List>
              <List className="mb-2 mt-4">
                <ListItem
                  className="px-3 py-1 !font-medium text-black/50"
                  trailing={
                    <div
                      className="text-lg !font-bold"
                      style={{
                        color:
                          studentDiff < 0
                            ? "#F44336"
                            : studentDiff > 0
                              ? "#4CAF50"
                              : "black",
                      }}
                    >
                      {studentDiff < 0 ? "-" : studentDiff > 0 ? "+" : "="}{" "}
                      {studentDiff.toFixed(2).replace("-", "")} pts
                    </div>
                  }
                  title={"Impact sur la moyenne"}
                  index={0}
                />
                <ListItem
                  className="px-3 py-1 !font-medium text-black/50"
                  trailing={
                    <div
                      className="text-lg !font-bold"
                      style={{
                        color:
                          classDiff < 0
                            ? "#F44336"
                            : classDiff > 0
                              ? "#4CAF50"
                              : "black",
                      }}
                    >
                      {classDiff < 0 ? "-" : classDiff > 0 ? "+" : "="}{" "}
                      {classDiff.toFixed(2).replace("-", "")} pts
                    </div>
                  }
                  title={"Impact moy. de classe"}
                  index={1}
                />
              </List>
              <Heading
                title={`Notes - ${
                  grades.filter(
                    (g) => g.subject.name === selectedSubject.subject.name,
                  ).length
                }`}
              />
              <List>
                {grades
                  .filter(
                    (g) => g.subject.name === selectedSubject.subject.name,
                  )
                  .map((grade, index) => (
                    <ListItem
                      subtitle={
                        "le " +
                        grade.date.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      }
                      className="px-3 py-2"
                      trailing={
                        <motion.div layout className="flex items-center">
                          <div className="flex items-end">
                            <div className="text-lg font-bold">
                              {grade.value.points.toFixed(2)}
                            </div>
                            <span className="ml-0.5 text-sm font-semibold text-black/30">
                              /{grade.outOf.points}
                            </span>
                          </div>
                        </motion.div>
                      }
                      title={grade.comment || "Sans titre"}
                      index={index}
                    />
                  ))}
              </List>
            </>
          )}
        </div>
      </Drawer>
      <Heading title="Matières" />
      <List>
        {subjectAverages.map((subjectAverage, index) => {
          const emoji = subjectData[subjectAverage.subject.name]?.emoji
            ? subjectData[subjectAverage.subject.name].emoji
            : getSubjectEmoji(subjectAverage.subject.name);

          return (
            <ListItem
              icon={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emoji.codePointAt(0)?.toString(16) || "2753"}.svg`}
              title={
                subjectData[subjectAverage.subject.name]?.pretty
                  ? subjectData[subjectAverage.subject.name].pretty
                  : formatSubjectName(subjectAverage.subject.name)
              }
              style={{
                backgroundColor: subjectData[subjectAverage.subject.name]?.color
                  ? subjectData[subjectAverage.subject.name].color + "05"
                  : subjectAverage.backgroundColor + "05",
                color: subjectData[subjectAverage.subject.name]?.color
                  ? adjustColor(
                      subjectData[subjectAverage.subject.name].color,
                      -100,
                    )
                  : adjustColor(subjectAverage.backgroundColor, -100),
              }}
              className="cursor-pointer"
              onClick={() => {
                setSelectedSubject(subjectAverage);
              }}
              index={index}
              chevron={false}
              trailing={
                <motion.div
                  layout
                  className="mr-3 flex items-center text-black"
                >
                  <div className="flex items-end">
                    <div className="text-lg font-bold">
                      {subjectAverage.student?.points.toFixed(2)}
                    </div>
                    <span className="mb-1 ml-0.5 text-sm font-semibold text-black/30">
                      /20
                    </span>
                  </div>
                </motion.div>
              }
            />
          );
        })}
      </List>
    </div>
  );
};

export default GradesSettings;
