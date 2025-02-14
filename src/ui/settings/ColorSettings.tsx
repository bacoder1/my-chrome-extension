import React, { useState } from "react";
import colorList from "../../utils/data/colors.json";
import "../../styles/app/globals.css";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../Components";
import { useAppState } from "../../context/StateContext";
import ColorSwatch from "../custom/ColorSwatch";

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

const ColorSelector: React.FC = () => {
  const { themeColor, setThemeColor } = useAppState();
  const [selectedColor, setSelectedColor] = useState(themeColor);

  const setAccentColor = (color: colorListProps) => {
    chrome.storage.sync.set({ accentColor: color });
    setThemeColor(color); // Update local state for immediate feedback
    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col p-1">
      <div className="mx-auto mb-8 grid w-fit grid-cols-3 gap-8">
        {colorList.map((color) => {
          const isSelected = selectedColor.id === color.id;

          return (
            <ColorSwatch
              color={`rgba(${color.rgb.primary}, 1)`}
              size={44}
              onClick={() => setSelectedColor(color)}
              selected={isSelected}
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
            className="absolute left-1/2 top-1/2 w-max select-none rounded-full px-3 py-1 text-center font-bold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            {selectedColor.description}
          </motion.p>
          <p className="my-5 opacity-0">{selectedColor.description}</p>
        </AnimatePresence>
      </div>
      <Button
        accentColor={`rgba(${selectedColor.rgb.primary}, 1)`}
        onClick={() => setAccentColor(selectedColor)}
      >
        Valider
      </Button>
    </div>
  );
};

export default ColorSelector;
