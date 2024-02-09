import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader"
import { useAuth0 } from "@auth0/auth0-react"
import { PhoneInput } from "../components/phoneInput";

export default function CreateBusiness(){
    const { getIdTokenClaims } = useAuth0();
    const [email, setEmail] = useState<string>('');
    const [first, setFirst] = useState<string>('');
    const [last, setLast] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zip, setZip] = useState<Number | null>(null);
    const [timezone, setTimezone] = useState<string>('');

 
    const getUserData = async () => {
        const user = await getIdTokenClaims();
        if (user?.email){
            setEmail(user.email);
        }
    }

    useEffect(() => {
        getUserData();
    },[])

    return (
    <>
        <form onSubmit={()=>{}}>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input disabled type="text" id="email" value={email}/>
            </div>
            <div className="input-group">
                <label htmlFor="first">First Name</label>
                <input type="text" id="first" value={first} onChange={(e)=>setFirst(e.target.value)}/>
            </div>
            <div className="input-group">
                <label htmlFor="last">Last Name</label>
                <input type="text" id="last" value={last} onChange={(e)=>setLast(e.target.value)}/>
            </div>
            <div className="input-group">
                <label htmlFor="phone">Business Phone</label>
                <PhoneInput state={phone} setState={setPhone}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    </>
    )
}