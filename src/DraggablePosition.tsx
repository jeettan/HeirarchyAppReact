import { useDraggable } from "@dnd-kit/core";
import type { Position } from "./types/Position";

interface DraggablePositionProps {
  position: Position;
}


export default function DraggablePosition({ position }: DraggablePositionProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `position-${position.id}`, 
    data: { position },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      id={`position-${position.id}`} 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="w-50 h-16 border border-gray-200 rounded-lg p-4 shadow-md
                 flex items-center font-bold my-2 cursor-grab bg-white"
    >
      {position.name}
    </div>
  );
}
