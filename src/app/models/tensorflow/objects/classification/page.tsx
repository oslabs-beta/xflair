'use client';

import Image from 'next/image';
import styles from './page.module.css';
import React, { lazy, Suspense, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Modal from '@/app/ui/modal';

let inputImage: File | undefined;
let count = 0;

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

  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar
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

  async function imgSave(inputImage: File) {
    const formData = new FormData();
    formData.append('file', inputImage as File);
    axios
      .post('http://localhost:3001/api/imageSave', formData, {
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

  function predict(data: string, filePath: string) {
    fetch('http://localhost:5000/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setPredictionName(response.predictions.predicted_class_name);
        // console.log('top5:', JSON.parse(response.top5.replace(/'/g, '"')));
        // setTop5(JSON.parse(response.top5.replace(/'/g, '"')));
        setTop5(response.predictions.class_name_probabilities);
        setFinalTime(Date.now());
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
      });
  }

  function heatmaps(data: string, filePath: string) {
    fetch('http://localhost:5000/heatmaps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setHeatmapLinks(response);
      });
  }

  function featureMaps(data: string, filePath: string) {
    fetch('http://localhost:5000/featuremaps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setFeatureMapLinks(response);
      });
  }

  const uploadClick = async () => {
    if (inputImage) {
      setInitialTime(Date.now());

      await imgSave(inputImage);

      const reader = new FileReader();
      reader.readAsDataURL(inputImage as File);

      reader.onloadend = () => {
        const data = (reader.result as string).split(',')[1];
        Promise.all([
          predict(data, imagePath),
          heatmaps(data, imagePath),
          featureMaps(data, imagePath),
          // preprocess(data, imagePath),
        ]).then(() => {
          setVizState(true);
          setButtonState(2);
        });
        // maps(data, imagePath);
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
    <div className='flex-grow bg-black'>
      <main className='flex flex-1 justify-center items-center w-full'>
        <div className='flex flex-col items-center bg-transparent h-full w-full ml-5%'>
          <div className='text-xxl flex flex-row bg-[#f3ec78] bg-gradient-to-r from-[#af4261] to-[#f3ec78] mb-2'>
            <div className='flex flex-col items-center justify-center'>
              {/* Your image and logo components here */}
            </div>
            {/* <div className="w-full flex justify-center items-center bg-transparent"> */}
            <img
              className='h-20 w-30 object-contain'
              src='/title.png'
              alt='titleText'
            />
            {/* </div> */}
          </div>
          <div className='flex flex-col pt-10 min-h-[50vh] min-w-[50vw] max-w-[50vw] max-h-[50vh]'>
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
                className='h-37.5 w-37.5 object-contain'
                src={imgURL}
                alt='UploadedImage'
              />
            )}

            {vizState && (
              <>
                <h2 className='text-white'>Class: {predictionName}</h2>
                {time > 0 && (
                  <h2 className='text-white'>
                    Time: {(time / 1000).toFixed(2)} seconds
                  </h2>
                )}
              </>
            )}
          </div>
          <div className='flex items-center justify-center h-full bg-cover bg-no-repeat w-3/4'>
            {/* <div> */}
            <div className='flex flex items-end justify-center w-full'>
              {buttonState === 0 && (
                <label className='absolute bottom-[5rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-transparent text-white p-2.5 m-2.5 border-2 border-white hover:border-green-500 hover:border-4 hover:text-green-300'>
                  {imgName}
                  <input
                    className='hidden'
                    type='file'
                    accept='image/*'
                    onChange={browse}
                  />
                </label>
              )}
              {buttonState === 1 && (
                <button
                  className='absolute bottom-[5rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-transparent text-green-300 p-2.5 m-2.5 border-2 border-green-500 hover:border-purple-500 hover:border-4 hover:text-purple-300'
                  onClick={uploadClick}
                >
                  Upload
                </button>
              )}
              {vizState && (
                <button
                  className='absolute bottom-[5rem] flex justify-center items-center w-[150px] h-[150px] rounded-full cursor-pointer bg-transparent text-purple-300 p-2.5 m-2.5 border-2 border-purple-500 hover:border-[#e7792a] hover:border-4 hover:text-[#e7792a]'
                  onClick={vizClick}
                >
                  Analysis Visualization
                </button>
              )}
            </div>
            {/* </div> */}
          </div>
          <div className='flex justify-center items-end'></div>
          <button
            className='absolute bottom-4 right-4 bg-transparent hover:border-white text-white font-semibold hover:text-red-400 py-2 px-4 rounded'
            onClick={clearClick}
          >
            Clear
          </button>
        </div>
      </main>
    </div>
  );
}
