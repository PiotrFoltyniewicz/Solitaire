import { useState } from 'react'
import Card from "./Card"

export default function MainStack(props) {

  const styles = [];

  for (let i = 0; i < props.cards.length; i++) {
    styles.push({ top: (i * 30) + 'px', backgroundColor: 'black' })
  }
  return (
    <div className='mainStack'>
      {props.cards.map((card, i) => {
        i++;
        return <Card key={card.id} number={card.number} color={card.color} shift={styles[i - 1]} />
      })}
    </div>
  )
}