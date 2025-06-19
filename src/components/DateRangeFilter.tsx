import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, X } from "lucide-react";

const DateRangeFilter = ({
  onFilter,
  onClear,
}: {
  onFilter: (start: string, end: string) => void;
  onClear?: () => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [dateRage, setDateRange] = useState({start: '', end: ''});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleFilter = (start: Date, end: Date) => {
    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];
    onFilter(startStr, endStr);
    setDateRange({start: startStr, end: endStr});
  };

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setShowPicker(false);
    onClear?.();
    setDateRange({start: '', end: ''});
  };

  return (
    <div className="relative block">
      <div className="flex gap-2">
        <div className="mb-[20px] w-full border rounded" onClick={() => setShowPicker(!showPicker)}>
          <button
            className="bg-gradient-to-r from-pink-500 to-red-400 text-white p-[10px] rounded rounded-tr-[0px] rounded-br-[0px]"
          >
            <Calendar size={18} />
          </button>

          { dateRage?.start && dateRage?.end ? (
            <span className="ml-[10px] relative" style={{ top: -3 }}>
            {dateRage?.start} - {dateRage?.end}
            </span>
          ) : (
            <span className="ml-[10px] text-gray-600 relative" style={{ top: -3 }}>
            Select Date
            </span>
          )}
        
      </div>

      {(startDate || endDate) && (
        <button
          onClick={clearFilter}
          className="absolute right-[10px] top-[12px]"
        >
          <X size={16} />
        </button>
      )}
      </div>

      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute mt-2 bg-white shadow-lg border rounded z-50 p-4"
        >
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(dates: [Date | null, Date | null]) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);

              if (start && end) {
                setShowPicker(false);
                handleFilter(start, end);
              }
            }}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;