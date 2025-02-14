import { useAppState } from "../../context/StateContext";

interface AboutCardProps {
  title: string;
  content: string;
  image: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const AboutCard: React.FC<AboutCardProps> = ({
  title,
  content,
  image,
  color,
  className = "",
  style,
}: AboutCardProps) => {
  const { themeColor } = useAppState();
  if (!color) color = `rgba(${themeColor.rgb.primary}, 0.15)`;

  return (
    <div
      className={`flex w-full select-none flex-col card overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="flex h-[6rem] items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <img src={image} className="size-[80%] object-contain" alt="" />
      </div>
      <div className="flex flex-col gap-[2px] px-3 py-2">
        <div className="font-semibold text-base">{title}</div>
        <p className="text-black/80">{content}</p>
      </div>
    </div>
  );
};

export default AboutCard;
