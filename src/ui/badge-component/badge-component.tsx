import React from "react";
import cn from "classnames";
import "./badgeComponentStyles.css";

export interface BadgeComponentProps {
  className?: string;
  value?: string;
}

const BadgeComponent: React.FC<BadgeComponentProps> = ({
  className = "",
  value = "",
}) => {
  const classNames = cn("Badge", className.split(" "));

  return (
    <div className={classNames} data-testid="badge">
      <span>{value}</span>
    </div>
  );
};

export default BadgeComponent;
