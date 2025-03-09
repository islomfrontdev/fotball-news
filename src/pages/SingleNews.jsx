import { Breadcrumbs, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewsStore } from "../store/newsSlice";
import axios from "axios";
function SingleNews() {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const newsStore = useSelector((state) => state.news.value);
  console.log(newsStore);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://api.tribuna.uz/v1/posts/related-posts/${id}?_f=json&_l=oz`)
      .then((res) => setNews(res.data.data));
  }, [id]);

  return (
    <div className="container mx-auto">
      <Breadcrumbs>
        <NavLink
          className="text-blue-500 hover:text-blue-600 hover:underline"
          to="/"
        >
          Bosh sahifa
        </NavLink>
        <Typography>Batafsil</Typography>
      </Breadcrumbs>

      {newsStore && (
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-1">
              <img
                className="w-full object-contain"
                src={newsStore.poster?.path}
                alt={newsStore.title}
              />
            </div>
            <div className="col-span-2">
              <Typography variant="h5">{newsStore.title}</Typography>
              <hr className="my-5" />
              <Typography
                variant="body1"
                className="mt-10"
                dangerouslySetInnerHTML={{ __html: newsStore.description }}
              />
            </div>
          </div>
        </div>
      )}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">O'hshash yangiliklar</h2>
        {news.length > 0 &&
          news.map((item) => (
            <NavLink
              key={item.id}
              to={`/news/${item.id}`}
              onClick={() => dispatch(setNewsStore(item))}
              className="group hover:scale-102 transition-all duration-300"
            >
              <div className="mt-5 flex items-center gap-5 bg-blue-100 p-2 rounded-md shadow group-hover:scale-101 transition-all duration-300">
                <img
                  className="w-20 h-20 object-contain"
                  src={item.poster.path}
                  alt={item.title}
                />
                <Typography
                  variant="h6"
                  className="group-hover:text-blue-500 group-hover:underline"
                >
                  {item.title}
                </Typography>
              </div>
            </NavLink>
          ))}
      </section>
    </div>
  );
}
export default SingleNews;
