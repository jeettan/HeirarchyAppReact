import "./index.css";
import "./App.css";
import Nav from "./Nav";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggablePosition from "./DraggablePosition";
import DroppablePosition from "./DroppablePosition";
import ModalCreatePosition from "./ModalCreatePosition";
import ModalChooseParentChild from "./ModalChooseParentChild";
import { ToastContainer, toast } from "react-toastify";
import HierarchyArrows from "./HierarchyArrows";
import type { DragEndEvent } from "@dnd-kit/core";

type Position = {
  id: number;
  name: string;
  department: string;
};

type Level = {
  id: number;
  level: number;
  currentPositions: Position[];
};

type ParentChild = {
  parentName: string;
  parentId: number | null;
  childId: number;
};

function App() {
  const [hierarchy, setHierarchy] = useState<Level[]>([
    { id: 1, level: 1, currentPositions: [] },
  ]);

  const [positionNameCurrent, setPositionNameCurrent] = useState("");
  const [department, setDepartment] = useState("");

  const [positions, setPositions] = useState<Position[]>([]);
  const [parentChild, setParentChild] = useState<ParentChild[]>([]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState(0);
  const [pendingDrop, setPendingDrop] = useState<{
    position: Position;
    levelId: number;
  } | null>(null);

  const addHierarchyLevel = () => {
    setHierarchy((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        level: prev.length + 1,
        currentPositions: [],
      },
    ]);
  };

  const deletePosition = (id: number) => {
    const ok = window.confirm(
      "Delete this position and all of its child nodes?"
    );

    if (!ok) return;

    let x = buildParentToChildrenMap(parentChild);
    let y = findIdsToDelete(id, x);
    deletePositioning(y);
  };

  const findIdsToDelete = (
    startId: number,
    parentToChildren: Map<number, number[]>
  ) => {
    const toDelete = new Set<number>();

    const visit = (id: number) => {
      if (toDelete.has(id)) return;
      toDelete.add(id);

      const children = parentToChildren.get(id);
      if (!children) return;

      for (const childId of children) {
        visit(childId);
      }
    };

    visit(startId);
    return toDelete;
  };

  const buildParentToChildrenMap = (parentChild: ParentChild[]) => {
    const map = new Map<number, number[]>();

    for (const rel of parentChild) {
      if (rel.parentId == null) continue;

      if (!map.has(rel.parentId)) {
        map.set(rel.parentId, []);
      }

      map.get(rel.parentId)!.push(rel.childId);
    }

    return map;
  };

  const deletePositioning = (idsToDelete: Set<number>) => {
    setPositions((prev) => prev.filter((p) => !idsToDelete.has(p.id)));

    setHierarchy((prev) =>
      prev.map((lvl) => ({
        ...lvl,
        currentPositions: lvl.currentPositions.filter(
          (p) => !idsToDelete.has(p.id)
        ),
      }))
    );

    setParentChild((prev) =>
      prev.filter(
        (rel) =>
          !idsToDelete.has(rel.childId) &&
          (rel.parentId == null || !idsToDelete.has(rel.parentId))
      )
    );
  };

  const addPosition = () => {
    setOpen(false);
    if (!positionNameCurrent) return;

    setPositions((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: positionNameCurrent,
        department,
      },
    ]);
  };

  const addParentChild = (parentName: { id: number | null; name: string }) => {
    if (!pendingDrop) return;

    const { position, levelId } = pendingDrop;

    if (parentName == null) {
      toast.error("No parent node selected");
      return;
    }

    setParentChild((prev) => {
      const filtered = prev.filter((pc) => pc.childId !== position.id);
      return [
        ...filtered,
        {
          parentName: parentName.name,
          parentId: parentName.id,
          childId: position.id,
        },
      ];
    });

    setPositions((prev) => prev.filter((p) => p.id !== position.id));

    setHierarchy((prev) =>
      prev.map((lvl) => {
        const cleaned = lvl.currentPositions.filter(
          (p) => p.id !== position.id
        );

        if (lvl.id === levelId) {
          return { ...lvl, currentPositions: [...cleaned, position] };
        }

        return { ...lvl, currentPositions: cleaned };
      })
    );

    setPendingDrop(null);
    setOpen2(false);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !over.id.toString().startsWith("level-")) return;

    const droppedPosition = active.data.current?.position;
    const levelId = Number(over.id.toString().replace("level-", ""));

    if (!droppedPosition) return;

    if (levelId > 1 && hierarchy[levelId - 2].currentPositions.length === 0) {
      toast.error(`There is no parent node available at level ${levelId - 1}`);
      return;
    }

    setPendingDrop({ position: droppedPosition, levelId });
    setSelectedLevel(levelId);
    setOpen2(true);
  };

  return (
    <>
      <Nav />
      {!open && !open2 ? <HierarchyArrows parentChild={parentChild} /> : ""}

      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative p-3 flex flex-col bg-gray-200 min-h-screen">
          <ToastContainer />

          <div className="flex flex-row">
            <div className="w-[80%]">
              {hierarchy.map((item, index) => (
                <DroppablePosition
                  key={item.id}
                  id={item.id}
                  index={index}
                  positions={item.currentPositions}
                  onRemove={deletePosition}
                />
              ))}
            </div>
            {/* RIGHT – positions */}
            <div className="w-[20%] flex flex-col bg-white mx-15 mt-5 p-5">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-left">Positions</h3>
                <button
                  className="w-7 h-7 border border-red-800 text-red-800 rounded-md
                  flex items-center justify-center cursor-pointer bg-white"
                  onClick={() => setOpen(true)}
                >
                  +
                </button>
              </div>

              <hr className="border-0 border-t-4 border-red-800 my-4" />

              {positions.map((pos) => (
                <DraggablePosition key={pos.id} position={pos} />
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-5 justify-center mt-6">
            <button className="button-clear" onClick={addHierarchyLevel}>
              +
            </button>
            <button className="button-colored">Save all</button>
          </div>

          <ModalCreatePosition
            open={open}
            handleClose={() => setOpen(false)}
            addPosition={addPosition}
            setPositionNameCurrent={setPositionNameCurrent}
            department={department}
            setDepartment={setDepartment}
          />

          <ModalChooseParentChild
            open={open2}
            handleClose={() => setOpen2(false)}
            hierarchy={hierarchy}
            level={selectedLevel}
            onSubmit={addParentChild}
          />
        </div>
      </DndContext>
    </>
  );
}

export default App;
