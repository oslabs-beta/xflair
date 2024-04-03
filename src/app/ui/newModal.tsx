import styles from "../page.module.css";
// import { EmblaCarousel } from "./carousel";
import { Suspense, lazy } from "react";

// import HeatMapGif from './heatMapGif';
// const HeatMapGif = lazy(() => import('./heatMapGif'));
// const Heatmap = lazy(() => import('./heatmap'));

export default function NewModal(props) {
  return (
    <div className={styles.modalcontainer}>
      <div className={styles.modaltitlecontainer}>
        <div className={styles.test} />
        <h1 className={styles.modaltitle}>ANALYSIS VISUALS COMING SOON</h1>
        {/* <svg
          onClick={props.closeViz}
          className={styles.modalxicon}
          xmlns='http://www.w3.org/2000/svg'
          width='200'
          height='200'
          viewBox='0 0 24 24'
        /> */}

        <button className={styles.exitmodalbutton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            id="x"
          >
            <path
              fill-rule="evenodd"
              fill="#ffffff"
              d="M5.043 3v.004a.998.998 0 0 0-.1 0A.998.998 0 0 0 4.21 4.61l2.543 3.391-2.543 3.396a.999.999 0 1 0 1.6 1.198L8 9.672l2.191 2.924a.999.999 0 1 0 1.598-1.198L9.248 8.002l2.541-3.39a.998.998 0 0 0-.865-1.608.998.998 0 0 0-.733.41L8 6.338 5.809 3.414A.998.998 0 0 0 5.043 3z"
            ></path>
          </svg>
        </button>
      </div>
      {/* <EmblaCarousel
      closeViz={props.closeViz}
      hGifURL={props.hGifURL}
      fGifURL={props.fGifURL}
      top5={props.top5}
      preprocessFilePath={props.preprocessFilePath}
      /> */}
      <div className={styles.modalcontainertext}>
        <div className={styles.modalheader}>
          <h1>Unraveling AI: A Visual Journey</h1>
          <h2>
            Step into the world of artificial intelligence and discover how it
            perceives and interprets your image.
          </h2>
        </div>
        <div className={styles.modalbody}>
          <p>
            In this immersive experience, we'll guide you through the
            fascinating process of AI image analysis. From preprocessing to
            feature extraction and classification, you'll gain a deeper
            understanding of how AI models work behind the scenes. Get ready to
            explore the complex algorithms and decision-making processes that
            bring AI to life.
          </p>
        </div>
      </div>
      <div className={styles.modalbutton}>
        <div className={styles.modalbutton}>
          <button className={styles.startJourneyButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              id="arrow"
            >
              <path
                fill="white"
                fillRule="evenodd"
                d="m-929.1 911.362.7.7-5.3 5.3-5.3-5.3.7-.7 4.6 4.6 4.6-4.6z"
                transform="translate(942 -906.362)"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
