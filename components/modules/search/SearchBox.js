import styles from "../../../styles/SearchBox.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { convertCityName } from "@/utils/helpers";
import toast from "react-hot-toast";

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

  const CustomPlaceholder = (props) => (
    <components.Placeholder {...props}>
      <div className={styles.placeholder}>
        {props.selectProps.placeholderIcon && (
          <img src={props.selectProps.placeholderIcon} alt="icon" />
        )}
        <span>{props.children}</span>
      </div>
    </components.Placeholder>
  );

  const handleSearch = () => {
    if (!origin && !destination && !searchDate) {
      setSearchTours(null);
       toast.error("برای جستجو حداقل یکی از فیلدهاانتخاب شوند")
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
      <Select
        options={originOptions}
        value={origin}
        onChange={(option) => setOrigin(option)}
        placeholder="مبدا"
        placeholderIcon="/location.svg"
        isClearable
        isRtl
        components={{
          Placeholder: CustomPlaceholder,
          DropdownIndicator: () => null,
        }}
        styles={{
          control: (base) => ({
            ...base,
            width: "200px",
            border: "none",
            boxShadow: "none",
            minHeight: "45px",
            fontSize: "14px",
            cursor:"pointer",
          }),
          menu: (base) => ({
            ...base,
            fontSize: "14px",
            zIndex: 9999,
          }),
        }}
      />

      <Select
        options={destinationOptions}
        value={destination}
        onChange={(option) => setDestination(option)}
        placeholder="مقصد"
        placeholderIcon="/destination.svg"
        isClearable
        isRtl
        components={{
          Placeholder: CustomPlaceholder,
          DropdownIndicator: () => null,
        }}
        styles={{
          control: (base) => ({
            ...base,
            width: "200px",
            border: "none",
            boxShadow: "none",
            minHeight: "45px",
            fontSize: "14px",
            cursor:"pointer",
          }),
          menu: (base) => ({
            ...base,
            fontSize: "14px",
            zIndex: 9999,
          }),
        }}
      />

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

      {searchDate && (
        <button
          onClick={() => setSearchDate(null)}
          className={styles.clearButton}
        >
          ✖ حذف بازه
        </button>
      )}

      <button className={styles.search_button} onClick={handleSearch}>
        جستجو
      </button>
    </div>
  );
}

export default SearchBox;
