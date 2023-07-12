import Card from "./Card"

export default function ExtraStack(props) {

  return (
    <div className='extraStack'>
      {props.cards.map(card => {
        return <Card key={card.id} number={card.number} color={card.color} />
      })}
    </div>
  )
}