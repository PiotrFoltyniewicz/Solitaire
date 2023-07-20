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
    updateVisibility();
  }


  function updateVisibility() {
    setCards(prevCards => {
      const copiedCards = [...prevCards];

      for (let i = 0; i < 13; i++) {
        if (copiedCards[i].length === 0 || i === 7) continue;
        copiedCards[i][copiedCards[i].length - 1].visible = true;
      }
      return copiedCards;
    })
  }

  function clickCard(stackNum, cardNum) {

    // choose card
    if (currentCard === null) {
      if (cards[stackNum].length === 0) return;

      let currCard = cards[stackNum][cardNum];
      if (!currCard.visible) return;

      setCards(prevCards => {
        const copiedCards = [...prevCards];
        for (let stack of copiedCards) {
          let nextCards = false;
          for (let i = 0; i < stack.length; i++) {
            if (stack[i].id === currCard.id) {
              nextCards = true;
            }
            if (nextCards) {
              stack[i].isCurrent = true;
            } else {
              stack[i].isCurrent = false;
            }
          }
        }
        return copiedCards;
      });
      setCurrentCard([stackNum, cardNum]);

      // place card on main stacks
    } else if (stackNum < 7) {
      setCards(prevCards => {

        let currCard = prevCards[currentCard[0]][currentCard[1]];
        const copiedCards = [...prevCards];

        for (let stack of copiedCards) {
          let nextCards = false;
          for (let i = 0; i < stack.length; i++) {
            if (stack[i].id === currCard.id) {
              nextCards = true;
            }
            if (nextCards) {
              stack[i].isCurrent = false;
            }
          }
        }
        copiedCards[stackNum].push(...copiedCards[currentCard[0]].splice(currentCard[1]));

        return copiedCards;
      });
      setCurrentCard(null);

      // place on extra visible stack (unclick card)
    } else if (stackNum === 8) {
      setCards(prevCards => {
        let currCard = prevCards[currentCard[0]][currentCard[1]];
        const copiedCards = [...prevCards];

        for (let stack of copiedCards) {
          for (let i = 0; i < stack.length; i++) {
            if (stack[i].id === currCard.id) {
              stack[i].isCurrent = false;
            }
          }
        }
        return copiedCards;
      });
      setCurrentCard(null);

      // place on foundation stacks
    } else if (stackNum > 8 && currentCard[1] === cards[currentCard[0]].length - 1) {

      setCards(prevCards => {

        let currCard = prevCards[currentCard[0]][currentCard[1]];
        const copiedCards = [...prevCards];

        for (let stack of copiedCards) {
          let nextCards = false;
          for (let i = 0; i < stack.length; i++) {
            if (stack[i].id === currCard.id) {
              nextCards = true;
            }
            if (nextCards) {
              stack[i].isCurrent = false;
            }
          }
        }
        copiedCards[stackNum].push(copiedCards[currentCard[0]].pop());

        return copiedCards;
      });
      setCurrentCard(null);
    }
    else {
      setCards(prevCards => {

        let currCard = prevCards[currentCard[0]][currentCard[1]];
        const copiedCards = [...prevCards];

        for (let stack of copiedCards) {
          let nextCards = false;
          for (let i = 0; i < stack.length; i++) {
            if (stack[i].id === currCard.id) {
              nextCards = true;
            }
            if (nextCards) {
              stack[i].isCurrent = false;
            }
          }
        }

        return copiedCards;
      });
      setCurrentCard(null);
    }
    updateVisibility();
  }

  return (
    <div>
      <Menu handleClick={newGame} />
      {gameRuns &&
        <>
          <div className='upperPart gameArea'>
            <div className='extraBoard'>
              <ExtraStack cards={cards[7]} shownCards={cards[8]} showExtraCards={showExtraCards} stackNum={8} interact={clickCard} />
            </div>
            <div className='foundationBoard'>
              <FoundationStack cards={cards[9]} stackNum={9} interact={clickCard} />
              <FoundationStack cards={cards[10]} stackNum={10} interact={clickCard} />
              <FoundationStack cards={cards[11]} stackNum={11} interact={clickCard} />
              <FoundationStack cards={cards[12]} stackNum={12} interact={clickCard} />
            </div>
          </div>
          <div className='mainBoard'>
            <MainStack cards={cards[0]} stackNum={0} interact={clickCard} />
            <MainStack cards={cards[1]} stackNum={1} interact={clickCard} />
            <MainStack cards={cards[2]} stackNum={2} interact={clickCard} />
            <MainStack cards={cards[3]} stackNum={3} interact={clickCard} />
            <MainStack cards={cards[4]} stackNum={4} interact={clickCard} />
            <MainStack cards={cards[5]} stackNum={5} interact={clickCard} />
            <MainStack cards={cards[6]} stackNum={6} interact={clickCard} />
          </div>
        </>
      }
    </div>

  )
}

export default App
