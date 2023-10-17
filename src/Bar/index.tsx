import './Bar.css';

export const Bar = () => {
  return (
    <div className='bar barBlur'>
      <div className='barCardContent aug'></div>
      <div className='barCardContent maj'></div>
      <div className='barCardContent min'></div>
      <div className='barCardContent dim'></div>
      <div className='emptyCard'>+</div>
    </div>
  );
}
