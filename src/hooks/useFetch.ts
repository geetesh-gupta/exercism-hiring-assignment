import axios from "axios";
import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ status: boolean; message: unknown }>({
    status: false,
    message: null,
  });
  const [data, setData] = useState<T>();

  useEffect(() => {
    const request = axios.CancelToken.source(); // (*)

    const fetchData = async () => {
      if (!url) return;
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: request.token,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log("API Succeeded");
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          //   console.log("API Cancelled");
        } else setError({ status: true, message: err });
      }
    };
    fetchData();

    return () => request.cancel(); // (*)
  }, [url]);

  return { isLoading, error, data };
}
export default useFetch;
