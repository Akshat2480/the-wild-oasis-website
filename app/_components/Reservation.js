import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 border border-primary-800 min-h-[400px]">
      <div className="md:col-span-3 min-w-0">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
      </div>

      <div className="md:col-span-2 min-w-0">
        <ReservationForm cabin={cabin} />
      </div>
    </div>
  );
}
export default Reservation;
