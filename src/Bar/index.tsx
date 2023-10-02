import './Bar.css';

export const Bar = () => {
  return (
    <div className='bar barBlur'>
      <div className='barCardContent maj'>1</div>
      <div className='barCardContent min'>2</div>
      <div className='barCardContent dim'>3</div>
      <div className='emptyCard'>+</div>
    </div>
  );
}
