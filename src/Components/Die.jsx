import React from "react";
import "../Styles/Die.css";
const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="dieContainer">
      <button style={styles} onClick={props.hold} className="dieButton">
        {props.value}
      </button>
    </div>
  );
};

export default Die;
