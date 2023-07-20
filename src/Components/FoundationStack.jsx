import blankCard from '../assets/blank_card.svg';
import Card from "./Card";

export default function FoundationStack(props) {

  return (
    <div className='foundationStack'>
      {
        props.cards.length > 0 ?
          props.cards.map((card, i) => {
            i++;
            return (
              <Card
                key={card.id}
                number={card.number}
                color={card.color}
                visible={card.visible}
                isCurrent={card.isCurrent}
                clickCard={() => props.interact(props.stackNum, i - 1)}
              />)
          }) :
          <img className='card' src={blankCard} onClick={() => props.interact(props.stackNum, 0)} />
      }

    </div>
  )
}