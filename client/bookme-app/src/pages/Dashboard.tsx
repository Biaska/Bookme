import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../hooks/useApi";
import { useAuthUserData } from "../hooks/useAuthUserData";
import { useEffect, useState } from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};


export default function Dashboard() {
  const [userData, setUserData] = useState<any>()
  const [userDetails, setUserDetails] = useState<any>()
  const { user, userMetaData } = useAuthUserData();
  const callAPI = useAPI()

    const makeAPICall = async () => {
      await callAPI.get('/');
      console.log(callAPI.data)
    }
  useEffect(() => {
    setUserData(userMetaData);
    setUserDetails(user);

  }, [])

    return(
        <>
            <button onClick={()=>makeAPICall()}>Make API call</button>
            <LogoutButton />
            <h1>Dashboard</h1>
            {userData ? <p>UserMetaData loaded: {userData} {userDetails?.name}</p> :
              <div>loading...</div>
            }
        </>
    )
}