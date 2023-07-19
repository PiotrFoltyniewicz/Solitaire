import blankCard from '../assets/blank_card.svg';
import Card from "./Card";

export default function FoundationStack(props) {

  return (
    <div className='foundationStack'>
      <img className='card' src={blankCard} />
    </div>
  )
}