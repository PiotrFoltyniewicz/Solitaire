export default function Menu(props) {

  return (
    <div className='menu'>
      <button onClick={props.newGameHandle}>New game</button>
      {props.undoPossible && <button onClick={props.undoHandle}>Undo</button>}
    </div>
  )
}