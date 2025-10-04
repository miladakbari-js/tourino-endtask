
const convertVehicle = (vehicle) => {
  switch (vehicle) {
    case "bus":
      return "اتوبوس";
    case "ship":
      return "کشتی";
    case "train":
      return "قطار";
    case "airplane":
      return "پرواز";
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


const startDateFa = (startDate)=> new Date(startDate).toLocaleDateString("fa-IR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const endDateFa = (endDate)=> new Date(endDate).toLocaleDateString("fa-IR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export { convertVehicle , convertCityName , startDateFa , endDateFa };
