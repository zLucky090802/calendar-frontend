import React from 'react'

export const CalendarEvent = ({event}) => {
    const {user, title} = event;
  return (
    <>
    <strong>{title}</strong>
    <strong> - {user.name}</strong>
    </>
  )
}
