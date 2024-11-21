import { motion } from "motion/react";
import React from "react";

interface ButtonProps {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	style,
	disabled = false,
	onClick,
	className = ""
}: ButtonProps) => {
	return (
		<motion.button
			className={`uppercase rounded-xl text-white font-semibold transition-colors text-lg tracking-wider text-center h-12 m-2 ${className}`}
			onClick={onClick}
			style={style}
			disabled={disabled}
			whileHover={{ opacity: 0.25 }}
			whileTap={{ scale: 0.95 }}>
			{children}
		</motion.button>
	);
};

export default Button;
