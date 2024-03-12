'use client';

import Image from 'next/image';
import styles from './page.module.css';
// import { uploadImage } from './lib/actions';
import { useState } from 'react';
import { uploadImage } from './lib/actions';

export default function Home() {
  const [imgURL, setImgURL] = useState('');
  const [viz, openViz] = useState(false);

  let inputImage: File | undefined;

  const handleClick = () => {
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
          {/* <div className={styles.imgContainer}> */}
          {viz && (
            <div className={styles.articlemodalcontainer}>
              <div className={styles.articlemodalcontents}>
                <div className={styles.modaltitlecontainer}>
                  <h1 className={styles.modaltitle}>Coming Soon</h1>
                </div>
                <p className={styles.articlebodytext}>Work in progress</p>
              </div>
              <div className={styles.articlemodalbutton}>
                <button className={styles.button} onClick={closeViz}>
                  Okay
                </button>
              </div>
            </div>
          )}
          <img
            className={styles.uploadImg}
            src={imgURL}
            alt='Waiting for image...'
          />
          {/* </div> */}
          <div>
            {imgURL && (
              <button className={styles.button} onClick={vizClick}>
                Analysis Visualization
              </button>
            )}
          </div>
          <div>
            {/* <form action={uploadImage}>
            <input id='image' name='image'type='file' accept='image/*' />
            <button type='submit'>Upload</button>
          </form> */}
            <input
              className={styles.button}
              name='image'
              type='file'
              accept='image/*'
              onChange={(e) => (inputImage = e.target.files?.[0])}
            />
            <label>
              <button
                className={styles.button}
                id='upload'
                onClick={handleClick}
              >
                Upload
              </button>
            </label>
            <button className={styles.button} onClick={() => setImgURL('')}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
