import type { Position } from "./types/Position";

interface DroppedPositionProps {
  position: Position;
  onRemove: (id: number) => void;
}

export default function DroppedPosition({
  position,
  onRemove,
}: DroppedPositionProps) {
  return (
    <div
      id={`position-${position.id}`}
      className="
        relative group
        flex items-center justify-between gap-2 px-3 py-2
        bg-white border border-gray-200
        shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        rounded-xl
      "
    >
      <button
        type="button"
        className="
          absolute top-0 right-1
          opacity-0 group-hover:opacity-100
          transition-opacity
          text-gray-400 hover:text-red-500
          text-sm font-bold cursor-pointer
        "
        aria-label="Remove position"
        onClick={() => onRemove(position.id)}
      >
        ×
      </button>

      <b className="text-gray-800">{position.name}</b>

      {position.department && (
        <span className="px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700 font-semibold">
          {position.department}
        </span>
      )}
    </div>
  );
}
