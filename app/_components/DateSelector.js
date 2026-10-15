"use client";

import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import { isWithinInterval } from "date-fns";
import "react-day-picker/dist/style.css";
import { useReservation } from "../_context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const defaultClassNames = getDefaultClassNames();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        disabled={{ before: new Date() }}
        captionLayout="dropdown"
        numberOfMonths={2}
        classNames={{
          today: "text-accent-500",
          selected: "bg-accent-600 border-accent-600 text-primary-50",
          range_start: "bg-accent-600 text-primary-50 rounded-l-full",
          range_end: "bg-accent-600 text-primary-50 rounded-r-full",
          range_middle: "bg-accent-600/20 text-primary-50",
          root: `${defaultClassNames.root} shadow-lg p-5`,
          chevron: `${defaultClassNames.chevron} !fill-accent-600`,

          dropdowns: `${defaultClassNames.dropdowns} gap-2 text-primary-50`,
          dropdown_root: `${defaultClassNames.dropdown_root} px-2 py-1`,
          caption_label: `${defaultClassNames.caption_label} text-primary-50 font-semibold`,
          dropdown: `${defaultClassNames.dropdown} [&>option]:bg-primary-900 [&>option]:text-primary-50`,

          button_previous: `${defaultClassNames.button_previous} text-accent-600`,
          button_next: `${defaultClassNames.button_next} text-accent-600`,
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
