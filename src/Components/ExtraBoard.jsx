import ExtraStack from "./ExtraStack";
import ExtraVisibleStack from "./ExtraVisibleStack";
import { useState } from 'react';

export default function ExtraBoard(props) {

  const [cardCount, setCardCount] = useState(0);
  const [extraCards, setExtraCards] = useState(props.cards);

  function handleClick() {
    setExtraCards(prevCards => {
      for (let i = 0; i < 3; i++) {
        if (i + cardCount < props.cards.length) {
          prevCards[i + cardCount].visible = true;
        }
      }
      console.log(prevCards)
      return prevCards;
    })
    setCardCount(prevCount => prevCount + 3)
  }

  function resetExtraStack() {
    setExtraCards(prevCards => {
      prevCards.map(card => {
        card.visible = false;
      })
    })
  }

  return (
    <div className='extraBoard'>
      <ExtraStack cards={extraCards.filter(card => !card.visible)} showCards={handleClick} />
      <ExtraVisibleStack cards={extraCards.filter(card => card.visible)} />
    </div>
  )
}