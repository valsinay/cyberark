import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { PostProps } from "./Post.types";
import { memo } from "react";

export const Post = memo(({ post }: PostProps) => {
  const { text, likes, image, publishDate } = post;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 2 }}>
      <CardMedia component="img" height="300" image={image} alt={text} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            ❤️ {likes} likes
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={2}
        >
          Published on {formatDate(publishDate)}
        </Typography>
      </CardContent>
    </Card>
  );
});
