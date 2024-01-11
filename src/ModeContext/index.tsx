// The React component in this file deliberately strays from the React workflow because it features drag and drop events.
// 

import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';

import { NoteCard, NoteCardWide } from '../NoteCard';
import { Payload } from '../types';

export const ProgContext = createContext<any>(undefined);

// global variables
let debounceId: NodeJS.Timeout | undefined = undefined;
let parentId: string | undefined           = undefined;
let containerId: string | undefined        = undefined;

export const ModeContext = ({children}: {children: any}) => {

  const [payloadStorage, setPayloadStorage] = useState<Payload | undefined>(undefined);

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

    console.log(`X. Timeout cancelled.`);
  };


  const handleDragStart = ({active}: any) => {
    if (active.data.current) { 
      setPayloadStorage(active.data.current);
      parentId = active.data.current?.sortable?.containerId;
      console.log('START parentID: ', parentId);
    };
  }

  const handleDragOver = async ({active, over}: any) => {

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

    // sometimes handleDragStart has not yet finished, so wait for parentId to be set.
    if (active.data.current?.sortable) {
      while(!parentId) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    };

    containerId = over.data.current?.sortable?.containerId;
    console.log('containerId', over.data.current?.sortable?.containerId);

    // CASE 2: Item dragged around ProgBar it is already part of.
    if (containerId === parentId) { 
      console.log('CASE 2')
      return 
    };

    // CASE 3: Item dragged to another component (must be other ProgBar, no other options).
    if (debounceId) { cancelDebounce() };
    
    if (active.data.current?.origin === "progBar") {
      console.log('CASE 3', 'OVER parentID: ', parentId, 'containerID: ', containerId);
      
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
          chordAppend(containerId, index, {...payloadStorage.chord, seventh: payloadStorage.seventh, id: payloadStorage.chord.id});
        }
      );
    };
    
    return;    
  };

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
    
    const {chordSwap} = over.data.current.setFunc;
    // const containerId = over.data.current.sortable.containerId;

    console.log('END', {container: containerId});

    chordSwap(containerId, active.data.current.index, over.data.current.index);

    debounceId  = undefined; 
    parentId    = undefined; 
    containerId = undefined;
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
