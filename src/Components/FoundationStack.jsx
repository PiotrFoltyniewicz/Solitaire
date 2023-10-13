import blankCard from '/assets/blank_card.svg';
import Card from "./Card";
import { useDrop } from 'react-dnd';

export default function FoundationStack(props) {


  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'card',
    drop: (item) => handleDrop(item.id)
  }));

  function handleDrop(id) {
    props.interact(id, props.stackNum)
  }

  return (
    <div className='foundationStack' ref={dropRef}>
      {
        props.cards.length > 0 ?
          props.cards.map((card, i) => {
            i++;
            return (
              <Card
                key={card.id}
                id={card.id}
                number={card.number}
                color={card.color}
                visible={card.visible}
              />)
          }) :
          <img className='card' src={blankCard} onClick={() => props.interact(props.stackNum, 0)} />
      }

    </div>
  )
}