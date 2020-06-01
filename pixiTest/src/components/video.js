import React, { useEffect, useRef } from "react";

export default (props) => {
  // video要素
  const ref = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        ref.current.srcObject = stream;
        console.log(ref.current);
      })
      .catch((err) => alert(`${err.name} ${err.message}`));
  }, []);

  return (
    <video ref={ref} autoPlay muted>
      <track default kind="captions"></track>
    </video>
  );
};
