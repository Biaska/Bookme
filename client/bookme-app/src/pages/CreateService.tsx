import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { APIMethods, useAPI } from "../hooks/useApi";
import { useNavigate } from "react-router";
import ToolTip from "../components/ToolTip";


export default function CreateService(){
    // api calls
    const [api, response] = useAPI();
    const navigate = useNavigate();
    const { user } = useAuth0();

    // state variables
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [businessID, setBusinessID] = useState<string>('')

    const getBusiness = async () => {
        if (user?.sub) {
            setBusinessID(user.sub);
        }
      };

    // post business to the server
    const postService = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            title: title,
            description: description,
            type: type,
            businessID: businessID,
        }
        if (api.services) {
            const services = api.services as APIMethods;
            await services.post(data);
            if (response.status == 400) {
                console.error(response.data);
            } else {
                navigate('/Dashboard');
            }
        }
    }

    // Get user data on mount to preset ID and email
    useEffect(() => {
        getBusiness();
    },[])

    return (
    <>
        <h3>Create your service.</h3>
        <form onSubmit={(e)=>{postService(e)}}>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="title">Title</label>
                </div>
                <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="description">Description</label>
                </div>
                <textarea rows={6} cols={50} id="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="input-group">
                <div className="label-group">
                    <label htmlFor="type">Type</label>
                </div>
                <select id="type" value={type} onChange={(e)=>setType(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Class">Class</option>
                    <option value="Appointment">Appointment</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </>
    )
}