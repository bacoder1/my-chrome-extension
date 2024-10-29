import { formatSubjectName } from "./format_subject_name";
import { getSubjectEmoji, subjectEmojis } from "./get_subject_emoji";

export default function changeSubjectName(element: any, emoji = true) {
	const currentName = element.innerText;
	for (let emoji of Object.values(subjectEmojis)) {
		if (currentName.startsWith(emoji)) return;
	}

	element.innerText = `${
		emoji ? getSubjectEmoji(currentName) : ""
	} ${formatSubjectName(currentName)}`;
}
