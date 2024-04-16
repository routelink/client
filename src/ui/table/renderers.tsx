import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export const DateRenderer: React.FC<ICellRendererParams> = (props) => {
  return <span>{new Date(props.value).toString()}</span>;
};
