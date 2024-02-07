import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../hooks/useApi";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};


export default function Dashboard() {
  const callAPI = useAPI()

    const resetDatabase = async () => {
      await callAPI.get('/');
      console.log(callAPI.data)
    }

    return(
        <>
            <button onClick={()=>resetDatabase()}>Load/Reset Database</button>
            <LogoutButton />
            <h1>Dashboard</h1>
        </>
    )
}