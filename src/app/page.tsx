'use client';

import Image from 'next/image';
import styles from './page.module.css';
// import { uploadImage } from './lib/actions';
import { useState } from 'react';

import Heatmap from './ui/heatmap';

export default function Home() {
  const [imgURL, setImgURL] = useState('');
  const [viz, openViz] = useState(false);

  let inputImage: File | undefined;

  const uploadClick = () => {
    if (inputImage) setImgURL(URL.createObjectURL(inputImage as File));
  };

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
          {/* <h1>xFlair</h1> */}
          <img className={styles.titleImg} src='/title.png' alt='testing' />
        </div>
        <div className={styles.inputBox}>
          {viz && (
            <div className={styles.modalcontainer}>
              <div className={styles.modalcontents}>
                <div className={styles.modaltitlecontainer}>
                  <h1 className={styles.modaltitle}>Coming Soon</h1>
                </div>
                <p className={styles.bodytext}>Work in progress</p>
                <Heatmap/>
              </div>
              {/* <h1 className={styles.modaltitle}>Analysis</h1>
              <Heatmap /> */}
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
              alt='UploadedImage'
            />
          )}
          {!imgURL && (
            <p className={styles.placeholderText}>Waiting for image</p>
          )}
          <div>
            {imgURL && (
              <button className={styles.primaryBtn} onClick={vizClick}>
                Analysis Visualization
              </button>
            )}
          </div>
          <div>
            {/* <form action={uploadImage}>
            <input id='image' name='image'type='file' accept='image/*' />
            <button type='submit'>Upload</button>
          </form> */}
            <label className={styles.imgInput}>
              <input
                // className={styles.hide}
                name='image'
                type='file'
                accept='image/*'
                onChange={(e) => (inputImage = e.target.files?.[0])}
              />
            </label>
            <label>
              <button
                className={styles.primaryBtn}
                id='upload'
                onClick={uploadClick}
              >
                Upload
              </button>
            </label>
            <button className={styles.altBtn} onClick={() => setImgURL('')}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
