import styles from "../page.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  fGifURL: string;
}

export default function GridMapGif(props: Props) {
  const [fGifListener, setFGifListener] = useState(false);

  useEffect(() => {
    if (props.fGifURL) setFGifListener(true);
  }, [props.fGifURL]);

  return (
    <>
      {!fGifListener && <img src="/loadspinner.gif" alt="loading" />}
      {fGifListener && (
        <svg width="40vw" height="40vh" xmlns="http://www.w3.org/2000/svg">
          <image
            href={props.fGifURL}
            width="40vw"
            height="40vh"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      )}
    </>
  );
}
