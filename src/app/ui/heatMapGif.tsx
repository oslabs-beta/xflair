import {useEffect, useRef, useState} from 'react';
import Image from "next/image";

let gifImage: File | undefined; 

export default function HeatMapGif () {
    const [gifURL, setGifURL] = useState("");
    const heatMap = () => {
        setGifURL(`File Name: ${gifImage?.name}`)
    }
    
    return <img
    className = "heatMapGif"
     src = {gifURL}
     alt = "heatMapGif"
     />;
}