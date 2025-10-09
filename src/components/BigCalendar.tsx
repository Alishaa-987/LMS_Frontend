"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({data}:{data:{title: string ; start: Date; end: Date; resource?: any}[]}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const eventStyleGetter = (event: any) => {
    return {
      style: {
        backgroundColor: '#C3E88D',
        borderRadius: '6px',
        opacity: 0.9,
        color: '#000',
        border: '1px solid #4CAF50',
        display: 'block',
        padding: '1px 1px',
        minHeight: '50px',
        lineHeight: '1.3',
      }
    };
  };

  const EventComponent = ({ event }: { event: any }) => {
    return (
      <div className="h-full flex flex-col justify-start items-start p-1">
        <div className="font-medium text-xs leading-tight break-words text-gray-800" title={event.title}>
          {event.title}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "100%", minHeight: "500px" }}
        onView={handleOnChangeView}
        min={new Date(2025, 8, 0, 8, 0, 0)}
        max={new Date(2025, 8, 0, 17, 0, 0)}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventComponent,
        }}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer?.format(date, 'HH:mm', culture) || '',
          dayHeaderFormat: (date, culture, localizer) =>
            localizer?.format(date, 'ddd, MMM D', culture) || '',
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer?.format(start, 'MMM D', culture)} - ${localizer?.format(end, 'MMM D', culture)}`,
        }}
        step={30}
        showMultiDayTimes={false}
        toolbar={true}
        popup={false}
        selectable={false}
        className="text-sm"
      />
    </div>
  );
};
export default BigCalendar;
