export const subjectEmojis: Record<string, string> = {
	numerique: "💻",
	si: "💻",
	snt: "💻",
	travaux: "⚒",
	travail: "💼",
	moral: "⚖️",
	env: "🌿",
	sport: "🏀",
	eps: "🏀",
	econo: "📈",
	francais: "📚",
	anglais: "🇬🇧",
	allemand: "🇩🇪",
	espagnol: "🇪🇸",
	latin: "🏛️",
	italien: "🇮🇹",
	histoire: "📜",
	emc: "🤝",
	hist: "📜",
	llc: "🌍",
	scientifique: "🔬",
	arts: "🎨",
	philosophie: "🤔",
	math: "📐",
	phys: "🧪",
	accomp: "👨‍🏫",
	tech: "🔧",
	ingenieur: "🔧",
	musique: "🎼",
	musical: "🎼",
	classe: "🏫",
	vie: "🧬",
	ses: "💰",
	stage: "👔",
	œuvre: "🖼️",
	récré: "🌞",
	"pas de cours": "⌛",
	pause: "⌛",
	default: "📝",
};

export function getSubjectEmoji(subject: string) {
	for (const emoji in subjectEmojis) {
		if (
			subject.toLowerCase().includes(emoji) ||
			subject.toLowerCase() === emoji
		) {
			return subjectEmojis[emoji];
		}
	}

	return subjectEmojis.default;
};