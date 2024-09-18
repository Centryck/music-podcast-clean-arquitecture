import React from "react";
import { Link } from "react-router-dom";
import BadgeComponent from "../badge-component";
import "./headerComponentStyles.css";

export interface HeaderProps {
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoading }) => {
  return (
    <div className="headerContainer">
      <Link to="/" className="headerTitle">
        Podcaster
      </Link>

      {isLoading && <BadgeComponent className="loadingBadge" />}
    </div>
  );
};

export default Header;
