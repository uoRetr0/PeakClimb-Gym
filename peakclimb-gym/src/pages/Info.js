import React from 'react';
import Header from '../components/Header';
import { useLanguage } from '../helpers/LanguageContext';
import './Info.css';

const Info = () => {
  const { translations } = useLanguage();

  return (
    <div>
      <Header />
      <div className="info-hero">
        <div className="info-hero-content">
          <h1>{translations.infoHeroTitle}</h1>
          <p>{translations.infoHeroSubtitle}</p>
        </div>
      </div>
      <div className="container mt-5">
        <div className="section mb-5">
          <h2 className="text-center text-custom-orange mb-4">{translations.howItWorksTitle}</h2>
          <p className="accent">
            {translations.howItWorksText}
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h3>{translations.step1Title}</h3>
              <p>{translations.step1Text}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.step2Title}</h3>
              <p>{translations.step2Text}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.step3Title}</h3>
              <p>{translations.step3Text}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.step4Title}</h3>
              <p>{translations.step4Text}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.step5Title}</h3>
              <p>{translations.step5Text}</p>
            </li>
          </ul>
        </div>
        <div className="section mb-5">
          <h2 className="text-center text-custom-orange mb-4">{translations.climbingLevelsTitle}</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h3>{translations.beginnerLevelTitle}</h3>
              <p>{translations.beginnerLevelText}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.intermediateLevelTitle}</h3>
              <p>{translations.intermediateLevelText}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.advancedLevelTitle}</h3>
              <p>{translations.advancedLevelText}</p>
            </li>
          </ul>
        </div>
        <div className="section">
          <h2 className="text-center text-custom-orange mb-4">{translations.safetyTipsTitle}</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h3>{translations.checkGearTitle}</h3>
              <p>{translations.checkGearText}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.warmUpTitle}</h3>
              <p>{translations.warmUpText}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.followRulesTitle}</h3>
              <p>{translations.followRulesText}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.stayHydratedTitle}</h3>
              <p>{translations.stayHydratedText}</p>
            </li>
            <li className="list-group-item">
              <h3>{translations.knowLimitsTitle}</h3>
              <p>{translations.knowLimitsText}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
