import { Avatar, Box, IconButton, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';

export default function AvatarBox() {
    return (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7 }}>
                <Box
                    className="info"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '12px',
                    }}>
                    <Avatar alt="Иванов И.И." src="https://mui.com/static/images/avatar/1.jpg" />
                    <Typography variant="subtitle1">Иванов И.И.</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '12px',
                    }}>
                    <IconButton aria-label="delete">
                        <CloseIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <UploadIcon />
                    </IconButton>
                </Box>
            </Box>
    );
}