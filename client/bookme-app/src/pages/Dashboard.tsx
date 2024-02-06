import { useAuth0 } from "@auth0/auth0-react";
import { useApi, TApiResponse } from "../hooks/useApi";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};


export default function Dashboard() {

  const data: TApiResponse = useApi.get('/');

    console.log(data)
    return(
        <>
            <LogoutButton />
            <h1>Dashboard</h1>
        </>
    )
}