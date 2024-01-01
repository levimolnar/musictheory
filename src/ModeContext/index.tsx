import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';

import { NoteCard, NoteCardWide } from '../NoteCard';
import { Payload } from '../types';

export const ProgContext = createContext<any>(undefined);

export const ModeContext = ({children}: {children: any}) => {

  const [payloadStorage, setPayloadStorage] = useState<Payload | undefined>(undefined);

  let debounceId: NodeJS.Timeout | undefined;
  let parentId: string | undefined;
  
  const debounce = (id: string, func: Function, ms?: number) => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      func();

      // console.log('B. Timeout completed!');
    }, 1000);

    debounceId = timeoutId;
    parentId = id;

    // console.log('A. Timeout started...');
  };

  const cancelDebounce = () => {
    clearTimeout(debounceId);
    debounceId = undefined;
    // parentId = undefined;

    // console.log(`X. Timeout cancelled.`);
  };


  const handleDragStart = ({active}: any) => {
    if (active.data.current) { 
      setPayloadStorage(active.data.current);
      parentId = active.data.current?.sortable?.containerId;
    };
  }

  const handleDragOver = async ({active, over}: any) => {

    // console.log('OVER', {debounce: debounceId, parent: parentId});

    if (!payloadStorage) { return };

    // CASE 1: Item dragged out of dnd-kit component (must be ProgBar, no other options).
    if (!over) { 

      // ensure item is currently part of ProgBar before removing.
      if (active.data.current.origin === "progBar") {
        const {chordRemove} = active.data.current.setFunc;
        const activeContainerId = active.data.current?.sortable?.containerId;
        chordRemove(activeContainerId, active.data.current.chord.id);

        parentId = undefined;
      };

      console.log('CASE 1')

      cancelDebounce();
      return;
    }

    const containerId = over.data.current?.sortable?.containerId;

    // sometimes handleDragStart has not yet finished, so wait for parentId to be set.
    if (active.data.current?.sortable) {
      while(!parentId) await new Promise(resolve => setTimeout(resolve, 10));
    };

    // CASE 2: Item dragged around ProgBar it is already part of.
    if (containerId === parentId) { 
      console.log('CASE 2')
      return 
    };

    // CASE 3: Item dragged to another component (must be other ProgBar, no other options).
    if (debounceId) { cancelDebounce() };
    
    if (active.data.current.origin === "progBar") {
      console.log('from ProgBar to other ProgBar!', containerId, parentId);
      
      const {chordRemove} = active.data.current.setFunc;
      const activeContainerId = active.data.current?.sortable?.containerId;
      chordRemove(activeContainerId, active.data.current.chord.id);

      parentId = undefined;
    };

    const {items, index} = over.data.current.sortable;
    const {chordAppend} = over.data.current.setFunc;

    const duplicateIndex = items.findIndex((id: any) => id === payloadStorage.chord.id);

    if (duplicateIndex === -1) {
      debounce(
        over.data.current?.sortable?.containerId, 
        () => { 
          // console.log(containerId, index, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id}, chordAppend);
          chordAppend(containerId, index, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
        }
      );
    };
    
    return;
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
    // if (!over.data.current.hasOwnProperty("sortable")) { return };
    
    console.log('END', {debounce: debounceId, parent: parentId});

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





  // const handleDragOver = ({active, over}: any) => {

  //   if (!payloadStorage) { return };
  //   if (!over) { return };

  //   // if (!over || (active.data.current.hasOwnProperty("sortable") && active.data?.current?.sortable?.containerId !== over?.data?.current?.sortable?.containerId)) { 

  //   //   if (!active.data.current.sortable) { return };
  //   //   if (over?.data?.current?.origin === "droppable") { return };

  //   //   const {chordRemove} = active.data.current.setFunc;
  //   //   const activeContainerId = active.data.current.sortable.containerId;
  //   //   chordRemove(activeContainerId, active.data.current.chord.id);

  //   //   setBlocked(false);
  //   //   // throttle(100);
  //   //   return;
  //   // };

  //   // if (over.data.current.origin === "droppable") {
      
  //   //   const {chordPush} = over.data.current.setFunc;
  //   //   const containerId = over.id.slice(0,36);

  //   //   chordPush(containerId, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
  //   //   setBlocked(true);
  //   //   throttle(100)

  //   //   return; 
  //   // };

  //   if (payloadStorage.chord) {

  //     if (debounceId) {
  //       clearTimeout(debounceId);
  //       console.log(`${debounceId} cancelled`);
  //     };

  //     console.log('Timeout started');
  //     const timeoutId: NodeJS.Timeout = setTimeout(() => {
  //       // function();
  //       console.log('Timeout completed');
  //     }, 1000);

  //     setDebounceId(timeoutId);

  //     // const {index: newIndex, items} = over.data.current.sortable;
  //     // const {chordAppend, chordPush} = over.data.current.setFunc;
  //     // const containerId = over.data.current.sortable.containerId;

  //     // const duplicateIndex = items.findIndex((id: any) => id === payloadStorage.chord.id);
      
  //     // if (duplicateIndex === -1 && !blocked) {
  //     //   // chordAppend(containerId, newIndex, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
  //     //   chordPush(containerId, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
  //     //   setBlocked(true);
  //     //   // throttle(100);
  //     //   return;
  //     // };
  //   };
  // }