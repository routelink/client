import Carousel from 'react-material-ui-carousel';
import { Outlet } from 'react-router-dom';

import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Grid } from '@mui/material';

import authImage from '@app/assets/Auth/auth-image.svg';
import confirmImage from '@app/assets/Auth/confirm-image.svg';
import registerImage from '@app/assets/Auth/register-image.svg';

interface IImage {
  image: string;
  name: string;
}
const items: IImage[] = [
  {
    image: authImage,
    name: 'auth',
  },
  {
    image: confirmImage,
    name: 'confirm',
  },
  {
    image: registerImage,
    name: 'register',
  },
];
export function Auth() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <Grid
        container
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
        }}>
        <Grid item container xs={12} md={4}>
          <Outlet />
        </Grid>
        {!isMobile ? (
          <Grid sx={{ position: 'relative' }} item xs={8}>
            <Carousel
              sx={{
                position: 'relative',
                height: '100vh',
              }}
              indicators={false}
              fullHeightHover={true}
              autoPlay={true}
              navButtonsAlwaysInvisible={true}
              interval={17000}
              animation="slide"
              duration={700}>
              {items.map((item, i) => (
                <Background key={i} image={item} />
              ))}
            </Carousel>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
  // return <Outlet />;
}

interface BackgroundProps {
  image: IImage;
}
function Background(props: BackgroundProps) {
  const { image } = props;
  return (
    <Box
      id={image.name}
      sx={{
        backgroundImage: `url(${image.image})`,
        backgroundRepeat: 'space',
        backgroundSize: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}></Box>
  );
}
