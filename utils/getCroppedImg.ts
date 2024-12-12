import { Area } from "react-easy-crop";
export default async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const fileUrl = URL.createObjectURL(blob);
      resolve(fileUrl);
    }, "image/jpeg");
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
}
