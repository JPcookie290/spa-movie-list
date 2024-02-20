import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RootElement, {
  loader as rootLoader,
  action as rootAction,
} from "./RootElement";
import Movie, { loader as movieLoader } from "./Movie";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/", // => Root-Pfad (bey Vite z.B. localhost:5173)
      element: <RootElement />, // => element das gerendert werden soll
      errorElement: <ErrorPage />, // => Error-Page
      loader: rootLoader, // => Loader-Funktion wird beim Laden der Seite ausgeführt.
      action: rootAction, // => Action-Function wird beim Ausführen einer Aktion ausgeführt
      children: [
        {
          path: "/movies/:id", // => :id ist ein Platzhalter für eine beliebige Zahl (z.B.: /movies/1)
          element: <Movie />,
          // TODO WWWWHHHHHHHHHHYYYYYYYYYYY??????????????
          loader: movieLoader as any,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
