import { useState } from "react";
import Calendar from "react-calendar";

export default function Calendario({ onSelect }) {
  const [date, setDate] = useState(new Date());

  const handleChange = (value) => {
    setDate(value);
    if (onSelect) onSelect(value);
  };

  return (
    <div className="calendar-container">
      <Calendar onChange={handleChange} value={date} minDate={new Date()} />
    </div>
  );
}
