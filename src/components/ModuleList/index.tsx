import { Module } from "@/utils/api";
import React from "react";

interface ModuleListProps {
  modules: Module[];
}

const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  return (
    <ul>
      {modules.map((module) => (
        <li key={module.name}>
          <h3>{module.name}</h3>
          <p>Owner: {module.owner}</p>
          <p>Stars: {module.stars}</p>
        </li>
      ))}
    </ul>
  );
};

export default ModuleList;
