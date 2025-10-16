import api from "./api";

const sendOtp = async (mobile) => {
  try {
    const { data } = await api.post("/auth/send-otp", { mobile });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const checkOtp = async (mobile, code) => {
  try {
    const { data } = await api.post("/auth/check-otp", { mobile, code });
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const { data } = await api.post("/auth/refresh-token", { refreshToken });
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const getProfile = async () => {
  try {
    const { data } = await api.get("/user/profile");
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

const putProfile = async (body) => {
  try {
    const { data } = await api.put("/user/profile", body);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const getBasket = async () => {
  try {
    const { data } = await api.get("/basket");
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const putBasket = async (tourId) => {
  try {
    const { data } = await api.put(`/basket/${tourId}`);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const orderTour = async (form) => {
  try {
    const { data } = await api.post("/order",form);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};


const getMyTours = async()=>{
  try {
    const {data} = await api.get("/user/tours");
    console.log(data);
    return data
  } catch (err) {
    console.log(err);
    throw err
  }
}

const getTransactions = async () =>{
  try {
    const {data} = await api.get("/user/transactions");
    return data
  } catch (err) {
    console.log(err);
    throw err
  }
}

export {
  sendOtp,
  checkOtp,
  refreshToken,
  getProfile,
  putProfile,
  getBasket,
  putBasket,
  orderTour,
  getMyTours,
  getTransactions
};
