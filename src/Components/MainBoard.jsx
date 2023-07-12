import MainStack from "./MainStack"

export default function MainBoard(props) {

  const stacks = [
    props.cards.slice(0, 1),
    props.cards.slice(1, 3),
    props.cards.slice(3, 6),
    props.cards.slice(6, 10),
    props.cards.slice(10, 15),
    props.cards.slice(15, 21),
    props.cards.slice(22),
  ]

  return (
    <div className='mainBoard gameArea'>
      <MainStack key='1' cards={stacks[0]} />
      <MainStack key='2' cards={stacks[1]} />
      <MainStack key='3' cards={stacks[2]} />
      <MainStack key='4' cards={stacks[3]} />
      <MainStack key='5' cards={stacks[4]} />
      <MainStack key='6' cards={stacks[5]} />
      <MainStack key='7' cards={stacks[6]} />
    </div>
  )
}