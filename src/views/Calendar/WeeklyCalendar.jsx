import { Fragment, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  addDays,
  subDays,
  getDay,
  getDate,
  getMonth,
  getYear,
  startOfWeek,
  endOfWeek,
  lastDayOfMonth,
  startOfMonth,
  isSameMonth,
  isToday,
  setMonth,
  isSameDay,
  parseISO,
  format,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WeeklyCalendar({ selectedDate, setSelectedDate, events }) {
  const [weekDays, setWeekDays] = useState([]);

  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  useEffect(() => {
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  const drawEventCard = (timestamp, title) => {
    return (
      <li
        className="relative mt-px flex sm:col-start-3"
        style={{ gridRow: "8 / span 12" }}
      >
        <a
          href="#"
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
        >
          <p className="order-1 font-semibold text-blue-700">Breakfast</p>
          <p className="text-blue-500 group-hover:text-blue-700">
            <time dateTime="2022-01-12T06:00">6:00 AM</time>
          </p>
        </a>
      </li>
    );
  };

  function getDayEvents(date) {
    if (events == null) return date;

    date.events = [];

    for (var i = 0; i < 10; i++) {
      events[i].date = events[i].date.replace(/(\r\n|\n|\r)/gm, "");

      var eventDate = parseISO(events[i].date);

      if (isSameDay(eventDate, date)) {
        date.events.push(events[i]);
        console.log(date, events[i]);
        console.log(date, date.events);
        console.log(events[i].date + events[i].title);
      }
    }

    return date.events;
  }

  function getWeekEvents() {
    let startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    let endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

    let day = startDate;
    let days = [];

    while (day <= endDate) {
      day.events = getDayEvents(day);
      days.push(day);
      day = addDays(day, 1);
    }
    console.log("WWeek days:", days);
    return days;
  }

  useEffect(() => {
    setWeekDays(getWeekEvents());
  }, []);

  return (
    <div className="flex flex-col ">
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto rounded-3xl bg-calendar-deepblue-hover"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-calendar-deepblue shadow ring-1 ring-black ring-opacity-5"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-200 sm:hidden">
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                M{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  10
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                T{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  11
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                W{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  12
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                T{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  13
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                F{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  14
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  15
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  16
                </span>
              </button>
            </div>

            <div className="-mr-px hidden grid-cols-7 border-b border-gray-600 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />

              {weekDays.map((day) => (
                <div className="flex items-center justify-center py-3 text-moon-gold" onClick={() => {setSelectedDate(day)}}>
                  <span className={classNames( 
                      isSameDay(day, selectedDate)?"flex items-baseline":"")}>
                    {format(day, "EEE") + " "}
                    <span className={classNames( 
                      isSameDay(day, selectedDate)?
                      "ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white":"items-center justify-center font-semibold text-gray-200")}>
                      {getDate(day)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto ">
            <div className="sticky left-0 z-10 w-14 flex-none bg-calendar-deepblue ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-600"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-600 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "8 / span 12" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    <p className="order-1 font-semibold text-blue-700">
                      Breakfast
                    </p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-12T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "92 / span 30" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                  >
                    <p className="order-1 font-semibold text-pink-700">
                      Flight to Paris
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px hidden sm:col-start-6 sm:flex"
                  style={{ gridRow: "122 / span 24" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      Meeting with design team at Disney
                    </p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
