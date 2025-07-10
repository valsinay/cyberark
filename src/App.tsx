import { Post } from "./components/Post/Post";
import { Post as PostInterface } from "./components/Post/Post.types";
import { Box, Grid } from "@mui/material";
import { Loader } from "./components/Loader/Loader";
import { useFetch } from "./hooks/useFetch";
import { useCallback, useEffect, useRef, useState } from "react";

export const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { posts, error, loading } = useFetch(currentPage);
  const prevScroll = useRef({ height: 0, scrollY: 0, page: 1 });

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      prevScroll.current = {
        height: document.body.offsetHeight,
        scrollY: window.scrollY,
        page: currentPage,
      };
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

   useEffect(() => {
    if (prevScroll.current.page !== currentPage) {
      const diff = document.body.offsetHeight - prevScroll.current.height;
      window.scrollTo({
        top: prevScroll.current.scrollY + diff,
        behavior: "auto",
      });
      prevScroll.current.page = currentPage;
    }
  }, [posts.length, currentPage]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (posts.length === 0 || loading) return <Loader />;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        {posts.map((post: PostInterface) => (
          <Grid key={post.id} size={{ xs: 6, lg: 2 }}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
