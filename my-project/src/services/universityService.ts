import axios from "axios";

const API_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";
const API_KEY = "44bZPSfQMiyMh25nmwYhmGWhx8HSelZ9QPL4lo7X"; // Your API key

export const fetchRandomUniversity = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        fields: "id,school.name,school.city,school.state,school.school_url,latest.student.size",
        per_page: 100,
      },
    });

    console.log("API Response:", response.data); // Debugging log

    const universities = response.data.results;
    if (universities.length === 0) {
      console.error("No universities found.");
      return null;
    }

    return universities[Math.floor(Math.random() * universities.length)];
  } catch (error) {
    console.error("Error fetching university:", error);
    return null;
  }
};
