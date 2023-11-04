import './NoteCard.css';

export const NoteCard = ({chord}: {chord: {id: string, char: string, type: string, num: string}}) => {

  // if (!chord) return <></>
  
  return (
    <div className={'cardContent ' + chord.type}>
      <div className='cardNumber'>{chord.num}</div>
      <div className='cardText'>{chord.char[0]}<span className='accidental'>{chord.char.slice(1,)}</span></div>
    </div>
  )
}
