import i18n from "@emoji-mart/data/i18n/fr.json";
import Picker from "@emoji-mart/react";
import { useEffect, useRef } from "react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void;
  perLine?: number;
  custom?: any[];
  navBar?: boolean;
  set?: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  perLine = 10,
  custom = [],
  navBar = true,
  set = "twitter"
}: EmojiPickerProps) => {
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shadowRoot = ((
      pickerRef.current?.querySelector("em-emoji-picker") as any
    )?.shadowRoot ?? null) as ShadowRoot | null;
    if (shadowRoot) {
      if (
        pickerRef.current &&
        pickerRef.current.querySelector("em-emoji-picker")
      )
        (
          pickerRef.current.querySelector("em-emoji-picker") as HTMLElement
        ).style.height = `${perLine * 28}px`;

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      shadowRoot.adoptedStyleSheets = [sheet];
    }
  }, []);

  const styles = `
        :host {
          
        #root {
          --padding: 0.5rem !important;
          --font-family: "FixelVariable", sans-serif !important;

            .sticky.padding-small.align-l {
              margin-top: 4px;
              margin-bottom: 6px;
              color: rgba(55, 53, 47, 0.65);
              font-size: 12px;
              font-weight: 500;
              user-select: none;
              padding-top: 4px;
            }

            input[type="search"] {
              display: flex;
              align-items: center;
              width: 100%;
              font-size: 14px;
              line-height: 20px;
              position: relative;
              border-radius: 6px;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              background: rgba(242, 241, 238, 0.6);
              cursor: text;
              padding: 3px 6px 3px 30px;
              height: 28px;
              margin-right: 6px;

              &:focus-within {
                box-shadow:
                  inset 0 0 0 1px #2383e291,
                  0 0 0 2px #2383e259 !important;
              }
            }

            .icon.loupe {
              width: 14px;
              height: 14px;
              color: rgba(55, 53, 47, 0.45);
            }

            nav {
              padding: 6px 12px 8px !important;

              > div > button {
                aspect-ratio: 1 / 1 !important; 
                transition: background 50ms ease-in !important;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 32px !important;
                border-radius: 6px !important;

                &[aria-selected="true"],
                &:hover {
                  background: rgba(55, 53, 47, 0.06) !important;
                  color: var(--color-b) !important;
                }
              }
            }

            .bar {
              display: none !important;
            }
          }
        }
      `;

  return (
    <div ref={pickerRef}>
      <Picker
        i18n={i18n}
        onEmojiSelect={onEmojiSelect}
        icons="solid"
        perLine={perLine}
        maxFrequentRows={1}
        previewPosition="none"
        navPosition={navBar ? "bottom" : "none"}
        autoFocus={true}
        set={set}
        emojiButtonRadius="4px"
        custom={custom}
        locale="fr"
        categories={
          custom.length > 0
            ? custom.map((item) => item.id)
            : [
                "frequent",
                "people",
                "nature",
                "foods",
                "activity",
                "places",
                "objects",
                "symbols",
                "flags",
              ]
        }
        exceptEmojis={custom.length === 0 ? custom.flatMap(category => category.emojis.map((emoji: any) => emoji.id)) : []}
        emojiSize={perLine * 2.2}
        emojiButtonSize={perLine * 3}
      />
    </div>
  );
};

export default EmojiPicker;
