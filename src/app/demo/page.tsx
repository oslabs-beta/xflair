"use client";

import Image from "next/image";
// import styles from "./page.module.css";
// import { generateHeatmaps, createGif } from "../lib/actions";
import { lazy, Suspense, useState, useEffect, ChangeEvent } from "react";
// import { modelOutput } from "../lib/definitions";
import HeatMapGif from "../ui/heatMapGif";
import GridMapGif from "../ui/gridMapGif";
import ResizedImage from "../ui/resizedImage";
import Top5 from "../ui/top5Classes";
import axios from "axios";
// import Heatmap from './ui/heatmap';
import Sidebar from '../ui/Sidebar';
import Modal from "../ui/modal";

const Heatmap = lazy(() => import("../ui/heatmap"));

let inputImage: File | undefined;

export default function Home() {
  const states = [
    "original",
    "preprocessing",
    "preprocessed",
    "loadingMesh",
    "featureMap",
    "resizing",
    "classifying",
    "output",
  ];

  const [currentState, setCurrentState] = useState(0);
  const [preProcessedImage, setPreprocessedImage] = useState("");
  const [featureMap, setFeatureMap] = useState("");
  const [classificationResult, setClassificationResult] = useState("");
  const [imgName, setImgName] = useState("Browse...");
  const [imgURL, setImgURL] = useState("");
  const [vizState, setVizState] = useState(false);
  const [predictionName, setPredictionName] = useState("");
  const [viz, openViz] = useState(false);
  const [hGifURL, setHGifURL] = useState("");
  const [fGifURL, setFGifURL] = useState("");
  const [initialTime, setInitialTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [time, setTime] = useState(0);
  const [top5, setTop5] = useState({});
  const [preprocessFilePath, setPreprocessFilePath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [hFilePath, setHFilePath] = useState("");
  const [fFilePath, setFFilePath] = useState("");
  const [buttonState, setButtonState] = useState(false);

  const browse = (e: ChangeEvent<HTMLInputElement>) => {
    inputImage = e.currentTarget.files?.[0];
    setImgName(`File Name:  ${inputImage?.name}`);
    setButtonState(true);
    if (inputImage) {
      setImgURL(URL.createObjectURL(inputImage));
    }
  };

  useEffect(() => {
    if (!initialTime || !finalTime) return;
    setTime(finalTime - initialTime);
    console.log("time:", time);
  }, [finalTime, initialTime, time]);

  const predictions = (data, filePath) => {
    fetch("http://localhost:3001/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response:", response);
        setPredictionName(response.class);
        console.log("top5:", JSON.parse(response.top5.replace(/'/g, '"')));
        setTop5(JSON.parse(response.top5.replace(/'/g, '"')));
        setFinalTime(Date.now());
      });

    fetch("http://localhost:3001/api/preprocess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response:", response);
        setPreprocessFilePath(response.filePath);
        setVizState(true);
      });
  };

  const maps = (data, filePath) => {
    fetch("http://localhost:3001/api/heatmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        setHFilePath(response.filePath);
      });

    fetch("http://localhost:3001/api/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        setFFilePath(response.filePath);
      });
  };

  useEffect(() => {
    if (!hFilePath) {
      return;
    }

    fetch("http://localhost:3001/api/hgif", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hFilePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response:", response.hgifUrl);
        setHGifURL(response.hgifUrl);
      });
  }, [hFilePath]);

  useEffect(() => {
    if (!fFilePath || !hGifURL) {
      return;
    }

    fetch("http://localhost:3001/api/fgif", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fFilePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        setFGifURL(response.fgifUrl);
      });
  }, [fFilePath, hGifURL]);

  const uploadClick = async () => {
    if (inputImage) {
      // setImgURL(URL.createObjectURL(inputImage as File));
      setInitialTime(Date.now());

      const formData = new FormData();
      formData.append("file", inputImage as File);

      await axios
        .post("http://localhost:3001/api/imageSave", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("response:", response.data);
          setImagePath(response.data);
          console.log("imagePath:", imagePath);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (!imagePath) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(inputImage as File);

    reader.onloadend = () => {
      const data = (reader.result as string).split(",")[1];
      // tensorflowJS(imageData);
      // analyze(data, imagePath);
      console.log("imagePath:", imagePath);
      predictions(data, imagePath);
      maps(data, imagePath);
    };
  }, [imagePath]);

  const clearClick = () => {
    inputImage = undefined;
    setImgName("Browse...");
    setImgURL("");
    setFFilePath("");
    setHFilePath("");
    setImagePath("");
    setHGifURL("");
    setFGifURL("");
    setVizState(false);
  };
  //ori
  //ori
  // const vizClick = () => {
  //   openViz(true);
  //   createGif((modelOutput as modelOutput).folder, setGifUrl);
  // };
  //setinterval vizclick (for skeleton)
  const vizClick = () => {
    openViz(true);
  };

  const closeViz = () => {
    openViz(false);
  };

  return (
    <div style = {{display: 'flex', minHeight: '100vh'}}>
        <Sidebar /> 
    <main className="flex flex-row justify-evenly items-center bg-black min-w-full">
    <div className="flex flex-col items-center bg-transparent h-100 w-100 ml-5%">
      <div className="text-xxl flex flex-row bg-[#f3ec78] bg-gradient-to-r from-[#af4261] to-[#f3ec78] mb-2">
        <div className="flex flex-col items-center justify-center">
          {/* Your image and logo components here */}
        </div>
        <div className="flex flex-col items-center justify-center">
          <img className="h-50 w-75 object-contain" src="/title.png" alt="titleText" />
        </div>
      </div>
      
      <div className="flex items-center justify-center h-full bg-cover bg-no-repeat w-3/4 min-h-full" style={{ backgroundImage: "url('/backgroundFlareBW.avif')" }}>
        {viz && <Modal closeViz={closeViz} hGifURL={hGifURL} fGifURL={fGifURL} top5={top5} preprocessFilePath={preprocessFilePath} />}
        {imgURL && <img className="h-37.5 w-37.5 object-contain" src={imgURL} alt="UploadedImage" />}
        
        {vizState && (
          <>
            <h2 className="text-white">Class: {predictionName}</h2>
            {time > 0 && <h3>Time: {(time / 1000).toFixed(2)} seconds</h3>}
          </>
        )}

        <div>
          {vizState && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={vizClick}>Analysis Visualization</button>}
          <div className="flex flex-col items-center justify-center w-full">
            {!buttonState && (
              <label className="cursor-pointer bg-transparent text-white p-2.5 m-2.5 rounded-full">
                {imgName}
                <input className="hidden" type="file" accept="image/*" onChange={browse} />
              </label>
            )}
            {buttonState && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={uploadClick}>Upload</button>}
          </div>
        </div>
      </div>
      <button className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={clearClick}>Clear</button>
    </div>
  </main>
  </div>
);
}