import { Top5Obj } from '../lib/definitions';
import styles from '../page.module.css';
import HeatMapGif from './heatMapGif';
import GridMapGif from './gridMapGif';
import Top5 from './top5Classes';

interface Props {
  closeViz: () => void;
  hGifURL: string;
  fGifURL: string;
  top5: Top5Obj;
  preprocessFilePath: string[];
}

export default function NewModal(props: Props) {
  return (
    // modal main container
    <div className={styles.modalcontainer}>
      {/* exit button */}
      <button className={styles.exitmodalbutton} onClick={props.closeViz}>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' id='x'>
          <path
            fillRule='evenodd'
            fill='#ffffff'
            d='M5.043 3v.004a.998.998 0 0 0-.1 0A.998.998 0 0 0 4.21 4.61l2.543 3.391-2.543 3.396a.999.999 0 1 0 1.6 1.198L8 9.672l2.191 2.924a.999.999 0 1 0 1.598-1.198L9.248 8.002l2.541-3.39a.998.998 0 0 0-.865-1.608.998.998 0 0 0-.733.41L8 6.338 5.809 3.414A.998.998 0 0 0 5.043 3z'
          ></path>
        </svg>
      </button>
      {/* intro slide */}
      <div className={styles.slide}>
        {/* title */}
        <div className={styles.modaltitlecontainer}>
          <h1 className={styles.modaltitle}>ANALYSIS VISUALIZATION</h1>
        </div>
        <div className={styles.modalcontainertext}>
          <div className={styles.modalheader}>
            <h1>Unraveling AI: A Visual Journey</h1>
            <h2>Discover how artificial intelligence</h2>
            <h2>perceives and interprets your image.</h2>
          </div>
          <div className={styles.modalbody}>
            <p>
              This immersive experience will guide you through the fascinating
              process of AI image analysis. From preprocessing to feature
              extraction and classification, you&apos;ll gain a deeper
              understanding of how AI models work behind the scenes.
            </p>
            <br />
            <div className={styles.modalbody}>
              {/* <p>Scroll Down For More Information</p> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                id="down-arrow"
              >
                <path
                  fill="#ffffff"
                  d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.modalbutton}>
          <div className={styles.modalbutton}></div>
        </div>
      </div>
      <div className={styles.slide}>
        {/*preprocess image explanation*/}
        <div className={styles.modalcontainertext}>
          <div className={styles.modalheader}>
            <h1>Preparing Your Image</h1>
            <h2>
              The essential steps that prepare your image for AI analysis.
            </h2>
          </div>
          <div className={styles.modalbody}>
            <p>
              Before an AI model can analyze your image, it needs to be
              preprocessed. This crucial step ensures that the image is in the
              optimal format and size for the model to interpret accurately. In
              this slide, notice how your image is transformed through resizing,
              normalization, and other preprocessing techniques. These steps are
              essential for the AI model to focus on the most relevant features
              and provide accurate predictions.
            </p>
            <br />
            <div className={styles.modalbody}>
              {/* <p>Scroll Down For More Information</p> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                id="down-arrow"
              >
                <path
                  fill="#ffffff"
                  d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.slideRow}>
        {/*preprocess image*/}
        <div className='gridItem'>
          <div>Original Image</div>
          <svg width='25vw' height='25vh' xmlns='http://www.w3.org/2000/svg'>
            <image
              href={props.preprocessFilePath[1]}
              width='25vw'
              height='25vh'
              preserveAspectRatio='xMidYMid meet'
            />
          </svg>
        </div>
        <div className='gridItem'>
          <div>Preprocessed Image</div>
          <svg width='25vw' height='25vh' xmlns='http://www.w3.org/2000/svg'>
            <image
              href={props.preprocessFilePath[2]}
              width='25vw'
              height='25vh'
              preserveAspectRatio='xMidYMid meet'
            />
          </svg>
        </div>
        <div className='gridItem'>
          <div>Image Tensor</div>
          <svg width='25vw' height='25vh' xmlns='http://www.w3.org/2000/svg'>
            <image
              href={props.preprocessFilePath[3]}
              width='25vw'
              height='25vh'
              preserveAspectRatio='xMidYMid meet'
            />
          </svg>
        </div>
      </div>
      <div className={styles.slide}>
        {/*explain gifs*/}
        <div className={styles.modalcontainertext}>
          <div className={styles.modalheader}>
            <h1>The Brain of AI</h1>
            <h2>Your image entering the complex world of the neural network</h2>
          </div>
          <div className={styles.modalbody}>
            <p>
              In the slide below, a series of GIFs visualize how your
              preprocessed image is analyzed by the AI model&apos;s neural
              network. The GIFs showcase activation heatmaps at different
              layers, representing the regions of the image that the AI focuses
              on. As your image flows through the layers, the heatmaps highlight
              basic features, then progress to capture higher-level concepts.
            </p>
            <br />
            <div className={styles.modalbody}>
              {/* <p>Scroll Down For More Information</p> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                id="down-arrow"
              >
                <path
                  fill="#ffffff"
                  d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.slideRow}>
        {/*gifs*/}
        <div className='gridItem'>
          <div>Heat map</div>
          <HeatMapGif hGifURL={props.hGifURL} />
        </div>
        <div className='gridItem'>
          <div>Feature Map</div>
          <GridMapGif fGifURL={props.fGifURL} />
        </div>
      </div>
      <Top5 top5={props.top5} />
    </div>
  );
}
