export const downloadBase64 = (
  contentType: string,
  base64Data: string,
  fileName: string,
  callback?: () => void
): void => {
  const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
  if (callback && typeof callback === "function") callback();
};
