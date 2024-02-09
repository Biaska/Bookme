import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader"
import { useAuth0 } from "@auth0/auth0-react"
import { PhoneInput } from "../components/phoneInput";
import TimezoneSelect, { ITimezoneOption, type ITimezone } from 'react-timezone-select'


export default function CreateBusiness(){
    const { getIdTokenClaims } = useAuth0();
    const [email, setEmail] = useState<string>('');
    const [first, setFirst] = useState<string>('');
    const [last, setLast] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [userID, setUserID] = useState('');
    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
 
    const getUserData = async () => {
        const userData = await getIdTokenClaims();
        if (userData?.email){
            setUserID(userData.sub)
            setEmail(userData.email);
        }
    }

    const formatZip = (input: string) => {
        let zipcode = input.replace(/\D/g, '').substring(0, 5);
        setZip(zipcode);
    }

    const postBusiness = (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            id: userID,
            email: email,
            first_name: first,
            last_name: last,
            phone_number: phone,
            street_address: address,
            city: city,
            state: state,
            postal_code: zip,
            timezone: selectedTimezone
        }
        console.log(data)
    }

    useEffect(() => {
        getUserData();
    },[])

    return (
    <>
        <form onSubmit={(e)=>{postBusiness(e)}}>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="email">Email</label>
                </div>
                <input disabled type="text" id="email" value={email}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="first">First Name</label>
                </div>
                <input type="text" id="first" value={first} onChange={(e)=>setFirst(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="last">Last Name</label>
                </div>
                <input type="text" id="last" value={last} onChange={(e)=>setLast(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="phone">Business Phone</label>
                </div>
                <PhoneInput state={phone} setState={setPhone}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="address">Street Address</label>
                </div>
                <input type="text" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="city">City</label>
                </div>
                <input type="text" id="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="state">State</label>
                </div>
                <input type="text" id="state" value={state} onChange={(e)=>setState(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="zip">Postal Code</label>
                </div>
                <input type="text" id="zip" value={zip} onChange={(e)=>formatZip(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="zip">Postal Code</label>
                </div>
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    className="input"
                    />
                </div>
            <button type="submit">Submit</button>
        </form>
    </>
    )
}