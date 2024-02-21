import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RootElement, {
  loader as rootLoader,
  action as rootAction,
} from "./RootElement";
import Movie, { loader as movieLoader } from "./Movie";
import EditMovie, { action as editAction } from "./EditMovie";
import { action as destroyAction } from "./Destroy";
import Index from "./Index";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/", // => Root-Pfad (bey Vite z.B. localhost:5173)
      element: <RootElement />, // => element das gerendert werden soll
      errorElement: <ErrorPage />, // => Error-Page
      loader: rootLoader, // => Loader-Funktion wird beim Laden der Seite ausgeführt.
      action: rootAction, // => Action-Funktion wird beim Ausführen einer Aktion ausgeführt
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Index /> },
            {
              path: "/movies/:id", // => :id ist ein Platzhalter für eine beliebige Zahl (z.B.: /movies/1)
              element: <Movie />,
              loader: movieLoader as any,
            },
            {
              path: "/movies/:id/edit",
              element: <EditMovie />,
              loader: movieLoader as any,
              action: editAction as any,
            },
            {
              path: "/movies/:id/destroy",
              action: destroyAction as any,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
