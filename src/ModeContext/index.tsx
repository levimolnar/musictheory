import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
// import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { NoteCard } from '../NoteCard';
import { Payload } from '../types';

export const ProgContext = createContext<any>(undefined);

export const ModeContext = ({children}: {children: any}) => {

  const [payloadStorage, setPayloadStorage] = useState<Payload | undefined>(undefined);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [throttled, setThrottled] = useState<boolean>(false);

  const throttle = (ms: number) => {
    setThrottled(true);
    setTimeout(() => {
      setThrottled(false);
    }, ms);
  };

  const handleDragStart = ({active}: any) => {
    setBlocked(false);
    setThrottled(false);
    if (active.data.current.payload) { setPayloadStorage(active.data.current.payload) };
  }

  const handleDragOver = ({active, over}: any) => {
    if (!payloadStorage) { return };

    if (!over || !over.data.current) {
      // if object hovered is not a droppable zone

      if (active.data.current.sortable) {
        // if from sortable, remove card at index from sortable

        const {remove: itemRemove} = active.data.current.payload.setFunc;
        const activeContainerId = active.data.current.sortable.containerId;
        itemRemove(activeContainerId, active.data.current.payload.chord.id);

        setBlocked(false);
        throttle(100);
        return
        
      } else { return };
    };

    // possibly redundant! try to incorporate!
    if (active.data.current.hasOwnProperty("sortable") && active.data.current.sortable.containerId !== over.data.current.sortable.containerId) {
      // fix issue where dragging from sortables next to eachother won't encounter '!over', thus won't remove item.

      const {remove: itemRemove} = active.data.current.payload.setFunc;
      const activeContainerId = active.data.current.sortable.containerId;
      itemRemove(activeContainerId, active.data.current.payload.chord.id);

      setBlocked(false);
      throttle(100);
      return
    };

    if (payloadStorage.chord && !throttled) {

      const {index: newIndex, items } = over.data.current.sortable;
      const {add: itemAdd, swap: itemSwap} = over.data.current.payload.setFunc;
      const containerId = over.data.current.sortable.containerId;

      const duplicateIndex = items.findIndex((id: any) => id === payloadStorage.chord.id);
      
      if (duplicateIndex === -1 && !blocked) {
        itemAdd(containerId, newIndex, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
        setBlocked(true);
        throttle(100);
        return;
      } else {
        // itemSwap(containerId, duplicateIndex, newIndex);
        // throttle(100);
        // setBlocked(true);
        return;
      };
    };
  }

  const handleDragEnd = ({active, over}: any) => {

    if (!payloadStorage) { return };
    if (payloadStorage.origin === 'modeList') {
      // reset id of dragged modeList item to prevent copies
      payloadStorage.setFunc((prevScales: Array<{id: string, root: string, type: {full: string, short: string, symbol: string}, num: string}>) => {
        const newScales = [...prevScales];
        newScales[payloadStorage.index].id = uuidv4();
        return newScales;
      });
    };

    if (!active.data.current.payload) { return }; // can occur in between progBars
    if (!over) { return };
    
    // correct swap to wrong index
    // if (active.data.current.payload.index !== over.data.current.payload.index) {
    //   const {swap: itemSwap} = over.data.current.payload.setFunc;
    //   const containerId = over.data.current.sortable.containerId;

    //   console.log(active.data.current.payload.index, over.data.current.payload.index);
    //   itemSwap(containerId, active.data.current.payload.index, over.data.current.payload.index);
    // };


    // if (active.data.current.payload.index !== over.data.current.payload.index) {
    const {swap: itemSwap} = over.data.current.payload.setFunc;
    const containerId = over.data.current.sortable.containerId;

    // console.log(active.data.current.payload.index, over.data.current.payload.index);
    itemSwap(containerId, active.data.current.payload.index, over.data.current.payload.index);
    // };
  };


  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
    >
      {children}
      {payloadStorage ? <DragOverlay><NoteCard chord={payloadStorage.chord} seventh={payloadStorage.seventh}/></DragOverlay> : <></>}
    </DndContext>
  );
}
