export default function Menu(props) {

  return (
    <div className='menu'>
      <button onClick={props.handleClick}>New game</button>
    </div>
  )
}