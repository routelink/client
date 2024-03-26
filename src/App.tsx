import logo from './assets/logo.webp';
import { Container, Grid, Typography, Stack, Divider } from '@mui/material';

function App() {
  return (
    <>
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
            <Typography
              className="coming"
              align="center"
              variant="h5"
              component="h1"
            >
              Coming soon... 😉
            </Typography>
          </Stack>
        </Grid>
      </Container>
    </>
  );
}

export default App;
