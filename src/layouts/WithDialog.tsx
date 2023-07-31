import { Outlet, useNavigate } from "react-router-dom";

// Components
import { Dialog } from "../components/Dialog";

export const WithDialog = () => {
  /*
   * Hooks
   */
  const navigate = useNavigate();

  return (
    <Dialog onClose={() => navigate(-1)}>
      <Outlet />
    </Dialog>
  );
};
