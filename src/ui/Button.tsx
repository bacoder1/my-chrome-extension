import { motion } from "motion/react";
import React from "react";
import { useAppState } from "../context/StateContext";

interface ButtonProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  accentColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  disabled = false,
  onClick,
  className = "",
  accentColor,
}: ButtonProps) => {
  const { themeColor } = useAppState();
  if (!accentColor) accentColor = `rgba(${themeColor.rgb.primary}, 1)`;

  return (
    <motion.button
      className={`m-2 h-10 rounded-xl text-center text-base font-semibold uppercase tracking-wider text-white transition-colors ${className}`}
      onClick={onClick}
      style={{ backgroundColor: accentColor, ...style }}
      disabled={disabled}
      whileHover={{ opacity: 0.25 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
