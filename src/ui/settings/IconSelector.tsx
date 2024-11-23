import { createElement, useEffect, useRef, useState } from "react";
import { FileInput, Tabs } from "../Components";
import InfoBubble from "../InfoBubble";
import icons from "../../../public/data/icons.json";
import "emoji-picker-element";
import fr from "emoji-picker-element/i18n/fr";
import { Image } from "lucide-react";
import resizeImage from "../../utils/resize_image";
import renderEmojiToImage from "../../utils/emoji_to_image";

const IconSelector: React.FC = () => {
	const selectedIconSrc = useRef<string>(icons[0].url);

	useEffect(() => {
		chrome.storage.sync.get("siteIconSrc", (result) => {
			selectedIconSrc.current = result.siteIconSrc;
		});
	}, []);

	const IconSection: React.FC = () => {
		const ref: any = useRef(null);

		useEffect(() => {
			ref.current.i18n = fr;
			ref.current.locale = "fr";
			ref.current.dataSource = "/data/decoy.json";
			ref.current.customEmoji = icons;

			const style = document.createElement("style");
			style.textContent = 
			`.nav {
				display: none;
			}

			.skintone-button-wrapper {
				display: none !important;
			}`;
			ref.current.shadowRoot.appendChild(style);
		}, []);

		useEffect(() => {
			const element = ref.current;
			console.log("OMG YOURE REDOGING SDADS2AZD");

			if (element) {
				const handleEmojiClick = (event: any) => {
					console.log("Emoji clicked", event);

					const emoji = event.detail.emoji.url;

					selectedIconSrc.current = emoji;
					chrome.storage.sync.set({
						siteIconSrc: emoji,
					});
				};

				ref.current.addEventListener("emoji-click", handleEmojiClick);

				return () => {
					ref.current?.removeEventListener("emoji-click", handleEmojiClick);
				};
			}
		}, [ref, ref.current]);

		return (
			<>
				{createElement("emoji-picker", {
					ref,
				})}
			</>
		);
	};

	const EmojiSection: React.FC = () => {
		const ref: any = useRef(null);

		useEffect(() => {
			ref.current.i18n = fr;
			ref.current.locale = "fr";
			ref.current.dataSource =
				"https://cdn.jsdelivr.net/npm/emoji-picker-element-data@%5E1/fr/emojibase/data.json";
		}, []);

		useEffect(() => {
			const element = ref.current;
			console.log("OMG YOURE REDOGING SDADS2AZD");

			if (element) {
				const handleEmojiClick = (event: any) => {
					console.log("Emoji clicked", event);

					const emoji = renderEmojiToImage(event.detail.unicode);

					selectedIconSrc.current = emoji;
					chrome.storage.sync.set({
						siteIconSrc: emoji,
					});
				};

				ref.current.addEventListener("emoji-click", handleEmojiClick);

				return () => {
					ref.current?.removeEventListener("emoji-click", handleEmojiClick);
				};
			}
		}, [ref, ref.current]);

		return (
			<>
				{createElement("emoji-picker", {
					ref,
				})}
			</>
		);
	};

	const UploadSection: React.FC = () => {
		const [loading, setLoading] = useState(false);
		// const fileInputRef = useRef<HTMLInputElement | null>(null);

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.files && event.target.files.length > 0) {
				const file = event.target.files[0];
				processFile(file);
			}
		};

		const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
			const clipboardItems = event.clipboardData.items;
			for (let i = 0; i < clipboardItems.length; i++) {
				const item = clipboardItems[i];
				if (item.type.startsWith("image/")) {
					const file = item.getAsFile();
					if (file) {
						processFile(file);
					}
				}
			}
		};

		const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			// setIsHovering(false); // Reset hover state after drop
			if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
				const file = event.dataTransfer.files[0];
				processFile(file);
			}
		};

		// Process image file (resize and save to storage)
		const processFile = async (file: File) => {
			setLoading(true);
			const reader = new FileReader();
			reader.onload = async () => {
				let base64Image = reader.result as string | null;

				if (base64Image) {
					base64Image = await resizeImage(base64Image, 32, 32);
					if (base64Image) {
						selectedIconSrc.current = base64Image;
						chrome.storage.sync.set({ siteIconSrc: base64Image });
						console.log("Image saved to Chrome Storage!", base64Image);
					}
				}
			};
			reader.readAsDataURL(file);

			setLoading(false);
			console.log("Selected file:", file);
		};

		return (
			<div onPaste={handlePaste}>
				<FileInput
					onChange={(event) => handleFileChange(event)}
					icon={Image}
					label="Choisir une image"
					type="image"
					onDrop={handleDrop}
					loading={loading}
				/>
			</div>
		);
	};

	return (
		<div className="flex flex-col p-2">
			<InfoBubble message="Choisis l'icône du site !" />
			<Tabs
				tabLabels={[
					{ label: "Îcones", tabId: "icon" },
					{ label: "Émoji", tabId: "emoji" },
					{ label: "Charger", tabId: "upload" },
				]}
				className="mt-4"
				tabs={[
					{ id: "icon", content: <IconSection /> },
					{ id: "emoji", content: <EmojiSection /> },
					{ id: "upload", content: <UploadSection /> },
				]}
				// defaultTab={selectedIconSrcCategory.id}
			/>
		</div>
	);
};

export default IconSelector;
