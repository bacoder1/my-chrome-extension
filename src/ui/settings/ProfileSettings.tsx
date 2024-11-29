import {
  Image,
  TextCursorInput,
  Trash2,
  User2,
  UserCircle2,
  WholeWord,
} from "lucide-react";
import {
  FileInput,
  Heading,
  Input,
  List,
  ListItem,
  Switch,
  Tooltip,
} from "../Components";
import resizeImage from "../../utils/resize_image";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
// import ReactSwitch from "react-switch";
// import rgbToHex from "../../utils/rgb_to_hex";

const ProfileSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showLastName, setShowLastName] = useState(true);
  const [showProfilePicture, setShowProfilePicture] = useState(true);
  // const [studentName, setStudentName] = useState({ first: "", last: "" });
  const firstNameInput = useRef<HTMLInputElement | null>(null);
  const lastNameInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    chrome.storage.sync.get("showLastName", (result) => {
      setShowLastName(result.showLastName);
    });

    chrome.storage.sync.get("showProfilePicture", (result) => {
      setShowProfilePicture(result.showProfilePicture);
    });

    chrome.storage.sync.get("account", (result) => {
      let account = result.account;
      // setStudentName({
      //   first: result.studentName.first,
      //   last: result.studentName.last,
      // });

      if (firstNameInput.current) {
        firstNameInput.current.value = account.studentName.first;
      }

      if (lastNameInput.current) {
        lastNameInput.current.value = account.studentName.last;
      }
    });
  }, []);

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
          chrome.storage.sync.get(["account"], (result) => {
            // Get the current account data or initialize it if not present
            const account = result.account || {
              studentName: {
                first: "",
                last: "",
              },
              profilePicture: "",
            };

            // Update the profilePicture field
            account.profilePicture = base64Image;

            // Save the updated account object back to storage
            chrome.storage.sync.set({ account }, () => {
              console.log("Profile picture updated successfully!");
            });
          });

          console.log("Image saved to Chrome Storage!", base64Image);
        }
      }
    };
    reader.readAsDataURL(file);

    setLoading(false);
    console.log("Selected file:", file);
  };

  return (
    <div className="flex flex-col p-2">
      <Heading
        title="Photo de profil"
        trailing={
          <div
            className="tab-label relative cursor-pointer select-none text-ellipsis rounded-lg px-2 py-1 font-semibold uppercase text-black/10 transition-colors delay-200 ease-out hover:bg-black/[0.05]"
            onClick={() => {
              chrome.storage.sync.get(
                "originalProfilePicture",
                ({ originalProfilePicture }) => {
                  chrome.storage.sync.get("account", (result) => {
                    let account = result.account;

                    account.profilePicture = originalProfilePicture;

                    chrome.storage.sync.set({ account });
                  });
                },
              );
            }}
          >
            <Trash2 size={20} />
            <Tooltip
              tooltip="Réinitialiser"
              className="!-right-1 !left-auto !translate-x-0"
            />
          </div>
        }
      />
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

      <Heading title="Prénom et nom" />

      <List>
        <ListItem index={0} icon={User2}>
          <div className="flex flex-col py-1">
            <div className="text-semiboldtext-xs text-black/30">
              Prénom
            </div>
            <Input
              type="text"
              placeholder="..."
              name=""
              id=""
              ref={firstNameInput}
            />
          </div>
        </ListItem>
        <ListItem index={1} icon={TextCursorInput}>
          <div className="flex flex-col py-1">
            <div className="text-semibold text-xs text-black/30">Nom</div>
            <Input
              type="text"
              placeholder="..."
              name=""
              id=""
              ref={lastNameInput}
            />
          </div>
        </ListItem>
      </List>

      <Button
      className="!mx-0 mt-3"
        onClick={() => {
          chrome.storage.sync.get("account", (result) => {
            let account = result.account;

            if (firstNameInput.current?.value) {
              account.studentName.first = firstNameInput.current.value;
            }

            if (lastNameInput.current?.value) {
              account.studentName.last = lastNameInput.current.value;
            }

            chrome.storage.sync.set({ account: {
              studentName: {
                first: account.studentName.first,
                last: account.studentName.last
              },
              profilePicture: account.profilePicture
            } });
          });
        }}
      >Valider</Button>

      <Heading title="Affichage" />
      <List>
        <ListItem
          index={0}
          title="Nom de famille"
          icon={WholeWord}
          trailing={
            <Switch
              onChange={() => {
                chrome.storage.sync.set({
                  showLastName: !showLastName,
                });
                setShowLastName(!showLastName);
              }}
              checked={showLastName}
            />
          }
        />
        <ListItem
          index={1}
          title="Photo de profil"
          icon={UserCircle2}
          trailing={
            <Switch
              onChange={() => {
                chrome.storage.sync.set({
                  showProfilePicture: !showProfilePicture,
                });

                setShowProfilePicture(!showProfilePicture);
              }}
              checked={showProfilePicture}
            />
          }
        />
      </List>
    </div>
  );
};

export default ProfileSettings;
