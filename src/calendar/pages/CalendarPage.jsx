import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import enUS from "date-fns/locale/en-US";
import { addHours } from "date-fns";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../index";
import { useEffect, useState } from "react";
import { localizer, getMessagesEs } from "../../helpers";
import { useAuthStore, useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useSelector } from "react-redux";


// const events = [
//   {
//     title: "Cumpleaños del Jefe",
//     notes: "Hay que comprar el pastel",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "Daniel",
//     },
//   },
// ];

export const CalendarPage = () => {


  const { user } = useAuthStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const {openDateModal} = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'week')
  const [view, setView] = useState(lastView);
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )
    

    const style = {
      backgroundColor: isMyEvent ? "#A020F0" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  }
  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) =>{
    localStorage.setItem('lastView', event);
    setLastView(event)

  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  
  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        views={["month", "week", "day", "agenda"]}
        view={view} // 🔹 Asigna la vista actual
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        onView={(newView) => {setView(newView); onViewChanged(newView)}}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};
