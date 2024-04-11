import { ColDef } from '@ag-grid-community/core/dist/types/src/entities/colDef';

export type TableColumn = ColDef & {
  maxLength?: number;
};
