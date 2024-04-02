import { RLTableProps } from '@app/ui/table/types.ts';

export const useProperties = (props: RLTableProps) => {
  const rowKeyName = props.rowKeyName || 'id';

  const isChoiceMode = props.selectionMode !== undefined;
  const isMultipleChoice = props.selectionMode === 'multiple';

  const hasRemoveCommand = !!props.availableActions?.remove;
  const hasAddCommand = !!props.availableActions?.add;
  const hasEditCommand = !!props.availableActions?.edit;

  return {
    rowKeyName,
    isChoiceMode,
    isMultipleChoice,
    hasRemoveCommand,
    hasAddCommand,
    hasEditCommand,
  };
};
export type UsePropertiesReturn = ReturnType<typeof useProperties>;
