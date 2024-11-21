import { createElement, useEffect, useRef } from "react";
import { Checkbox, FileInput, List, ListItem, Tabs } from "../Components";
import InfoBubble from "../InfoBubble";
import icons from "../../utils/data/icons.json";
import "emoji-picker-element";
import fr from "emoji-picker-element/i18n/fr";
// import { Image } from "lucide-react";
import { createElement as createLucideElement } from "lucide";
import { Check } from "lucide";
import { Image } from "lucide-react";
import resizeImage from "../../utils/resize_image";

const IconSelector: React.FC = () => {
	const selectedIconSrc = useRef<string | ArrayBuffer>(icons[0].imageSrc);
	const ref: any = useRef(null);
	// let selectedIconSrcCategory = { id: "Îcones", index: 0 };
	// if (selectedIconSrc.includes("twemoji")) {
	// 	selectedIconSrcCategory = { id: "Émoji", index: 1 };
	// } else if (!icons.map((icon) => icon.imageSrc).includes(selectedIconSrc)) {
	// 	selectedIconSrcCategory = { id: "Charger", index: 2 };
	// }
	const selectedEmoji: React.MutableRefObject<null | HTMLElement> =
		useRef(null);

	const toUnicode = (char: string) =>
		char.codePointAt(0)?.toString(16).toLowerCase();

	useEffect(() => {
		chrome.storage.sync.get("siteIconSrc", (result) => {
			selectedIconSrc.current = result.siteIconSrc;
		});
	}, []);

	const IconSection: React.FC = () => {
		return (
			<List>
				{icons.map((icon, index) => (
					<ListItem
						title={icon.label}
						icon={icon.imageSrc}
						index={index}
						iconSize={28}
						checkbox={
							<Checkbox
								checked={selectedIconSrc.current === icon.imageSrc}
								onClick={() => {
									selectedIconSrc.current = icon.imageSrc;
									chrome.storage.sync.set({ siteIconSrc: icon.imageSrc });
									console.log("set storage to " + icon.imageSrc);
								}}
								className="mr-2"
							/>
						}
					/>
				))}
			</List>
		);
	};

	const EmojiSection: React.FC = () => {
		// const isFirstRun = useRef(true);

		useEffect(() => {
			ref.current.i18n = fr;
			ref.current.locale = "fr";
			ref.current.dataSource =
				"https://cdn.jsdelivr.net/npm/emoji-picker-element-data@%5E1/fr/emojibase/data.json";
		}, [ref, ref.current]);

		useEffect(() => {
			const element = ref.current;
			console.log("OMG YOURE REDOGING SDADS2AZD");

			if (element) {
				const handleEmojiClick = (event: any) => {
					console.log("Emoji clicked", event);

					selectedIconSrc.current = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${toUnicode(
						event.detail.unicode
					)}.svg`;
					chrome.storage.sync.set({
						siteIconSrc: `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${toUnicode(
							event.detail.unicode
						)}.svg`,
					});
				};

				const toggleEmojiCheck = (event: any) => {
					console.log(event);
					if (selectedEmoji.current) {
						// Remove the "selected" styling and check icon from the previously selected element
						const existingCheckIcon =
							selectedEmoji.current.querySelector(".check-icon");
						existingCheckIcon?.remove();
					}

					selectedEmoji.current = event.target;

					if (selectedEmoji.current) {
						const checkIcon = document.createElement("span");
						checkIcon.className = "check-icon";

						// Append an SVG of the check icon inside the span
						checkIcon.insertAdjacentElement(
							"beforeend",
							createLucideElement(Check)
						);

						// Append the check icon to the selected element
						selectedEmoji.current.style.position = "relative";
						selectedEmoji.current.appendChild(checkIcon);
					}
				};

				ref.current.addEventListener("emoji-click", handleEmojiClick);
				ref.current.addEventListener("click", toggleEmojiCheck);

				return () => {
					ref.current?.removeEventListener("emoji-click", handleEmojiClick);
					ref.current?.remove("click", toggleEmojiCheck);
				};
			}
		}, [ref, ref.current]);

		return (
			<List>
				{createElement("emoji-picker", {
					ref,
				})}
			</List>
		);
	};

	const UploadSection: React.FC = () => {
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
				if (item.type.startsWith('image/')) {
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
			const reader = new FileReader();
			reader.onload = async () => {
				let base64Image = reader.result as string | null;
	
				if (base64Image) {
					base64Image = await resizeImage(base64Image, 32, 32);
					if (base64Image) {
						selectedIconSrc.current = base64Image;
						chrome.storage.sync.set({ siteIconSrc: base64Image });
						console.log('Image saved to Chrome Storage!', base64Image);
					}
				}
			};
			reader.readAsDataURL(file);
			console.log('Selected file:', file);
		};

		return (
			<div onPaste={handlePaste}>
				{/* <ModalButton label="Charger une image" icon={Image} /> */}
				{/* <div className="flex relative bg-[#E9E9E9] justify-center transition-colors ease-in-out hover:bg-[#DEDADA] rounded-lg h-9 cursor-pointer text-[#656565] gap-2 items-center">
					<Image size={20} />
					<p className="font-semibold">Charger une image</p>
					<input
						type="file"
						ref={fileInputRef}
						className="fixed -top-full size-full"
						onChange={handleFileChange}
					/>
				</div> */}
				<FileInput
					onChange={(event) => handleFileChange(event)}
					icon={Image}
					label="Choisir une image"
					type="image"
					onDrop={handleDrop}
				/>
			</div>
		);
	};

	return (
		<div className="flex flex-col p-2">
			<InfoBubble message="Choisis l'icône du site !" />
			<Tabs
				tabLabels={["Îcones", "Émoji", "Charger"]}
				tabs={[
					{ id: "Îcones", content: <IconSection /> },
					{ id: "Émoji", content: <EmojiSection /> },
					{ id: "Charger", content: <UploadSection /> },
				]}
				// defaultTab={selectedIconSrcCategory.id}
			/>
		</div>
	);
};

export default IconSelector;
