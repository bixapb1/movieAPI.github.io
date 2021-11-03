import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Rating,
} from "@mui/material/";
import noPoster from "../assets/no-poster.jpg";
import { Link } from "react-router-dom";
import { fetchMovieView } from "../redux/actions";
export default function ViewerMovie() {
  const viewerMovie = useSelector((state) => state.viewerMovie);
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(fetchMovieView(id));
  }, [dispatch, id]);

  return (
    <Grid
      sx={{
        mt: 10,
        px: 1,
      }}
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={4}>
        <CardMedia
          sx={{
            maxWidth: 345,
            m: "0 auto",
            boxShadow: "0px 0px 10px 5px rgba(15, 15, 15, 0.44)",
          }}
          component="img"
          height="auto"
          src={
            viewerMovie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${viewerMovie.poster_path}`
              : noPoster
          }
          alt={viewerMovie.title}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        {" "}
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ m: 2, textAlign: "center" }}
            gutterBottom
            variant="h4"
            component="div"
          >
            {viewerMovie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {viewerMovie.overview}
          </Typography>
          <Typography
            sx={{ justifyContent: "flex-end" }}
            component="span"
            variant="h6"
            color="text.secondary.black"
          >
            Release date: {viewerMovie.release_date}
          </Typography>
          <Typography
            sx={{ justifyContent: "space-between", py: 1 }}
            component="span"
            variant="body1"
            color="text.secondary.black"
          >
            Genres:
            {Boolean(viewerMovie.length !== 0)
              ? viewerMovie.genres.map((genre) => (
                  <Typography component="span" sx={{ pl: 1 }} key={genre.id}>
                    {genre.name}
                  </Typography>
                ))
              : ""}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={0}
            value={viewerMovie.vote_average / 2}
            precision={0.5}
            readOnly
          />
          <Button
            sx={{ m: 2 }}
            component={Link}
            to="/"
            variant="outlined"
            href="#outlined-buttons"
          >
            Home
          </Button>
        </CardContent>
      </Grid>
    </Grid>
  );
}
