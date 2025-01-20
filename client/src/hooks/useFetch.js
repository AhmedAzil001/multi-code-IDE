import { useEffect, useState } from "react";
import axios from "axios";

export const useGet = (url, options) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(url);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  },[url])

  return data;
};
