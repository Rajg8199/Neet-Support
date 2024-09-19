import axios from "axios";

export const dataApi = async ({
  endPoint,
  method = "GET",
  headers = {},
  params = {},
  data = {},
}) => {
  try {
    const response = await axios({
      url: endPoint,
      method: method,
      headers: headers,
      params: params,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
