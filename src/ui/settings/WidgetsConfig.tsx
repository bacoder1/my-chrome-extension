import { useEffect, useRef, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { GridStack } from "gridstack";
import colorList from "../../utils/data/colors.json";

const WidgetsConfig: React.FC = () => {
	const [selectedColor, setSelectedColor] = useState(colorList[0]);
	const [widgets, setWidgets] = useState<string[]>([]);
	const gridRef = useRef<null | GridStack>(null);

	const initializeGrid = () => {
		chrome.storage.sync.get("widgets", (result) => {
			if (result.widgets && !gridRef.current) {
				chrome.storage.sync.get("widgets", (result) => {
					gridRef.current = GridStack.init({ column: 3, cellHeight: 64});

					setWidgets(result.widgets);
				});
			}
		});
	};

	// Fetch the stored accent color once when the component mounts
	useEffect(() => {
		chrome.storage.sync.get("accentColor", (result) => {
			setSelectedColor(result.accentColor);
			console.log(result.accentColor, colorList[0]);
		});

		initializeGrid();
		chrome.storage.onChanged.addListener(() => {
			initializeGrid();
		});
	}, []);

	useEffect(() => {
		widgets.forEach((label: string) => {
			if (gridRef.current) {
				gridRef.current.addWidget({
					content: label,
					w: 1,
					h: 1,
					noResize: true,
				});
			}
		});
	}, [widgets]);

	return (
		<div className="p-1 flex flex-col">
			<div
				className="m-2 rounded-xl grid-stack p-2"
				style={{
					border: "1px solid rgba(0, 0, 0, 0.15)",
					boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
					backgroundColor: `rgba(${selectedColor.rgb.primary}, 0.02)`,
				}}></div>
		</div>
	);
};

export default WidgetsConfig;
