const convertVehicle = (vehicle) => {
  switch (vehicle) {
    case "bus":
      return "اتوبوس";
    case "ship":
      return "کشتی";
    case "train":
      return "قطار";
    case "airplane":
      return "هواپیما";
    case "SUV":
      return "آفرود";
    default:
      return "";
  }
};

const cityMap = {
  Sanandaj: "سنندج",
  Tehran: "تهران",
  Madrid: "مادرید",
  Isfahan: "اصفهان",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
};
const convertCityName = (name) => cityMap[name] || name;

const startDateFa = (startDate) =>
  new Date(startDate).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const endDateFa = (endDate) =>
  new Date(endDate).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const startDateFaLong = (startDate) => {
  const date = new Date(startDate);
  const weekday = date.toLocaleDateString("fa-IR", { weekday: "long" });
  const day = date.toLocaleDateString("fa-IR", { day: "numeric" });
  const month = date.toLocaleDateString("fa-IR", { month: "long" });
  const year = date.toLocaleDateString("fa-IR", { year: "numeric" });

  return `${weekday} ${day} ${month} ${year}`;
};

const endDateFaLong = (endDate) => {
  const date = new Date(endDate);
  const weekday = date.toLocaleDateString("fa-IR", { weekday: "long" });
  const day = date.toLocaleDateString("fa-IR", { day: "numeric" });
  const month = date.toLocaleDateString("fa-IR", { month: "long" });
  const year = date.toLocaleDateString("fa-IR", { year: "numeric" });

  return `${weekday} ${day} ${month} ${year}`;
};

 function formatPersianDateTime(dateString) {
  const date = new Date(dateString);
  const faDate = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return ` ${hours}:${minutes} - ${faDate}`;
}

export {
  convertVehicle,
  convertCityName,
  startDateFa,
  endDateFa,
  startDateFaLong,
  endDateFaLong,
  formatPersianDateTime
};
