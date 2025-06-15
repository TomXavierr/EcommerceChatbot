export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.jpg";
  return imagePath.startsWith("http")
    ? imagePath
    : `${import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")}${imagePath}`;
};

