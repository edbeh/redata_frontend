import { Popover } from "@headlessui/react";

import { ImgInfoCircleOutline } from "assets";

interface TooltipProps {
  iconClassName?: string;
  content: string;
}

const Tooltip = ({ iconClassName, content }: TooltipProps) => {
  return (
    <Popover className="relative flex items-center">
      <Popover.Button className="outline-none">
        <ImgInfoCircleOutline
          className={
            iconClassName
              ? iconClassName
              : `text-white cursor-pointer h-[22px] w-[22px]`
          }
        />
      </Popover.Button>

      <Popover.Panel>
        <div className="absolute min-w-[200px] md:min-w-[300px] left-1/2 -translate-x-1/2 md:-translate-x-1/3 top-8 z-20 mt-2 bg-black rounded-md py-2 px-3 text-white text-sm">
          {content}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default Tooltip;
