import styles from "../../../styles/SearchBox.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select, { components } from "react-select";

function SearchBox({ tours }) {
  const origins = [...new Set(tours.map((t) => t.origin.name))];
  const destinations = [...new Set(tours.map((t) => t.destination.name))];

  const originOptions = origins.map((origin) => ({
    value: origin,
    label: origin,
  }));

  const destinationOptions = destinations.map((destination) => ({
    value: destination,
    label: destination,
  }));


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

  return (
    <div className={styles.container}>
      <Select
        options={originOptions}
        placeholder="مبدا"
        placeholderIcon="/location.svg"
        components={{ Placeholder: CustomPlaceholder }}
        styles={{
          control: (base) => ({
            ...base,
            width:"200px",
            border: "none",
            boxShadow: "none",
            minHeight: "45px",
            fontSize: "14px",
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
        placeholder="مقصد"
        placeholderIcon="/destination.svg"
        components={{ Placeholder: CustomPlaceholder }}
        styles={{
          control: (base) => ({
            ...base,
            width:"200px",
            border: "none",
            boxShadow: "none",
            minHeight: "45px",
            fontSize: "14px",
          }),
          menu: (base) => ({
            ...base,
            fontSize: "14px",
            zIndex: 9999,
          }),
        }}
      />

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        render={(value, openCalendar) => (
          <button onClick={openCalendar} className={styles.datepicker_button}>
            <img src="/calendar.svg" alt="calendar" />
            <span>{value || "تاریخ"}</span>
          </button>
        )}
      />

      <button className={styles.search_button}>جستجو</button>
    </div>
  );
}

export default SearchBox;
