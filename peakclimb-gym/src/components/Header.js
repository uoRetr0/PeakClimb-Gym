import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../helpers/LanguageContext';

const Header = () => {
  const { switchLanguage, translations } = useLanguage();

  const handleLanguageChange = (e) => {
    switchLanguage(e.target.value);
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo">PeakClimb Gym</div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <NavLink exact to="/PeakClimb-Gym" className="nav-link text-white" activeClassName="selected">{translations.home}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/PeakClimb-Gym/booking" className="nav-link text-white" activeClassName="selected">{translations.booking}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/PeakClimb-Gym/explore" className="nav-link text-white" activeClassName="selected">{translations.classes}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/PeakClimb-Gym/schedule" className="nav-link text-white" activeClassName="selected">{translations.schedule}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/PeakClimb-Gym/info" className="nav-link text-white" activeClassName="selected">{translations.learn}</NavLink>
            </li>
            <li className="nav-item">
              <select onChange={handleLanguageChange} className="form-select">
                <option value="en">En</option>
                <option value="fr">Fr</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
