const exceptions: Record<string, string> = {
  Lycee: "Lycée",
  Francais: "Français",
};

const formatSchoolName = (name: string): string => {
  const words = name.split(" ");
  let formattedName = "";

  for (let word of words) {
    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    word = exceptions[word] || word;

    formattedName = formattedName + " " + word;
  }

  return formattedName.trim();
};

export default formatSchoolName;