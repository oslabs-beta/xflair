'use client';

import React, { lazy, Suspense, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import NewModal from '@/app/ui/newModal';

let inputImage: File | undefined;
let count = 0;

let modelName: string = 'MobileNet';

export default function Home() {
  console.log(`===== RENDER ${count++} ======`);
  const states = [
    'original',
    'preprocessing',
    'preprocessed',
    'loadingMesh',
    'featureMap',
    'resizing',
    'classifying',
    'output',
  ];

  const [imgName, setImgName] = useState('Browse...');
  const [imgURL, setImgURL] = useState('');
  const [vizState, setVizState] = useState(false);
  const [predictionName, setPredictionName] = useState('');
  const [viz, openViz] = useState(false);
  const [hGifURL, setHGifURL] = useState('');
  const [fGifURL, setFGifURL] = useState('');
  const [initialTime, setInitialTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [time, setTime] = useState(0);
  const [top5, setTop5] = useState({});
  const [preprocessFilePath, setPreprocessFilePath] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [buttonState, setButtonState] = useState(0);
  const [heatmapLinks, setHeatmapLinks] = useState({});
  const [featureMapLinks, setFeatureMapLinks] = useState({});

  const browse = (e: ChangeEvent<HTMLInputElement>) => {
    inputImage = e.currentTarget.files?.[0];
    setImgName(`File Name:  ${inputImage?.name}`);
    if (inputImage) {
      setImgURL(URL.createObjectURL(inputImage));
      setButtonState(1);
    }
  };

  async function imgUpload(inputImage: File) {
    const formData = new FormData();
    formData.append('file', inputImage as File);
    formData.append('modelName', modelName);
    axios
      .post('/models/actions/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('response:', response.data);
        setImagePath(response.data);
        console.log('imagePath:', imagePath);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function predict(data: string, modelName: string) {
    fetch('/models/actions/image/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, modelName }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setPredictionName(response.predictions.predicted_class_name);
        // console.log('top5:', JSON.parse(response.top5.replace(/'/g, '"')));
        // setTop5(JSON.parse(response.top5.replace(/'/g, '"')));
        setTop5(response.predictions.class_name_probabilities);
        setFinalTime(Date.now());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function preprocess(data: string, filePath: string) {
    fetch('http://localhost:3001/api/preprocess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setPreprocessFilePath(response.filePath);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function heatmaps(data: string, modelName: string) {
    fetch('/models/actions/image/heatmaps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, modelName }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setHeatmapLinks(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function featureMaps(data: string, modelName: string) {
    fetch('/models/actions/image/featmaps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, modelName }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setFeatureMapLinks(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const uploadClick = async () => {
    if (inputImage) {
      setInitialTime(Date.now());

      const reader = new FileReader();
      reader.readAsDataURL(inputImage as File);

      reader.onloadend = () => {
        const data = (reader.result as string).split(',')[1];
        Promise.all([
          imgUpload(inputImage as File),
          predict(data, modelName),
          heatmaps(data, modelName),
          featureMaps(data, modelName),
          // preprocess(data, imagePath),
        ])
          .then(() => {
            setVizState(true);
            setButtonState(2);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    }
  };

  useEffect(() => {
    if (!initialTime || !finalTime) return;
    setTime(finalTime - initialTime);
    console.log('time:', time);
  }, [finalTime, initialTime, time]);

  const clearClick = () => {
    inputImage = undefined;
    setImgName('Browse...');
    setImgURL('');
    // setFFilePath('');
    // setHFilePath('');
    setImagePath('');
    setHGifURL('');
    setFGifURL('');
    setVizState(false);
    setButtonState(0);
  };

  const vizClick = () => {
    openViz(true);
  };

  const closeViz = () => {
    openViz(false);
  };

  return (
    <div className="flex-grow bg-black">
      <main className="flex flex-1 justify-center items-center w-full">
        <div className="relative flex flex-col items-center bg-transparent h-full w-full ml-5%">
          <div className="text-xxl flex flex-row bg-[#f3ec78] bg-gradient-to-r from-[#af4261] to-[#f3ec78] mb-2">
            <div className="flex flex-col items-center justify-center">
              {/* Your image and logo components here */}
            </div>
            {/* <div className="w-full flex justify-center items-center bg-transparent"> */}
            <img
              className="h-20 w-30 object-contain"
              src="/title.png"
              alt="titleText"
            />
            {/* </div> */}
          </div>
          <div className="flex flex-col min-h-[60vh] min-w-[60vw] max-w-[60vw] max-h-[70vh] relative">
            <div className="flex flex-col min-h-[50vh] min-w-[60vw] max-w-[50vw] max-h-[50vh]">
              {viz && (
                <NewModal
                  closeViz={closeViz}
                  // hGifURL={hGifURL}
                  // fGifURL={fGifURL}
                  top5={top5}
                  preprocessFilePath={preprocessFilePath}
                />
              )} <div className="flex-grow flex flex-col justify-end items-center ">
                {imgURL && (
                  <img
                    className="max-w-[45vw] max-h-[45vh] object-contain"
                    src={imgURL}
                    alt="UploadedImage"
                  />
                )}
              <div className="flex-grow flex flex-col justify-end items-center min-h-1 pt-5">
              </div>
            {vizState && (
              <>
                <h2 className="text-white">Class: {predictionName}</h2>
                {time > 0 && (
                  <h2 className="text-white">
                    Time: {(time / 1000).toFixed(2)} seconds
                  </h2>
                )}
              </>
            )}
</div>
            </div>
            <button className="absolute bottom-0 flex justify-center items-center w-[120px] h-[70px] rounded-full cursor-pointer text-xs bg-black text-slate-600 p-2.5 m-2.5 border-2 border-slate-600 py-5">
              <img 
              className="h-[65px] w-[90px] object-contain"
              src="/logoBlack.png"
              ></img>
            </button>
            {!vizState && (
              <button className="absolute bottom-0 flex justify-center items-center w-[120px] h-[70px] rounded-full cursor-pointer text-xs bg-black text-slate-600 p-2.5 m-2.5 border-2 border-slate-600 py-5">
                Analysis Visualization
              </button>
            )}
            {vizState && (
              <button
                className="absolute bottom-0 flex justify-center items-center w-[120px] h-[70px] rounded-full cursor-pointer bg-transparent text-xs text-transparent text-blue-500 p-2.5 m-2.5 border-2  border-[#f3ec78] hover:border-4 hover:text-[#f3ec78] hover:bg-black py-5"
                onClick={vizClick}
              > Analysis Visualization
              </button>
            )}

            <button
              className="absolute bottom-4 right-4 bg-transparent hover:border-white text-white font-semibold hover:text-red-400 rounded"
              onClick={clearClick}
            >
              Clear
            </button>
          </div>
          <div className="flex items-center justify-center h-full bg-cover bg-no-repeat w-3/4">
            {/* <div> */}
          </div>
          {/* <div className='flex justify-center items-end'></div> */}
        </div>
        {buttonState === 0 && (
          <label className="absolute bottom-[2rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-black text-white p-2.5 m-2.5 border-2 border-white hover:border-green-500 hover:border-4 hover:text-green-300">
            {imgName}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={browse}
            />
          </label>
        )}
        {buttonState === 1 && (
          <button
            className="absolute bottom-[2rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-black text-green-300 p-2.5 m-2.5 border-2 border-green-500 hover:border-purple-500 hover:border-4 hover:text-purple-300"
            onClick={uploadClick}
          >
            Upload
          </button>
        )}
         {buttonState === 2 && (
          <label className="absolute bottom-[2rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-black text-slate-500 p-2.5 m-2.5 border-2 border-slate-500 hover:border-red-500 hover:border-4 hover:text-red-300"
          onClick={clearClick}
          >
            Reset
          </label>
        )}
      </main>
    </div>
  );
}
