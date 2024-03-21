import {useEffect, useRef, useState} from 'react';
import Image from "next/image";

let gridMapGif: File | undefined; 

export default function GridMapGif () {
    const [gridURL, setGridURL] = useState("");
    const gridMap = () => {
        setGridURL(`File Name: ${gridMapGif?.name}`)
    }
    
    return <img
    className = "gridMapGif"
     src = {gifURL}
     alt = "gridMapGif"
     />;
}