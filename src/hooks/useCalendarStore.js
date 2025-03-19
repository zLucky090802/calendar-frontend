import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {


  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.Calendar);
  const { user } = useSelector((state) => state.auth);
  const setActiveEvent = (calendarEvent) => {
    dispatch( onSetActiveEvent(calendarEvent) )
  };

  const startSavingEvent = async(calendarEvent) =>{
    try {
      
      
      if(calendarEvent.id){
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        
         dispatch(onUpdateEvent({...calendarEvent, user}));
         Swal.fire('Evento actualizado correctamente', '','success')
         return;
      }
        //creando
        const {data} = await calendarApi.post('/events', calendarEvent);
        
        dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}));
        Swal.fire('Evento Guardado Correctamente', '','success')
      
    } catch (error) {
      
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  }

  const startDeletingEvent = async() =>{
    try {

      await calendarApi.delete(`/events/${activeEvent.id}`)
      
      dispatch(onDeleteEvent());
      Swal.fire('Evento eliminado correctamente', '', 'success');
    } catch (error) {
      Swal.fire('Error al eliminar evento', error.response.data.msg, 'error');
    }
  }

  const startLoadingEvents = async() =>{
    try {
      
      const {data} = await calendarApi.get('/events')
      const events  = convertEventsToDateEvents( data.eventos );
      dispatch( onLoadEvents(events) )
      
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error)
    }
  }
  return {
    //*Propiedades
    events,
    hasEventSelected: !!activeEvent,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
