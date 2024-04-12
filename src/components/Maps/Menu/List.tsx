import { ITransport } from '@app/models';
import { Box, Typography } from '@mui/material';

export interface IListProps {
  items: ITransport[];
}
export function List(props: IListProps) {
  const items: ITransport[] = props.items ?? [];
  return (
    <>
      {items.map((item) => (
        <Box
          key={'car' + item.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%',
          }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              gap: 1,
              p: 1,

              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography fontSize={'1rem'} color={'#373838'}>
              {item.regNumber}
            </Typography>
            <Typography fontSize={'1rem'} color={'#808080'}>
              {item.organisation?.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
