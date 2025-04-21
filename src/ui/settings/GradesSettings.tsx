import React, { useEffect, useState } from "react";
import "../../styles/app/globals.css";
import { Heading, List, ListItem } from "../Components";
import { decodeGrade } from "../../utils/decode/decode_grade";
import { Grade, SubjectAverage } from "../../types/types";
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
import { getSubjectAverage } from "../../utils/calc/subject_average";

const GradesSettings: React.FC = () => {
  return (
    <div className="flex flex-col p-2">
      {/* Only render Graph if averages are loaded */}
      <div className="h-5" />
      <AverageHistoryGraph
        studentLabel="Moyenne gén."
        classLabel="Moyenne classe"
      />
      <Subjects />
    </div>
  );
};

interface SubjectData {
  [key: string]: Subject;
}

const Subjects: React.FC = () => {
  const [subjectAverages, setSubjectAverages] = useState<SubjectAverage[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectData>({});
  const [selectedSubject, setSelectedSubject] = useState<SubjectAverage | null>(
    null,
  );

  const [grades, setGrades] = useState<Grade[]>([]);

  const studentDiff = getAverageDiff(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    grades,
  );
  const classDiff = getAverageDiff(
    grades.filter((g) => g.subject.name === selectedSubject?.subject.name),
    grades,
    "average",
  );

  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    chrome.storage.sync.get("subjectData", (result) => {
      let subjectData = result.subjectData;

      setSubjectData(subjectData);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.get("DernieresNotes", async (result) => {
      const { period } = await chrome.storage.sync.get("mainChartPeriod");
      setSelectedPeriod(period);
      let rawGrades = result.DernieresNotes[selectedPeriod];
      const isYear = selectedPeriod === "Année";

      if (isYear) {
        let grades = [];

        for (let key in result.DernieresNotes) {
          if (key !== "Année")
            grades.push(
              ...result.DernieresNotes[key].donneesSec.data.listeDevoirs.V.map(
                (grade: any) => decodeGrade(grade),
              ),
            );
        }

        console.log(grades);

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
            subject: {
              id: key,
              name: key,
              inGroups: false,
            },
            backgroundColor: color,
          });
        }

        console.log(subject_averages);

        if (selectedSubject) {
          setSelectedSubject((prevSubject) =>
            (subject_averages.find(
              (s: any) => s.subject.name === prevSubject?.subject.name,
            ) as SubjectAverage),
          );
        } else {
          setSubjectAverages(subject_averages as SubjectAverage[]);
        }

        setGrades(grades);
      } else if (rawGrades) {
        const grades = rawGrades.donneesSec.data.listeDevoirs.V.map((g: any) =>
          decodeGrade(g),
        );
        const subject_averages = rawGrades.donneesSec.data.listeServices.V.map(
          (subject: any) => decodeSubjectAverage(subject),
        );

        if (selectedSubject) {
          setSelectedSubject((prevSubject) =>
            (subject_averages.find(
              (s: any) => s.subject.name === prevSubject?.subject.name,
            ) as SubjectAverage),
          );
        } else {
          setSubjectAverages(subject_averages);
        }


        setGrades(grades);
      }

    });
  }, [selectedPeriod]);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, _namespace) => {
      if (changes.selectedPeriod)
        setSelectedPeriod(changes.selectedPeriod.newValue);

      if (changes.mainChartPeriod)
        setSelectedPeriod(changes.mainChartPeriod.newValue);
    });
  }, []);

  return (
    <div className="mt-4 flex flex-col">
      <Drawer state={[selectedSubject, setSelectedSubject]}>
        <div className="flex flex-col px-4 pb-2">
          {selectedSubject && (
            <>
              <AverageHistoryGraph
                studentLabel="Moyenne"
                classLabel="Moyenne classe"
                subject={selectedSubject.subject.name}
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
