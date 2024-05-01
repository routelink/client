import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { Delete } from '@mui/icons-material';

export const DateRenderer: React.FC<ICellRendererParams> = (props) => {
  return <span>{new Date(props.value).toString()}</span>;
};
export const RemoveIconRenderer: React.FC<ICellRendererParams> = () => {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Delete></Delete>
    </span>
  );
};
