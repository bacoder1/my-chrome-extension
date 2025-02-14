import { createElement, IconNode } from "lucide";

export default function colibriButton(options: {
  iconNode?: IconNode;
  text: string;
  background?: string;
  color?: string; // in rgb (91, 23, 1)
  onClick?: () => void;
}): Element {
  const div = document.createElement("div");

  div.className = "colibri-button";

  if (options.iconNode) {
    const icon = createElement(options.iconNode);
    icon.classList.add("icon");
    div.appendChild(icon);
  }

  if (options.background) {
    div.style.setProperty("background", options.background);
  }

  if (options.color) {
    div.style.setProperty("color", options.color);
  }

  if (options.onClick) div.addEventListener("click", options.onClick);

  const textNode = document.createElement("span");
  textNode.textContent = options.text;
  div.appendChild(textNode);

  return div;
}
