import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import { useLanguage } from '../helpers/LanguageContext';
import './Explore.css';

const Explore = () => {
  const { translations } = useLanguage();
  const [filters, setFilters] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
    morning: false,
    afternoon: false,
    evening: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

  const classes = [
    {
      title: 'Beginner Climbing Class',
      date: 'June 20, 2024',
      time: '10:00 AM - 12:00 PM',
      instructor: 'John Doe',
      level: 'beginner',
      timeOfDay: 'morning',
      day: 'monday',
      description: 'Perfect for those new to climbing, this class will cover the basics of climbing techniques and safety.',
    },
    {
      title: 'Intermediate Bouldering',
      date: 'June 21, 2024',
      time: '2:00 PM - 4:00 PM',
      instructor: 'Jane Smith',
      level: 'intermediate',
      timeOfDay: 'afternoon',
      day: 'monday',
      description: 'Improve your bouldering skills with advanced techniques and challenges.',
    },
    {
      title: 'Advanced Climbing Techniques',
      date: 'June 22, 2024',
      time: '6:00 PM - 8:00 PM',
      instructor: 'Emily Johnson',
      level: 'advanced',
      timeOfDay: 'evening',
      day: 'tuesday',
      description: 'Take your climbing to the next level with expert-led advanced techniques.',
    },
    {
      title: 'Morning Yoga for Climbers',
      date: 'June 23, 2024',
      time: '8:00 AM - 9:00 AM',
      instructor: 'Sara Lee',
      level: 'all levels',
      timeOfDay: 'morning',
      day: 'wednesday',
      description: 'Start your day with a yoga session designed to enhance flexibility and strength for climbers.',
    },
    {
      title: 'Family Climbing Fun',
      date: 'June 24, 2024',
      time: '3:00 PM - 5:00 PM',
      instructor: 'Mark Johnson',
      level: 'beginner',
      timeOfDay: 'afternoon',
      day: 'thursday',
      description: 'A fun climbing session for the whole family. Suitable for children and adults alike.',
    },
    {
      title: 'Ladies Climbing Night',
      date: 'June 25, 2024',
      time: '7:00 PM - 9:00 PM',
      instructor: 'Lisa White',
      level: 'all levels',
      timeOfDay: 'evening',
      day: 'friday',
      description: 'A special climbing event for women of all skill levels. Join us for a supportive and fun environment.',
    },
    {
      title: 'Climbing Techniques Workshop',
      date: 'June 28, 2024',
      time: '4:00 PM - 6:00 PM',
      instructor: 'David Black',
      level: 'intermediate',
      timeOfDay: 'afternoon',
      day: 'monday',
      description: 'A workshop focused on improving your climbing techniques with hands-on practice.',
    },
    {
      title: 'Evening Strength Training',
      date: 'June 29, 2024',
      time: '6:00 PM - 7:00 PM',
      instructor: 'Emma Blue',
      level: 'all levels',
      timeOfDay: 'evening',
      day: 'tuesday',
      description: 'Enhance your climbing performance with a strength training session specifically for climbers.',
    },
  ];

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      beginner: false,
      intermediate: false,
      advanced: false,
      morning: false,
      afternoon: false,
      evening: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
    });
  };

  const filterClasses = (classes) => {
    return classes.filter((classItem) => {
      const levelMatch =
        (!filters.beginner && !filters.intermediate && !filters.advanced) ||
        (filters.beginner && classItem.level === 'beginner') ||
        (filters.intermediate && classItem.level === 'intermediate') ||
        (filters.advanced && classItem.level === 'advanced');

      const timeMatch =
        (!filters.morning && !filters.afternoon && !filters.evening) ||
        (filters.morning && classItem.timeOfDay === 'morning') ||
        (filters.afternoon && classItem.timeOfDay === 'afternoon') ||
        (filters.evening && classItem.timeOfDay === 'evening');

      const dayMatch =
        (!filters.monday && !filters.tuesday && !filters.wednesday && !filters.thursday && !filters.friday) ||
        (filters.monday && classItem.day === 'monday') ||
        (filters.tuesday && classItem.day === 'tuesday') ||
        (filters.wednesday && classItem.day === 'wednesday') ||
        (filters.thursday && classItem.day === 'thursday') ||
        (filters.friday && classItem.day === 'friday');

      return levelMatch && timeMatch && dayMatch;
    });
  };

  const filteredClasses = filterClasses(classes);

  const addToSchedule = (classItem) => {
    const currentSchedule = JSON.parse(localStorage.getItem('schedule')) || {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    };

    currentSchedule[classItem.day.charAt(0).toUpperCase() + classItem.day.slice(1)].push({ time: classItem.time, session: classItem.title });
    localStorage.setItem('schedule', JSON.stringify(currentSchedule));
    toast.success(`${classItem.title} ${translations.addedToScheduleMessage} ${classItem.day.charAt(0).toUpperCase() + classItem.day.slice(1)} at ${classItem.time}`);
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h3>{translations.filterBy}</h3>
              <form>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="beginner"
                    checked={filters.beginner}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="beginner">
                    {translations.beginnerLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="intermediate"
                    checked={filters.intermediate}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="intermediate">
                    {translations.intermediateLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="advanced"
                    checked={filters.advanced}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="advanced">
                    {translations.advancedLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="morning"
                    checked={filters.morning}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="morning">
                    {translations.morningLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="afternoon"
                    checked={filters.afternoon}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="afternoon">
                    {translations.afternoonLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="evening"
                    checked={filters.evening}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="evening">
                    {translations.eveningLabel}
                  </label>
                </div>
                <h4 className="mt-4">{translations.weekdaysLabel}</h4>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="monday"
                    checked={filters.monday}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="monday">
                    {translations.mondayLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="tuesday"
                    checked={filters.tuesday}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="tuesday">
                    {translations.tuesdayLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wednesday"
                    checked={filters.wednesday}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="wednesday">
                    {translations.wednesdayLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="thursday"
                    checked={filters.thursday}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="thursday">
                    {translations.thursdayLabel}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="friday"
                    checked={filters.friday}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="friday">
                    {translations.fridayLabel}
                  </label>
                </div>
                <button type="button" className="btn btn-secondary mt-3 w-100" onClick={handleClearFilters}>
                  {translations.clearFiltersButton}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <h3>{translations.availableClassesTitle}</h3>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, index) => (
                <div key={index} className="card mb-3 p-3 shadow-sm">
                  <h4 className="card-title">{classItem.title}</h4>
                  <p className="card-text">Date: {classItem.date}</p>
                  <p className="card-text">Time: {classItem.time}</p>
                  <p className="card-text">Instructor: {classItem.instructor}</p>
                  <p className="card-text">{classItem.description}</p>
                  <button
                    className="btn btn-custom-orange"
                    onClick={() => addToSchedule(classItem)}
                  >
                    {translations.selectConfirmButton}
                  </button>
                </div>
              ))
            ) : (
              <p>{translations.noClassesMessage}</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Explore;
