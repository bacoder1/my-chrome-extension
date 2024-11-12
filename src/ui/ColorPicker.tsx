import React, { useEffect, useState } from "react";
import colorList from "../utils/colors.json";
import "../styles/app/globals.css";
import { AnimatePresence, motion } from "motion/react";
import Button from "./Button";

interface colorListProps {
	id: string;
	name: string;
	rgb: {
		primary: string;
		darker: string;
		lighter: string;
		dark: string;
	};
	description: string;
}

const ColorPicker: React.FC = () => {
	const [selectedColor, setSelectedColor] = useState(colorList[0]);

	// Fetch the stored accent color once when the component mounts
	useEffect(() => {
		chrome.storage.sync.get("accentColor", (result) => {
			setSelectedColor(result.accentColor);
			console.log(result.accentColor, colorList[0]);
		});
	}, []);

	const setAccentColor = (color: colorListProps) => {
		chrome.storage.sync.set({ accentColor: color });
		setSelectedColor(color); // Update local state for immediate feedback
	};

	return (
		<>
			<div className="grid w-fit gap-8 grid-cols-3 mb-8 mx-auto">
				{colorList.map((color) => {
					const isSelected = selectedColor.id === color.id;

					return (
						<motion.div
							style={{
								backgroundColor: `rgba(${color.rgb.primary}, 1)`,
								outlineColor: `rgba(${color.rgb.primary}, 1)`,
							}}
							className={`size-10 transition-colors rounded-full cursor-pointer hover:opacity-25 ${
								isSelected ? "outline outline-4 outline-offset-4" : ""
							}`}
							whileTap={{ scale: 0.8 }}
              onClick={() => setSelectedColor(color)}
							whileHover={{ scale: !isSelected ? 1.2 : 1 }}
						/>
					);
				})}
			</div>
			<div className="relative">
				<AnimatePresence>
					<motion.p
						style={{
							color: `rgba(${selectedColor.rgb.primary}, 1)`,
							backgroundColor: `rgba(${selectedColor.rgb.primary}, 0.2)`,
							translate: "-50% -50%",
						}}
						key={selectedColor.id}
						className="text-center px-3 py-1 font-bold w-max select-none absolute top-1/2 left-1/2 rounded-full"
						initial={{ y: -30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 30, opacity: 0 }}>
						{selectedColor.description}
					</motion.p>
					<p className="opacity-0 my-5">{selectedColor.description}</p>
				</AnimatePresence>
			</div>
			<Button style={{ backgroundColor: `rgba(${selectedColor.rgb.primary}, 1)` }} className="" onClick={() => setAccentColor(selectedColor)}>
				Finaliser
			</Button>
		</>
	);
};

export default ColorPicker;
