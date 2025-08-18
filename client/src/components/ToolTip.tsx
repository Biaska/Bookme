import React, { useState } from 'react';

interface ToolTipProps {
  tooltipText: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ tooltipText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
        className='tool-tip'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className='tt-question-mark'>?</div>
      {isHovered && (
        <div className='tt-text-box'>
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ToolTip;