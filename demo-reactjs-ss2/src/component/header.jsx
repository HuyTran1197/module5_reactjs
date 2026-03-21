import {useEffect, useState} from "react";

const HEADERCOMPONENT=()=>{
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const TimeString = currentTime.toLocaleTimeString();
    const DateString = currentTime.toLocaleDateString();

    return(
        <>
            <h1>It is {DateString} - {TimeString}.</h1>
            <div className="container">
                <div className="card">
                    <div className="card--header" />
                    <img
                        className="avatar"
                        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="avatar"
                    />
                    <div className="card--body">
                        <div>
                            <p className="text-header">Huy Goonch</p>
                            <p className="text-sub">
                                I'm Goonch, i'm from Đà Nẵng, Việt Nam. I'm future IT engineer. See you soon !!
                            </p>
                            <button className="btn third">FOLLOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HEADERCOMPONENT;