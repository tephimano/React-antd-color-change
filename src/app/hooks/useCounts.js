import { useQuery } from "react-query";
import axios from "axios";

export const useCounts = (key, id, url, config) => {
  console.log(url);
  return useQuery(
    [key, id],
    async () => {
      const { data } = await axios.get(url);
      return data;
    },
    config
  );
};
