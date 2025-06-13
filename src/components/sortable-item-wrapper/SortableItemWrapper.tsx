import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

/**
 * SortableItemWrapper component
 *
 * This component wraps sortable items in a drag-and-drop interface.
 * It provides a drag handle and styles for the sortable item.
 *
 * @param {string} id - The unique identifier for the sortable item.
 * @param {React.ReactNode} children - The content to be displayed inside the sortable item.
 *
 * @returns {JSX.Element} The rendered sortable item with drag handle.
 */
export const SortableItemWrapper = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Box
        display="flex"
        alignItems="start"
        sx={{
          height: "100%",
          position: "relative",
        }}
      >
        {/* Drag handle */}
        <Box
          {...listeners}
          {...attributes}
          sx={{
            top: 20,
            right: 20,
            zIndex: 2,
            cursor: "grab",
            color: "text.secondary",
            position: "absolute",
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>

        {/* Report content */}
        <Box p={2} width="100%">
          {children}
        </Box>
      </Box>
    </div>
  );
};
