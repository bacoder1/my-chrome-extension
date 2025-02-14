import AboutCard from "../custom/AboutCard";
import palette from "../../assets/images/personalization_palette.png";
import { useEffect, useRef, useState } from "react";
import { Input, List, ListItem } from "../Components";
import Drawer from "../custom/Drawer";
import subjectColors from "../../utils/data/subject_colors.json";
import ColorSwatch from "../custom/ColorSwatch";
import ColorIndicator from "../custom/ColorIndicator";
import MissingItem from "../custom/MissingItem";
import Popover from "../custom/Popover";
import EmojiPicker from "../custom/EmojiPicker";

export interface Subject {
  color: string;
  pretty: string;
  emoji: string;
}

interface SubjectWithID extends Subject {
  id: string;
}

interface SubjectData {
  [key: string]: Subject;
}

const SubjectsSettings: React.FC = () => {
  const [subjectData, setSubjectData] = useState<SubjectData>({});
  const [selectedSubject, setSelectedSubject] = useState<SubjectWithID | null>(
    null,
  );
  const subjectNameInput = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    chrome.storage.sync.get("subjectData", (result) => {
      let subjectData = result.subjectData;

      setSubjectData(subjectData);
    });

    chrome.storage.onChanged.addListener((changes, _namespace) => {
      if (changes.subjectData) setSubjectData(changes.subjectData.newValue);
    });
  }, []);

  useEffect(() => {
    if (subjectNameInput.current && selectedSubject) {
      subjectNameInput.current.value = selectedSubject.pretty;
    }
  }, [selectedSubject]);

  return (
    <div className="flex flex-col p-2">
      <Drawer state={[selectedSubject, setSelectedSubject]}>
        <div className="flex flex-col px-4 pb-2">
          <div className="flex gap-4">
            <div
              className="flex hover:bg-black/5 transition-colors duration-200 card aspect-square relative size-14 items-center justify-center text-[1.75rem]"
            >
              <span ref={emojiRef}>{selectedSubject?.emoji}</span>
              <Popover className="!left-4">
                <EmojiPicker perLine={9} set="auto" onEmojiSelect={(emoji) => {
                  chrome.storage.sync.get("subjectData", (result) => {
                    let subjectData = result.subjectData;

                    subjectData[selectedSubject!.id].emoji =
                      emoji.native;

                      emojiRef.current!.innerHTML = emoji.native;

                    chrome.storage.sync.set({
                      subjectData,
                    });
                  });
                }} />
              </Popover>
            </div>
            <div
              className="flex-grow card px-3 py-[0.375rem]"
            >
              <div className="text-semiboldtext-xs -mb-1 text-black/30">
                Nom de la matière
              </div>
              <Input
                type="text"
                ref={subjectNameInput}
                onValidate={() => {
                  chrome.storage.sync.get("subjectData", (result) => {
                    let subjectData = result.subjectData;

                    subjectData[selectedSubject!.id].pretty =
                      subjectNameInput.current!.value;

                    chrome.storage.sync.set({
                      subjectData,
                    });

                    console.log("woah did the storage thing");
                  });
                }}
              />
            </div>
          </div>
          <div
            className="mt-4 card flex flex-col px-3 py-[0.375rem]"
          >
            <div className="text-semiboldtext-xs -mb-1 text-black/30">
              Couleurs
            </div>
            <div className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden p-2">
              {[
                ...(selectedSubject?.color &&
                !subjectColors.includes(selectedSubject.color)
                  ? [selectedSubject.color]
                  : []),
                ...subjectColors,
              ].map((color) => (
                <ColorSwatch
                  key={color}
                  selected={selectedSubject?.color === color}
                  className="flex-[0_0_auto]"
                  size={26}
                  color={color}
                  onClick={() => {
                    setSelectedSubject({ ...selectedSubject!, color });

                    chrome.storage.sync.get("subjectData", (result) => {
                      let subjectData = result.subjectData;

                      subjectData[selectedSubject!.id].color = color;

                      chrome.storage.sync.set({
                        subjectData,
                      });

                      console.log("woah did the storage thing");
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Drawer>
      <AboutCard
        image={palette}
        title="Personnalisez vos matières"
        content="Personnalisez le nom, l'émoji et la couleur des matières."
      />
      {Object.keys(subjectData).length > 0 ? <List className="mt-6">
        {Object.keys(subjectData).map((key: string, index) => {
          const item = subjectData[key];

          return (
            <ListItem
              title={item.pretty}
              subtitle={item.color}
              icon={item.emoji}
              iconType="text"
              index={index}
              className="!py-[2px] relative"
              onClick={() =>
                setSelectedSubject({
                  ...item,
                  id: key,
                })
              }
              leading={<ColorIndicator color={item.color} className="ml-2" />}
            />
          );
        })}
      </List> : <MissingItem title="Une matière manque ?" subtitle="Essayez de recharger la page et ouvrir quelque jours dans votre emploi du temps" />}
    </div>
  );
};

export default SubjectsSettings;
