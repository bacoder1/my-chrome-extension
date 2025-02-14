import resizeImage from "./resize_image";

export default async function imageUrlToDataUrl(imageUrl: string) {
  try {
    // Fetch the image as a Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Read the Blob as a Base64 string
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string); // Result is the data URL
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Read the Blob as a Data URL
    });

    // Resize the image
    return resizeImage(base64Image, 192, 192);
  } catch (error) {
    console.error("Error converting or resizing image:", error);
    throw error;
  }
}