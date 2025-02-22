import axios from "axios";

const WIKIMEDIA_API_URL = "https://commons.wikimedia.org/w/api.php";

export const fetchUniversityImage = async (universityName: string) => {
  try {
    const response = await axios.get(WIKIMEDIA_API_URL, {
      params: {
        action: "query",
        format: "json",
        prop: "pageimages",
        piprop: "original",
        generator: "search",
        gsrlimit: 1,
        gsrsearch: `${universityName} campus`,
        origin: "*", // Required for CORS
      },
    });

    const pages = response.data.query?.pages;
    if (!pages) return "https://via.placeholder.com/600x400"; // Fallback image

    const firstPage = Object.values(pages)[0] as any;
    return firstPage.original?.source || "https://via.placeholder.com/600x400"; // Return image URL or fallback
  } catch (error) {
    console.error("Error fetching university image from Wikimedia:", error);
    return "https://via.placeholder.com/600x400"; // Fallback image
  }
};
