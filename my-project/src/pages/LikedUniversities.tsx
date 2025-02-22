import React from "react";
import { useLocation } from "react-router-dom";

const LikedUniversities: React.FC = () => {
  const location = useLocation();
  const likedUniversities = location.state?.likedUniversities || [];

  return (
    <div>
      <h1>Liked Universities</h1>
      {likedUniversities.length > 0 ? (
        likedUniversities.map((uni: any, index: number) => (
          <div key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <h3>{uni["school.name"]}</h3>
            <p>{uni["school.city"]}, {uni["school.state"]}</p>
            <a href={uni["school.school_url"]} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        ))
      ) : (
        <p>No universities liked yet.</p>
      )}
    </div>
  );
};

export default LikedUniversities;
