import {useEffect, useRef, useState} from 'react';
import Image from "next/image";

let resizedImage: File | undefined; 

export default function ResizedImage () {
    const [resizedImageURL, setResizedImageURL] = useState("");
    const resizedImage = () => {
        setResizedImageURL(`File Name: ${resizedImage?.name}`)
    }
    
    return <img
    className = "resizedImage"
     src = {resizedImageURL}
     alt = "resizedImage"
     />;
}