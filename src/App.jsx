import cardsData from './cardsData.js';
import MainBoard from './Components/MainBoard.jsx';
import FoundationBoard from './Components/FoundationBoard.jsx';
import ExtraBoard from './Components/ExtraBoard.jsx';
import Card from './Components/Card.jsx';
import {useState, useEffect} from 'react';

function App() {

  const [shuffledCards, setShuffledCards] = useState(null);

  function shuffleCards(){
    const tempCardsArray = cardsData.slice();
    const arrLength = tempCardsArray.length;
    let outputCardsArray = [];

    for(let i = 0; i < arrLength; i++){
      let rndIndex = Math.floor(Math.random() * tempCardsArray.length);
      outputCardsArray.push(tempCardsArray.splice(rndIndex, 1)[0]);
    }
    setShuffledCards(outputCardsArray.map(card => {
      return <Card key={card.id} number={card.number} color={card.color}/>
    }))
    
  }

  return (
    <div>
      <button onClick={shuffleCards}>Shuffle</button>
      {shuffledCards}
    </div>
  )
}

export default App
