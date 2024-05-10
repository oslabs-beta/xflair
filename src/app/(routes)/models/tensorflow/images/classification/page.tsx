'use client';

import React, { useState, useEffect, ChangeEvent, use } from 'react';
import axios from 'axios';
import NewModal from '@/app/ui/newModal';
import { Heatmaps, Featuremaps } from '@/app/lib/definitions';
import { Top5Obj } from '@/app/lib/definitions';

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
  const [top5, setTop5] = useState({} as Top5Obj);
  const [preprocessFilePath, setPreprocessFilePath] = useState<string[]>([]);
  const [filePath, setFilePath] = useState('');
  const [buttonState, setButtonState] = useState(0);
  const [heatmapLinks, setHeatmapLinks] = useState({} as Heatmaps);
  const [featuremapLinks, setFeaturemapLinks] = useState({} as Featuremaps);
  const [data, setData] = useState('');
  const [fileType, setFileType] = useState('');
  const [top5Formatted, setTop5Formatted] = useState({} as Top5Obj);

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
        setPreprocessFilePath(response.urls as string[]);
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

  function gifs(urls: string[], tag: string) {
    fetch('/models/actions/image/gifs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls, tag }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        if (tag === 'heatmap_gif') {
          setHGifURL(response.url);
        } else {
          setFGifURL(response.url);
        }
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
        setFeaturemapLinks(response);
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

  function formatString(inputString: string): string {
    return inputString
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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
          heatmaps(data, modelName);
          featureMaps(data, modelName);
          imgUpload(inputImage as File);
          predict(data, modelName)
            .then(() => {
              setVizState(true);
              setButtonState(2);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
    }
  };

  useEffect(() => {
    if (filePath) {
      preprocess(data, filePath, fileType);
    }
  }, [filePath, data, fileType]);

  useEffect(() => {
    if (heatmapLinks.progressbars && !hGifURL) {
      gifs(heatmapLinks.progressbars as string[], 'heatmap_gif');
    }
  }, [heatmapLinks, hGifURL]);

  useEffect(() => {
    if (featuremapLinks.progressbars && hGifURL && !fGifURL) {
      gifs(featuremapLinks.progressbars as string[], 'featuremap_gif');
    }
  }, [hGifURL, featuremapLinks, fGifURL]);

  useEffect(() => {
    if (top5) {
      const formattedTop5: Top5Obj = {};
      for (const key in top5) {
        const formattedKey = formatString(key);
        formattedTop5[formattedKey] = top5[key];
      }
      setTop5Formatted(formattedTop5);
    }
  }, [top5]);

  useEffect(() => {
    if (fGifURL) {
      let hGif = hGifURL;
      setHGifURL('');
      setHGifURL(hGif);
    }
  }, [fGifURL, hGifURL]);

  const clearClick = () => {
    inputImage = undefined;
    setImgName('Browse...');
    setImgURL('');
    setFilePath('');
    setHGifURL('');
    setFGifURL('');
    setVizState(false);
    setButtonState(0);
    setHeatmapLinks({} as Heatmaps);
    setFeaturemapLinks({} as Featuremaps);
    setPredictionName('');
    setTime(0);
  };

  const vizClick = () => {
    openViz(true);
  };

  const closeViz = () => {
    openViz(false);
  };

  return (
    <main className='flex-grow bg-black flex flex-1 justify-center items-center w-full'>
      {/* Contains everything except Browse/Upload/Reset Button */}
      <div className='relative flex flex-col items-center bg-transparent h-full w-full ml-5%'>
        {/* Contains Title Image */}
        <div className='text-xxl flex flex-row bg-[#f3ec78] bg-gradient-to-r from-[#af4261] to-[#f3ec78] mb-2'>
          <div className='flex flex-col items-center justify-center'></div>
          <img
            className='short:hidden h-20 w-30 object-contain'
            src='/title.png'
            alt='titleText'
          />
        </div>
        {/* Contains Image, Class, Modal, Analysis and Clear Buttons */}
        <div className='flex flex-col items-center min-h-[60vh] max-h-[70vh] min-w-[90vw] max-w-[90vw] md:min-w-[60vw] md:max-w-[60vw] short:min-h-[80vh] short:max-h-[90vh] relative'>
          {/* Contains Modal, Image, and Class */}
          <div className='flex flex-col min-h-[50vh] min-w-[60vw] max-w-[50vw] max-h-[50vh] short:min-w-[70vw] short:max-w-[80vw]'>
            {viz && (
              <NewModal
                closeViz={closeViz}
                hGifURL={hGifURL}
                fGifURL={fGifURL}
                top5={top5Formatted}
                preprocessFilePath={preprocessFilePath}
              />
            )}{' '}
            {/* Contains Image and Class */}
            <div className='flex-grow flex flex-col short:flex-row justify-around items-center'>
              {imgURL && (
                <img
                  className='max-w-[40vw] max-h-[40vh] object-contain'
                  src={imgURL}
                  alt='UploadedImage'
                />
              )}
              {vizState && (
                <div className='text-white short:pl-3'>
                  <h2>Class: {formatString(predictionName)}</h2>
                  <h2>Time: {time.toFixed(2)} seconds</h2>
                </div>
              )}
            </div>
          </div>
          {/* Contains Analysis and Clear Buttons */}
          <div className='flex flex-row items-center w-full'>
            <button className='absolute bottom-0 flex justify-center items-center w-[95px] h-[25px] md:w-[120px] md:h-[70px] rounded-full cursor-pointer text-xs bg-black text-slate-600 p-2.5 m-2.5 border-2 border-slate-600 py-5'>
              <img
                className='h-[35px] w-[45px] md:h-[65px] md:w-[90px] object-contain'
                src='/logoBlack.png'
                alt='logo'
              ></img>
            </button>
            {!vizState && (
              <button className='absolute bottom-0 flex justify-center items-center w-[95px] h-[25px] md:w-[120px] md:h-[70px] rounded-full cursor-pointer text-xs bg-black text-slate-600 p-2.5 m-2.5 border-2 border-slate-600 py-5'>
                Analysis Visualization
              </button>
            )}
            {vizState && (
              <button
                className='absolute bottom-0 flex justify-center items-center w-[95px] h-[25px] md:w-[120px] md:h-[70px] rounded-full cursor-pointer bg-transparent text-xs text-transparent text-blue-500 p-2.5 m-2.5 border-2 border-[#f3ec78] hover:border-4 hover:text-[#f3ec78] hover:bg-black py-5'
                onClick={vizClick}
              >
                {' '}
                Analysis Visualization
              </button>
            )}

            <button
              className='absolute bottom-4 right-4 bg-transparent hover:border-white text-white font-semibold hover:text-red-400 rounded'
              onClick={clearClick}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* Handles Browse/Upload/Reset Button */}
      {buttonState === 0 && (
        <label className='absolute bottom-[2rem] short:bottom-[0.5rem] flex justify-center items-center w-[6rem] h-[6rem] md:w-[150px] md:h-[150px] short:w-[90px] short:h-[90px] rounded-full cursor-pointer bg-black text-white p-2.5 m-2.5 border-2 border-white hover:border-green-500 hover:border-4 hover:text-green-300'>
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
          className='absolute bottom-[2rem] short:bottom-[0.5rem] flex justify-center items-center w-[6rem] h-[6rem] md:w-[150px] md:h-[150px] short:w-[90px] short:h-[90px] rounded-full cursor-pointer bg-black text-green-300 p-2.5 m-2.5 border-2 border-green-500 hover:border-purple-500 hover:border-4 hover:text-purple-300'
          onClick={uploadClick}
        >
          Upload
        </button>
      )}
      {buttonState === 2 && (
        <label
          className='absolute bottom-[2rem] short:bottom-[0.5rem] flex justify-center items-center w-[6rem] h-[6rem] md:w-[150px] md:h-[150px] short:w-[90px] short:h-[90px] rounded-full cursor-pointer bg-black text-slate-500 p-2.5 m-2.5 border-2 border-slate-500 hover:border-red-500 hover:border-4 hover:text-red-300'
          onClick={clearClick}
        >
          Reset
        </label>
      )}
    </main>
  );
}
