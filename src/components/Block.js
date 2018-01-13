import React from 'react';

const Block = ({ title, onClickFunction }) => (
  <div>
    <button
      className="btn btn-primary"
      onClick={() => onClickFunction(title)}
    >
      <h4 className="p-4">{title}</h4>
    </button>
  </div>
);

export default Block;
