import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
function Page404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl my-5">Sahifa topilmadi</p>
      <NavLink to="/">
        <Button variant="contained" color="primary">
          Bosh sahifa
        </Button>
      </NavLink>
    </div>
  );
}

export default Page404;
