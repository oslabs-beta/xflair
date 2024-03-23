'use server';

import Image from 'next/image';
import styles from './page.module.css';
import InputArea from './ui/inputArea';

export default async function Home() {
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
          <Image
            className={styles.titleImg}
            src='/title.png'
            alt='titleText'
            width={200}
            height={300}
          />
        </div>
        <InputArea />
      </div>
    </main>
  );
}
