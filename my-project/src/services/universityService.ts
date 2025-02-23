import axios from "axios";

const API_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";
const API_KEY = "44bZPSfQMiyMh25nmwYhmGWhx8HSelZ9QPL4lo7X"; // Your API key

// ✅ Fetch a random university
export const fetchRandomUniversity = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        fields: "school.name,school.city,school.state,school.school_url,latest.student.size",
        per_page: 100,
      },
    });

    console.log("API Response:", response.data); // Debugging log

    const universities = response.data.results;
    if (!universities || universities.length === 0) {
      console.error("No universities found.");
      return null;
    }

    return universities[Math.floor(Math.random() * universities.length)];
  } catch (error) {
    console.error("Error fetching university:", error);
    return null;
  }
};

// ✅ Fetch detailed university info by name instead of ID
export const fetchUniversityDetails = async (schoolName: string) => {
  const fields = [
    "school.name",
    "school.city",
    "school.state",
    "school.school_url",
    "latest.student.size",
    "latest.cost.tuition.in_state",
    "latest.cost.tuition.out_of_state",
    "latest.cost.booksupply",
    "latest.cost.roomboard.oncampus",
    "latest.aid.median_debt.overall",
    "latest.aid.federal_loan_rate",
    "latest.aid.students_with_pell_grant",
    "latest.earnings.6_yrs_after_entry.median",
    "latest.earnings.10_yrs_after_entry.median",
    "latest.completion.retention_rate.overall.full_time",
    "latest.completion.title_iv.completed_by.6yrs",
    "latest.student.demographics.men",
    "latest.student.demographics.women",
    "latest.student.demographics.race_ethnicity.asian",
    "latest.student.demographics.race_ethnicity.black",
    "latest.student.demographics.race_ethnicity.hispanic",
    "latest.student.demographics.race_ethnicity.white",
    "latest.student.faculty_salary"
  ].join(",");

  try {
    console.log(`Fetching details for university: ${schoolName}`);

    const response = await axios.get(API_URL, {
      params: {
        "school.name": schoolName, // ✅ Use school name instead of ID
        fields,
        api_key: API_KEY,
      },
    });

    if (!response.data || !response.data.results || response.data.results.length === 0) {
      console.error("No university data found for:", schoolName);
      return null;
    }

    console.log("Detailed University Data:", response.data.results[0]); // Debugging log
    return response.data.results[0];
  } catch (error) {
    console.error("Error fetching university details:", error);
    return null;
  }
};
