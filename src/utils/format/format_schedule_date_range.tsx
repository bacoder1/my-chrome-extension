export default function formatScheduleDateRange(input: string): string {
  // Use regex to match the date pattern
  const datePattern = /(\d{2})\/(\d{2})\/(\d{4})/g;

  // Replace the dates using a callback function
  const formattedString = input.replace(datePattern, (_match, day, month, year) => {
      const date = new Date(`${year}-${month}-${day}`);
      // Format the date to get the desired month abbreviation
      return `${day} ${date.toLocaleString('fr-FR', { month: 'short' })} ${year}`;
  });

  return formattedString;
}