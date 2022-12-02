import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
  useMatch,
} from "@tanstack/react-router";
import React, { PropsWithChildren, StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
const rootRoute = createRouteConfig();
const indexRoute = rootRoute.createRoute({
  path: "/",
  component: Index,
  action: () => {
    console.log("Action running...");
  },
});

function Index() {
  const btnClass =
    "border border-black p-2 rounded-md hover:cursor-pointer hover:bg-gray-100";
  const { action } = useMatch(indexRoute.id);
  const [randomValue, setRandomValue] = useState(Math.random());
  return (
    <div className={"m-4"}>
      <div className="flex space-x-4">
        <div>
          <Button className={btnClass} onClick={() => action?.submit()}>
            Click to submit
          </Button>
        </div>
        <div>
          <Button
            className={btnClass}
            onClick={() => setRandomValue(Math.random())}
          >
            Click to re-render
          </Button>
        </div>
      </div>

      <div className={"mt-4"}>Action status: {action?.latest?.status}</div>
    </div>
  );
}

const Button = ({ children, ...rest }: JSX.IntrinsicElements["button"]) => {
  return (
    <button
      className={
        "border border-black p-2 rounded-md hover:cursor-pointer hover:bg-gray-100"
      }
      {...rest}
    >
      {children}
    </button>
  );
};

const routeConfig = createRouteConfig().addChildren([indexRoute]);

const router = createReactRouter({
  routeConfig,
});

function App() {
  return (
    // Build our routes and render our router
    <>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </>
  );
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
