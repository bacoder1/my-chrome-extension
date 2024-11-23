import { useEffect, useState } from "react";

interface ImagePreviewProps {
	file: File;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
	file,
}: ImagePreviewProps) => {
	const [imgSrc, setImgSrc] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		if (file.type && !file.type.startsWith("image/")) {
			console.log("File is not an image.", file.type, file);
			return;
		}

		const reader = new FileReader();
		reader.addEventListener("load", (event) => {
			if (event.target && typeof event.target.result === "string") {
				setImgSrc(event.target.result);
			}
		});

		reader.addEventListener("progress", (event) => {
			if (event.loaded && event.total) {
				const percent = (event.loaded / event.total) * 100;
				setProgress(Math.round(percent));
				console.log(`Progress: ${Math.round(percent)}`);
			}
		});

		reader.readAsDataURL(file);
	}, []);

	return (
		<div className="relative">
			<img className="max-w-full" src={imgSrc} alt="" />
      <div className="absolute top-3 right-3 bg-black text-white">{progress + "%"}</div>
		</div>
	);
};

export default ImagePreview;
