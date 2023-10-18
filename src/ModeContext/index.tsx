import { useState, useEffect, createContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';


export const ProgContext = createContext<any>(undefined);


export const ModeContext = ({children}: {children: any}) => {

  const [dragId, setDragId] = useState<string | undefined>(undefined);


  const handleDragOver = ({active, over}: any) => {

    console.log(over);

    if (!over || !over.data.current) {
      // if object hovered over is not sortable
      return
    };

    console.log({active: active}, {over: over});

    if (active.data.current.chord) {
      // if draggable is from table, NOT from sortable

      const chord = active.data.current.chord;
      const coords = active.data.current.chordCoords;
      const {containerId: newContainerId, index: newIndex, items } = over.data.current.sortable;

      const setScalesFunc = active.data.current.setFunc;
      const setItemsFunc = over.data.current.setFunc;

      const duplicateIndex = items.findIndex((i: any) => i.id === dragId);

      if (duplicateIndex === -1) {
        // dragId not already in sortable

        setItemsFunc((items: any) => [...items, {...chord, id: dragId}]);
        setScalesFunc((prevScales: any) => {
          const newScales = {...prevScales};          
          newScales[coords.scale][coords.index].id = uuidv4();
          return newScales;
        });

      } else {
        setItemsFunc((items: any) => arrayMove(items, duplicateIndex, newIndex));
      };

      return
    };
  }


  const handleDragEnd = ({active, over}: any) => {

    if (!over) {
      if (active.data.current.sortable) {
        // remove from sortable
        console.log('remove from sortable');

        const oldIndex = active.data.current.sortable.index;
        active.data.current.setFunc((items: any) => items.slice(0, oldIndex).concat(items.slice(oldIndex + 1)));

        return
      };

      // cancel if drop invalid
      console.log('drop location invalid');
      return
    };

    // if (over.data.current.sortable) {
    if (active.data.current.sortable && over.data.current.sortable) {

      console.log('sortable -> sortable')

      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;

      over.data.current.setFunc((items: any) => arrayMove(items, oldIndex, newIndex));
    }
  };


  return (
    <DndContext
      onDragStart={({active}: any) => {setDragId(active.id)}}
      onDragCancel={() => {setDragId(undefined)}}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      {children}
      <DragOverlay>
        <div className='cardContent maj'>
          <div className='cardNumber'></div>
          <div className='cardText'></div>
        </div>
      </DragOverlay>
    </DndContext>
  );
}
