import { Top5Obj } from '../lib/definitions';
import styles from '../page.module.css';
// import { EmblaCarousel } from "./carousel";
import { Suspense, lazy } from 'react';

// import HeatMapGif from './heatMapGif';
// const HeatMapGif = lazy(() => import('./heatMapGif'));
// const Heatmap = lazy(() => import('./heatmap'));

interface Props {
  closeViz: () => void;
  hGifURL: string;
  fGifURL: string;
  top5: Top5Obj;
  preprocessFilePath: string;
}

export default function NewModal(props: Props) {
  return (
    <div className={styles.modalcontainer}>
      <button className={styles.exitmodalbutton} onClick={props.closeViz}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="x">
          <path
            fill-rule="evenodd"
            fill="#ffffff"
            d="M5.043 3v.004a.998.998 0 0 0-.1 0A.998.998 0 0 0 4.21 4.61l2.543 3.391-2.543 3.396a.999.999 0 1 0 1.6 1.198L8 9.672l2.191 2.924a.999.999 0 1 0 1.598-1.198L9.248 8.002l2.541-3.39a.998.998 0 0 0-.865-1.608.998.998 0 0 0-.733.41L8 6.338 5.809 3.414A.998.998 0 0 0 5.043 3z"
          ></path>
        </svg>
      </button>
      <div className={styles.slide}>
        <div className={styles.modaltitlecontainer}>
          {/* <div className={styles.test} /> */}
          <h1 className={styles.modaltitle}>ANALYSIS VISUALS COMING SOON</h1>
          {/* <svg
          onClick={props.closeViz}
          className={styles.modalxicon}
          xmlns='http://www.w3.org/2000/svg'
          width='200'
          height='200'
          viewBox='0 0 24 24'
        /> */}
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
              In this immersive experience, we&apos;ll guide you through the
              fascinating process of AI image analysis. From preprocessing to
              feature extraction and classification, you&apos;ll gain a deeper
              understanding of how AI models work behind the scenes. Get ready
              to explore the complex algorithms and decision-making processes
              that bring AI to life.
            </p>
            <p>Scroll Down For More Information</p>
          </div>
        </div>
        <div className={styles.modalbutton}>
          <div className={styles.modalbutton}></div>
        </div>
      </div>
      {/*slide 1*/}
      <div className={styles.slide}>
        {/*preprocess image explanation*/}
        <div className={styles.modalcontainertext}>
          <div className={styles.modalheader}>
            <h1>Preparing Your Image</h1>
            <h2>
              Discover the essential steps that prepare your image for AI
              analysis.
            </h2>
          </div>
          <div className={styles.modalbody}>
            <p>
              {/* In this immersive experience, we&apos;ll guide you through the
            fascinating process of AI image analysis. From preprocessing to
            feature extraction and classification, you&apos;ll gain a deeper
            understanding of how AI models work behind the scenes. Get ready to
            explore the complex algorithms and decision-making processes that
            bring AI to life. */}
              scroll down for demo
            </p>
          </div>
        </div>
      </div>
      <div className={styles.slideRow}>
        {/*preprocess image*/}
        <div className="gridItem"> 
        <div>Original Image</div>
        <svg width="25vw" height="25vh" xmlns="http://www.w3.org/2000/svg">
          <image
            href="https://xflairbucket.s3.us-east-1.amazonaws.com/inputimages/MobileNet/1712098954136.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMSJHMEUCIQC85Fc9Y8c0viLJMu6G3g4oiN3vX25UjveXMJ0HQ2JWUwIgVYBVGqXyVn5LgtpZLxSaRKAKVYeYS28cIzB2OjrnmYMq6AIIeRAAGgw3MzAzMzU0NDcwNzEiDPPYNkAerJ6JRzjf0irFAqXOoSxGp%2Bs9KrfxWnYt%2FrCEsxLHN3FsjP7cidn6JTEwwTtmrop9RfftAW5asgfM0G%2FCrfn98H%2Bb%2FOq5qOrfJVZS9GisW7%2B6n4%2BZLXgZPrLgdIIyIeh015SJFzLTwx5yjaWGjeu1Hce1%2B9xvWY%2FIo7ArUXbqsuzb5Fif%2FSxwaX2qCS6A7%2FByd5uAjzdUciae7QD7l2wUoPaVGQUg2%2Fg%2Bz7pJU9vSiMSuBva1uBj%2Bx8qBHW0Wqf5mXEBZ44BWvfPiviAKaTe6tpaGaN3cRSr%2BATl1C9CPRdtwmh8YYPTv9CN6UEBlai4M%2B8Tky%2B4Lvq4lNFipweKG9tY3HFQYV1Ms1NjoMyA2wIzD%2BgRXlvCy4GKqCrD1z8VKhXlxgYeHvvFwonn2oXY9clT%2FoVV%2B3RjrGKzmRm7IxS9ECj%2Babte1kcaA4DKgKQYwvP21sAY6swIlt1svtgGKr1N9eJqz6qDeLPinZUmcW8QtJJZ4vUJOMTiEonnGVQ%2BhEO0O4uWhuZCArEBLTWmby3cAl07ITmFZP5v8zb0mdAM5OcVpk8BU6HCc7hI9RsScoREM89TqmbhYVOliaBtkvrHo6fhptbAuz7H%2BUZ52vybOsSBsO%2F5jv8375BnFINStXJDsoJMpBbIAVD4KDkmKwTVRDRXOnclyWj8mgXuL6M%2BpXADGIFpFBo4nWIDD1M3d5gENGyOnJW5br%2FA1aBx7jsUuA17oa%2BUCGyjelCDVygBfj6IS57Buz62zwWhGby%2BIs%2BsI9XjQUTR3LgVE7V7ph8H%2FqXjb81MojwdBpcFxcp19leJffJs7ITn9MH62KQzQGnO2JIgXEadfxnTjj21C32XdpSDH4uigr5b7&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240403T221512Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA2UC3CRAP3IMUGGYA%2F20240403%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8e82feaafd9dca6fe807ee79e46bf2703f3fad4280186b9da8528932c26d52a1"
          width="25vw" height="25vh" preserveAspectRatio="xMidYMid meet"
          />
        </svg> 
        </div>
        <div className="gridItem"> 
        <div>Preprocessed Image</div>
        <svg width="25vw" height="25vh" xmlns="http://www.w3.org/2000/svg">
          <image
            href="https://xflairbucket.s3.us-east-1.amazonaws.com/preprocess/preprocessed_image.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMSJHMEUCIQC85Fc9Y8c0viLJMu6G3g4oiN3vX25UjveXMJ0HQ2JWUwIgVYBVGqXyVn5LgtpZLxSaRKAKVYeYS28cIzB2OjrnmYMq6AIIeRAAGgw3MzAzMzU0NDcwNzEiDPPYNkAerJ6JRzjf0irFAqXOoSxGp%2Bs9KrfxWnYt%2FrCEsxLHN3FsjP7cidn6JTEwwTtmrop9RfftAW5asgfM0G%2FCrfn98H%2Bb%2FOq5qOrfJVZS9GisW7%2B6n4%2BZLXgZPrLgdIIyIeh015SJFzLTwx5yjaWGjeu1Hce1%2B9xvWY%2FIo7ArUXbqsuzb5Fif%2FSxwaX2qCS6A7%2FByd5uAjzdUciae7QD7l2wUoPaVGQUg2%2Fg%2Bz7pJU9vSiMSuBva1uBj%2Bx8qBHW0Wqf5mXEBZ44BWvfPiviAKaTe6tpaGaN3cRSr%2BATl1C9CPRdtwmh8YYPTv9CN6UEBlai4M%2B8Tky%2B4Lvq4lNFipweKG9tY3HFQYV1Ms1NjoMyA2wIzD%2BgRXlvCy4GKqCrD1z8VKhXlxgYeHvvFwonn2oXY9clT%2FoVV%2B3RjrGKzmRm7IxS9ECj%2Babte1kcaA4DKgKQYwvP21sAY6swIlt1svtgGKr1N9eJqz6qDeLPinZUmcW8QtJJZ4vUJOMTiEonnGVQ%2BhEO0O4uWhuZCArEBLTWmby3cAl07ITmFZP5v8zb0mdAM5OcVpk8BU6HCc7hI9RsScoREM89TqmbhYVOliaBtkvrHo6fhptbAuz7H%2BUZ52vybOsSBsO%2F5jv8375BnFINStXJDsoJMpBbIAVD4KDkmKwTVRDRXOnclyWj8mgXuL6M%2BpXADGIFpFBo4nWIDD1M3d5gENGyOnJW5br%2FA1aBx7jsUuA17oa%2BUCGyjelCDVygBfj6IS57Buz62zwWhGby%2BIs%2BsI9XjQUTR3LgVE7V7ph8H%2FqXjb81MojwdBpcFxcp19leJffJs7ITn9MH62KQzQGnO2JIgXEadfxnTjj21C32XdpSDH4uigr5b7&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240403T222754Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA2UC3CRAP3IMUGGYA%2F20240403%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6774526c6c98b654016a36f32aaac207823d83164450f2c38e7c7a7894919a1b"
          width="25vw" height="25vh" preserveAspectRatio="xMidYMid meet"
          />
        </svg>
        </div>
        <div className="gridItem"> 
        <div>Upload Image</div>
        <svg width="25vw" height="25vh" xmlns="http://www.w3.org/2000/svg">
          <image
            href="https://xflairbucket.s3.us-east-1.amazonaws.com/preprocess/resized_image.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMSJHMEUCIQC85Fc9Y8c0viLJMu6G3g4oiN3vX25UjveXMJ0HQ2JWUwIgVYBVGqXyVn5LgtpZLxSaRKAKVYeYS28cIzB2OjrnmYMq6AIIeRAAGgw3MzAzMzU0NDcwNzEiDPPYNkAerJ6JRzjf0irFAqXOoSxGp%2Bs9KrfxWnYt%2FrCEsxLHN3FsjP7cidn6JTEwwTtmrop9RfftAW5asgfM0G%2FCrfn98H%2Bb%2FOq5qOrfJVZS9GisW7%2B6n4%2BZLXgZPrLgdIIyIeh015SJFzLTwx5yjaWGjeu1Hce1%2B9xvWY%2FIo7ArUXbqsuzb5Fif%2FSxwaX2qCS6A7%2FByd5uAjzdUciae7QD7l2wUoPaVGQUg2%2Fg%2Bz7pJU9vSiMSuBva1uBj%2Bx8qBHW0Wqf5mXEBZ44BWvfPiviAKaTe6tpaGaN3cRSr%2BATl1C9CPRdtwmh8YYPTv9CN6UEBlai4M%2B8Tky%2B4Lvq4lNFipweKG9tY3HFQYV1Ms1NjoMyA2wIzD%2BgRXlvCy4GKqCrD1z8VKhXlxgYeHvvFwonn2oXY9clT%2FoVV%2B3RjrGKzmRm7IxS9ECj%2Babte1kcaA4DKgKQYwvP21sAY6swIlt1svtgGKr1N9eJqz6qDeLPinZUmcW8QtJJZ4vUJOMTiEonnGVQ%2BhEO0O4uWhuZCArEBLTWmby3cAl07ITmFZP5v8zb0mdAM5OcVpk8BU6HCc7hI9RsScoREM89TqmbhYVOliaBtkvrHo6fhptbAuz7H%2BUZ52vybOsSBsO%2F5jv8375BnFINStXJDsoJMpBbIAVD4KDkmKwTVRDRXOnclyWj8mgXuL6M%2BpXADGIFpFBo4nWIDD1M3d5gENGyOnJW5br%2FA1aBx7jsUuA17oa%2BUCGyjelCDVygBfj6IS57Buz62zwWhGby%2BIs%2BsI9XjQUTR3LgVE7V7ph8H%2FqXjb81MojwdBpcFxcp19leJffJs7ITn9MH62KQzQGnO2JIgXEadfxnTjj21C32XdpSDH4uigr5b7&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240403T222902Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA2UC3CRAP3IMUGGYA%2F20240403%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=393c5021ba8639793babf89027d015f2eb1a5da57ed6a14b7dc2a34a5fd547de"
          width="25vw" height="25vh" preserveAspectRatio="xMidYMid meet"
          />
        </svg>
        </div>
      </div>
      <div className={styles.slide}>
        {/*explain gifs*/}
        <div className={styles.modalcontainertext}>
          <div className={styles.modalheader}>
            <h1>explain gifs</h1>
            <h2>
              Step into the world of artificial intelligence and discover how it
              perceives and interprets your image.
            </h2>
          </div>
          <div className={styles.modalbody}>
            <p>
              {/* In this immersive experience, we&apos;ll guide you through the
            fascinating process of AI image analysis. From preprocessing to
            feature extraction and classification, you&apos;ll gain a deeper
            understanding of how AI models work behind the scenes. Get ready to
            explore the complex algorithms and decision-making processes that
            bring AI to life. */}
              scroll down for demo
            </p>
          </div>
        </div>
      </div>
      <div className={styles.slideRow}>
        {" "}
        {/*gifs*/}
        <div className="gridItem"> 
        <div>Heat map</div>
        <svg width="40vw" height="40vh" xmlns="http://www.w3.org/2000/svg">
          <image
            href="https://res.cloudinary.com/dufc4fu9r/image/multi/f_gif/v1711062935/heatmap_gif.gif"
          width="40vw" height="40vh" preserveAspectRatio="xMidYMid meet"
          />
        </svg>
        </div>
        <div className="gridItem"> 
        <div>Feature Map</div>
        <svg width="40vw" height="40vh" xmlns="http://www.w3.org/2000/svg">
          <image
            href="https://res.cloudinary.com/dufc4fu9r/image/multi/f_gif/v1711062953/featuremaps_gif.gif"
          width="40vw" height="40vh" preserveAspectRatio="xMidYMid meet"
          />
        </svg>
        </div>
      </div>
      <div className={styles.slide}>top5</div>
    </div>
  );
}
