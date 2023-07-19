import cardsData from './cardsData.js';
import FoundationStack from './Components/FoundationStack.jsx';
import ExtraStack from './Components/ExtraStack.jsx';
import Menu from './Components/Menu.jsx';
import MainStack from './Components/MainStack.jsx';
import { useState } from 'react';

function App() {

  const [cards, setCards] = useState([[], [], [], [], [], [], [], [], [], [], [], [], []]);
  const [currentCard, setCurrentCard] = useState(null);
  const [gameRuns, setGameRuns] = useState(() => false);

  function newGame() {
    setCards([[], [], [], [], [], [], [], []]);
    const tempCardsArray = cardsData.slice();
    for (let card of tempCardsArray) {
      card.visible = false;
    }
    const arrLength = tempCardsArray.length;
    let outputCardsArray = [];

    for (let i = 0; i < arrLength; i++) {
      let rndIndex = Math.floor(Math.random() * tempCardsArray.length);
      outputCardsArray.push(tempCardsArray.splice(rndIndex, 1)[0]);
    }
    setCards(prevCards => {
      prevCards[0].push(...outputCardsArray.splice(0, 1));
      prevCards[1].push(...outputCardsArray.splice(0, 2));
      prevCards[2].push(...outputCardsArray.splice(0, 3));
      prevCards[3].push(...outputCardsArray.splice(0, 4));
      prevCards[4].push(...outputCardsArray.splice(0, 5));
      prevCards[5].push(...outputCardsArray.splice(0, 6));
      prevCards[6].push(...outputCardsArray.splice(0, 7));
      prevCards[7].push(...outputCardsArray.splice(0, 24));
      prevCards[8] = [];
      prevCards[9] = [];
      prevCards[10] = [];
      prevCards[11] = [];
      prevCards[12] = [];
      return prevCards;
    })
    updateVisibility();
    setGameRuns(true);
  }

  function showExtraCards() {
    setCards(prevCards => {
      const copiedCards = [...prevCards];
      if (copiedCards[7].length === 0) {
        copiedCards[7].push(...copiedCards[8].splice(0));
      } else {
        copiedCards[8].push(...copiedCards[7].splice(0, 3));
      }
      return copiedCards;
    })
  }


  function updateVisibility() {
    setCards(prevCards => {
      const copiedCards = [...prevCards];

      copiedCards[0][copiedCards[0].length - 1].visible = true;
      copiedCards[1][copiedCards[1].length - 1].visible = true;
      copiedCards[2][copiedCards[2].length - 1].visible = true;
      copiedCards[3][copiedCards[3].length - 1].visible = true;
      copiedCards[4][copiedCards[4].length - 1].visible = true;
      copiedCards[5][copiedCards[5].length - 1].visible = true;
      copiedCards[6][copiedCards[6].length - 1].visible = true;

      return copiedCards;
    })
  }

  function chooseCard(stackNum) {
    let currCard = cards[stackNum][cards[stackNum].length - 1];
    currCard.isCurrent = true;
    setCards(prevCards => {
      const copiedCards = [...prevCards];
      for (let stack of copiedCards) {
        for (let card of stack) {
          if (card.id !== currCard.id) {
            card.isCurrent = false;
          }
        }
      }
      return copiedCards;
    })
    setCurrentCard(currCard);
  }

  return (
    <div>
      <Menu handleClick={newGame} />
      {gameRuns &&
        <>
          <div className='upperPart gameArea'>
            <div className='extraBoard'>
              <ExtraStack cards={cards[7]} shownCards={cards[8]} showExtraCards={showExtraCards} chooseCard={() => chooseCard(8)} />
            </div>
            <div className='foundationBoard'>
              <FoundationStack chooseCard={() => chooseCard(9)} />
              <FoundationStack chooseCard={() => chooseCard(10)} />
              <FoundationStack chooseCard={() => chooseCard(11)} />
              <FoundationStack chooseCard={() => chooseCard(12)} />
            </div>
          </div>
          <div className='mainBoard'>
            <MainStack cards={cards[0]} chooseCard={() => chooseCard(0)} />
            <MainStack cards={cards[1]} chooseCard={() => chooseCard(1)} />
            <MainStack cards={cards[2]} chooseCard={() => chooseCard(2)} />
            <MainStack cards={cards[3]} chooseCard={() => chooseCard(3)} />
            <MainStack cards={cards[4]} chooseCard={() => chooseCard(4)} />
            <MainStack cards={cards[5]} chooseCard={() => chooseCard(5)} />
            <MainStack cards={cards[6]} chooseCard={() => chooseCard(6)} />
          </div>
        </>
      }
    </div>

  )
}

export default App
