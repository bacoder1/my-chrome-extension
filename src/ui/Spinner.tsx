import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppState } from "../context/StateContext";

interface SpinnerProps {
	size?: number;
	color?: string;
	strokeWidth?: number;
	style?: React.CSSProperties;
	className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
	size = 20,
	color,
	strokeWidth = 4,
	style,
	className = "",
}) => {
	const { themeColor } = useAppState();
	if (!color) color = `rgba(${themeColor.rgb.primary}, 1)`;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;

	return (
		<AnimatePresence>
			<motion.div
				style={{
					...style,
				}}
				initial={{ scale: 0, opacity: 0 }}
				exit={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1, rotate: [0, 360] }}
				className={`inline-flex justify-center items-center${className}`}
				transition={{
					repeat: Infinity,
					duration: 0.7,
					ease: "linear",
				}}>
				<svg width={size} height={size}>
					<g transform={`rotate(-90, ${size / 2}, ${size / 2})`}>
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							stroke={color}
							strokeWidth={strokeWidth}
							strokeDasharray={`${circumference * 0.75} ${
								circumference * 0.25
							}`}
							strokeLinecap="round"
							fill="none"
						/>
					</g>
				</svg>
			</motion.div>
		</AnimatePresence>
	);
};

export default Spinner;
