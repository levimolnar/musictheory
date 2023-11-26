import { useContext, useState, useEffect, StrictMode } from 'react';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import './Bar.css';

import { NoteCard } from '../NoteCard';
import { ProgContext } from '../ModeContext';
import { useDroppable } from '@dnd-kit/core';

const SortableItem = ({chord, setFunc, index, seventh}: {chord: any, setFunc: any, index: number, seventh: boolean}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chord.id, 
    data: {payload: {chord, setFunc, index, origin: 'progBar', seventh}},
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '.6' : '1',
    filter: isDragging ? 'brightness(.8)' : 'none',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NoteCard chord={chord} seventh={seventh}/>
    </div>
  )
};

const EmptyItem = ({id, setFunc}: {id: string, setFunc: any}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id, disabled: true, data: {payload: {setFunc: setFunc, origin: 'progBar'}}})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='empty'>+</div>
    </div>
  )
};

export const Bar = () => {

  const [items, setItems] = useState<Array<{id: string, root: string, type: {full: string, short: string, symbol: string}, num: string, seventh: boolean}>>([
    {id: uuidv4(), root: 'D', type: {full: "Minor", short: "min", symbol: "m"}, num: 'ii', seventh: false},
    {id: uuidv4(), root: 'G', type: {full: "Major", short: "maj", symbol:  ""}, num: 'V',  seventh: false},
    {id: uuidv4(), root: 'C', type: {full: "Major", short: "maj", symbol:  ""}, num: 'I',  seventh: false},
  ]);

  const [uniqueBarId] = useState(uuidv4());

  const [barWidth, setBarWidth] = useState<number>(0);
  const [decreaseBool, setDecreaseBool] = useState<boolean | undefined>(undefined);

  const NOTE_CARD_WIDTH = 25;
  const MARGIN_WIDTH = 7;

  // check if width change is increase or decrease, 
  useEffect(() => {
    setDecreaseBool(barWidth > items.length*NOTE_CARD_WIDTH + (items.length-1)*MARGIN_WIDTH);
    setBarWidth(items.length*NOTE_CARD_WIDTH + (items.length-1)*MARGIN_WIDTH);
  }, [items]);

  // apply transition effect only in case of width decrease
  const widthStyle = {
    // width: `${barWidth}px`,
    width: 'min-content',
    transition: decreaseBool ? 'width 100ms ease-out' : 'none',
  };

  return (
    <StrictMode>
      <SortableContext
        items={items.map((i: any) => i.id)}
        strategy={horizontalListSortingStrategy} 
        id={'sortable-' + uniqueBarId}
      >
        <div className='bar barBlur' style={widthStyle}>
          {
            items.length
              ? items.map((chord: any, i) => <SortableItem key={chord.id} chord={chord} setFunc={setItems} index={i} seventh={chord.seventh}/>)
              : <EmptyItem id={'empty-' + uniqueBarId} setFunc={setItems}/>
          }
        </div>
      </SortableContext>
    </StrictMode>
  );
}
