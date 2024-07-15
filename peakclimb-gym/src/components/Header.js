
  // <header className="bg-dark text-white p-3">
  //   <div className="container d-flex justify-content-between align-items-center">
  //     <div className="logo">PeakClimb Gym</div>
  //     <nav>
  //       <ul className="nav">
  //         <li className="nav-item">
  //           <NavLink exact to="/PeakClimb" className="nav-link text-white" activeClassName="selected">Home</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/PeakClimb/booking" className="nav-link text-white" activeClassName="selected">Booking</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/PeakClimb/explore" className="nav-link text-white" activeClassName="selected">Classes</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/PeakClimb/schedule" className="nav-link text-white" activeClassName="selected">My Schedule</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/PeakClimb/info" className="nav-link text-white" activeClassName="selected">Learn</NavLink>
  //         </li>
  //       </ul>
  //     </nav>
  //   </div>
  // </header>
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
                <NavLink exact to="/" className="nav-link text-white" activeClassName="selected">{translations.home}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/booking" className="nav-link text-white" activeClassName="selected">{translations.booking}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/explore" className="nav-link text-white" activeClassName="selected">{translations.classes}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/schedule" className="nav-link text-white" activeClassName="selected">{translations.schedule}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/info" className="nav-link text-white" activeClassName="selected">{translations.learn}</NavLink>
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
  