import ExtraStack from './Components/ExtraStack.jsx'
import CardStack from './Components/CardStack.jsx'
import FoundationStack from './Components/FoundationStack.jsx';
import Menu from './Components/Menu.jsx';

function App() {
  const cards = [
  {key: 0, color: 'heart', number: 'A'},
  {key: 1, color: 'heart', number: '2'},
  {key: 2, color: 'heart', number: '3'},
  {key: 3, color: 'heart', number: '4'},
  {key: 4, color: 'heart', number: '5'},
  {key: 5, color: 'heart', number: '6'},
  {key: 6, color: 'heart', number: '7'},
  {key: 7, color: 'heart', number: '8'},
  {key: 8, color: 'heart', number: '9'},
  {key: 9, color: 'heart', number: '10'},
  {key: 10, color: 'heart', number: 'J'},
  {key: 11, color: 'heart', number: 'Q'},
  {key: 12, color: 'heart', number: 'K'},
  {key: 13, color: 'diamond', number: 'A'},
  {key: 14, color: 'diamond', number: '2'},
  {key: 15, color: 'diamond', number: '3'},
  {key: 16, color: 'diamond', number: '4'},
  {key: 17, color: 'diamond', number: '5'},
  {key: 18, color: 'diamond', number: '6'},
  {key: 19, color: 'diamond', number: '7'},
  {key: 20, color: 'diamond', number: '8'},
  {key: 21, color: 'diamond', number: '9'},
  {key: 22, color: 'diamond', number: '10'},
  {key: 23, color: 'diamond', number: 'J'},
  {key: 24, color: 'diamond', number: 'Q'},
  {key: 25, color: 'diamond', number: 'K'},
  {key: 26, color: 'spade', number: 'A'},
  {key: 27, color: 'spade', number: '2'},
  {key: 28, color: 'spade', number: '3'},
  {key: 29, color: 'spade', number: '4'},
  {key: 30, color: 'spade', number: '5'},
  {key: 31, color: 'spade', number: '6'},
  {key: 32, color: 'spade', number: '7'},
  {key: 33, color: 'spade', number: '8'},
  {key: 34, color: 'spade', number: '9'},
  {key: 35, color: 'spade', number: '10'},
  {key: 36, color: 'spade', number: 'J'},
  {key: 37, color: 'spade', number: 'Q'},
  {key: 38, color: 'spade', number: 'K'},
  {key: 39, color: 'club', number: 'A'},
  {key: 40, color: 'club', number: '2'},
  {key: 41, color: 'club', number: '3'},
  {key: 42, color: 'club', number: '4'},
  {key: 43, color: 'club', number: '5'},
  {key: 44, color: 'club', number: '6'},
  {key: 45, color: 'club', number: '7'},
  {key: 46, color: 'club', number: '8'},
  {key: 47, color: 'club', number: '9'},
  {key: 48, color: 'club', number: '10'},
  {key: 49, color: 'club', number: 'J'},
  {key: 50, color: 'club', number: 'Q'},
  {key: 51, color: 'club', number: 'K'},
  
];
  return (
    <>
    <Menu />
    <div className='upperArea'>
      <div className='foundationArea'>
        <FoundationStack className='foundationStack'/>
        <FoundationStack/>
        <FoundationStack/>
        <FoundationStack/>
      </div>
      <div className='extraStackArea'>
        <ExtraStack/>
      </div>
    </div>

      <div className='cardStacksArea'>
        <CardStack className='cardStack'/>
        <CardStack className='cardStack'/>
        <CardStack className='cardStack'/>
        <CardStack className='cardStack'/>
        <CardStack className='cardStack'/>
        <CardStack className='cardStack'/>
        <CardStack className='cardStack'/>
      </div>
    </>
  )
}

export default App
