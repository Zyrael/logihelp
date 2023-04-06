import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {},
      credentials = "include"
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method,
          body,
          headers,
          credentials,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    []
  );

  return { loading, request };
};