import cardsData from './cardsData.js';
import FoundationStack from './Components/FoundationStack.jsx';
import ExtraStack from './Components/ExtraStack.jsx';
import Menu from './Components/Menu.jsx';
import MainStack from './Components/MainStack.jsx';
import { useEffect, useState } from 'react';

function App() {

  const [cards, setCards] = useState([[], [], [], [], [], [], [], [], [], [], [], [], []]);
  const [gameState, setGameState] = useState(() => 'before');
  const [prevMove, setPrevMove] = useState(null);

  useEffect(() => newGame(), []);

  function handleNewGame() {
    window.location.reload(true);
  }

  function newGame() {
    const tempCardsArray = [...cardsData];
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
      prevCards = [[], [], [], [], [], [], [], [], [], [], [], [], []];
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
    });
    updateVisibility()
    setPrevMove(null);
    setGameState('running');
  }

  function undoMove() {
    setCards(prevCards => {
      const copiedCards = [...prevCards];
      if (![7, 9, 10, 11, 12].includes(prevMove[0]) && prevMove[0].length > 0) {
        copiedCards[prevMove[0]][copiedCards[prevMove[0]].length - 1].visible = false;
      }
      copiedCards[prevMove[0]].push(copiedCards[prevMove[2]].pop());
      return copiedCards;
    })
    setPrevMove(null);
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
    setPrevMove(null)
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

  function clickCard(cardId, stackNum) {
    const currentCard = findCard(cardId);
    // place card on main stacks
    if (currentCard !== null && stackNum < 7 && checkPlacing(currentCard, stackNum)) {

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
      setPrevMove([currentCard[0], currentCard[1], stackNum]);
      // place on foundation stacks
    } else if (currentCard !== null && stackNum > 8 && currentCard[1] === cards[currentCard[0]].length - 1 && checkPlacing(currentCard, stackNum)) {

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
      setPrevMove([currentCard[0], currentCard[1], stackNum]);
    }
    updateVisibility();
    gameFinished();
  }

  function findCard(cardId) {
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].length; j++) {
        if (cards[i][j].id === cardId) {
          return [i, j];
        }
      }
    }
  }

  function checkPlacing(currentCard, stackNum) {

    const currCard = cards[currentCard[0]][currentCard[1]];
    const cardBelow = cards[stackNum][cards[stackNum].length - 1];


    if (cardBelow === undefined && stackNum > 8) {
      // placing card on empty foundation stack
      if (currCard.number == 1) return true;
      return false;
    } else if (stackNum > 8) {
      // placing card on not empty foundation stack
      if (cardBelow.color == currCard.color && parseInt(cardBelow.number) + 1 == currCard.number) return true;
      return false;
    } else if (!cardBelow && stackNum < 7) {
      // placing card on empty main stack
      if (currCard.number == 13) return true;
      return false;
    } else if (stackNum < 7 && (currCard.color === 'spades' || currCard.color === 'clubs')) {
      // placing card on not empty main stack when current card is red
      if ((cardBelow.color === 'hearts' || cardBelow.color === 'diamonds') && parseInt(cardBelow.number) - 1 == currCard.number) return true;
      return false;
    } else if (stackNum < 7 && (currCard.color === 'hearts' || currCard.color === 'diamonds')) {
      // placing card on not empty main stack when current card is red
      if ((cardBelow.color === 'clubs' || cardBelow.color === 'spades') && parseInt(cardBelow.number) - 1 == currCard.number) return true;
      return false;
    }
  }

  function gameFinished() {
    if (cards[9].length === 13 && cards[10].length === 13 && cards[11].length === 13 && cards[12].length === 13) {
      setGameState('finished');
    }
  }

  const mainBoard = (
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
    </>)

  const gameEnd = (
    <>
      <div className='gameEnd'><h1>Game beaten, congratulations </h1></div>
    </>
  )
  let mainGame = <></>;

  switch (gameState) {
    case 'running':
      mainGame = mainBoard;
      break;
    case 'finished':
      mainGame = gameEnd;
      break;
  }

  return (
    <div>
      <Menu newGameHandle={handleNewGame} undoHandle={undoMove} undoPossible={prevMove === null ? false : true} />
      {mainGame}
    </div>

  )
}

export default App
