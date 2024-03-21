"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { generateHeatmaps, createGif } from "./lib/actions";
import { lazy, Suspense, useState, useEffect, ChangeEvent } from "react";
import { modelOutput } from "./lib/definitions";
import HeatMapGif from "./ui/heatMapGif"
import GridMapGif from "./ui/gridMapGif";
import ResizedImage from "./ui/resizedImage";
import Top5 from "./ui/top5Classes";
// import Heatmap from './ui/heatmap';

const Heatmap = lazy(() => import("./ui/heatmap"));

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
  const [vizState, setVizState] = useState(false)
  const [predictionName, setPredictionName] = useState ("")
  const [predictionProb, setPredictionProb] = useState (0)
  const [viz, openViz] = useState(false);
  const [nextArray, setNextArray] = useState(1);
  const [modelOutput, setModelOutput] = useState({});
  const [gifUrl, setGifUrl] = useState("");
  const [explanationState, setExplanationState] = useState(0);

  const browse = (e: ChangeEvent<HTMLInputElement>) => {
    inputImage = e.currentTarget.files?.[0];
    setImgName(`File Name:  ${inputImage?.name}`);
    if (inputImage) {
      setImgURL(URL.createObjectURL(inputImage));
    }
  };

  const uploadClick = () => {
    if (inputImage) {
      // setImgURL(URL.createObjectURL(inputImage as File));
      
      const reader = new FileReader();
      reader.readAsDataURL(inputImage);
      
      reader.onloadend = () => {
        const data = (reader.result as string).split(",")[1];
        // setModelOutput(generateHeatmaps(data));
        setVizState(true);
      };
      const predicted_class_name = "class_name_goes_here"
      setPredictionName(predicted_class_name)
      const predicted_class_probability = 0.9999999;
      setPredictionProb(predicted_class_probability)

    }
  };

  const clearClick = () => {
    inputImage = undefined;
    setImgName("Browse...");
    setImgURL("");
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
    const interval = setInterval(() => {
      if (currentState < states.length - 1) {
        setExplanationState((explanationState) => explanationState + 1);
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const closeViz = () => {
    openViz(false);
  };

  return (
    <main className={styles.main}>
      <Image
        src="/logoBlack.png"
        alt="Logo"
        className={styles.Logo}
        width={396}
        height={512}
        priority
      />

      <div className={styles.majorDiv}>
        <div className={styles.title}>
          <img className={styles.titleImg} src="/title.png" alt="titleText" />
        </div>

        <div className={styles.inputBox}>
          {viz && (
            <div className={styles.modalcontainer}>
              {/* <div className={styles.modalcontents}>
                <div className={styles.modaltitlecontainer}>
                  <h1 className={styles.modaltitle}>Coming Soon</h1>
                </div>
                <p className={styles.bodytext}>Work in progress</p>
                <Heatmap />
              </div> */}
              <h1 className={styles.modaltitle}>Analysis</h1>
              {/* <Suspense fallback={<img src="/loadspinner.gif" alt="loading" />}> */}
                {/* <Heatmap nextArray={nextArray} /> */}
                {/* <Image className={styles.heatmap} src={gifUrl} alt="Heatmap" />
              </Suspense>
              {explanationState === 0 && <img src={imgURL} alt="Original" />}
              {explanationState === 1 && <p>Preprocessing...</p>}
              {explanationState === 2 && (
                <img src={preProcessedImage} alt="Preprocessed" />
              )}
              {explanationState === 3 && <p>Preprocessing...</p>}
              {explanationState === 4 && (
                <img src={featureMap} alt="Feature Map" />
              )}
              {explanationState === 5 && <p>Resizing...</p>}
              {explanationState === 6 && <p>Classifying...</p>}
              {explanationState === 7 && <p>{classificationResult}</p>} */}
              {/* uncomment below when ready */}
             {/* <div>{ResizedImage}alt = "resizedimage"</div> */}
             {/* <div>{HeatMapGif} alt="heatmapgif" </div>  */} 
             {/* <div>{GridMapGif} alt = "gridmapgif"</div> */}
              <div>{Top5} alt = "top5"</div>
              <div className={styles.modalbutton}>
                <button className={styles.primaryBtn} onClick={closeViz}>
                  Okay
                </button>
              </div>
            </div>
          )}

          {imgURL && (
            <img
              className={styles.uploadImg}
              src={imgURL}
              alt="UploadedImage"
            />
          )}
          {vizState && (
            <>
            <div className="predictedClassName"> 
            {predictionName}
            </div>
            <div className="predictedClassProb"> 
            {predictionProb}
              </div>
              </>
          )}
          {!imgURL && (
            <p className={styles.placeholderText}>Waiting for image</p>
          )}

          <div>
            {vizState && (
              <button className={styles.primaryBtn} onClick={vizClick}>
                Analysis Visualization
              </button>
            )}
          </div>

          <div className={styles.buttonBox}>
            <label className={styles.imgInput}>
              <text>{imgName}</text>
              <input
                className={styles.hide}
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => browse(e)}
              />
            </label>
            <button
              className={styles.primaryBtn}
              id="upload"
              onClick={uploadClick}
            >
              Upload
            </button>
            <button className={styles.altBtn} onClick={clearClick}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
