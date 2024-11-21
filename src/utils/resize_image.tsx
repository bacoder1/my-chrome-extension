const resizeImage = (base64Image: string, width: number, height: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL()); // Returns the resized image as a Base64 string
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };

    img.onerror = (error) => reject(error);
  });
};

export default resizeImage;