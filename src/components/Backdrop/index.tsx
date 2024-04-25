import { ReactNode, useState } from "react";

import './Backdrop.css';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export const Backdrop = () => {
  
  const [hexCode, setHexCode] = useState<string>("#555");
  const [textureOpacity, setTextureOpacity] = useState<number>(1);
  const [textureBrightness, setTextureBrightness] = useState<number>(0);

  return (
    <>
      <div 
        className="coverage texture"
        style={{ 
          // background: "url('https://www.transparenttextures.com/patterns/egg-shell.png') center/30%",
          // background: "url('https://www.transparenttextures.com/patterns/lined-paper-2.png') center/40%",
          background: "url('https://www.transparenttextures.com/patterns/project-paper.png')",
          opacity: textureOpacity,
          filter: `brightness(${textureBrightness})`
        }}
      />
      <div 
        className="coverage color"
        style={{ backgroundColor: hexCode }}
      />
      <div className="backdrop__controls">
        <input 
          type="color"
          className="colorInput"
          value={hexCode}
          onChange={(e) => setHexCode(e.target.value)}
        />
        <input 
          type="range"
          // @ts-ignore: orient property exists in firefox.
          orient="vertical"
          className="rangeInput"
          value={textureOpacity}
          min={0} max={1}
          step={0.1}
          onChange={(e) => setTextureOpacity(+e.target.value)}
        />
        <input 
          type="range"
          // @ts-ignore: orient property exists in firefox.
          orient="vertical"
          className="rangeInput"
          value={textureBrightness}
          min={0} max={2}
          step={0.2}
          onChange={(e) => setTextureBrightness(+e.target.value)}
        />
      </div>
    </>
  )
}