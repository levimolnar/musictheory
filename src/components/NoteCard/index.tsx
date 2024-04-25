import './NoteCard.css';

export const NoteCard = ({chord}: {
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
}) => {

  const contentStyle: any = {width: '25px'};
  const containerStyle: any = {textAlign: 'center', background: 'linear-gradient(45deg, #ffffff88, transparent 50% 66%, #00000022)'};
  const numberStyle: any = {textAlign: 'center'};
  const rootStyle: any = {width: '100%'};

  const {root, type, num} = chord;

  return (
    <div className={'cardContent ' + type.short} style={contentStyle}>
      <div className='cardNumber' style={numberStyle}>{num}</div>
      <div className='textContainer' style={containerStyle} title={type.full + ' chord'}>
        <div className='rootText' style={rootStyle}>{root}</div>
      </div>
    </div>
  )
}

export const NoteCardWide = ({chord}: {
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
}) => {

  const contentStyle: any = {width: '57px'};
  const containerStyle: any = {display: 'flex', background: 'linear-gradient(45deg, #ffffff88, transparent 50% 66%, #00000022)'};
  const numberStyle: any = {paddingLeft: '5px'};
  const rootStyle: any = {paddingLeft: '3px'};

  const {root, type, num} = chord;

  return (
    <div className={'cardContent ' + type.short} style={contentStyle}>
      <div className='cardNumber' style={numberStyle}>{num}</div>
      <div className='textContainer' style={containerStyle} title={type.full + ' chord'}>
        <div className='rootText' style={rootStyle}>{root}</div>
        <div className='seventhText'>{type.symbol}</div>
      </div>
    </div>
  )
}