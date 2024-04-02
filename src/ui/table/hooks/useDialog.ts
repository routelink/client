import { useRef, useState } from 'react';
import { RLTableProps } from '@app/ui/table/types.ts';

export const useDialog = (props: RLTableProps) => {
  const dialogPosition = props.dialogPosition;
  const dialogRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);

  return { dialogPosition, dialogRef, showDialog, setShowDialog };
};

export type UseDialogReturn = ReturnType<typeof useDialog>;
