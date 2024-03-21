'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { generateHeatmaps, createGif } from './lib/actions';
import { lazy, Suspense, useState, useEffect, ChangeEvent } from 'react';
import { modelOutput } from './lib/definitions';
import HeatMapGif from './ui/heatMapGif';
import GridMapGif from './ui/gridMapGif';
import ResizedImage from './ui/resizedImage';
import Top5 from './ui/top5Classes';
// import Heatmap from './ui/heatmap';
import Modal from './ui/modal';

const Heatmap = lazy(() => import('./ui/heatmap'));

let inputImage: File | undefined;

export default function Home() {
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

  const [currentState, setCurrentState] = useState(0);
  const [preProcessedImage, setPreprocessedImage] = useState('');
  const [featureMap, setFeatureMap] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [imgName, setImgName] = useState('Browse...');
  const [imgURL, setImgURL] = useState('');
  const [vizState, setVizState] = useState(false);
  const [predictionName, setPredictionName] = useState('');
  const [viz, openViz] = useState(false);

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
        const data = (reader.result as string).split(',')[1];
        // setModelOutput(generateHeatmaps(data));
        setVizState(true);
      };
      const predicted_class_name = `Class:    class_name_goes_here`;
      setPredictionName(predicted_class_name);
      const predicted_class_probability = 0.9999999;
    }
  };

  const clearClick = () => {
    inputImage = undefined;
    setImgName('Browse...');
    setImgURL('');
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
    <main className={styles.main}>
      <Image
        src='/logoBlack.png'
        alt='Logo'
        className={styles.Logo}
        width={396}
        height={512}
        priority
      />

      <div className={styles.majorDiv}>
        <div className={styles.title}>
          <img className={styles.titleImg} src='/title.png' alt='titleText' />
        </div>

        <div className={styles.inputBox}>
          {viz && <Modal closeViz={closeViz} />}

          {imgURL && (
            <img
              className={styles.uploadImg}
              src={imgURL}
              alt='UploadedImage'
            />
          )}
          {vizState && (
            <>
              <div className='predictedClassName'>{predictionName}</div>
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
