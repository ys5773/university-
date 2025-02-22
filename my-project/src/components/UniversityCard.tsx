import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

interface UniversityCardProps {
  name: string;
  location: string;
  website: string;
  students: number;
  imageUrl: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ name, location, website, students, imageUrl }) => {
  // Ensure website URL starts with "https://"
  const formattedWebsite = website.startsWith("http") ? website : `https://${website}`;

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia component="img" height="200" image={imageUrl} alt={name} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Students: {students.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <a href={formattedWebsite} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UniversityCard;
