import React from "react";
import "./Sponsors.scss";
import LazyImage from "../LazyImage";

interface Sponsor {
  name: string;
  image: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Sponsor 1",
    image: "https://via.placeholder.com/300x150?text=Sponsor+1",
  },
  {
    name: "Sponsor 2",
    image: "https://via.placeholder.com/300x150?text=Sponsor+2",
  },
  {
    name: "Sponsor 3",
    image: "https://via.placeholder.com/300x150?text=Sponsor+3",
  },
  {
    name: "Sponsor 4",
    image: "https://via.placeholder.com/300x150?text=Sponsor+4",
  },
  {
    name: "Sponsor 5",
    image: "https://via.placeholder.com/300x150?text=Sponsor+5",
  },
  {
    name: "Sponsor 6",
    image: "https://via.placeholder.com/300x150?text=Sponsor+6",
  },
];

const Sponsors: React.FC = () => {
  return (
    <div className="sponsors">
      {sponsors.map((sponsor, index) => (
        <div
          className="sponsor-item"
          key={sponsor + "" + index}
          data-testid={sponsor.name}
        >
          <LazyImage
            src={sponsor.image}
            alt={sponsor.name}
            className="sponsor-image"
          />
          <div className="sponsor-name">{sponsor.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Sponsors;
