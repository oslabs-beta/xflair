'use client';

import React, { useState, useEffect, ChangeEvent, use } from 'react';
import axios from 'axios';
import Modal from '@/app/ui/modal';
import { set } from 'zod';

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
  const [time, setTime] = useState(0);
  const [top5, setTop5] = useState({});
  const [preprocessFilePath, setPreprocessFilePath] = useState('');
  const [filePath, setFilePath] = useState('');
  const [buttonState, setButtonState] = useState(0);
  const [heatmapLinks, setHeatmapLinks] = useState({});
  const [featureMapLinks, setFeatureMapLinks] = useState({});
  const [data, setData] = useState('');
  const [fileType, setFileType] = useState('');

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
        setFilePath(response.data.filePath as string);
        console.log('imagePath:', filePath);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function predict(data: string, modelName: string) {
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
        setTime(response.time);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function preprocess(data: string, filePath: string, fileType: string) {
    fetch('/models/actions/image/preprocess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath, fileType }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setPreprocessFilePath(response.preprocessed_image);
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

  function logs(data: string, modelName: string) {
    fetch('/models/actions/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, modelName }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
      })
      .then(() => {
        setVizState(true);
        setButtonState(2);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const uploadClick = async () => {
    if (inputImage) {
      const reader = new FileReader();
      reader.readAsDataURL(inputImage as File);

      reader.onloadend = () => {
        const data = (reader.result as string).split(',')[1];
        setData(data as string);
        const fileType = inputImage?.type.split('/')[1];
        setFileType(fileType as string);
        if (process.env.mode === 'logs') {
          logs(data, modelName);
        } else {
          // Promise.all([
          //   imgUpload(inputImage as File),
          //   predict(data, modelName),
          //   heatmaps(data, modelName),
          //   featureMaps(data, modelName),
          // ])
          //   .then(() => {
          //     setVizState(true);
          //     setButtonState(2);
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });
          // heatmaps(data, modelName);
          // featureMaps(data, modelName);
          imgUpload(inputImage as File);
          predict(data, modelName).then(() => {
            setVizState(true);
            setButtonState(2);
          });
          
        }
      };
    }
  };

  useEffect(() => {
    if (filePath){
      preprocess(data, filePath, fileType);
    }
  }
  , [filePath, data, fileType]);


  const clearClick = () => {
    inputImage = undefined;
    setImgName('Browse...');
    setImgURL('');
    // setFFilePath('');
    // setHFilePath('');
    setFilePath('');
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
        <div className="flex flex-col items-center bg-transparent h-full w-full ml-5%">
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
          <div className="flex flex-col pt-10 min-h-[50vh] min-w-[50vw] max-w-[50vw] max-h-[50vh]">
            {viz && (
              <Modal
                closeViz={closeViz}
                hGifURL={hGifURL}
                fGifURL={fGifURL}
                top5={top5}
                preprocessFilePath={preprocessFilePath}
              />
            )}
            {imgURL && (
              <img
                className="h-37.5 w-37.5 object-contain"
                src={imgURL}
                alt="UploadedImage"
              />
            )}

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
          <div className="flex items-center justify-center h-full bg-cover bg-no-repeat w-3/4">
            {/* <div> */}
            <div className="flex flex items-end justify-center w-full">
              {buttonState === 0 && (
                <label className="absolute bottom-[5rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-transparent text-white p-2.5 m-2.5 border-2 border-white hover:border-green-500 hover:border-4 hover:text-green-300">
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
                  className="absolute bottom-[5rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-transparent text-green-300 p-2.5 m-2.5 border-2 border-green-500 hover:border-purple-500 hover:border-4 hover:text-purple-300"
                  onClick={uploadClick}
                >
                  Upload
                </button>
              )}
              {vizState && (
                <button
                  className="absolute bottom-[5rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-transparent text-purple-300 p-2.5 m-2.5 border-2 border-purple-500 hover:border-[#e7792a] hover:border-4 hover:text-[#e7792a]"
                  onClick={vizClick}
                >
                  Analysis Visualization
                </button>
              )}
            </div>
            {/* </div> */}
          </div>
          <div className="flex justify-center items-end"></div>
          <button
            className="absolute bottom-4 right-4 bg-transparent hover:border-white text-white font-semibold hover:text-red-400 py-2 px-4 rounded"
            onClick={clearClick}
          >
            Clear
          </button>
        </div>
      </main>
    </div>
  );
}
