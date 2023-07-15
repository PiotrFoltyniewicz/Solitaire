import { useState } from 'react'
import Card from "./Card"
import blankCard from '../assets/blank_card.svg';

export default function MainStack(props) {

  const styles = [];

  for (let i = 0; i < props.cards.length; i++) {
    styles.push({ top: (i * 30) + 'px' })
    props.cards[i].visible = (props.cards[i].visible || i + 1 == props.cards.length) ? true : false
  }
  return (
    <div className='mainStack'>
      {props.cards.map((card, i) => {
        i++;
        return props.cards.length > 0 ?
          <Card
            key={card.id}
            number={card.number}
            color={card.color}
            shift={styles[i - 1]}
            visible={card.visible}
          /> : <img className='card' src={blankCard} />
      })}
    </div>
  )
}