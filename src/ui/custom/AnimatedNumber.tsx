import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: string | any;
  className?: string; // Tailwind CSS classes for text styling
  containerClassName?: string; // Tailwind CSS classes for container styling
  style?: React.CSSProperties;
  color?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className,
  containerClassName,
  style,
  color
}) => {
  const shouldAnimate = true;

  return (
    <motion.div
      className={`flex flex-row relative items-end overflow-hidden px-1 -mx-1.5 py-0.5 -my-0.5 ${containerClassName}`}
      layout={shouldAnimate ? true : false} // Enable layout animations
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      style={{...style, color: color || "black"}}
    >
      <AnimatePresence mode="popLayout">
        {value.toString().split("").map((n: string, i: number) => (
          <motion.div
            key={`${value}_${i}`}
            initial={shouldAnimate ? { y: -20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              delay: i * 0.02 + 0.02, // Delay based on index
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
            layout={shouldAnimate ? true : false} // Enable layout animations
          >
            <span className={className}>{n}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedNumber;