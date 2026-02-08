import { Outlet } from "react-router-dom";
import WardenHeader from "../components/warden/WardenHeader";

const WardenLayout = () => {
  return (
    <>
      <WardenHeader />
      <Outlet />
    </>
  );
};

export default WardenLayout;
