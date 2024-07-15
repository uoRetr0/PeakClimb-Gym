import React, { useState } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../helpers/LanguageContext';
import './Booking.css';

const Booking = () => {
  const { translations } = useLanguage();
  const [participants, setParticipants] = useState([{ fullname: '', email: '', phone: '' }]);
  const instructors = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis'];
  const [form, setForm] = useState({
    date: '',
    time: '',
    skill: '',
    instructor: '',
    contact: {
      fullname: '',
      email: '',
      phone: '',
    },
  });

  const handleAddParticipant = () => {
    setParticipants([...participants, { fullname: '', email: '', phone: '' }]);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      contact: {
        ...form.contact,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      ...form,
      participants,
    };

    // Save booking to local storage
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    savedBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(savedBookings));

    // Reset form
    setForm({
      date: '',
      time: '',
      skill: '',
      instructor: '',
      contact: {
        fullname: '',
        email: '',
        phone: '',
      },
    });
    setParticipants([{ fullname: '', email: '', phone: '' }]);
    alert('Booking saved!');
  };

  return (
    <div>
      <Header />
      <div className="container mt-2 pt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="booking-form-container p-4 shadow rounded">
              <h2 className="text-center mb-4">{translations.bookingTitle}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">{translations.dateLabel}</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">{translations.timeLabel}</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="skill" className="form-label">{translations.skillLabel}</label>
                  <select
                    className="form-select"
                    id="skill"
                    name="skill"
                    value={form.skill}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{translations.selectSkillLevel}</option>
                    <option value="beginner">{translations.beginner}</option>
                    <option value="intermediate">{translations.intermediate}</option>
                    <option value="advanced">{translations.advanced}</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="instructor" className="form-label">{translations.instructorLabel}</label>
                  <select
                    className="form-select"
                    id="instructor"
                    name="instructor"
                    value={form.instructor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{translations.selectInstructor}</option>
                    {instructors.map((instructor, index) => (
                      <option key={index} value={instructor}>{instructor}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">{translations.fullNameLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    value={form.contact.fullname}
                    onChange={handleContactChange}
                    placeholder={translations.fullNamePlaceholder}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">{translations.emailLabel}</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={form.contact.email}
                    onChange={handleContactChange}
                    placeholder={translations.emailPlaceholder}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">{translations.phoneLabel}</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={form.contact.phone}
                    onChange={handleContactChange}
                    placeholder={translations.phonePlaceholder}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-custom-orange w-100">{translations.bookNowButton}</button>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="group-booking-container p-4 shadow rounded">
              <h3 className="text-center mb-3">{translations.groupBookingTitle}</h3>
              <p className="text-center mb-3">{translations.groupSessionInstructions}</p>
              {participants.map((participant, index) => (
                <div key={index} className="mb-3">
                  <div className="mb-2">
                    <label className="form-label">{translations.participantLabel} {index + 1}</label>
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm float-end"
                        onClick={() => handleRemoveParticipant(index)}
                      >
                        {translations.removeButton}
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder={translations.fullNamePlaceholder}
                    value={participant.fullname}
                    onChange={(e) => handleParticipantChange(index, 'fullname', e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder={translations.emailPlaceholder}
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    className="form-control"
                    placeholder={translations.phonePlaceholder}
                    value={participant.phone}
                    onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="button" className="btn btn-secondary mb-3 w-100" onClick={handleAddParticipant}>
                {translations.addParticipantButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
