import React, { useEffect, useRef, useState } from "react";
import "../../styles/app/globals.css";
import { Heading, List, ListItem } from "../Components";
import { decodeGrade } from "../../utils/decode/decode_grade";
import { getPronoteAverage } from "../../utils/calc/pronote_average";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { Grade, SubjectAverage } from "../../types/types";
import getAveragesHistory from "../../utils/calc/average_history";
import _ from "lodash";
import { useAppState } from "../../context/StateContext";
import AnimatedNumber from "../custom/AnimatedNumber";
import { motion, AnimatePresence } from "motion/react";
import { decodeSubjectAverage } from "../../utils/decode/decode_subject-average";
import { getSubjectEmoji } from "../../utils/emoji/get_subject_emoji";
import { formatSubjectName } from "../../utils/format/format_subject_name";
import { Subject } from "./SubjectsSettings";
import { ChevronDown } from "lucide-react";
import Drawer from "../custom/Drawer";
// import CanvasJSReact from "@canvasjs/react-charts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
        <Graph
          overall={studentAverage}
          classAverage={classAverage}
          maxAverage={maxAverage}
          minAverage={minAverage}
          studentData={studentHistory.map((g: any) => ({
            x: new Date(g.date).getTime(),
            y: !isNaN(g.value) ? g.value : (studentAverage ?? 10),
          }))}
          classData={classHistory.map((g: any) => ({
            x: new Date(g.date).getTime(),
            y: !isNaN(g.value) ? g.value : (classAverage ?? 10),
          }))}
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedSubjects, setExpandedSubjects] = useState<number[]>([]);
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
              <Graph
                overall={selectedSubject.student?.points || 10}
                classAverage={selectedSubject.class_average?.points || 10}
                studentData={studentHistory.map((g) => ({
                  x: new Date(g.date).getTime(),
                  y: !isNaN(g.value)
                    ? g.value
                    : (selectedSubject.student?.points ?? 10),
                }))}
                classData={classHistory.map((g) => ({
                  x: new Date(g.date).getTime(),
                  y: !isNaN(g.value)
                    ? g.value
                    : (selectedSubject.class_average?.points ?? 10),
                }))}
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
              <List className="my-4">
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
            </>
          )}
        </div>
      </Drawer>
      <Heading title="Matières" />
      {subjectAverages.map((subjectAverage, index) => {
        const emoji = getSubjectEmoji(subjectAverage.subject.name);
        const isHovered = hoveredIndex === index;
        const expanded = expandedSubjects.includes(index);

        return (
          <List>
            <ListItem
              icon={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emoji.codePointAt(0)?.toString(16) || "2753"}.svg`}
              title={formatSubjectName(subjectAverage.subject.name)}
              style={{
                backgroundColor: subjectData[subjectAverage.subject.name]?.color
                  ? subjectData[subjectAverage.subject.name].color + "11"
                  : subjectAverage.backgroundColor + "11",
              }}
              onClick={() => {
                setExpandedSubjects((p) => [...p, index]);
                setSelectedSubject(subjectAverage);
              }}
              index={index}
              chevron={false}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseEnter={() => {
                setHoveredIndex(index);
                console.log(index, "hi");
              }}
              trailing={
                <motion.div
                  layout
                  className="flex items-center justify-end gap-2"
                >
                  <div className="mr-3 text-lg font-bold">
                    {subjectAverage.student?.points.toFixed(2)}
                  </div>
                  {isHovered ? <ChevronDown /> : null}
                </motion.div>
              }
            />
            {expanded
              ? grades
                  .filter((g) => g.subject.name === subjectAverage.subject.name)
                  .map((grade, index) => (
                    <ListItem title={grade.comment} index={index} />
                  ))
              : null}
          </List>
        );
      })}
    </div>
  );
};

interface GraphProps {
  overall: number;
  classAverage: number;
  studentData: any;
  classData: any;
  studentLabel: string;
  classLabel: string;
  color?: string;
  maxAverage: number;
  minAverage: number;
}

const Graph: React.FC<GraphProps> = ({
  overall,
  classAverage,
  studentData,
  classData,
  studentLabel,
  classLabel,
  maxAverage,
  minAverage,
  color,
}: GraphProps) => {
  let accentColor = color;
  const { themeColor } = useAppState();
  if (!color) accentColor = `rgba(${themeColor.rgb.primary}, 1)`;

  // Use props to initialize state
  const [studentAverage, setStudentAverage] = useState(overall);
  const [studentDate, setStudentDate] = useState<null | Date>(null);

  const [classAverageState, setClassAverage] = useState(classAverage);
  const [classDate, setClassDate] = useState<null | Date>(null);

  const [activeChart, setActiveChart] = useState(false);
  const [chartMode, setChartMode] = useState<"student" | "class">("student");

  const [isDualLineMode, setIsDualLineMode] = useState(false);

  const chartRef = useRef<null | HTMLDivElement>(null);

  const [minHeight, setMinHeight] = useState<number | null>(null);

  const [chartExpanded, setChartExpanded] = useState(false);

  const studentButtonRef = useRef<null | HTMLDivElement>(null);
  const classButtonRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    chrome.storage.sync.get("chartDualLineMode", (result) => {
      let chartDualLineMode = result.chartDualLineMode;

      setIsDualLineMode(chartDualLineMode);
    });
    chrome.storage.onChanged.addListener((changes, _namespace) => {
      if (changes.chartDualLineMode)
        setIsDualLineMode(changes.chartDualLineMode.newValue);
    });
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current.firstChild as HTMLElement;
    const averagesElement = chartRef.current.querySelector(
      ".averages",
    ) as HTMLElement;

    if (chart && averagesElement) {
      const minHeight = chart.offsetHeight + averagesElement.offsetHeight + 20;

      setMinHeight(minHeight);
    }
  }, [chartRef]);

  const chartWidth = 300;
  const chartHeight = 150;

  return (
    <motion.div
      className="card relative flex select-none flex-col overflow-hidden pt-2"
      whileTap={{ scale: 0.95 }}
      ref={chartRef}
      layout
      onClick={(event) => {
        if (!studentButtonRef.current?.contains(event.target as Node) && !classButtonRef.current?.contains(event.target as Node))
          setChartExpanded(!chartExpanded);
      }}
      animate={{
        height:
          chartExpanded && minHeight
            ? "auto"
            : !chartExpanded && minHeight
              ? minHeight
              : "auto",
      }}
    >
      <div
        onMouseEnter={() => setActiveChart(true)}
        onMouseLeave={() => {
          setActiveChart(false);
          // Reset the active chart's average and date on mouse leave
          if (chartMode === "student") {
            setStudentAverage(overall);
            setStudentDate(null);
          } else {
            setClassAverage(classAverage);
            setClassDate(null);
          }
        }}
      >
        <VictoryChart
          width={chartWidth}
          height={chartHeight}
          padding={0}
          theme={VictoryTheme.clean}
          domainPadding={{ y: 6 }}
          defaultAxes={{
            independent: <></>,
            dependent: <></>,
          }}
          containerComponent={
            <VictoryVoronoiContainer
              onActivated={(points) => {
                const yValue = points[0].y.toFixed(2);
                const xValue = new Date(points[0].x);
                console.log(points);

                // Update the state based on the active chart mode
                if (
                  chartMode === "student" &&
                  points[0].style.data.opacity !== 0.3
                ) {
                  setStudentAverage(yValue);
                  setStudentDate(xValue);
                } else if (
                  chartMode === "class" &&
                  points[0].style.data.opacity !== 0.3
                ) {
                  setClassAverage(yValue);
                  setClassDate(xValue);
                }
              }}
            />
          }
        >
          {/* Student Line */}
          {(isDualLineMode || chartMode === "student") && ( // Render only in dual-line mode or if student mode is active
            <VictoryLine
              width={chartWidth}
              height={chartHeight}
              interpolation="monotoneX"
              data={studentData}
              style={{
                data: {
                  stroke: accentColor,
                  strokeWidth: 3,
                  opacity: isDualLineMode
                    ? chartMode === "student"
                      ? 1
                      : 0.3 // Fade out if inactive in dual-line mode
                    : 1, // Always fully opaque in single-line mode
                },
              }}
              animate={{ duration: 200 }}
            />
          )}
          {/* Student Scatter */}
          {(isDualLineMode || chartMode === "student") && ( // Render only in dual-line mode or if student mode is active
            <VictoryScatter
              width={chartWidth}
              height={chartHeight}
              data={studentData}
              size={({ active }) => (active ? 6 : 0)}
              animate={{ duration: 200 }}
              style={{
                data: {
                  fill: accentColor,
                  opacity: isDualLineMode
                    ? chartMode === "student"
                      ? 1
                      : 0.3 // Fade out if inactive in dual-line mode
                    : 1, // Always fully opaque in single-line mode
                },
              }}
            />
          )}

          {/* Class Line */}
          {(isDualLineMode || chartMode === "class") && ( // Render only in dual-line mode or if class mode is active
            <VictoryLine
              width={chartWidth}
              height={chartHeight}
              interpolation="monotoneX"
              data={classData}
              style={{
                data: {
                  stroke: "gray",
                  strokeWidth: 3,
                  opacity: isDualLineMode
                    ? chartMode === "class"
                      ? 1
                      : 0.3 // Fade out if inactive in dual-line mode
                    : 1, // Always fully opaque in single-line mode
                },
              }}
              animate={{ duration: 200 }}
            />
          )}
          {/* Class Scatter */}
          {(isDualLineMode || chartMode === "class") && ( // Render only in dual-line mode or if class mode is active
            <VictoryScatter
              width={chartWidth}
              height={chartHeight}
              data={classData}
              size={({ active }) => (active ? 6 : 0)}
              animate={{ duration: 200 }}
              style={{
                data: {
                  fill: "gray",
                  opacity: isDualLineMode
                    ? chartMode === "class"
                      ? 1
                      : 0.3 // Fade out if inactive in dual-line mode
                    : 1, // Always fully opaque in single-line mode
                },
              }}
            />
          )}
        </VictoryChart>
      </div>
      <div className="averages mb-2 mt-1 flex select-none justify-between px-3">
        {/* Student Average Section */}
        <div
          className="flex flex-col"
          onClick={() => setChartMode("student")}
          style={{ opacity: chartMode === "student" ? 1 : 0.4 }}
          ref={studentButtonRef}
        >
          <div className="relative overflow-hidden text-base font-semibold text-black/50">
            <span className="opacity-0">{studentLabel}</span>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeChart && studentDate ? "date" : "average"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 30,
                }}
                className="absolute inset-0"
                style={{
                  color: activeChart && studentDate ? accentColor : undefined,
                }}
              >
                {activeChart && studentDate
                  ? `au ${studentDate.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`
                  : studentLabel}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-end">
            <AnimatedNumber
              className="text-3xl font-bold"
              containerClassName=""
              value={Number(studentAverage).toFixed(2)}
            />
            <span className="ml-0.5 text-xl font-semibold text-black/30">
              /20
            </span>
          </div>
        </div>

        {/* Class Average Section */}
        <div
          className="flex flex-col"
          onClick={() => setChartMode("class")}
          style={{ opacity: chartMode === "class" ? 1 : 0.4 }}
          ref={classButtonRef}
        >
          <div className="relative overflow-hidden text-base font-semibold text-black/50">
            <span className="opacity-0">{classLabel}</span>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeChart && classDate ? "date" : "average"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 30,
                }}
                className="absolute right-0 top-0"
                style={{
                  color: activeChart && classDate ? accentColor : undefined,
                }}
              >
                {activeChart && classDate
                  ? `au ${classDate.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`
                  : classLabel}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-end justify-end">
            <AnimatedNumber
              className="text-3xl font-bold"
              containerClassName=""
              value={Number(classAverageState).toFixed(2)}
            />
            <span className="ml-0.5 text-xl font-semibold text-black/30">
              /20
            </span>
          </div>
        </div>
      </div>
      {minHeight && (
        <div className="flex flex-col">
          <ListItem
            className="px-3 py-1 !font-medium text-black/50"
            trailing={
              <div className="text-lg !font-bold text-black">
                {maxAverage.toFixed(2)}
              </div>
            }
            title={"Moyenne théorique max."}
            index={1}
          />
          <ListItem
            className="px-3 py-1 !font-medium text-black/50"
            trailing={
              <div className="text-lg !font-bold text-black">
                {minAverage.toFixed(2)}
              </div>
            }
            title={"Moyenne théorique min."}
            index={2}
          />
        </div>
      )}
    </motion.div>
  );
};

export default GradesSettings;
