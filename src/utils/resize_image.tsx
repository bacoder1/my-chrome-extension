const resizeImage = (base64Image: string, targetWidth: number, targetHeight: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      // Original dimensions
      const originalWidth = img.width;
      const originalHeight = img.height;

      // Calculate aspect ratio
      const originalAspectRatio = originalWidth / originalHeight;
      const targetAspectRatio = targetWidth / targetHeight;

      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      // Adjust dimensions and offsets for "cover"
      if (originalAspectRatio > targetAspectRatio) {
        // Wider image: crop sides
        drawWidth = targetHeight * originalAspectRatio;
        offsetX = (drawWidth - targetWidth) / 2;
      } else {
        // Taller image: crop top and bottom
        drawHeight = targetWidth / originalAspectRatio;
        offsetY = (drawHeight - targetHeight) / 2;
      }

      // Create canvas and draw the resized image
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          img,
          -offsetX, // Start cropping from this X coordinate
          -offsetY, // Start cropping from this Y coordinate
          drawWidth, // Scaled width of the image
          drawHeight // Scaled height of the image
        );
        resolve(canvas.toDataURL()); // Returns the resized image as a Base64 string
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };

    img.onerror = (error) => reject(error);
  });
};

export default resizeImage;
