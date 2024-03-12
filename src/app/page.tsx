'use client';

import Image from 'next/image';
import styles from './page.module.css';
// import { uploadImage } from './lib/actions';
import { useState } from 'react';

export default function Home() {
  const [imgURL, setImgURL] = useState('');

  let inputImage: File;

  const handleClick = () => {
    if (inputImage) setImgURL(URL.createObjectURL(inputImage as File));
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
          <h1>xFlair</h1>
        </div>
        <div className={styles.inputBox}>
          <img src={imgURL} alt='Upload an image to begin' />
          <div>
            {imgURL && <button className = {styles.dataVis}>Analysis Visualization</button>}
          </div>
          <div>
            {/* <form action={uploadImage}>
            <input id='image' name='image'type='file' accept='image/*' />
            <button type='submit'>Upload</button>
          </form> */}
            <input
              className={styles.fileBrowser}
              name='image'
              type='file'
              accept='image/*'
              onChange={(e) => (inputImage = e.target.files[0])}
            />
            <label>
              <button className={styles.fileBrowser} id = 'upload' onClick={handleClick}>Upload</button>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
