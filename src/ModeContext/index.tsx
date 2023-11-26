import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { NoteCard } from '../NoteCard';

export const ProgContext = createContext<any>(undefined);

export const ModeContext = ({children}: {children: any}) => {

  const [dragId, setDragId] = useState<string | undefined>(undefined);
  const [payloadStorage, setPayloadStorage] = useState<any | undefined>(undefined);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [throttled, setThrottled] = useState<boolean>(false);

  const throttle = () => {
    setThrottled(true);
    setTimeout(() => {
      setThrottled(false);
    }, 100);
  };

  const handleDragStart = ({active}: any) => {
    setBlocked(false);
    setThrottled(false);
    setDragId(active.id); 
    if (active.data.current.payload) setPayloadStorage(active.data.current.payload);
  }

  const handleDragOver = ({active, over}: any) => {

    if (!payloadStorage) return;
    console.log(payloadStorage);

    if (!over || !over.data.current) {
      // if object hovered over is not drop zone

      if (active.data.current.sortable) {
        // if from sortable, remove card at index from sortable
        // console.log('remove from sortable');

        // remove based on ID, can't remove wrong index.
        active.data.current.payload.setFunc((items: any) => items.filter((chord: any) => chord.id !== active.data.current.payload.chord.id));

        setBlocked(false);
        throttle();
        return
      };

      return
    };

    if (active.data.current.hasOwnProperty("sortable") && active.data.current.sortable.containerId !== over.data.current.sortable.containerId) {
      // in case sortables are next to eachother and draggable does not meet !over, still remove item.

      active.data.current.payload.setFunc((items: any) => items.filter((chord: any) => chord.id !== active.data.current.payload.chord.id));

      setBlocked(false);
      throttle();
      return
    };

    if (payloadStorage.chord && !throttled) {

      const {index: newIndex, items } = over.data.current.sortable;
      const setItemsFunc = over.data.current.payload.setFunc;

      const duplicateIndex = items.findIndex((id: any) => id === dragId);
      
      if (duplicateIndex === -1 && !blocked) {
        // console.log('add to sortable');

        // setItemsFunc((items: any) => [...items.slice(0, newIndex), {...payloadStorage.chord, id: dragId}, ...items.slice(newIndex)]);
        setItemsFunc((items: any) => [...items.slice(0, newIndex), {...payloadStorage.chord, seventh: payloadStorage.seventh, id: dragId}, ...items.slice(newIndex)]);

        setBlocked(true);
        throttle();
        return;

      } else {
        // console.log('swap cards');
        
        setItemsFunc((items: any) => arrayMove(items, duplicateIndex, newIndex));

        throttle();
        return;
      };
    };
  }

  const handleDragEnd = ({active, over}: any) => {

    if (payloadStorage.origin === 'chart') {
      // reset id of dragged chart item on in any case
      payloadStorage.setFunc((prevScales: Array<{id: string, root: string, type: {full: string, short: string, symbol: string}, num: string}>) => {
        const newScales = [...prevScales];
        newScales[payloadStorage.index].id = uuidv4();
        return newScales;
      });
    }

    if (!over) return;

    // if (payloadStorage.origin === 'progBar' && over.data.current.sortable) {
    if (payloadStorage.origin === 'progBar' && active.data.current.sortable && over.data.current.sortable) {

      // console.log('sortable -> sortable')

      const oldIndex = active.data.current.sortable.index;  // !
      const newIndex = over.data.current.sortable.index;

      over.data.current.payload.setFunc((items: any) => arrayMove(items, oldIndex, newIndex));
      // over.data.current.payload.setFunc((items: any) => new Set(arrayMove([...items], oldIndex, newIndex)));
      return
    }

    if (payloadStorage.origin === 'chart' && over.data.current.sortable) {
      // console.log('chart -> sortable')

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
    >
      {children}
      {payloadStorage ? <DragOverlay><NoteCard chord={payloadStorage.chord} seventh={payloadStorage.seventh}/></DragOverlay> : <></>}
    </DndContext>
  );
}
