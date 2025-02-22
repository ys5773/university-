import React, { useEffect, useState } from "react";
import UniversityCard from "../components/UniversityCard";
import SwipeButtons from "../components/SwipeButtons";
import { fetchRandomUniversity } from "../services/universityService";
import { fetchUniversityImage } from "../services/wikimediaService";

const Home: React.FC = () => {
  const [university, setUniversity] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetchNewUniversity();
  }, []);

  const fetchNewUniversity = async () => {
    const randomUni = await fetchRandomUniversity();
    if (randomUni) {
      setUniversity(randomUni);

      // Fetch university image from Unsplash
      const image = await fetchUniversityImage(randomUni["school.name"]);
      setImageUrl(image);
    }
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

      <SwipeButtons onSwipeLeft={fetchNewUniversity} onSwipeRight={fetchNewUniversity} />
    </div>
  );
};

export default Home;

