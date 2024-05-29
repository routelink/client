import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { Delete, Edit } from '@mui/icons-material';

export const DateRenderer: React.FC<ICellRendererParams> = (props) => {
  return <span>{new Date(props.value).toLocaleString()}</span>;
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
export const EditIconRenderer: React.FC<ICellRendererParams> = () => {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Edit></Edit>
    </span>
  );
};
