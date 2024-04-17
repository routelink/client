import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

export const DateRenderer: React.FC<ICellRendererParams> = (props) => {
  return <span>{new Date(props.value).toString()}</span>;
};
