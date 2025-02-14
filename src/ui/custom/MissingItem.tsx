interface MissingItemProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji?: string;
  title: string;
  subtitle: string;
}

const MissingItem: React.FC<MissingItemProps> = ({
  emoji = "❓",
  title,
  subtitle,
  style,
  className,
}: MissingItemProps) => {
  return (
    <div className={`flex flex-col items-center justify-center mt-4 card p-2 ${className}`} style={style}>
      <div className="text-3xl">{emoji}</div>
      <div className="text-center text-base font-medium mt-2 mb-1">{title}</div>
      <p className="text-black/60 text-center mx-4">{subtitle}</p>
    </div>
  );
};

export default MissingItem;
