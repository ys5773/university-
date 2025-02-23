import React, { useEffect, useState } from "react";
import UniversityCard from "../components/UniversityCard";
import SwipeButtons from "../components/SwipeButtons";
import { fetchRandomUniversity } from "../services/universityService";
import { fetchUniversityImage } from "../services/wikimediaService";
import { saveLikedUniversity } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [university, setUniversity] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewUniversity();
  }, []);

  const fetchNewUniversity = async () => {
    const randomUni = await fetchRandomUniversity();
    if (randomUni) {
      setUniversity(randomUni);
      const image = await fetchUniversityImage(randomUni["school.name"]);
      setImageUrl(image);
    }
  };

  const handleSwipeRight = async () => {
    if (university) {
      await saveLikedUniversity(university); // Save to Firestore
    }
    fetchNewUniversity();
  };

  return (
    <div>
      <h1>Discover Universities</h1>

      {university ? (
        <UniversityCard
          name={university["school.name"]}
          location={`${university["school.city"]}, ${university["school.state"]}`}
          website={university["school.school_url"]}
          students={university["latest.student.size"]}
          imageUrl={imageUrl}
        />
      ) : (
        <p>Loading university...</p>
      )}

      <SwipeButtons onSwipeLeft={fetchNewUniversity} onSwipeRight={handleSwipeRight} />
    </div>
  );
};

export default Home;
