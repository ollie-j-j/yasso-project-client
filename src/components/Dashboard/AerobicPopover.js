import React, { useState } from 'react';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function AerobicPopover({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover>
      <PopoverHandler>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal cursor-pointer"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {text}
              <FontAwesomeIcon icon={faInfoCircle} className="ml-2" />
              </Typography>
      </PopoverHandler>
      {isOpen && (
        <PopoverContent className="z-50">
            percentage of miles that are "easy" or "steady", this value should be ~80%
        </PopoverContent>
      )}
    </Popover>
  );
}

export default AerobicPopover;



