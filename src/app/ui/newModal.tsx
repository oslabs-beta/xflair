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
    <div className={styles.modalcontainer}>
      <button className={styles.exitmodalbutton} onClick={props.closeViz}>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' id='x'>
          <path
            fillRule='evenodd'
            fill='#ffffff'
            d='M5.043 3v.004a.998.998 0 0 0-.1 0A.998.998 0 0 0 4.21 4.61l2.543 3.391-2.543 3.396a.999.999 0 1 0 1.6 1.198L8 9.672l2.191 2.924a.999.999 0 1 0 1.598-1.198L9.248 8.002l2.541-3.39a.998.998 0 0 0-.865-1.608.998.998 0 0 0-.733.41L8 6.338 5.809 3.414A.998.998 0 0 0 5.043 3z'
          ></path>
        </svg>
      </button>
      <div className={styles.slide}>
        <div className={styles.modaltitlecontainer}>
          <h1 className={styles.modaltitle}>ANALYSIS VISUALS COMING SOON</h1>
        </div>
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
            <p>Continue Scrolling for Demo</p>
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
            <h1>explain gifs</h1>
            <h2>
              Step into the world of artificial intelligence and discover how it
              perceives and interprets your image.
            </h2>
          </div>
          <div className={styles.modalbody}>
            <p>Continue Scrolling for Demo</p>
          </div>
        </div>
      </div>
      <div className={styles.slideRow}>
        {' '}
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
