import React from "react";
import "./SkeletonModule.scss";

const SkeletonModule: React.FC = () => {
  return (
    <div className="skeleton-module" data-testid="skeleton-module">
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-details">
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
      </div>
      <div className="skeleton-link"></div>
    </div>
  );
};

export default SkeletonModule;
