import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "./App.css";
import { drawRect } from "./MatrixHeadlightProjectionAlgorithms/boundingBox";
import { updateMatrix } from "./MatrixHeadlightProjectionAlgorithms/matrix";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";


function Main() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [matrix, setMatrix] = useState(Array(38).fill(1));
    const nav = useNavigate();
    const location = useLocation()
    const selectedvid = location.state
    
    const backToHome = () => {
        nav('/home')
    }

    const runCoco = async () => {
        const nn = await cocossd.load();
        console.log("Vehicle detection model loaded.");
        setInterval(() => {
            detect(nn, matrix);
        }, 1);
    };

    const detect = async (nn, matrix) => {
        if (
            typeof videoRef.current !== "undefined" &&
            videoRef.current !== null && videoRef.current.readyState === 4
        ) {
            const video = videoRef.current;
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;

            videoRef.current.width = videoWidth;
            videoRef.current.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const obj = await nn.detect(video);
            const ctx = canvasRef.current.getContext("2d");
            drawRect(obj, ctx);
            setMatrix(prevMatrix => updateMatrix([...prevMatrix], obj, videoHeight, videoWidth));
        }
    };

    useEffect(() => { runCoco() }, []);
    let matrix1 = []
    let matrix2 = []
    for (let i = 0; i < matrix.length/2; i++) {
        matrix1[i] = matrix[i];
    }
    for (let i = matrix.length/2; i < matrix.length; i++) {
        matrix2[i] = matrix[i];
    }

    return (
        <div className="App">
            <header className="App-header">
                <Button onClick={backToHome} style={{ position: "absolute", left: 30, top: 30, fontSize: 24 }}>Back to home</Button>
                <h2 style={{ display: 'flex', justifyContent: "space-around", position: 'absolute', top: 30 }}>
                    Matrix Adaptive LED headlights simulator
                </h2>
                <div style={{ position: "absolute", top: 90, fontSize: 22, maxWidth: "80%" }}>
                </div>
                <br/>
                <video ref={videoRef}
                    muted={true}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 850,
                        height: 480,
                    }}
                    controls
                    autoPlay={true}>
                        <source src={selectedvid} type="video/mp4"></source>
                    </video>
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 8,
                        width: 850,
                        height: 480,
                    }}
                />
                <div style={{
                    position: "absolute",
                    width: 1000,
                    height: "200px",
                    bottom: 0
                }}>Matrix LEDs: </div>
                <div style={{
                    position: "absolute",
                    width: 850,
                    bottom: 80,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <div style={{ flex: 1 }}>
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
                    <div style={{ flex: 1}}>
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
            </header>
        </div>
    );
}

export default Main;