import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Papers from "./pages/Papers";
import Calculator from "./pages/Calculator";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

// Layout
import { Default } from "./layouts/Default";
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
    <Default>
      <PapersProvider>
          <Routes location={previousLocation || location}>
            <Route path="/" element={<Papers />} />

            <Route path="calculadora" element={<Calculator />} />
          </Routes>

          {previousLocation ? (
            <Routes>
              <Route element={<WithDialog />}>
                <Route path="criar" element={<Create />} />

                <Route path="editar/:paperId" element={<Edit />} />
              </Route>
            </Routes>
          ) : null}
      </PapersProvider>
    </Default>
  );
}

export default App;
