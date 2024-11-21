interface InfoBubbleProps {
	message: string;
}

const InfoBubble: React.FC<InfoBubbleProps> = ({
	message,
}: InfoBubbleProps) => {
	return <div className="font-medium px-4 text-black/50 mt-2 mb-5 rounded-xl border-2 border-black/15 mx-auto py-2">{message}</div>;
};

export default InfoBubble;
