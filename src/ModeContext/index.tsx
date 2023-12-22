import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
// import { restrictToWindowEdges } from '@dnd-kit/modifiers';
// import { CSS } from '@dnd-kit/utilities';
// import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { NoteCard, NoteCardWide } from '../NoteCard';
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
    if (active.data.current) { setPayloadStorage(active.data.current) };
  }

  const handleDragOver = ({active, over}: any) => {

    if (!payloadStorage) { return };

    if (!over || (active.data.current.hasOwnProperty("sortable") && active.data?.current?.sortable?.containerId !== over?.data?.current?.sortable?.containerId)) { 

      if (!active.data.current.sortable) { return };
      if (over?.data?.current?.origin === "droppable") { return };

      const {chordRemove} = active.data.current.setFunc;
      const activeContainerId = active.data.current.sortable.containerId;
      chordRemove(activeContainerId, active.data.current.chord.id);

      setBlocked(false);
      throttle(100);
      return;
    };

    // if (!over || !over.data.current) {
    //   // if object hovered is not a droppable zone

    //   if (active.data.current.sortable) {
    //     // if from sortable, remove card at index from sortable

    //     const {chordRemove} = active.data.current.setFunc;
    //     const activeContainerId = active.data.current.sortable.containerId;
    //     chordRemove(activeContainerId, active.data.current.chord.id);

    //     setBlocked(false);
    //     throttle(100);
    //     return
        
    //   } else { return };
    // };

    // if (over.data.current.origin === "droppable" && !throttled) {
    if (over.data.current.origin === "droppable") {
      
      const {chordPush} = over.data.current.setFunc;
      const containerId = over.id.slice(0,36);

      chordPush(containerId, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
      setBlocked(true);
      throttle(100)

      return; 
    };

    // possibly redundant! try to incorporate!
    // if (active.data.current.hasOwnProperty("sortable") && active.data.current.sortable.containerId !== over.data.current.sortable.containerId) {
    //   // fix issue where dragging from sortables next to eachother won't encounter '!over', thus won't remove item.

    //   const {chordRemove} = active.data.current.setFunc;
    //   const activeContainerId = active.data.current.sortable.containerId;
    //   chordRemove(activeContainerId, active.data.current.chord.id);

    //   setBlocked(false);
    //   throttle(100);
    //   return
    // };

    if (payloadStorage.chord && !throttled) {

      const {index: newIndex, items} = over.data.current.sortable;
      const {chordAppend, chordPush} = over.data.current.setFunc;
      const containerId = over.data.current.sortable.containerId;

      const duplicateIndex = items.findIndex((id: any) => id === payloadStorage.chord.id);
      
      if (duplicateIndex === -1 && !blocked) {
        // chordAppend(containerId, newIndex, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
        chordPush(containerId, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
        setBlocked(true);
        throttle(100);
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

    if (!active.data.current) { return }; // can occur in between progBars
    if (!over) { return };
    if (!over.data.current.hasOwnProperty("sortable")) { return };
    
    const {chordSwap} = over.data.current.setFunc;
    const containerId = over.data.current.sortable.containerId;
    chordSwap(containerId, active.data.current.index, over.data.current.index);
  };


  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
    >
      {children}
      {payloadStorage ? <DragOverlay>{ payloadStorage.seventh ? <NoteCardWide chord={payloadStorage.chord}/> : <NoteCard chord={payloadStorage.chord}/> }</DragOverlay> : <></>}
    </DndContext>
  );
}
