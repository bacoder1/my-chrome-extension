import { motion } from "motion/react";

interface ColorSwatchProps {
  color: string;
  selected: boolean;
  onClick?: () => void;
  size?: number;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  selected,
  onClick,
  size = 24,
  className = "",
}: ColorSwatchProps) => {
  return (
    <motion.div
      style={{
        backgroundColor: color,
        outlineColor: color,
        height: size,
        width: size,
        outlineWidth: size / 10,
        outlineOffset: size / 10
      }}
      className={`cursor-pointer rounded-full transition-colors hover:opacity-25 ${
        selected ? "outline" : ""
      } ${className}`}
      whileTap={{ scale: 0.8 }}
      onClick={() => onClick && onClick()}
      whileHover={{ scale: !selected ? 1.2 : 1 }}
    />
  );
};

export default ColorSwatch;
