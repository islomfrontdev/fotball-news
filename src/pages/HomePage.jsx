import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  Chip,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeNews from "../components/HomePage/HomeNews";
import Standings from "../components/HomePage/Standings";
function HomePage() {
  const [day, setDay] = useState("today");
  const [matchesData, setMatchesData] = useState([]);
  const [leagueId, setLeagueId] = useState("all");
  const [loading, setLoading] = useState(true);

  function getMatchesData(day, page = 1) {
    axios
      .get("https://beta.tribuna.uz/matches", {
        params: {
          include: "home_team,away_team,goals",
          _f: "json",
          "per-page": 12,
          day: day,
          page: page,
          league: leagueId === "all" ? null : leagueId,
        },
      })
      .then((response) => setMatchesData(response.data));
    setLoading(false);
  }

  useEffect(() => {
    getMatchesData(day);
  }, [day, leagueId]);
  return (
    <div className="container mx-auto px-5 xl:px-0">
      <section>
        <h2 className="text-2xl font-bold">O'yinlar</h2>
        <div className="flex items-center gap-2 mt-5 flex-col md:flex-row">
          <FormControl size="small" style={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label" sx={{ width: "100%" }}>
              Liga
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={leagueId}
              label="Liga"
              onChange={(e) => setLeagueId(e.target.value)}
            >
              <MenuItem value={"all"}>Barcha turnirlar</MenuItem>
              <MenuItem value={2}>Chempionlar ligasi</MenuItem>
              <MenuItem value={8}>Premier liga</MenuItem>
              <MenuItem value={564}>La Liga</MenuItem>
              <MenuItem value={82}>Bundesliga</MenuItem>
              <MenuItem value={384}>Serie A</MenuItem>
              <MenuItem value={1910}>Uzbekiston Super Ligasi</MenuItem>
              <MenuItem value={301}>Liga 1</MenuItem>
              <MenuItem value={5}>Yevropa Leaguesi</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label" sx={{ width: "100%" }}>
              Kunlar
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={day}
              label="Sana"
              onChange={(e) => setDay(e.target.value)}
            >
              <MenuItem value="today">Bugungi o'yinlar</MenuItem>
              <MenuItem value="yesterday">Kecha o'yinlar</MenuItem>
              <MenuItem value="tomorrow">Ertangi o'yinlar</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 bg-blue-100 mt-5 p-5 rounded-lg">
          {matchesData.data && !loading
            ? matchesData.data.map((match) => (
                <div
                  className="bg-white p-2 rounded-lg shadow-md flex items-center justify-between"
                  style={{
                    backgroundColor:
                      match.status?.toLowerCase() === "live"
                        ? "#73f094"
                        : match.status?.toLowerCase() === "new"
                        ? "#fff9c4"
                        : "#edc7ca",
                  }}
                  key={match.id}
                >
                  <div className="flex items-center gap-1">
                    <img
                      src={match.home_team.logo.path}
                      alt={match.home_team.name}
                      className="w-6 h-6"
                    />
                    <p className="text-xs font-bold w-14 text-ellipsis overflow-hidden whitespace-nowrap">
                      {match.home_team.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-col justify-center">
                    <p className="text-[10px] font-bold">{match.status}</p>
                    <Chip
                      label={`${match.goals.home_team} : ${match.goals.away_team}`}
                      size="small"
                      variant="outlined"
                      color="success"
                    />
                    {match.status?.toLowerCase() === "live" && (
                      <p className="text-xs font-bold">
                        {match.current_minute} min
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={match.away_team.logo.path}
                      alt={match.away_team.name}
                      className="w-6 h-6"
                    />
                    <p className="text-xs font-bold w-14 text-ellipsis overflow-hidden whitespace-nowrap">
                      {match.away_team.name}
                    </p>
                  </div>
                </div>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <Skeleton
                  key={item}
                  variant="rectangular"
                  height={70}
                  animation="wave"
                />
              ))}
          <div className="flex gap-1 items-center">
            {matchesData.data?.length === 0 && (
              <p className="text-2xl my-5">O'yinlar topilmadi</p>
            )}
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          {matchesData.data?.length > 0 && (
            <Pagination
              count={matchesData._meta.pageCount}
              onChange={(event, value) => getMatchesData(day, value)}
            />
          )}
        </div>
      </section>
      <section className="mt-10">
        <HomeNews />
      </section>
      <section className="mt-10">
        <Standings />
      </section>
    </div>
  );
}

export default HomePage;
