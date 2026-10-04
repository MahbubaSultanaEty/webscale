'use client';

import { Copy, CopyPlus, Trash2 } from 'lucide-react';

export default function ElementActionMenu({
  onDuplicate,
  onCopy,
  onDelete,
  position,
}) {
  if (!position) return null;

  return (
    <div
      className="
        fixed
        z-[99999]
        w-44
        rounded-lg
        border
        border-gray-200
        bg-white
        p-1
        shadow-2xl
      "
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onDuplicate}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-md
          px-3
          py-2
          text-sm
          font-medium
          text-gray-700
          hover:bg-gray-100
        "
      >
        <CopyPlus className="h-4 w-4 shrink-0" />
        <span>Duplicate</span>
      </button>

      <button
        type="button"
        onClick={onCopy}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-md
          px-3
          py-2
          text-sm
          font-medium
          text-gray-700
          hover:bg-gray-100
        "
      >
        <Copy className="h-4 w-4 shrink-0" />
        <span>Copy</span>
      </button>

      <div className="my-1 h-px bg-gray-200" />

      <button
        type="button"
        onClick={onDelete}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-md
          px-3
          py-2
          text-sm
          font-medium
          text-red-600
          hover:bg-red-50
        "
      >
        <Trash2 className="h-4 w-4 shrink-0" />
        <span>Delete</span>
      </button>
    </div>
  );
}