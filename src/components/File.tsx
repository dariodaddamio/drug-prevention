import React from "react";

interface FileProps {
  name: string;
  onRemove: () => void;
}

const File: React.FC<FileProps> = ({ name, onRemove }) => {
  return (
    <div className="bg-mymint p-2 rounded flex justify-between items-center">
      <span>{name}</span>
      <button onClick={onRemove} className="text-myblack font-montserrat">
        ×
      </button>
    </div>
  );
};

export default File;
