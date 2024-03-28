'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { lazy, Suspense, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
// import Heatmap from './ui/heatmap';
import Modal from './ui/modal';

const Heatmap = lazy(() => import('./ui/heatmap'));

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

  const browse = (e: ChangeEvent<HTMLInputElement>) => {
    inputImage = e.currentTarget.files?.[0];
    setImgName(`File Name:  ${inputImage?.name}`);
    if (inputImage) {
      setImgURL(URL.createObjectURL(inputImage));
    }
  };

  function imgSave(inputImage: File) {
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
    fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, filePath }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response:', response);
        setPredictionName(response.class);
        // console.log('top5:', JSON.parse(response.top5.replace(/'/g, '"')));
        // setTop5(JSON.parse(response.top5.replace(/'/g, '"')));
        setTop5(response.top5);
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
          preprocess(data, imagePath),
        ]).then(() => setVizState(true));
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
    setFFilePath('');
    setHFilePath('');
    setImagePath('');
    setHGifURL('');
    setFGifURL('');
    setVizState(false);
  };

  const vizClick = () => {
    openViz(true);
  };

  const closeViz = () => {
    openViz(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.majorDiv}>
        <div className={styles.title}>
          <div className={styles.column}>
            <Image
              src='/logoBlack.png'
              alt='Logo'
              className={styles.Logo}
              width={277 / 2}
              height={358 / 2}
              priority
            />
          </div>
          <div className={styles.column}>
            <img className={styles.titleImg} src='/title.png' alt='titleText' />
          </div>
        </div>

        <div className={styles.inputBox}>
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
              className={styles.uploadImg}
              src={imgURL}
              alt='UploadedImage'
            />
          )}
          {vizState && (
            <>
              <h2 style={{ color: 'white' }}>Class: {predictionName}</h2>
              {time > 0 && (
                <h3 style={{ color: 'white' }}>
                  Time: {(time / 1000).toFixed(2)} seconds
                </h3>
              )}
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
                name='image'
                type='file'
                accept='image/*'
                onChange={(e) => browse(e)}
              />
            </label>
            <button
              className={styles.primaryBtn}
              id='upload'
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
