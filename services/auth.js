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
    throw err;
  }
};

const putProfile = async ( body) => {
  try {
    const { data } = await api.put("/user/profile", body );
    return data
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export { sendOtp, checkOtp, refreshToken, getProfile , putProfile };
