import logo from './assets/logo.webp';
import { Container, Grid, Typography, Stack, Divider } from '@mui/material';
import * as components from '@app/ui';
import { ComponentProvider } from '@app/utils/useComponents.tsx';
import TestComp from '@app/components/TestComp.tsx';

function App() {
  return (
    <>
      <ComponentProvider components={components}>

        <Container maxWidth="xl">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: '100vh' }}
          >
            <Stack
              divider={<Divider orientation="horizontal" flexItem />}
              spacing={4}
            >
              <img width={300} src={logo} className="logo" alt="RouteLink" />
            <TestComp></TestComp>
            </Stack>
          </Grid>
        </Container>
      </ComponentProvider>

    </>
  );
}

export default App;
