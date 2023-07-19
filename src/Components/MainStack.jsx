import { useState } from 'react'
import Card from "./Card"
import blankCard from '../assets/blank_card.svg';

export default function MainStack(props) {

  const styles = [];

  for (let i = 0; i < props.cards.length; i++) {
    styles.push({ top: (i * 30) + 'px' })
  }
  return (
    <div className='mainStack' onClick={props.chooseCard}>
      {props.cards.map((card, i) => {
        i++;
        return props.cards.length > 0 ?
          <Card
            key={card.id}
            number={card.number}
            color={card.color}
            shift={styles[i - 1]}
            visible={card.visible}
            isCurrent={card.isCurrent}
          /> : <img className='card' src={blankCard} />
      })}
    </div>
  )
}