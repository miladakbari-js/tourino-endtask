import styles from "../../../styles/SearchBox.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { convertCityName } from "@/utils/helpers";
import toast from "react-hot-toast";
import Image from "next/image";

function SearchBox({ tours, setSearchTours }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [searchDate, setSearchDate] = useState(null);

  const origins = [...new Set(tours.map((t) => t.origin.name))];
  const destinations = [...new Set(tours.map((t) => t.destination.name))];

  const originOptions = origins.map((origin) => ({
    value: origin,
    label: convertCityName(origin),
  }));

  const destinationOptions = destinations.map((destination) => ({
    value: destination,
    label: convertCityName(destination),
  }));

  useEffect(() => {
    if (!origin && !destination && !searchDate) {
      setSearchTours(null);
    }
  }, [origin, destination, searchDate]);

  const handleSearch = () => {
    if (!origin && !destination && !searchDate) {
      setSearchTours(null);
      toast.error("برای جستجو حداقل یکی از فیلدها انتخاب شود");
      return;
    }
    let filteredTours = [...tours];

    if (origin) {
      filteredTours = filteredTours.filter(
        (t) => t.origin.name.toLowerCase() === origin.value.toLowerCase()
      );
    }

    if (destination) {
      filteredTours = filteredTours.filter(
        (t) =>
          t.destination.name.toLowerCase() === destination.value.toLowerCase()
      );
    }

    if (searchDate) {
      if (Array.isArray(searchDate) && searchDate.length === 2) {
        const fromDate = searchDate[0].toDate();
        const toDate = searchDate[1].toDate();

        filteredTours = filteredTours.filter((t) => {
          const tourDate = new Date(t.startDate);
          return tourDate >= fromDate && tourDate <= toDate;
        });
      } else {
        const selectedDate = searchDate.toDate();
        filteredTours = filteredTours.filter((t) => {
          const tourDate = new Date(t.startDate);
          return (
            tourDate.getFullYear() === selectedDate.getFullYear() &&
            tourDate.getMonth() === selectedDate.getMonth() &&
            tourDate.getDate() === selectedDate.getDate()
          );
        });
      }
    }
    setSearchTours(filteredTours);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectBox}>
        
      <Image src="/location.svg" width={20} height={20} />
      <select
        value={origin?.value || ""}
        onChange={(e) =>
          setOrigin(
            e.target.value
            ? {
              value: e.target.value,
              label: convertCityName(e.target.value),
            }
            : null
          )
        }
        >
        <option value="">مبداء</option>
        {origins.map((originCity) => (
          <option key={originCity} value={originCity}>
            {convertCityName(originCity)}
          </option>
        ))}
      </select>
        </div>

<div className={styles.selectBox}>

      <Image src="/destination.svg" width={20} height={20} />
      <select
        value={destination?.value || ""}
        onChange={(e) =>
          setDestination(
            e.target.value
            ? {
              value: e.target.value,
              label: convertCityName(e.target.value),
            }
            : null
          )
        }
        >
        <option value="">مقصد</option>
        {destinations.map((destCity) => (
          <option key={destCity} value={destCity}>
            {convertCityName(destCity)}
          </option>
        ))}
      </select>
        </div>

      <DatePicker
        range
        calendar={persian}
        locale={persian_fa}
        value={searchDate}
        onChange={setSearchDate}
        render={(value, openCalendar) => (
          <button onClick={openCalendar} className={styles.datepicker_button}>
            <img src="/calendar.svg" alt="calendar" />
            <span>{value || "تاریخ"}</span>
          </button>
        )}
      />

      <div className={styles.clearButton}>
        {searchDate && (
          <button title="حذف بازه" onClick={() => setSearchDate(null)}>
            ✖
          </button>
        )}
      </div>

      <button className={styles.search_button} onClick={handleSearch}>
        جستجو
      </button>
    </div>
  );
}

export default SearchBox;
