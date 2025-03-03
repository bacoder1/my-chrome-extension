import { useEffect, useRef, useState } from "react";
import { useAppState } from "../../context/StateContext";
import { AnimatePresence, motion } from "motion/react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTheme, VictoryVoronoiContainer } from "victory";
import AnimatedNumber from "./AnimatedNumber";
import { ListItem } from "../Components";

interface AverageHistoryGraphProps {
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

const AverageHistoryGraph: React.FC<AverageHistoryGraphProps> = ({
  overall,
  classAverage,
  studentData,
  classData,
  studentLabel,
  classLabel,
  maxAverage,
  minAverage,
  color,
}: AverageHistoryGraphProps) => {
  const processData = (data: any) => {
    return data.map((item: any, index: any) => ({
      x: index, // Use index for equal spacing
      y: item.value, // Keep the y-value
      date: item.date, // Preserve the date for tooltips
    }));
  };

  let accentColor = color;

  studentData = processData(studentData);
  classData = processData(classData);

  console.log(studentData, classData);

  const { themeColor } = useAppState();
  if (!color) accentColor = `rgba(${themeColor.rgb.primary}, 1)`;

  console.log(studentData, classData);

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

  const chartWidth = 280;
  const chartHeight = 150;

  return (
    <motion.div
      className="card relative flex select-none flex-col overflow-hidden pt-2"
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
          domainPadding={{ y: 16 }}
          defaultAxes={{
            independent: <></>,
            dependent: <></>,
          }}
          containerComponent={
            <VictoryVoronoiContainer
              onDeactivated={() => {}}
              onActivated={(points) => {
                const yValue = points[0].y.toFixed(2);
                const xIndex = points[0].x; // Get the index
                const xValue =
                  chartMode === "student"
                    ? new Date(studentData[xIndex].date)
                    : new Date(classData[xIndex].date);
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
          <VictoryGroup
            width={chartWidth}
            height={chartHeight}
            animate={{ duration: 200 }}
          >
            {/* Student Line */}
            {(isDualLineMode || chartMode === "student") && ( // Render only in dual-line mode or if student mode is active
              <VictoryLine
                interpolation="catmullRom"
                data={studentData}
                style={{
                  data: {
                    stroke: accentColor,
                    strokeWidth: 2.5,
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
                size={({ active }) => (active ? 5 : 0)}
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
                style={{
                  data: {
                    stroke: "gray",
                    strokeWidth: 2.5,
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
                size={({ active }) => (active ? 5 : 0)}
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
              value={Number(classAverageState).toFixed(2)}
              style={{ fontWeight: chartMode === "class" ? "700" : "600" }}
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

export default AverageHistoryGraph;