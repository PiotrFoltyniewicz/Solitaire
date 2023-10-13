import cardBack from '/assets/card_back.svg'
import { useDrag, } from 'react-dnd'

export default function Card(props) {

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: { id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  return (
    <>

      <img
        className='card'
        src={props.visible ? `/cards/${props.number}_of_${props.color}.svg` : cardBack}
        style={{ ...props.shift, opacity: isDragging ? 0.75 : 1 }}
        ref={(props.visible && !props.dragBlock) ? dragRef : null}
      />
    </>
  )
}