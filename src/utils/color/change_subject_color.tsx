import getClosestColor from "./get_closest_color";
import subjectColors from "../data/subject_colors.json";

export default function changeSubjectColor(color: string, element: any, parent: HTMLElement, opacity: number = 1) {
  console.log(typeof window.getComputedStyle(parent).getPropertyValue("--subject-color"))
  if (window.getComputedStyle(parent).getPropertyValue("--subject-color") === "") {
    const closestColor = getClosestColor(color, subjectColors);
    parent.style.setProperty("--subject-color", closestColor);
    element.style.backgroundColor = `rgba(${closestColor}, ${opacity})`;
  }
}