import React from "react";
const style = { width: "100%", margin: "30px auto" };

const ImageClicker = props => (
  <img
    src={props.src}
    onClick={props.onClick}
    className="text-center"
    alt={props.alt}
    style={style}
  />
);

export default ImageClicker;
