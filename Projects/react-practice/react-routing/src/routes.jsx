import App from "./App";
import Profile from "./Profile";
import ErrorPage from "./NotFound";

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "profile/:name",
      element: <Profile />,
    },
  ];

  export default routes;