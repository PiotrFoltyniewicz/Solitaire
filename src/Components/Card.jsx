export default function Card(props) {

  return (
    <img className='card' src={`/cards/${props.number}_of_${props.color}.svg`} style={props.shift} />
  )
}