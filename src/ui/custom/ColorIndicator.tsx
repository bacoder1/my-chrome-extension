import indicatorMask from "../../assets/images/indicator_mask.png";

interface ColorIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  height?: number;
  width?: number;
}

const ColorIndicator: React.FC<ColorIndicatorProps> = ({
  color = "#7F7F7F",
  style,
  className,
  height = 38,
  width = 7,
}: ColorIndicatorProps) => {
  console.log(height + "px !important");
  return (
    <div className={className}>
      <div
        style={{ backgroundColor: color + "88", ...style }}
        className="h-full overflow-hidden rounded-full"
      >
        <div className="relative size-full">
          <img
            src={indicatorMask}
            alt="example"
            className="block object-cover"
            style={{ height, width }}
          />
          <div
            className="pointer-events-none absolute inset-0 size-full opacity-50 mix-blend-multiply"
            style={{
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorIndicator;
