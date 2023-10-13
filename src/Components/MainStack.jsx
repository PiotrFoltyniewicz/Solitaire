import { useState } from 'react'
import Card from "./Card"
import blankCard from '/assets/blank_card.svg';
import { useDrop } from 'react-dnd';

export default function MainStack(props) {

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'card',
    drop: (item) => handleDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  function handleDrop(id) {
    props.interact(id, props.stackNum)
  }

  const styles = [];

  for (let i = 0; i < props.cards.length; i++) {
    styles.push({ top: (i * 30) + 'px' })
  }

  return (
    <div className='mainStack' onClick={props.chooseCard} ref={dropRef}>
      {props.cards.length > 0
        ?
        props.cards.map((card, i) => {
          i++;
          return (
            <Card
              key={card.id}
              id={card.id}
              number={card.number}
              color={card.color}
              shift={styles[i - 1]}
              visible={card.visible}
              isDraggable={i === props.cards.length}
            />)
        })
        : <img className='card' src={blankCard} />
      }
    </div>
  )
}