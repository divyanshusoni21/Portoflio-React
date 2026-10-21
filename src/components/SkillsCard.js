import React from "react";

const SkillsCard = ({ name, alt, image, images }) => {
  const icons = images ?? (image ? [{ src: image, alt: alt || `${name} icon` }] : []);
  const pair = icons.length > 1;

  return (
    <div className="skills-card">
      <div className={`skills-card-icons${pair ? " skills-card-icons--pair" : ""}`}>
        {icons.map((icon) => (
          <img
            key={icon.src}
            src={icon.src}
            alt={icon.alt || ""}
            className="skills-card-icon"
          />
        ))}
      </div>
      <p className="skills-card-name">{name}</p>
    </div>
  );
};

export default SkillsCard;
