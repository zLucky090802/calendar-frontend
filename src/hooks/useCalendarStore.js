import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../calendar/calendarSlice";

export const useCalendarStore = () => {


  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.Calendar);
  const setActiveEvent = (calendarEvent) => {
    dispatch( onSetActiveEvent(calendarEvent) )
  };

  const startSavingEvent = async(calendarEvent) =>{
    //TODO llegar al backend
    //todo bien
    if(calendarEvent._id){
       dispatch(onUpdateEvent({...calendarEvent}));
    }else{
      //creando
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
    }
  }

  const startDeletingEvent = () =>{
    dispatch(onDeleteEvent());
  }
  return {
    //*Propiedades
    events,
    hasEventSelected: !!activeEvent,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  };
};
