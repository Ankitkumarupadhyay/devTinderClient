export const imageToBase64 = async (image: File | Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  const data = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  return data;
};
