import React, { useEffect, useState } from "react";
import { getLikedUniversities } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const LikedUniversities: React.FC = () => {
  const [likedUniversities, setLikedUniversities] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedUniversities = async () => {
      const universities = await getLikedUniversities();
      setLikedUniversities(universities);
    };
    fetchLikedUniversities();
  }, []);

  const handleUniversityClick = (name: string) => {
    navigate(`/university/${encodeURIComponent(name)}`); // Encode name for URL safety
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>Liked Universities</Typography>

      {likedUniversities.length > 0 ? (
        <Grid container spacing={2}>
          {likedUniversities.map((uni: any, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ cursor: "pointer" }} onClick={() => handleUniversityClick(uni["school.name"])}>
                {/* Clickable University Image */}
                {uni.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={uni.imageUrl}
                    alt={uni["school.name"]}
                    sx={{ objectFit: "cover" }}
                  />
                )}

                <CardContent>
                  {/* Clickable University Name */}
                  <Typography
                    variant="h6"
                    sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    onClick={() => handleUniversityClick(uni["school.name"])}
                  >
                    {uni["school.name"]}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    📍 {uni["school.city"]}, {uni["school.state"]}
                  </Typography>

                  {/* External Website Link */}
                  {uni["school.school_url"] && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      🌐 <a href={`https://${uni["school.school_url"]}`} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 4 }}>No universities liked yet.</Typography>
      )}
    </div>
  );
};

export default LikedUniversities;
