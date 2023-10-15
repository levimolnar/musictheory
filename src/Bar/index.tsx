import './Bar.css';

export const Bar = () => {
  return (
    <div className='bar barBlur'>
      <div className='barCardContent aug'>I⁺</div>
      <div className='barCardContent maj'>II</div>
      <div className='barCardContent min'>iii</div>
      <div className='barCardContent dim'>iv°</div>
      <div className='emptyCard'>+</div>
    </div>
  );
}
