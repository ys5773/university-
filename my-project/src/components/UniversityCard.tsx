import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

interface UniversityCardProps {
  name: string;
  location: string;
  imageUrl: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ name, location, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UniversityCard;
