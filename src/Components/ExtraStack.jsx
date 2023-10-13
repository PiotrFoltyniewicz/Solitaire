import Card from "./Card";
import blankCard from '/assets/blank_card.svg';

export default function ExtraStack(props) {

  const [card1, card2, card3] = props.shownCards.slice(getRightIndex(props.shownCards.length - 3));

  function getRightIndex(ind) {
    return ind >= 0 ? ind : 0;
  }
  return (
    <>
      <div className='extraVisibleStack' onClick={() => props.interact(props.stackNum, props.shownCards.length - 1)}>
        {card1 &&
          <Card
            key={card1.id}
            id={card1.id}
            number={card1.number}
            color={card1.color}
            visible={true}
            dragBlock={props.shownCards[props.shownCards.length - 1].id === card1.id ? false : true}
            shift={{ left: 0 + 'px' }}
          />}
        {card2 &&
          <Card
            key={card2.id}
            id={card2.id}
            number={card2.number}
            color={card2.color}
            visible={true}
            dragBlock={props.shownCards[props.shownCards.length - 1].id === card2.id ? false : true}
            shift={{ left: 30 + 'px' }}
          />}
        {card3 &&
          <Card
            key={card3.id}
            id={card3.id}
            number={card3.number}
            color={card3.color}
            visible={true}
            dragBlock={props.shownCards[props.shownCards.length - 1].id === card3.id ? false : true}
            shift={{ left: 60 + 'px' }}
          />}
      </div>
      <div className='extraStack' onClick={props.showExtraCards}>
        {props.cards.length > 0
          ?
          props.cards.map(card => {
            return <Card
              key={card.id}
              number={card.number}
              color={card.color}
              visible={false}
            />
          })
          :
          <img className='card' src={blankCard} />
        }
      </div>
    </>
  )
}