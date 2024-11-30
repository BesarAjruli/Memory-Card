import { useState } from "react";
import { gotei13 } from "../assets/characters";

function check(random, shown) {
  return shown.some((element) => {
    return element === random;
  });
}

class Captain {
  constructor(name, nickname, division, image, zanpakto) {
    this.name = name;
    this.nickname = nickname;
    this.division = division;
    this.image = image;
    this.zanpakto = zanpakto;
  }
}

const clickedCaptains = [];

export default function GameLayout() {
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [text, setText] = useState('')

  const allOfGotei = [];
  const shownCaptains = [];
  const dialog = document.querySelector('dialog')

  while (shownCaptains.length !== 13) {
    const pickRandom = Math.floor(Math.random() * 13) + 1;
    if (shownCaptains.length === 0) {
      shownCaptains.push(pickRandom);
      allOfGotei.push(
        new Captain(
          gotei13[pickRandom].name,
          gotei13[pickRandom].nickname,
          pickRandom,
          gotei13[pickRandom].image,
          gotei13[pickRandom].zanpakto,
        ),
      );
    } else if (!check(pickRandom, shownCaptains)) {
      shownCaptains.push(pickRandom);
      allOfGotei.push(
        new Captain(
          gotei13[pickRandom].name,
          gotei13[pickRandom].nickname,
          pickRandom,
          gotei13[pickRandom].image,
          gotei13[pickRandom].zanpakto,
        ),
      );
    }
  }


  const handleMemory = (captain) => {
    if (count === 13) {
        dialog.showModal()
        dialog.style.display = 'flex'
        setHighScore(count)
        setText('won')
      return;
    }
    for (let i = 0; i < clickedCaptains.length; i++) {
      if (clickedCaptains[i] === captain) {
        dialog.showModal()
        dialog.style.display = 'flex'
        setText('lost')
        if(count > highScore){
            setHighScore(count)
        }
        return;
      }
    }
    clickedCaptains.push(captain);

    setCount((prev) => prev + 1);
  };

  function restart() {
    dialog.close()
    dialog.style.display = 'none'
    setCount(0)
    clickedCaptains.length = 0
  }
  return (
    <>
      <div className="logoContainer">
        <img
          src="https://www.unionarena-tcg.com/na/images/common/pages/img_thumbnail_blc.png"
          className="bleachLogo"
        />
      </div>
      <div className="scoreHolder">
        <span name="currentScore">Score: {count}</span> <br />
        <span name="highestScore">Highest Score: {highScore}</span>
      </div>
      <div className="main">
        {allOfGotei.map((element) => (
          <div
            className="cards"
            key={element.division}
            onClick={() => handleMemory(element.division)}
          >
            <div
              className="imgContainer"
              style={{ backgroundImage: `url(${element.image})` }}
            ></div>
            <h1>
              {element.name}{" "}
              {element.nickname !== "" ? '"' + element.nickname + '"' : ""}
            </h1>
            <h2>Zanpakto: {element.zanpakto}</h2>
          </div>
        ))}
      </div>
      <dialog>
        <p>You {text}! Wanna try again?</p>
        <button onClick={restart}>Try again</button>
      </dialog>
    </>
  );
}