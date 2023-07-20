import cardBack from '../assets/card_back.svg'

export default function Card(props) {

  return (
    <img
      className={props.isCurrent ? 'card chosenCard' : 'card'}
      src={props.visible ? `/cards/${props.number}_of_${props.color}.svg` : cardBack}
      style={props.shift}
      onClick={props.clickCard}
    />
  )
}