import React from 'react';
import Header from '../components/Header';
import { useLanguage } from '../helpers/LanguageContext';
import './Home.css';

const Home = () => {
  const { translations } = useLanguage();

  return (
    <div>
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title" aria-describedby="hero-subtitle">
          <div className="hero-content">
            <h1 id="hero-title">{translations.heroTitle}</h1>
            <p id="hero-subtitle">{translations.heroSubtitle}</p>
          </div>
        </section>
        <section className="container mt-5">
          <div className="section text-center">
            <h2>{translations.welcomeTitle}</h2>
            <p className="accent">
              {translations.welcomeText1}
            </p>
            <p className="accent">
              {translations.welcomeText2}
            </p>
          </div>
          <div className="section">
            <h2 className="text-center">{translations.programsTitle}</h2>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="card text-center">
                  <img src="/PeakClimb/images/beginner.jpg" className="card-img-top program-image" alt="Beginner Program" />
                  <div className="card-body">
                    <h3 className="card-title">{translations.beginnerProgram}</h3>
                    <p className="card-text">
                      {translations.beginnerText}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <img src="/PeakClimb/images/intermediate.jpg" className="card-img-top program-image" alt="Intermediate Program" />
                  <div className="card-body">
                    <h3 className="card-title">{translations.intermediateProgram}</h3>
                    <p className="card-text">
                      {translations.intermediateText}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <img src="/PeakClimb/images/expert.jpg" className="card-img-top program-image" alt="Advanced Program" />
                  <div className="card-body">
                    <h3 className="card-title">{translations.advancedProgram}</h3>
                    <p className="card-text">
                      {translations.advancedText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section text-center">
            <h2>{translations.locationTitle}</h2>
            <p className="accent">
              {translations.locationText}
            </p>
            <div className="map-container">
              <iframe
                title="PeakClimb Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.2644539019125!2d-122.0842496846927!3d37.421999979825085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5bb9b519921%3A0x13b70f2e626fa3f9!2sGoogleplex!5e0!3m2!1sen!2sus!4v1638836588968!5m2!1sen!2sus"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="section text-center">
            <h2>{translations.chooseUsTitle}</h2>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="feature-icon">
                  <i className="fas fa-user-shield fa-3x text-warning" aria-hidden="true"></i>
                </div>
                <h4>{translations.safety}</h4>
                <p>
                  {translations.safetyText}
                </p>
              </div>
              <div className="col-md-4">
                <div className="feature-icon">
                  <i className="fas fa-chalkboard-teacher fa-3x text-warning" aria-hidden="true"></i>
                </div>
                <h4>{translations.instructors}</h4>
                <p>
                  {translations.instructorsText}
                </p>
              </div>
              <div className="col-md-4">
                <div className="feature-icon">
                  <i className="fas fa-mountain fa-3x text-warning" aria-hidden="true"></i>
                </div>
                <h4>{translations.facilities}</h4>
                <p>
                  {translations.facilitiesText}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
