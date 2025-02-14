import { useEffect, useRef, useState } from "react";
import { FileInput, Tabs } from "../Components";
import InfoBubble from "../custom/InfoBubble";
import icons from "../../../public/data/icons.json";
import { Image } from "lucide-react";
import resizeImage from "../../utils/resize_image";
import EmojiPicker from "../custom/EmojiPicker";

const IconSelector: React.FC = () => {
  const selectedIconSrc = useRef<string>(icons[0].emojis[0].skins[0].src);

  useEffect(() => {
    chrome.storage.local.get("siteIconSrc", (result) => {
      selectedIconSrc.current = result.siteIconSrc;
    });
  }, []);

  const IconSection: React.FC = () => {
    return (
      <EmojiPicker
        onEmojiSelect={(emoji: any) => {
          chrome.storage.local.set({
            siteIconSrc: emoji.src,
          });
          console.log(emoji.native, emoji);
        }}
        navBar={false}
        custom={icons}
      />
    );
  };

  const EmojiSection: React.FC = () => {
    return (
      <EmojiPicker
        onEmojiSelect={(emoji: any) => {
          chrome.storage.local.set({
            siteIconSrc: `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${emoji.unified}.svg`,
          });
          console.log(emoji.native, emoji);
        }}
      />
    );
  };

  const UploadSection: React.FC = () => {
    const [loading, setLoading] = useState(false);

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
          base64Image = await resizeImage(base64Image, 48, 48);
          if (base64Image) {
            selectedIconSrc.current = base64Image;
            chrome.storage.local.set({ siteIconSrc: base64Image });
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
      />
    </div>
  );
};

export default IconSelector;
