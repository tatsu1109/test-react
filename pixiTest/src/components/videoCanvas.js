import React, { useState, useEffect } from "react";
import { Sprite as Spritepixi } from "pixi.js";
import { Sprite } from "@inlet/react-pixi";

// 引数でContainerの配置先やサイズを指定
export const Video = () => {
  const [texture, setTexture] = useState();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        console.log(stream);
        setTexture(new Spritepixi.from(stream));
      })
      .catch((err) => alert(`${err.name} ${err.message}`));
  }, []);

  return <Sprite texture={texture} />;
};
