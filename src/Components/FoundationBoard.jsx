import FoundationStack from './FoundationStack.jsx';

export default function FoundationBoard(props) {

    return (
      <div className='foundationBoard'>
        <FoundationStack />
        <FoundationStack />
        <FoundationStack />
        <FoundationStack />
      </div>
    )
  }