import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";

const Root = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/main.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element}>
            {route.children?.map((child, childIdx) => (
              <Route key={childIdx} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
