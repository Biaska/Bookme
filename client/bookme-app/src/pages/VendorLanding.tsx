import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Sign up</button>;
  };

export default function VendorLanding() {
    


    return (
        <> 
            <h1>Host your services on Bookme</h1>
            <img id="icon" src="/Bookme-Icon.png" alt="Bookme logo" />
            
            <div className="text-body">
                <p>
                    Sign up, and post your services for hassle-free bookings!
                    With Bookme, users do not need a profile, to streamline the booking process, 
                    and get you more clients. Sign up below!

                </p>
            </div>
            <SignupButton />

        </>
    )
}