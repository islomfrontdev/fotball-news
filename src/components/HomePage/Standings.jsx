import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

function Standings() {
  const [leagueId, setLeagueId] = useState(23614);
  const [standings, setStandings] = useState([]);

  function getStandings() {
    axios
      .get(`https://api.tribuna.uz/v1/seasons/${leagueId}/standings`, {
        params: {
          include: "team,group",
          sort: "position",
        },
      })
      .then((response) => {
        setStandings(sortStandings(response.data.data));
      })
      .catch((error) => console.error(error));
  }

  function sortStandings(standings) {
    return standings.sort((a, b) => a.position - b.position);
  }

  useEffect(() => {
    getStandings();
  }, [leagueId]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Turnir jadvali</h2>
      <div className="mt-5">
        <FormControl size="small" style={{ width: 300 }}>
          <InputLabel id="demo-simple-select-label">Liga</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={leagueId}
            label="Liga"
            onChange={(e) => setLeagueId(e.target.value)}
          >
            <MenuItem value={23614}>Angliya Premier League</MenuItem>
            <MenuItem value={23621}>Ispaniya La Liga</MenuItem>
            <MenuItem value={23744}>Germaniya Bundesliga</MenuItem>
            <MenuItem value={23746}>Italiya Serie A</MenuItem>
            <MenuItem value={23643}>Fransiya Ligue 1</MenuItem>
            <MenuItem value={23970}>Saudiya ligasi</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Jamoa</TableCell>
              <TableCell>Tur</TableCell>
              <TableCell>Ochko</TableCell>
              <TableCell>G'alaba</TableCell>
              <TableCell>Durrang</TableCell>
              <TableCell>Mag'lubiyat</TableCell>
              <TableCell>Urilgan gollar</TableCell>
              <TableCell>O'tkazilgan gollar</TableCell>
              <TableCell>Gollar farqi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings?.length > 0 &&
              standings.map((team) => (
                <TableRow
                  key={team.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex items-center gap-1">
                      <span className="w-5">{team.position}</span>
                      <img
                        src={team.team.logo.path}
                        alt={team.team.name}
                        className="w-6 h-6"
                      />
                      {team.team.name}
                    </div>
                  </TableCell>
                  <TableCell>{team.overall_games_played}</TableCell>
                  <TableCell>{team.points}</TableCell>
                  <TableCell>{team.overall_won}</TableCell>
                  <TableCell>{team.overall_lost}</TableCell>
                  <TableCell>{team.overall_draw}</TableCell>
                  <TableCell>{team.overall_goals_scored}</TableCell>
                  <TableCell>{team.overall_goals_against}</TableCell>
                  <TableCell>{team.total_goals_difference}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Standings;
