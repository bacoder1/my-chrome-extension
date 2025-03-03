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

const GradesSettings: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjectAverages, setSubjectAverages] = useState<SubjectAverage[]>([]);
  const [studentAverage, setStudentAverage] = useState<number | null>(null); // Initialize as null
  const [classAverage, setClassAverage] = useState<number | null>(null); // Initialize as null
  const [studentHistory, setStudentHistory] = useState<any>([]);
  const [classHistory, setClassHistory] = useState<any>([]);

  const [maxAverage, setMaxAverage] = useState<number | null>(null);
  const [minAverage, setMinAverage] = useState<number | null>(null);

  useEffect(() => {
    chrome.storage.local.get("DernieresNotes", (result) => {
      const rawGrades = result.DernieresNotes;

      if (!rawGrades) return;

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
      const classHistory = getAveragesHistory(grades, "average", class_average);

      setStudentHistory(studentHistory);
      setClassHistory(classHistory);

      setSubjectAverages(subject_averages);

      setGrades(grades);
      setStudentAverage(student_average); // Update state with fetched average
      setClassAverage(class_average); // Update state with fetched average

      setMaxAverage(getPronoteAverage(grades, "max"));
      setMinAverage(getPronoteAverage(grades, "min"));
    });
  }, []); // Empty dependency array to run only once

  return (
    <div className="flex flex-col p-2">
      {/* Only render Graph if averages are loaded */}
      {studentAverage && classAverage && minAverage && maxAverage ? (
        <AverageHistoryGraph
          overall={studentAverage}
          classAverage={classAverage}
          maxAverage={maxAverage}
          minAverage={minAverage}
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

  const maxAverage = getPronoteAverage(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    "max",
  );
  const minAverage = getPronoteAverage(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    "min",
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
                overall={selectedSubject.student?.points || 10}
                classAverage={selectedSubject.class_average?.points || 10}
                studentData={studentHistory}
                classData={classHistory}
                studentLabel="Moyenne"
                classLabel="Moyenne classe"
                maxAverage={maxAverage}
                minAverage={minAverage}
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
              <List className="mt-4 mb-2">
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
              <Heading title={`Notes - ${grades
                  .filter(
                    (g) => g.subject.name === selectedSubject.subject.name,
                  ).length}`}  />
              <List>
                {grades
                  .filter(
                    (g) => g.subject.name === selectedSubject.subject.name,
                  )
                  .map((grade, index) => (
                    <ListItem
                      subtitle={"le "+grade.date.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
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
          const emoji = subjectData[subjectAverage.subject.name]?.emoji ? subjectData[subjectAverage.subject.name].emoji : getSubjectEmoji(subjectAverage.subject.name);

          return (
            <ListItem
              icon={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emoji.codePointAt(0)?.toString(16) || "2753"}.svg`}
              title={subjectData[subjectAverage.subject.name]?.pretty ? subjectData[subjectAverage.subject.name].pretty : formatSubjectName(subjectAverage.subject.name)}
              style={{
                backgroundColor: subjectData[subjectAverage.subject.name]?.color
                  ? subjectData[subjectAverage.subject.name].color + "05"
                  : subjectAverage.backgroundColor + "05",
              }}
              className="cursor-pointer"
              onClick={() => {
                setSelectedSubject(subjectAverage);
              }}
              index={index}
              chevron={false}
              trailing={
                <motion.div layout className="mr-3 flex items-center">
                  <div className="flex items-end">
                    <div className="text-lg font-bold">
                      {subjectAverage.student?.points.toFixed(2)}
                    </div>
                    <span className="ml-0.5 mb-1 text-sm font-semibold text-black/30">
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
