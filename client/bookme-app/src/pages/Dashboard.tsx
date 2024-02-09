import { useAuth0 } from "@auth0/auth0-react";
import { APIMethods, useAPI } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};


export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [api, response] = useAPI();
  const { getIdTokenClaims, user: authUser } = useAuth0();
  const navigate = useNavigate();

  const getUser = async () => {
    if (api.businesses) {
      const businesses = api.businesses as APIMethods
      if (authUser?.sub) {
        await businesses.getOne(authUser.sub);;
      }
    }
  }

  const redirectToAccountSetup = async () => {
    if (response.status === 200) {
      console.log("user loaded")
    }
    if (response.status === 204) {
      navigate('/BusinessInit');
    }
  }

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
    getUser();
  }, [])

  useEffect(() => {
    redirectToAccountSetup();
  }, [response])
    
    if (response.status === 0) {
      return <PageLoader />
    }

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