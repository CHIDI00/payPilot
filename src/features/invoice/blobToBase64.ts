export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Removes "data:application/pdf;base64," prefix if present
      const result = reader.result as string;
      const base64 = result.split(",")[1]; // Keep only the base64 part
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
