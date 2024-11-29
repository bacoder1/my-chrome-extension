export default async function imageUrlToDataUrl(imageUrl: string) {
  try {
    // Fetch the image as a Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create a FileReader to read the Blob as a Base64 string
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // Result is the data URL
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Read the Blob as a Data URL
    });
  } catch (error) {
    console.error("Error converting image:", error);
    throw error;
  }
}
