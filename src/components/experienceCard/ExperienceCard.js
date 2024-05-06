import React, {useState, createRef} from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";

export default function ExperienceCard({cardInfo, isDark, showCompanyInfo}) {
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = createRef();

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return typeof values === "undefined"
      ? null
      : "rgb(" + values.join(", ") + ")";
  }

  const GetDescBullets = ({descBullets, isDark}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {item}
          </li>
        ))
      : null;
  };

  const experienceBannerEmptyClass = showCompanyInfo ? "" : "experience-banner-empty";
  const experienceCardEmptyClass = showCompanyInfo ? "" : "experience-card-empty";
  const experienceCardClass = isDark ? "experience-card-dark" : "experience-card"
  return (
    <div className={`${experienceCardClass} ${experienceCardEmptyClass}`}>
      <div style={{ background: rgb(colorArrays) }} className={`experience-banner ${experienceBannerEmptyClass}`}>
        <div className="experience-blurred_div"></div>
        {showCompanyInfo && (
          <div className="experience-div-company">
            <h5 className="experience-text-company">{cardInfo.company}</h5>
            <img
              crossOrigin={"anonymous"}
              ref={imgRef}
              className="experience-roundedimg"
              src={cardInfo.companylogo}
              alt={cardInfo.company}
              onLoad={() => getColorArrays()}
            />
          </div>
        )}
      </div>
      <div className="experience-text-details">
        <h5
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {cardInfo.role}
        </h5>
        <h5
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {cardInfo.date}
        </h5>
        <p
          className={
            isDark
              ? "subTitle experience-text-desc dark-mode-text"
              : "subTitle experience-text-desc"
          }
        >
          {cardInfo.desc}
        </p>
        <ul>
          <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
        </ul>
      </div>
    </div>
  );
}