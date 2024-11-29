import _ from "lodash";

export function formatSubjectName(subject = "") {
	// Process the input string: replace dots and underscores with spaces, trim, and convert to lowercase
	let processedString = subject.replace(/[,._]/g, " ").trim().toLowerCase();

	// remove everything past >
	processedString = processedString.split(">")[0];

	// remove LV1, LV2, etc.
	processedString = processedString.replace(/lv\d/g, "").trim();

	// remove everything in parentheses
	processedString = processedString.replace(/\(.*\)/g, "").trim();

	// normalize accents
	processedString = processedString
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

	// remove special characters
	processedString = processedString.replace(/[^a-zA-Z0-9 ]/g, " ").trim();

	// remove multiple spaces into one
	processedString = processedString.replace(/\s+/g, " ");

	// Search for the object in the data
	for (let item of lesson_formats) {
		for (let format of item.formats) {
			if (format === processedString) {
				return item.label;
			}
		}
	}

	// Return null if no match is found
	return _.capitalize(processedString);
}

const lesson_formats = [
	{
		label: "Accompagnement personnalisé",
		formats: ["accompagnement personnalise", "accompagnemt perso"],
	},
	{
		label: "Atelier de professionnalisation",
		formats: ["atelier de professionnalisation", "at professionnalis"],
	},
	{
		label: "Bloc 1 : Support et mise a disposition des services informatiques",
		formats: [
			"bloc 1 support et mise a disposition des services informatiques",
			"bloc 1 smdsi",
		],
	},
	{
		label: "Bloc 2 : Solutions d’infrastructure systemes et réseaux",
		formats: [
			"bloc 2 solutions d’infrastructure systemes et reseaux",
			"bloc 2 sisr",
		],
	},
	{
		label: "Bloc 2 : Solutions logicielles et applications métiers",
		formats: [
			"bloc 2 solutions logicielles et applications metiers",
			"bloc 2 slam",
		],
	},
	{
		label: "Bloc 3 : Travaux pratiques",
		formats: ["bloc 3 travaux pratiques", "bloc 3 tp"],
	},
	{
		label: "Culture économique, juridique et managériale appliquée",
		formats: [
			"culture economique juridique et manageriale appliquee",
			"cul eco jur man app",
		],
	},
	{
		label: "Culture génerale et expression",
		formats: ["culture generale et expression", "culture gene et expr"],
	},
	{
		label: "Culture économique, juridique et managériale",
		formats: [
			"culture economique juridique et manageriale",
			"cult eco jur manag",
		],
	},
	{
		label: "DNL : Sciences économiques et sociales en anglais",
		formats: ["dnl ses anglais"],
	},
	{
		label: "Éducation civique",
		formats: ["education civique", "education civique"],
	},
	{
		label: "Enseignement scientifique",
		formats: ["enseignement scientifique", "enseign scientifique"],
	},
	{
		label: "Éducation physique & sportive",
		formats: [
			"education physique et sportive",
			"ed physique sport",
			"education physique et sportive",
			"eps",
		],
	},
	{
		label: "Éducation musicale",
		formats: ["education musicale", "education musicale"],
	},
	{
		label: "Français",
		formats: ["français", "francais"],
	},
	{
		label: "Histoire-Géographie",
		formats: [
			"histoire geographie",
			"histoire geo",
			"histoire geograph",
			"histoire-geographie",
			"histoire-geographie",
		],
	},
	{
		label: "Humanites, Littérature & Philosophie",
		formats: ["humanites litterature philosophie", "human litter philo"],
	},
	{
		label: "LLCER Anglais Monde Contemporain",
		formats: ["llcer anglais monde contemporain", "llc angl mond cont"],
	},
	{
		label: "Mathématiques pour l’Informatique",
		formats: ["mathematiques pour l’informatique", "maths pour informatq"],
	},
	{
		label: "Mathématiques",
		formats: [
			"mathematiques",
			"mathematiques",
			"mathematiques 1ere",
			"math 1ere",
		],
	},
	{
		label: "Numérique & Sciences Informatiques",
		formats: ["numerique et sciences informatiques", "numerique sc inform"],
	},
	{
		label: "Physique-Chimie",
		formats: ["physique chimie", "phys chim"],
	},
	{
		label: "Sciences Économiques & Sociales",
		formats: [
			"sciences economiques et sociales",
			"sc econo sociales",
			"sciences economiques et sociales",
		],
	},
	{
		label: "Sciences de la Vie & de la Terre",
		formats: [
			"sciences de la vie et de la terre",
			"sciences de la vie et de la terre",
			"sciences vie terre",
		],
	},
	{
		label: "Sciences Numériques & Technologie",
		formats: ["sciences numeriques et technologie", "sc numeriq technol"],
	},
	{
		label: "Vie de classe",
		formats: ["vie de classe", "vie de classe"],
	},
];
