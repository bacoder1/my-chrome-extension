import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAppState } from "../../context/StateContext";

type PickerItem = null | {
  label: string;
  checked?: boolean;
  onSelect?: (item: PickerItem) => void;
};

interface PickerProps {
  children: React.ReactNode;
  data: PickerItem[];
  selected: () => Promise<PickerItem>;
  direction?: "left" | "right";
  onSelect?: (item: PickerItem) => void;
}

const Picker: React.FC<PickerProps> = ({
  children,
  direction,
  data,
  selected,
  onSelect
}: PickerProps) => {
  const [opened, setOpened] = useState(false);
  const { themeColor } = useAppState();

  const [currentSelected, setCurrentSelected] = useState<PickerItem | null>(null);

  useEffect(() => {
    // Fetch the selected ID asynchronously
    selected().then((item) => {
      setCurrentSelected(item);
    });
  }, []);

  return (
    <div className="relative select-none">
      <div onClick={() => setOpened(!opened)}>{children}</div>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="card bg-white absolute top-[calc(100%+0.5rem)] z-[99999] flex flex-col rounded-lg"
            style={direction === "left" ? { left: 0 } : { right: 0 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {data
              .filter((i) => i !== null)
              .map((item, index) => {
                return (
                  <div
                    className="flex w-full cursor-pointer text-sm font-semibold items-center justify-between gap-5 px-3 py-1.5"
                    key={index}
                    onClick={() => {
                      setOpened(false);
                      onSelect && onSelect(item);
                      item.onSelect && item.onSelect(item);
                      setCurrentSelected(item)
                    }}
                    style={{borderTop: index === 0 ? "none" : "0.5px solid rgba(0, 0, 0, 0.15)"}}
                  >
                    <span className="w-max whitespace-nowrap">{item.label}</span>
                    <motion.div animate={{scale: currentSelected?.label === item.label ? 1 : 0, opacity: currentSelected?.label === item.label ? 1 : 0}}>
                      <Check size={20} color={`rgba(${themeColor.rgb.primary}, 1)`} />
                    </motion.div>
                  </div>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Picker;
