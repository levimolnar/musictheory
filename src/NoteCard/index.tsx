import './NoteCard.css';

export const NoteCard = ({chord, seventh=false}: {
  chord: {
    id: string, 
    char: string, 
    type: {
      full: string, 
      short: string, 
      symbol: string
    }, 
    num: string
  }, 
  seventh?: boolean
}) => {

  const contentStyle: any = seventh 
    ? {width: '50px'}
    : {width: '25px'};
  const containerStyle: any = seventh 
    ? {display: 'flex', background: 'linear-gradient(45deg, #ffffff88, transparent 50% 66%, #00000022)'} 
    : {textAlign: 'center', background: 'linear-gradient(45deg, #ffffff88, transparent 50% 66%, #00000022)'};
  const numberStyle: any = seventh 
    ? {paddingLeft: '5px'} 
    : {textAlign: 'center'};
  const rootStyle: any = seventh 
    ? {paddingLeft: '3px'} 
    : {width: '100%'};

  return (
    <div className={'cardContent ' + chord.type.short} style={contentStyle}>
      <div className='cardNumber' style={numberStyle}>{chord.num}</div>
      <div className='textContainer' style={containerStyle}>
        <div className='rootText' style={rootStyle}>{chord.char[0]}{chord.char.slice(1,)}</div>
        {seventh ? <div className='seventhText'>{chord.type.symbol}</div> : <></>}
      </div>
    </div>
  )
}
