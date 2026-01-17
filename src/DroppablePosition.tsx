import { useDroppable } from "@dnd-kit/core";
import { FiX } from "react-icons/fi";
import DroppedPosition from "./DroppedPositions";
import type { Position } from "./types/Position";

interface LevelDroppableProps {
  id: number;
  index: number;
  positions: Position[];
  onRemove: (id: number) => void;
}

export default function DroppablePosition({
  id,
  index,
  positions,
  onRemove
}: LevelDroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `level-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-40 bg-white m-5 flex flex-col rounded-lg p-4 transition
        ${isOver ? "ring-2 ring-red-500 bg-red-50" : ""}
      `}
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-left">Level {index + 1}</h3>
        <FiX size={20} className="cursor-pointer" />
      </div>

      <hr className="border-gray-300" />

      <div className="flex-1 flex flex-row justify-center items-center gap-5">
        {positions.map((pos) => (
          <DroppedPosition key={pos.id} position={pos} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}
