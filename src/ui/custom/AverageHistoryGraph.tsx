import { useEffect, useRef, useState } from "react";
import { useAppState } from "../../context/StateContext";
import { AnimatePresence, motion } from "motion/react";
import {
  VictoryChart,
  VictoryClipContainer,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import AnimatedNumber from "./AnimatedNumber";
import { decodeGrade } from "../../utils/decode/decode_grade";
import getAveragesHistory from "../../utils/calc/average_history";
import Picker from "./Picker";
import { ChevronDown } from "lucide-react";
import { getSubjectAverage } from "../../utils/calc/subject_average";
import { Grade } from "../../types/types";
import { getPronoteAverage } from "../../utils/calc/pronote_average";
import { decodeSubjectAverage } from "../../utils/decode/decode_subject-average";
import getLatestPeriod from "../../utils/format/latest_period";

interface AverageHistoryGraphProps {
  studentLabel: string;
  classLabel: string;
  color?: string;
  subject?: string;
}

const AverageHistoryGraph: React.FC<AverageHistoryGraphProps> = ({
  studentLabel,
  classLabel,
  color,
  subject,
}: AverageHistoryGraphProps) => {
  const [overall, setOverall] = useState(NaN);
  const [classOverall, setClassOverall] = useState(NaN);

  const [studentData, setStudentData] = useState<any>([]);
  const [classData, setClassData] = useState<any>([]);

  const processData = (data: any) => {
    return data.map((item: any, index: any) => ({
      x: index, // Use index for equal spacing
      y: item.value, // Keep the y-value
      date: item.date, // Preserve the date for tooltips
    }));
  };

  let accentColor = color;

  const { themeColor } = useAppState();
  if (!color) accentColor = `rgba(${themeColor.rgb.primary}, 1)`;

  // Use props to initialize state
  const [studentAverage, setStudentAverage] = useState(NaN);
  const [studentDate, setStudentDate] = useState<null | Date>(null);

  const [classAverage, setClassAverage] = useState(NaN);
  const [classDate, setClassDate] = useState<null | Date>(null);

  const [activeChart, setActiveChart] = useState(false);
  const [chartMode, setChartMode] = useState<"student" | "class">("student");

  const [isDualLineMode, setIsDualLineMode] = useState(false);

  const chartRef = useRef<null | HTMLDivElement>(null);

  const [chartExpanded, setChartExpanded] = useState(false);

  const studentButtonRef = useRef<null | HTMLDivElement>(null);
  const classButtonRef = useRef<null | HTMLDivElement>(null);

  const [periods, setPeriods] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    setStudentAverage(overall);
    setClassAverage(classOverall);
  }, [overall, classOverall]);

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

  const chartWidth = 450;
  const chartHeight = 160;

  useEffect(() => {
    chrome.storage.local.get("DernieresNotes", async (result) => {
      const { latestPeriod, periods } = getLatestPeriod(
        result.DernieresNotes,
        subject,
      );

      console.log(latestPeriod);

      if (subject) console.log("beforehand, we have", selectedPeriod);

      if (!subject) {
        if (selectedPeriod === "") {
          setSelectedPeriod(latestPeriod);
          chrome.storage.sync.set({ mainChartPeriod: latestPeriod });
        } else {
          chrome.storage.sync.set({ mainChartPeriod: selectedPeriod });
        }
        console.log("is not subject", selectedPeriod);
      }
      const { mainChartPeriod } =
        await chrome.storage.sync.get("mainChartPeriod");
      if (subject && selectedPeriod === "") {
        console.log("is subject, setting to " + mainChartPeriod);
        setSelectedPeriod(mainChartPeriod);
      }

      if (subject) console.log("in the end we have", selectedPeriod);

      setPeriods([...periods, "Année"]);

      let rawGrades = result.DernieresNotes[selectedPeriod];
      console.log("hey, is subject,", selectedPeriod);
      const isYear = selectedPeriod === "Année";

      if (isYear) {
        let grades: Grade[] = [];

        console.log(periods, Object.keys(result.DernieresNotes));

        periods.forEach((period) => {
          if (period !== "Année")
            grades.push(
              ...result.DernieresNotes[
                period
              ].donneesSec.data.listeDevoirs.V.map((grade: any) =>
                decodeGrade(grade),
              ).filter(
                (grade: any) => !subject || grade.subject.name === subject,
              ),
            );
        });

        console.log(grades);
        const student_average = getPronoteAverage(grades, "value");
        const class_average = getPronoteAverage(grades, "average");

        setOverall(student_average);
        setClassOverall(class_average);

        let studentHistory: any = [];
        let classHistory: any = [];

        periods.forEach((period) => {
          const grades = result.DernieresNotes[
            period
          ].donneesSec.data.listeDevoirs.V.map((grade: any) =>
            decodeGrade(grade),
          ).filter((grade: any) => !subject || grade.subject.name === subject);

          console.log(getPronoteAverage(grades), getSubjectAverage(grades));

          studentHistory.push(
            ...getAveragesHistory(
              grades,
              "value",
              subject
                ? result.DernieresNotes[
                    period
                  ].donneesSec.data.listeServices.V.map((s: any) =>
                    decodeSubjectAverage(s),
                  ).find((s: any) => s.subject.name === subject).student.points
                : undefined,
            ),
          );
          classHistory.push(
            ...getAveragesHistory(
              grades,
              "average",
              subject
                ? result.DernieresNotes[
                    period
                  ].donneesSec.data.listeServices.V.map((s: any) =>
                    decodeSubjectAverage(s),
                  ).find((s: any) => s.subject.name === subject).class_average.points
                : undefined,
            ),
          );
        });

        setStudentData(processData(studentHistory));
        setClassData(processData(classHistory));


        console.log(
          grades,
          student_average,
          class_average,
          studentHistory,
          classHistory,
        );

        setStudentAverage(student_average); // Update state with fetched average
        setClassAverage(class_average); // Update state with fetched average
      } else if (rawGrades) {
        const grades = rawGrades.donneesSec.data.listeDevoirs.V.map(
          (grade: any) => decodeGrade(grade),
        ).filter((grade: any) => !subject || grade.subject.name === subject);

        console.log(subject);
        console.log(rawGrades.donneesSec.data.listeServices.V);

        const student_average = subject
          ? decodeSubjectAverage(
              rawGrades.donneesSec.data.listeServices.V.find(
                (av: any) => av.L === subject,
              ),
            ).student?.points
          : Number(rawGrades.donneesSec.data.moyGenerale.V.replace(",", "."));
        const class_average = subject
          ? decodeSubjectAverage(
              rawGrades.donneesSec.data.listeServices.V.find(
                (av: any) => av.L === subject,
              ),
            ).class_average?.points
          : Number(
              rawGrades.donneesSec.data.moyGeneraleClasse.V.replace(",", "."),
            );

        setOverall(student_average || NaN);
        setClassOverall(class_average || NaN);

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

        setStudentData(processData(studentHistory));
        setClassData(processData(classHistory));

        setStudentAverage(student_average || NaN); // Update state with fetched average
        setClassAverage(class_average || NaN); // Update state with fetched average
      }
    });
  }, [selectedPeriod]);

  return (
    <>
      <Picker
        selected={async () => {
          return { label: selectedPeriod };
        }}
        onSelect={(item) => {
          if (item) {
            setSelectedPeriod(item.label);
            chrome.storage.sync.set({ selectedPeriod: item.label });
            if (!subject)
              chrome.storage.sync.set({ mainChartPeriod: item.label });
          }
        }}
        data={periods.map((period) => ({ label: period }))}
      >
        <div className="card flex h-9 cursor-pointer items-center justify-center gap-2 text-sm font-semibold transition-colors ease-in-out hover:bg-black/5">
          <span>{selectedPeriod}</span>
          <ChevronDown size={20} />
        </div>
      </Picker>
      <motion.div
        className="card relative mt-5 flex select-none flex-col overflow-hidden pt-2"
        whileTap={{ scale: 0.95 }}
        ref={chartRef}
        layout
        onClick={(event) => {
          if (
            !studentButtonRef.current?.contains(event.target as Node) &&
            !classButtonRef.current?.contains(event.target as Node)
          )
            setChartExpanded(!chartExpanded);
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
              setClassAverage(classOverall);
              setClassDate(null);
            }
          }}
        >
          <VictoryChart
            width={chartWidth}
            height={chartHeight}
            padding={{ right: 25, left: 10, top: 16, bottom: 16 }}
            theme={VictoryTheme.clean}
            domainPadding={{ y: 8 }}
            defaultAxes={{
              independent: <></>,
              dependent: <></>,
            }}
            containerComponent={
              <VictoryVoronoiContainer
                radius={40}
                onDeactivated={() => {}}
                onActivated={(points) => {
                  if (!points || points.length === 0) return;

                  const yValue = points[0].y.toFixed(2);
                  const xIndex = points[0].x; // Get the index
                  const xValue =
                    chartMode === "student"
                      ? new Date(studentData[xIndex].date)
                      : new Date(classData[xIndex].date);

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
            <VictoryGroup
              width={chartWidth}
              height={chartHeight}
              animate={{ duration: 400, easing: "cubicOut" }}
            >
              {/* Student Line */}
              {(isDualLineMode || chartMode === "student") && ( // Render only in dual-line mode or if student mode is active
                <VictoryLine
                  interpolation="catmullRom"
                  data={studentData}
                  groupComponent={
                    <VictoryClipContainer
                      clipPadding={{
                        top: 4,
                        right: 1,
                        left: 1,
                        bottom: 4,
                      }}
                    />
                  }
                  style={{
                    data: {
                      stroke: accentColor,
                      strokeWidth: 3,
                      strokeLinecap: "round",
                      opacity: isDualLineMode
                        ? chartMode === "student"
                          ? 1
                          : 0.3 // Fade out if inactive in dual-line mode
                        : 1, // Always fully opaque in single-line mode
                    },
                  }}
                />
              )}
              {/* Student Scatter */}
              {(isDualLineMode || chartMode === "student") && ( // Render only in dual-line mode or if student mode is active
                <VictoryScatter
                  data={studentData}
                  size={({ active, index }) => {
                    if (chartMode !== "student") return 0;

                    if (!studentDate && index === studentData.length - 1) {
                      return 6;
                    } else if (active && activeChart) {
                      return 6;
                    } else {
                      return 0;
                    }
                  }}
                  style={{
                    data: {
                      color: accentColor,
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
                  interpolation="catmullRom"
                  data={classData}
                  groupComponent={
                    <VictoryClipContainer
                      clipPadding={{
                        top: 4,
                        right: 1,
                        left: 1,
                        bottom: 4,
                      }}
                    />
                  }
                  style={{
                    data: {
                      stroke: "gray",
                      strokeWidth: 3,
                      strokeLinecap: "round",
                      opacity: isDualLineMode
                        ? chartMode === "class"
                          ? 1
                          : 0.3 // Fade out if inactive in dual-line mode
                        : 1, // Always fully opaque in single-line mode
                    },
                  }}
                />
              )}
              {/* Class Scatter */}
              {(isDualLineMode || chartMode === "class") && ( // Render only in dual-line mode or if class mode is active
                <VictoryScatter
                  data={classData}
                  size={({ active, index }) => {
                    if (chartMode !== "class") return 0;

                    if (!classDate && index === classData.length - 1) {
                      return 6;
                    } else if (active && activeChart) {
                      return 6;
                    } else {
                      return 0;
                    }
                  }}
                  style={{
                    data: {
                      color: "gray",
                      opacity: isDualLineMode
                        ? chartMode === "class"
                          ? 1
                          : 0.3 // Fade out if inactive in dual-line mode
                        : 1, // Always fully opaque in single-line mode
                    },
                  }}
                />
              )}
            </VictoryGroup>
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
                className="text-3xl transition-[font-weight]"
                value={Number(studentAverage).toFixed(2)}
                style={{ fontWeight: chartMode === "student" ? "700" : "600" }}
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
                className="text-3xl transition-[font-weight]"
                value={Number(classAverage).toFixed(2)}
                style={{ fontWeight: chartMode === "class" ? "700" : "600" }}
              />
              <span className="ml-0.5 text-xl font-semibold text-black/30">
                /20
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AverageHistoryGraph;
