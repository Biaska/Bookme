import { useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const [zip, setZip] = useState('');
    const [keyword, setKeyword] = useState('');
    const [miles, setMiles] = useState<number>(15)
    const navigate = useNavigate();

    // Format zip to only digits and max of 5
    const formatZip = (input: string) => {
        let zipcode = input.replace(/\D/g, '').substring(0, 5);
        setZip(zipcode);
    };

    // Search for services within radius
    const handleSearch = async () => {
        const searchParams = {
            zip: zip,
            keyword: keyword,
            miles:miles,
        };
        navigate('/SearchResults', { state: searchParams });
    }

    return (
        <>
            <div className="home-content">
                <div className="home-text">
                    <h1>Bookings Made Easy.</h1>
                    <p>
                        Hassle free appointment scheduling. 
                        Schedule services near you, no sign-up required.
                        </p>
                </div>
                <div className="search-box">
                    <div className="input-group">
                        <div className="label-group">
                            <label htmlFor="keyword">Search by keyword: </label>
                        </div>
                        <input type="text" id="keyword" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <div className="label-group">
                            <label htmlFor="zip">Zip Code</label>
                        </div>
                        <input type="text" id="zip" value={zip} onChange={(e)=>formatZip(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <div className="label-group">
                            <label htmlFor="miles">Mile Radius: </label>
                        </div>
                        <input type="number" step={1} value={miles} onChange={(e)=>setMiles(parseInt(e.target.value))}/>
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    )
}
export default Home