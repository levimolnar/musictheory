import { useContext, useState, useEffect } from 'react';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import './Bar.css';

import { NoteCard } from '../NoteCard';
import { ProgContext } from '../ModeContext';
import { useDroppable } from '@dnd-kit/core';


const SortableItem = ({item, setFunc}: {item: any, setFunc: any}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: item.id, data: {setFunc: setFunc}})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NoteCard chord={item}/>
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
  } = useSortable({id: id, disabled: true, data: {setFunc: setFunc}})

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
    {id: uuidv4(), char: 'D', type: 'min', num: 'ii'},
    {id: uuidv4(), char: 'G', type: 'maj', num: 'V'},
    {id: uuidv4(), char: 'C', type: 'maj', num: 'I'},
  ]);

  const [uniqueBarId] = useState(uuidv4());

  return (
    <SortableContext
      items={items.map((i: any) => i.id)}
      strategy={horizontalListSortingStrategy} 
      id={'sortable-' + uniqueBarId}
    >
      <div className='bar barBlur'>
        {
          items.length
            ? items.map((chord: any) => <SortableItem item={chord} setFunc={setItems}/>)
            : <EmptyItem id={'empty-' + uniqueBarId} setFunc={setItems}/>

        }
      </div>
    </SortableContext>
  );
}
