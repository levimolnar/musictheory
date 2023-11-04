import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { NoteCard } from '../NoteCard';


export const ProgContext = createContext<any>(undefined);


export const ModeContext = ({children}: {children: any}) => {

  const [dragId, setDragId] = useState<string | undefined>(undefined);
  const [payloadStorage, setPayloadStorage] = useState<any | undefined>(undefined);

  const handleDragStart = ({active}: any) => {

    // console.log({activeStart: active});

    setDragId(active.id); 
    if (active.data.current.payload) { setPayloadStorage(active.data.current.payload) };
  }

  const handleDragOver = ({active, over}: any) => {

    if (!over || !over.data.current) {
      // if object hovered over is not drop zone

      // console.log({activeDO: active})

      if (active.data.current.sortable) {
        // if from sortable, remove card at index from sortable
        console.log('remove from sortable');

        // remove based on index, could remove wrong card.

        // const oldIndex = active.data.current.payload.index;
        // active.data.current.payload.setFunc((items: any) => items.slice(0, oldIndex).concat(items.slice(oldIndex + 1)));

        // remove based on ID, cannot remove wrong card.

        active.data.current.payload.setFunc((items: any) => items.filter((chord: any) => chord.id !== active.data.current.payload.chord.id));

        return
      };

      return
    };

    if (payloadStorage.chord) {
    // if (active.data.current.sortable) {
        console.log('add to sortable / swap');

      // const chord = active.data.current.payload.chord;
      const chord = payloadStorage.chord;
      const {index: newIndex, items } = over.data.current.sortable;
      const setItemsFunc = over.data.current.payload.setFunc;

      // const duplicateIndex = items.findIndex((i: any) => i.id === dragId);
      const duplicateIndex = items.findIndex((id: any) => id === dragId);

      if (duplicateIndex === -1) {
        // dragId not already in sortable        
        setItemsFunc((items: any) => items.toSpliced(newIndex, 0, {...chord, id: dragId}));
      } else {
        setItemsFunc((items: any) => arrayMove(items, duplicateIndex, newIndex));
      };

      return
    };
  }


  const handleDragEnd = ({active, over}: any) => {
    
    if (payloadStorage.origin === 'chart') {
      // reset id of dragged chart item on any drop
      payloadStorage.setFunc((prevScales: any) => {
        const newScales = {...prevScales};
        newScales[payloadStorage.chordDir.scale][payloadStorage.chordDir.index].id = uuidv4();
        return newScales;
      });  
    }

    if (!over) return;

    console.log(payloadStorage);

    if (payloadStorage.origin === 'progBar' && over.data.current.sortable) {
      console.log('sortable -> sortable')

      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;

      over.data.current.payload.setFunc((items: any) => arrayMove(items, oldIndex, newIndex));
      return
    }

    if (payloadStorage.origin === 'chart' && over.data.current.sortable) {
      console.log('chart -> sortable')

      // payloadStorage.setFunc((prevScales: any) => {
      //   const newScales = {...prevScales};
      //   newScales[payloadStorage.chordDir.scale][payloadStorage.chordDir.index].id = uuidv4();
      //   return newScales;
      // });

      return
    }
  };


  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragCancel={() => {
        setDragId(undefined); 
        setPayloadStorage(undefined);
      }}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      {children}
      {payloadStorage ? <DragOverlay><NoteCard chord={payloadStorage.chord}/></DragOverlay> : <></>}
    </DndContext>
  );
}
