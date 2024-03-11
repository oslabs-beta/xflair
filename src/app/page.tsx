'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { uploadImage } from './lib/actions';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <strong>xFlair</strong>
        </p>
        <div>
            <Image
              src="/logo.png"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={150}
              priority
            />
        </div>
      </div>

      <div>
        <form action={uploadImage}>
          <input type="file" accept="image/*" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </main>
  );
}
