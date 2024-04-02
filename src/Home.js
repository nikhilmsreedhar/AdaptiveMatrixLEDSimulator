import React from "react";
import { useNavigate } from "react-router-dom";
import nightwithlight1 from './simulation_vids/nightvideowithlight1.mp4'
import nightwithlight2 from './simulation_vids/nightvideowithlight2.mp4'
import nightwithoutlight1 from './simulation_vids/nightvideowithoutlight1.mp4'
import nightwithoutlight2 from './simulation_vids/nightvideowithoutlight2.mp4'
import nightpovsinglelaneroad from './simulation_vids/nightPOVSingleLane.mp4'
import "./App.css";


function Home() {
    const navigate = useNavigate()
    const handleClickedVid = (vid) => {
        let selectedvid = vid
        navigate('/main', { state: selectedvid })
    }
    
    const [leds, setLeds] = React.useState(Array(38).fill(0));
    const [animationFinished, setAnimationFinished] = React.useState(false);
     
    React.useEffect(() => {
        
        // Interval to update the LEDs (in milliseconds)
        const updateInterval = 100; 

        // Duration of the animation (in milliseconds)
        const animationDuration = 3000; 

        const totalSteps = leds.length;
        let step = 0;

        // Start timer to update LEDs every 'updateInterval' milliseconds
        const updateTimer = setInterval(() => {
            if (!animationFinished) { 
                const newLeds = leds.map((key, index) => {

                    // Calculate whether the LED at 'index' should be lit up based on the current step
                    return (index <= step || index >= leds.length - step - 1) ? 1 : 0;
                });
                setLeds(newLeds);

                step++;

                // Check if animation is finished
                if (step >= totalSteps / 2) {
                    clearInterval(updateTimer);
                    setAnimationFinished(true);
                }
            }
        }, updateInterval);

        // Stop the timer after the animation duration
        const stopTimer = setTimeout(() => {
            clearInterval(updateTimer);
            
            // Set all LEDs to 1 after animation finishes
            setLeds(leds.fill(1)); 
            setAnimationFinished(true);
        }, animationDuration);

        // Cleanup function to clear the timers
        return () => {
            clearInterval(updateTimer); 
            clearTimeout(stopTimer); 
        };
    }, []); 

    let matrix1 = []
    let matrix2 = []
    for (let i = 0; i < leds.length / 2; i++) {
        matrix1[i] = leds[i];
    }
    for (let i = leds.length / 2; i < leds.length; i++) {
        matrix2[i] = leds[i];
    }

    return (
        <div className="App">
            <div className="App-header">
                <h2 style={{ display: 'flex', justifyContent: "space-around", position: 'absolute', top: 30 }}>
                    Matrix Adaptive LED headlights simulator
                </h2>
                <div style={{ position: "absolute", top: 160, fontSize: 26, maxWidth: "80%" }}>Select a vehicle POV night drive video. As an oncoming vehicle is detected,
                    the matrix shown below the video representing the current vehicle's headlights in an array configuration will shut off the LEDs projecting light towards
                    the oncoming vehicle. This behavior adapts which LEDs to shut off as the oncoming vehicle moves until it is out of the frame or can no longer be detected.
                </div>
                <div style={{ display: 'flex', justifyContent: "space-around", top: 400, maxWidth: 'auto' }}>
                    <video
                        muted={true}
                        onClick={() => handleClickedVid(nightwithlight1)}
                        style={{
                            width: 350,
                            height: 180,
                        }}
                        autoPlay={true}>
                        <source src={nightwithlight1} type="video/mp4"></source>
                    </video>
                    <video
                        muted={true}
                        onClick={() => handleClickedVid(nightwithlight2)}
                        style={{
                            width: 350,
                            height: 180,
                        }}
                        autoPlay={true}>
                        <source src={nightwithlight2} type="video/mp4"></source>
                    </video>
                    <video
                        muted={true}
                        onClick={() => handleClickedVid(nightwithoutlight1)}
                        style={{
                            width: 350,
                            height: 180,
                        }}
                        autoPlay={true}>
                        <source src={nightwithoutlight1} type="video/mp4"></source>
                    </video>
                    <video
                        muted={true}
                        onClick={() => handleClickedVid(nightwithoutlight2)}
                        style={{
                            width: 350,
                            height: 180,
                        }}
                        autoPlay={true}>
                        <source src={nightwithoutlight2} type="video/mp4"></source>
                    </video>
                    <video
                        muted={true}
                        onClick={() => handleClickedVid(nightpovsinglelaneroad)}
                        style={{
                            width: 350,
                            height: 180,
                        }}
                        autoPlay={true}>
                        <source src={nightpovsinglelaneroad} type="video/mp4"></source>
                    </video>
                </div>
                <div style={{
                    position: "absolute",
                    width: 850,
                    bottom: 80,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <div >
                        {matrix1.map((key, idx) => (
                            <button
                                style={{
                                    width: "15px",
                                    height: "50px",
                                    backgroundColor: key === 1 ? 'white' : 'black'
                                }}
                                key={idx}
                            ></button>
                        ))}
                    </div>
                    <div >
                        {matrix2.map((key, idx) => (
                            <button
                                style={{
                                    width: "15px",
                                    height: "50px",
                                    backgroundColor: key === 1 ? 'white' : 'black'
                                }}
                                key={idx}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Home;