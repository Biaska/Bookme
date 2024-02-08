import { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react'


export const useAuthUserData = () => {
    const [userMetaData, setUserMetadata] = useState(null)
    const { user, getAccessTokenSilently } = useAuth0();
    console.log(user)

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = import.meta.env.VITE_AUTH0_DOMAIN;
      
          try {
            const accessToken: string  = await getAccessTokenSilently();
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e: any) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);

    return { user, userMetaData }
}