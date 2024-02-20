import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getMovies, createMovie, Movie } from "./handleMovies";

export async function loader() {
  const movies = await getMovies();
  return { movies };
}

export async function action() {
  const movie = await createMovie();
  return { movie };
}

export default function RootElement() {
  const { movies } = useLoaderData() as { movies: Movie[] };
  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              id="term"
              aria-label="Search Movies"
              placeholder="Moviename"
              type="search"
              name="term"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">Add</button>
          </Form>
        </div>
        <nav>
          <ul>
            {movies.map((movie) => [
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  {movie.title ? movie.title : "no title"}
                </Link>
              </li>,
            ])}
          </ul>
        </nav>
      </div>
      <div id="content">{<Outlet />}</div>
    </>
  );
}
