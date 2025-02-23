import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUniversityDetails } from "../services/universityService";
import { CircularProgress, Typography, Card, CardContent, Divider, Box } from "@mui/material";

const UniversityDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get name from URL
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUniversityDetails = async () => {
      if (!name) {
        console.error("Invalid university name:", name);
        setLoading(false);
        return;
      }

      const decodedName = decodeURIComponent(name); // Decode special characters
      console.log("Fetching details for university:", decodedName);

      setLoading(true);
      const data = await fetchUniversityDetails(decodedName);
      setUniversity(data);
      setLoading(false);
    };

    loadUniversityDetails();
  }, [name]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (!university)
    return <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>Error loading university details. Please try again.</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>{university["school.name"]}</Typography>
          <Typography variant="h6" color="text.secondary">{university["school.city"]}, {university["school.state"]}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Costs & Tuition */}
          <Typography variant="h6">Cost & Tuition</Typography>
          <Typography variant="body2">📚 Books & Supplies: ${university["latest.cost.booksupply"]?.toLocaleString()}</Typography>
          <Typography variant="body2">🏠 On-Campus Room & Board: ${university["latest.cost.roomboard.oncampus"]?.toLocaleString()}</Typography>
          <Typography variant="body2">💰 Tuition (In-State): ${university["latest.cost.tuition.in_state"]?.toLocaleString()}</Typography>
          <Typography variant="body2">💰 Tuition (Out-of-State): ${university["latest.cost.tuition.out_of_state"]?.toLocaleString()}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Financial Aid & Loans */}
          <Typography variant="h6">Financial Aid & Loans</Typography>
          <Typography variant="body2">🎓 Median Debt: ${university["latest.aid.median_debt.overall"]?.toLocaleString()}</Typography>
          <Typography variant="body2">📈 Federal Loan Rate: {university["latest.aid.federal_loan_rate"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">🎗️ Students with Pell Grants: {university["latest.aid.students_with_pell_grant"]?.toFixed(2)}%</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Earnings After Graduation */}
          <Typography variant="h6">Earnings After Graduation</Typography>
          <Typography variant="body2">💼 6 Years After Entry: ${university["latest.earnings.6_yrs_after_entry.median"]?.toLocaleString()}</Typography>
          <Typography variant="body2">💼 10 Years After Entry: ${university["latest.earnings.10_yrs_after_entry.median"]?.toLocaleString()}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Retention & Completion */}
          <Typography variant="h6">Retention & Graduation</Typography>
          <Typography variant="body2">📊 Retention Rate (Full-Time): {university["latest.completion.retention_rate.overall.full_time"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">🎓 Completed in 6 Years: {university["latest.completion.title_iv.completed_by.6yrs"]?.toFixed(2)}%</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Student Demographics */}
          <Typography variant="h6">Student Demographics</Typography>
          <Typography variant="body2">👨 Men: {university["latest.student.demographics.men"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">👩 Women: {university["latest.student.demographics.women"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">🟡 Asian: {university["latest.student.demographics.race_ethnicity.asian"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">⚫ Black: {university["latest.student.demographics.race_ethnicity.black"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">🟠 Hispanic: {university["latest.student.demographics.race_ethnicity.hispanic"]?.toFixed(2)}%</Typography>
          <Typography variant="body2">⚪ White: {university["latest.student.demographics.race_ethnicity.white"]?.toFixed(2)}%</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Faculty Info */}
          <Typography variant="h6">Faculty Information</Typography>
          <Typography variant="body2">📚 Average Faculty Salary: ${university["latest.student.faculty_salary"]?.toLocaleString()}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* School Website */}
          {university["school.school_url"] && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              🌐 <a href={`https://${university["school.school_url"]}`} target="_blank" rel="noopener noreferrer">
                Visit School Website
              </a>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UniversityDetails;
