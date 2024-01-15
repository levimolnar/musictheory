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

  const debounce = (id: string, func: Function, ms: number = 200) => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      func();

      debounceId = undefined;
    }, ms);

    debounceId = timeoutId;
    parentId = id;
  };

  const cancelDebounce = () => {
    clearTimeout(debounceId);
    debounceId = undefined;
  };


  const [payloadStorage, setPayloadStorage] = useState<Payload | undefined>(undefined);

  const handleDragStart = ({active}: any) => {
    if (active.data.current) { 
      setPayloadStorage(active.data.current);
      parentId = active.data.current?.sortable?.containerId;
    };
  }

  const handleDragOver = async ({active, over}: any) => {

    if (!payloadStorage) { return };

    // CASE 1: Item dragged out of dnd-kit component (must be ProgBar, no other options).
    if (!over) { 

      cancelDebounce();
      containerId = undefined;
      parentId = undefined;

      // ensure item is currently child of ProgBar before removing.
      if (active.data.current.origin === "progBar") {
        const {chordRemove} = active.data.current.setFunc;
        const activeContainerId = active.data.current?.sortable?.containerId;
        chordRemove(activeContainerId, active.data.current.chord.id);

        parentId = undefined;
      };
      return;
    }

    // wait for parentId to be set (sometimes handleDragStart has not finished yet).
    if (active.data.current?.sortable) {
      while(!parentId) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    };

    containerId = over.data.current?.sortable?.containerId;

    // CASE 2: Item dragged around ProgBar it has already entered (but is not necessarily child of).
    if (containerId === parentId) { 
      return 
    };

    // CASE 3: Item dragged to NEW ProgBar.
    if (debounceId) { 
      cancelDebounce();
    };

    // 3a) remove from old progBar
    if (active.data.current?.origin === "progBar") {
      
      const {chordRemove} = active.data.current.setFunc;
      const activeContainerId = active.data.current?.sortable?.containerId;
      chordRemove(activeContainerId, active.data.current.chord.id);

      parentId = undefined;
    };

    const {items, index} = over.data.current.sortable;
    const {chordAppend} = over.data.current.setFunc;

    const duplicateIndex = items.findIndex((id: any) => id === payloadStorage.chord.id);

    // 3b) append to new progBar with debounce.
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

    if (!active.data.current) { return }; // occurs in between progBars with no index selected
    if (!over) { return };
    if (debounceId) { 
      cancelDebounce();
      return ;
    };
    
    const {chordSwap} = over.data.current.setFunc;
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
