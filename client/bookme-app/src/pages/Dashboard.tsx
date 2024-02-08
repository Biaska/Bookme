import { useAuth0 } from "@auth0/auth0-react";
import { APIMethods, useAPI } from "../hooks/useApi";
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
  const [user, setUser] = useState<any>()
  const [api, response] = useAPI()

  const getBusinesses = async () => {
    const businesses = api.businesses as APIMethods
    if (businesses) {
      await businesses.get()
    }
    if (response.data) {
      console.log(response.data)
    }
  }
  const resetDatabase = async () => {
    if (api.reset){
      api.reset()
    }
    
  }

  useEffect(() => {
    
  }, [])

    return(
        <>
            <button onClick={()=>getBusinesses()}>Make API call</button>
            <button onClick={()=>resetDatabase()}>Reset Databse</button>
            <LogoutButton />
            <h1>Dashboard</h1>
            {/* {userData ? <p>UserMetaData loaded: {userData} {userDetails?.name}</p> :
              <div>loading...</div>
            } */}
        </>
    )
}