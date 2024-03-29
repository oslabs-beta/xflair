'use client';

import { lazy, Suspense, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Sidebar from '../ui/Sidebar';
import Modal from '../ui/modal';

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

  // const maps = (data: string, filePath: string) => {
  //   fetch('http://localhost:3001/api/heatmap', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ data, filePath }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setHFilePath(response.filePath);
  //     });

  //   fetch('http://localhost:3001/api/feature', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ data, filePath }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setFFilePath(response.filePath);
  //     });
  // };

  // useEffect(() => {
  //   if (!hFilePath) {
  //     return;
  //   }

  //   fetch('http://localhost:3001/api/hgif', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ hFilePath }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log('response:', response.hgifUrl);
  //       setHGifURL(response.hgifUrl);
  //     });
  // }, [hFilePath]);

  // useEffect(() => {
  //   if (!fFilePath || !hGifURL) {
  //     return;
  //   }

  //   fetch('http://localhost:3001/api/fgif', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ fFilePath }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setFGifURL(response.fgifUrl);
  //     });
  // }, [fFilePath, hGifURL]);

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main className='flex flex-row justify-evenly items-center bg-black min-w-full'>
        <div className='flex flex-col items-center bg-transparent h-100 w-100 ml-5%'>
          <div className='text-xxl flex flex-row bg-[#f3ec78] bg-gradient-to-r from-[#af4261] to-[#f3ec78] mb-2'>
            <div className='flex flex-col items-center justify-center'>
              {/* Your image and logo components here */}
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img
                className='h-50 w-75 object-contain'
                src='/title.png'
                alt='titleText'
              />
            </div>
          </div>

          <div
            className='flex items-center justify-center h-full bg-cover bg-no-repeat w-3/4 min-h-full'
            style={{ backgroundImage: "url('/backgroundFlareBW.avif')" }}
          >
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
                {time > 0 && <h3>Time: {(time / 1000).toFixed(2)} seconds</h3>}
              </>
            )}

            <div>
              {vizState && (
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={vizClick}
                >
                  Analysis Visualization
                </button>
              )}
              <div className='flex flex-col items-center justify-center w-full'>
                {buttonState === 0 && (
                  <label className='cursor-pointer bg-transparent text-white p-2.5 m-2.5 rounded-full'>
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
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={uploadClick}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            className='mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
            onClick={clearClick}
          >
            Clear
          </button>
        </div>
      </main>
    </div>
  );
}
