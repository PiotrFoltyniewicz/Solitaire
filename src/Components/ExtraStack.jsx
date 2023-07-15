import Card from "./Card"

export default function ExtraStack(props) {

  return (
    <div className='extraStack' onClick={props.showCards}>
      {props.cards.map(card => {
        return <Card
          key={card.id}
          number={card.number}
          color={card.color}
          visible={false}
        />
      })}
    </div>
  )
}