import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
        <div className="error-page">
          <h1>Oops!</h1>
          <img id="icon" src="/Bookme-Icon.png" alt="Bookme logo" />
          <p>Sorry, an unexpected error has occurred.</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </div>
      );
  } else {
    return (
        <div className="error-page">
          <h1>Oops!</h1>
          <img id="icon" src="/Bookme-Icon.png" alt="Bookme logo" />
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
  }
}

export default ErrorPage