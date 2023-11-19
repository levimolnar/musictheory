import { useContext, useState, useEffect, StrictMode } from 'react';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import './Bar.css';

import { NoteCard } from '../NoteCard';
import { ProgContext } from '../ModeContext';
import { useDroppable } from '@dnd-kit/core';

const SortableItem = ({index, chord, setFunc}: {index: number, chord: any, setFunc: any}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chord.id, 
    // transition: {
    //   duration: 300,
    //   easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    // },
    data: {payload: {index: index, chord: chord, setFunc: setFunc, origin: 'progBar',}}
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '.6' : '1',
    filter: isDragging ? 'brightness(.8)' : 'none',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NoteCard chord={chord}/>
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

  const [items, setItems] = useState<Array<{id: string, char: string, type: string, num: string}>>([
    // {id: uuidv4(), char: 'C', type: 'maj', num: 'I'},
    // {id: uuidv4(), char: 'G', type: 'maj', num: 'V'},
    // {id: uuidv4(), char: 'A', type: 'min', num: 'vi'},
    // {id: uuidv4(), char: 'F', type: 'maj', num: 'IV'},
    {id: uuidv4(), char: 'D', type: 'min', num: 'ii'},
    {id: uuidv4(), char: 'G', type: 'maj', num: 'V'},
    {id: uuidv4(), char: 'C', type: 'maj', num: 'I'},
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
    width: `${barWidth}px`,
    transition: decreaseBool ? 'width 100ms ease-out' : 'none',
  };

  return (
    <StrictMode>
      <SortableContext
        items={items.map((i: any) => i.id)}
        // items={[...items].map((i: any) => i.id)}
        strategy={horizontalListSortingStrategy} 
        id={'sortable-' + uniqueBarId}
      >
        <div className='bar barBlur' style={widthStyle}>
          {
            items.length
              ? items.map((chord: any, i: any) => <SortableItem key={chord.id} index={i} chord={chord} setFunc={setItems}/>)
              : <EmptyItem id={'empty-' + uniqueBarId} setFunc={setItems}/>
          }
        </div>
      </SortableContext>
    </StrictMode>
  );
}
