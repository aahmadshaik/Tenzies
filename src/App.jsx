import React, { useState, useRef, useEffect } from "react";
import { useWindowSize } from "react-use";

import "./App.css";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
  const [dice, setDice] = useState(generateAllNewDice());
  const { width, height } = useWindowSize();

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const focusRef = useRef(null);

  useEffect(() => {
    if (gameWon && focusRef.current && navigator.vibrate) {
      focusRef.current.focus();
      navigator.vibrate(1000);
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      // value: 5,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    // console.log(id);
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function randomNumberRoll() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  const buttonElements = dice.map((die, index) => (
    <Die
      hold={() => hold(die.id)}
      value={die.value}
      key={index}
      isHeld={die.isHeld}
    />
  ));

  return (
    <main>
      {gameWon ? <Confetti width={width} height={height} /> : null}
      <div className="projectHeading">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="diesContainer">{buttonElements}</div>

      <div>
        <button
          ref={focusRef}
          onClick={randomNumberRoll}
          className="rollButton"
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
};

export default App;
