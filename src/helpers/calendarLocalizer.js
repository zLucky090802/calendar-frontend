import enUS from "date-fns/locale/en-US";
import esEs from "date-fns/locale/es";
import {  parse, startOfWeek, getDay, format } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
    "es": esEs,

  };
  

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });