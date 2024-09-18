import React from "react";
import BadgeComponent from "../badge-component";
import "./filterComponentStyles.css";

export interface FilterComponentProps {
  podcastNumber?: string;
  onChange: (filterText: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  podcastNumber = "0",
  onChange,
}) => {
  return (
    <div className="filterContainer">
      <BadgeComponent value={podcastNumber} className="podcastNumBadge" />
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        placeholder="Filter podcasts..."
        className="filterInput"
      />
    </div>
  );
};

export default FilterComponent;
