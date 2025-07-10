import { useEffect, useState } from "react";
import { PostResponse } from "../components/Post/Post.types";

const pageLimit = 20;

export const useFetch = (currentPage: number) => {
  const [data, setData] = useState<PostResponse>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const posts = data?.data || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_URL}?page=${currentPage}&limit=${pageLimit}`,
          {
            headers: {
              "app-id": import.meta.env.VITE_APP_ID,
            },
          }
        );
        const result = await res.json();
        setData((prev) => ({
          ...result,
          data: prev?.data ? [...prev.data, ...result.data] : result.data,
        }));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data" + error);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);
  console.log(currentPage)
  return { posts, error, loading };
};
