import './NoteCard.css';
import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';

// export const NoteCard = ({chord}: {chord: {id: string, char: string, type: string, num: string}}) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     isDragging,
//   } = useDraggable({id: chord.id, data: {payload: chord}})

//   const dragStyle = { opacity: isDragging ? '0' : '1' }

//   return (
//     <div className={'cardContent ' + chord.type} style={dragStyle} ref={setNodeRef} {...attributes} {...listeners}>
//       <div className='cardNumber'>{chord.num}</div>
//       <div className='cardText'>{chord.char[0]}<span className='accidental'>{chord.char.slice(1,)}</span></div>
//     </div>
//   )
// }

export const NoteCard = ({chord}: {chord: {id: string, char: string, type: string, num: string}}) => {
  return (
    <div className={'cardContent ' + chord.type}>
      <div className='cardNumber'>{chord.num}</div>
      <div className='cardText'>{chord.char[0]}<span className='accidental'>{chord.char.slice(1,)}</span></div>
    </div>
  )
}
