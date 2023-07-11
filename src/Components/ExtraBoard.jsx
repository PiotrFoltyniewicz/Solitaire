import ExtraStack from "./ExtraStack"

export default function ExtraBoard(props) {
    return (
      <div className='extraBoard'>
        <ExtraStack cards={props.cards}/>
      </div>
    )
  }