import React from "react";
// 設定系はpixijs本体から引っ張ってくる
// import { TextStyle } from 'pixi.js';
// componentとして使うものはinletの方から
import { Stage } from "@inlet/react-pixi";
import { CircleContainer } from "./components/bunny";
import { Video } from "./components/videoCanvas";
import { CircleContainer2 } from "./components/bunny2";

const App = () => (
  <span>
    <Video />
  </span>
);

export default App;
