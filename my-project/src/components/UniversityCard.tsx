import React from "react";
import { Card, CardContent, Typography, CardMedia, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UniversityCardProps {
  name: string;
  location: string;
  website?: string; // Make it optional if not always present
  students: number;
  imageUrl: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ name, location, website, students, imageUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Navigating to university:", name); // Debugging
    navigate(`/university/${encodeURIComponent(name)}`); // ✅ Use name instead of ID
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia component="img" height="200" image={imageUrl} alt={name} />
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Students: {students.toLocaleString()}
          </Typography>
          {website && (
            <Typography variant="body2">
              <a href={website.startsWith("http") ? website : `https://${website}`} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UniversityCard;
