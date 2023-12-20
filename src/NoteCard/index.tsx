import './NoteCard.css';

export const NoteCard = ({chord, seventh=false}: {
  chord: {
    id: string, 
    root: string, 
    type: {
      full: string, 
      short: string, 
      symbol: string,
    }, 
    num: string 
  }, 
  seventh?: boolean
}) => {

  const contentStyle: any = seventh 
    ? {width: '57px'}
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

  const {root, type, num} = chord;

  // console.log(chord);

  return (
    <div className={'cardContent ' + type.short} style={contentStyle}>
      <div className='cardNumber' style={numberStyle}>{num}</div>
      <div className='textContainer' style={containerStyle} title={type.full + ' chord'}>
        {/* <div className='rootText' style={rootStyle}>{root[0]}{root.slice(1,)}</div> */}
        <div className='rootText' style={rootStyle}>{root}</div>
        {seventh ? <div className='seventhText'>{type.symbol}</div> : <></>}
      </div>
    </div>
  )
}
