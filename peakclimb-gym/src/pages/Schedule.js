import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import { useLanguage } from '../helpers/LanguageContext';
import './Schedule.css';

const Schedule = () => {
  const { translations } = useLanguage();
  const [schedule, setSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  useEffect(() => {
    const savedSchedule = JSON.parse(localStorage.getItem('schedule')) || {};
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const combinedSchedule = { ...savedSchedule };

    savedBookings.forEach((booking) => {
      const bookingDate = new Date(booking.date);
      const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'long' });
      const timeSlot = `${booking.time} - ${addHours(booking.time, 1)}`;

      if (!combinedSchedule[dayOfWeek]) {
        combinedSchedule[dayOfWeek] = [];
      }

      combinedSchedule[dayOfWeek].push({
        id: `${booking.date}-${booking.time}-${booking.skill}`,
        time: timeSlot,
        session: translations.sessionLabel
          .replace('{skill}', booking.skill)
          .replace('{instructor}', booking.instructor)
          .replace('{participants}', booking.participants.length),
      });
    });

    setSchedule(combinedSchedule);
  }, [translations]);

  const addHours = (time, hours) => {
    const [hour, minute] = time.split(':');
    const period = time.includes('PM') && hour !== '12' ? 'PM' : 'AM';
    let newHour = parseInt(hour, 10) + hours;
    let newPeriod = period;

    if (newHour >= 12) {
      newPeriod = period === 'AM' ? 'PM' : 'AM';
      if (newHour > 12) newHour -= 12;
    }

    const formattedHour = newHour.toString().padStart(2, '0');
    return `${formattedHour}:${minute} ${newPeriod}`;
  };

  const updateLocalStorage = (newSchedule) => {
    localStorage.setItem('schedule', JSON.stringify(newSchedule));
  };

  const moveSession = (item, targetDay, targetTime) => {
    const { day, session } = item;
    console.log('Moving session:', item, 'to', targetDay, targetTime);

    setSchedule((prevSchedule) => {
      const newSchedule = { ...prevSchedule };
      const sourceDaySchedule = newSchedule[day].filter((slot) => slot.id !== session.id);
      newSchedule[day] = sourceDaySchedule;

      if (!newSchedule[targetDay]) {
        newSchedule[targetDay] = [];
      }

      const targetTimeSlot = `${targetTime} - ${addHours(targetTime, 1)}`;
      newSchedule[targetDay].push({
        ...session,
        time: targetTimeSlot,
      });

      console.log('Updated schedule:', newSchedule);

      updateLocalStorage(newSchedule);

      return newSchedule;
    });
  };

  const deleteSession = (day, session) => {
    setSchedule((prevSchedule) => {
      const newSchedule = { ...prevSchedule };
      newSchedule[day] = newSchedule[day].filter((slot) => slot.id !== session.id);

      console.log('Updated schedule:', newSchedule);

      updateLocalStorage(newSchedule);

      return newSchedule;
    });
  };

  const renderTimeSlots = (day) => {
    const times = [
      '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
      '6:00 PM', '7:00 PM'
    ];

    return times.map((time) => {
      const session = schedule[day]?.find((slot) => {
        const [startTime, endTime] = slot.time.split(' - ');
        return (
          new Date(`2024/01/01 ${time}`) >= new Date(`2024/01/01 ${startTime}`) &&
          new Date(`2024/01/01 ${time}`) < new Date(`2024/01/01 ${endTime}`)
        );
      });

      return (
        <TimeSlot
          key={time}
          day={day}
          time={time}
          session={session}
          moveSession={moveSession}
          deleteSession={deleteSession}
          translations={translations}
        />
      );
    });
  };

  const handleAddSession = () => {
    window.location.href = '/PeakClimb-Gym/explore';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Header />
        <div className="container mt-5">
          <h2 className="text-center mb-4">{translations.viewScheduleTitle}</h2>
          <p className="text-center mb-4">You can drag and drop sessions to reschedule them.</p>
          <div className="row justify-content-center">
            {Object.keys(schedule).map((day) => (
              <div key={day} className="day-card col-md-5 col-lg-3 p-3 shadow-sm mb-3 mx-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="day-title mb-0">{translations[day.toLowerCase() + 'Label']}</h4>
                  <button className="add-session" onClick={handleAddSession}>
                    {translations.addSessionButton}
                  </button>
                </div>
                {renderTimeSlots(day)}
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </DndProvider>
  );
};

const TimeSlot = ({ day, time, session, moveSession, deleteSession, translations }) => {
  const [{ isOver, canDrop }, ref] = useDrop({
    accept: 'SESSION',
    drop: (item) => moveSession(item, day, time),
    canDrop: () => !session,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'SESSION',
    item: { day, session },
    canDrag: () => {
      const isDraggable = session?.session.includes('Participants');
      if (!isDraggable) {
        toast.error(translations.errorMessage1);
      }
      return isDraggable;
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={ref}
      className={`time-slot p-2 mb-2 ${session ? 'occupied' : ''} ${isDragging ? 'dragging' : ''} ${isOver && canDrop ? 'drop-target' : ''}`}
    >
      <div className="time-label">{time}</div>
      {session && (
        <div ref={drag} className="session-text" style={{ opacity: isDragging ? 0.5 : 1 }}>
          {session.session}
          <button className="delete-session" onClick={() => deleteSession(day, session)}>X</button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
