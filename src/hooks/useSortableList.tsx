import { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type UseSortableListProps<T> = {
  items: T[];
  getId: (item: T) => string;
  onReorder: (newItems: T[]) => void;
};

export function useSortableList<T>({
  items,
  getId,
  onReorder,
}: UseSortableListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!active || !over || active.id === over.id) return;

      const oldIndex = items.findIndex((i) => getId(i) === active.id);
      const newIndex = items.findIndex((i) => getId(i) === over.id);
      if (oldIndex < 0 || newIndex < 0) return;

      const reordered = arrayMove(items, oldIndex, newIndex);
      onReorder(reordered);
    },
    [items, getId, onReorder]
  );

  const DndWrapper = ({ children }: { children: React.ReactNode }) => (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={items.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );

  return { DndWrapper, activeId };
}
