import api from "./api";

const fetchTours = async () => {
  try {
    const { data } = await api.get("/tour");
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const fetchToursById = async (id) => {
  try {
    const { data } = await api.get(`/tour/${id}`);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export { fetchTours, fetchToursById };
