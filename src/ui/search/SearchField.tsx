import React, { useCallback, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, SxProps, TextField, debounce } from '@mui/material';
import Typography from '@mui/material/Typography';

type SearchFieldProps = {
  onInput: (value: string) => void;
  style?: SxProps;
  count?: number;
};

export const SearchField: React.FC<SearchFieldProps> = ({ count, onInput, style }) => {
  const [hasValue, setHasValue] = useState(false);

  const showResult = hasValue && typeof count === 'number' && count >= 0;

  const onChange = useCallback(
    (value: string) => {
      onInput(value);
      setHasValue(!!value);
    },
    [onInput, setHasValue],
  );

  const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        alignItems: 'center',
        ...style,
      }}>
      <SearchIcon sx={{ ml: '5px' }} />
      <TextField
        variant="standard"
        label="Поиск"
        onChange={(event) => {
          debouncedOnChange(event.target.value.trim());
        }}
      />
      {showResult ? (
        <Typography variant="body2" sx={{ mr: '20px' }}>
          Найдено {count} записей
        </Typography>
      ) : null}
    </Box>
  );
};
