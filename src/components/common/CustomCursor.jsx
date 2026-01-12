import React from 'react';
import { useCursor } from '../../hooks/useCursor';

function CustomCursor() {
  useCursor();

  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-outline"></div>
    </>
  );
}

export default CustomCursor;
