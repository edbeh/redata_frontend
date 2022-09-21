import { useRef, useCallback } from "react";
import { Combobox } from "@headlessui/react";
import { useVirtual } from "react-virtual";

import { FormSelectModel } from "models";

interface VirtualizedProps {
  options: FormSelectModel[];
}

const Virtualized = ({ options }: VirtualizedProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: options?.length,
    parentRef,
    estimateSize: useCallback(() => 40, []),
  });

  return (
    <div ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
          padding: 0,
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow: any) => {
          return (
            <Combobox.Option
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                paddingRight: 12,
              }}
              className={({ active }) => (active ? `bg-faintBlue` : "")}
              value={options?.[virtualRow.index]}
            >
              {({ selected }) => {
                return (
                  <span
                    key={options?.[virtualRow.index].id}
                    className={`block truncate ${
                      selected ? "`text-white bg-blue-500 border-blue-500" : ""
                    }`}
                  >
                    {options?.[virtualRow.index].name}
                  </span>
                );
              }}
            </Combobox.Option>
          );
        })}
      </div>
    </div>
  );
};

export default Virtualized;
