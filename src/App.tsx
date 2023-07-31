import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Papers from "./pages/Papers";
import Calculator from "./pages/Calculator";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

// Layout
import { SideBar } from "./layouts/Sidebar";
import { WithDialog } from "./layouts/WithDialog";

// Context
import { PapersProvider } from "./context/PapersContext";

function App() {
  /*
   * Hooks
   */
  const location = useLocation();

  const previousLocation = location.state?.previousLocation;

  return (
    <PapersProvider>
      <SideBar>
        <Routes location={previousLocation || location}>
          <Route path="/" element={<Papers />} />

          <Route element={<WithDialog />}>
            <Route path="editar/:paperId" element={<Edit />} />
          </Route>

          <Route path="calculadora" element={<Calculator />} />
        </Routes>

        {previousLocation ? (
          <Routes>
            <Route element={<WithDialog />}>
              <Route path="criar" element={<Create />} />
            </Route>
          </Routes>
        ) : null}
      </SideBar>
    </PapersProvider>
  );
}

export default App;
