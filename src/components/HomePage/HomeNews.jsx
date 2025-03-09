import axios from "axios";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setNewsStore } from "../../store/newsSlice";
function HomeNews() {
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();

  function getNews(page = 1) {
    axios
      .get("https://api.tribuna.uz/v1/posts", {
        params: {
          _f: "json",
          page: page,
          sort: "-id",
          "per-page": 4,
          categories: 1,
        },
      })
      .then((response) => setNews(response.data));
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <div className="flex gap-5 items-center my-5">
        <h2 className="text-2xl font-bold">Yangiliklar</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {news.data &&
          news.data.map((item) => (
            <NavLink
              key={item.id}
              to={`/news/${item.id}`}
              onClick={() => dispatch(setNewsStore(item))}
              className="hover:scale-102 transition-all duration-300 group"
            >
              <Card className="w-full">
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.poster.path}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="line-clamp-2 group-hover:text-blue-500 group-hover:underline"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </NavLink>
          ))}
      </div>
      <div className="mt-2 flex justify-center">
        {news.data && (
          <Pagination
            count={news._meta.pageCount}
            onChange={(event, value) => getNews(value)}
          />
        )}
      </div>
    </>
  );
}

export default HomeNews;
