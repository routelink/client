import {
    Box,
    Container,
    Typography,
    Button,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';

export default function Profile() {
    const [openAvatar, setOpenAvatar] = React.useState(false);
    const [openFullName, setOpenFullName] = React.useState(false);
    const [fullName, setFullName] = React.useState('Иванов И.И.');

    const handleClickOpenAvatar = () => {
        setOpenAvatar(true);
    };
    const handleCloseAvatar = () => {
        setOpenAvatar(false);
    };
    const handleSaveAvatar = () => {
        console.log('save avatar');
    };

    const handleClickOpenFullName = () => {
        setOpenFullName(true);
    };
    const handleCloseFullName = () => {
        setOpenFullName(false);
    };
    const handleSaveFullName = () => {
        console.log('save full name:', fullName);
    };

    return (
        <Box>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                    }}>
                    <Typography variant="h5">Профиль</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            background: '#FFFFFF',
                            border: '1px solid #CFCFCF',
                            p: '40px',
                        }}>
                        <Typography variant="h6" sx={{ color: '#333333' }}>
                            Личная информация
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: '38px',
                                }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        gap: '12px',
                                    }}>
                                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                    <Typography variant="subtitle1">Иванов И.И.</Typography>
                                </Box>
                                <Typography variant="subtitle1">iivanov@gmail.com</Typography>
                            </Box>
                            <Box
                                sx={{

                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: '50px',
                                }}>
                                <Button variant="text" sx={{ color: '#68B5B9' }} onClick={handleClickOpenAvatar}>изменить аватар</Button>
                                <Dialog
                                    open={openAvatar}
                                    onClose={handleCloseAvatar}
                                    aria-labelledby="alert-dialog-title-avatar"
                                    aria-describedby="alert-dialog-description-avatar"
                                >
                                    <DialogTitle id="alert-dialog-title-avatar">
                                        {"Изменить аватар"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7 }}>
                                            <Box
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
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleCloseAvatar}>отмена</Button>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleSaveAvatar} autoFocus>
                                            сохранить
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <Button variant="text" sx={{ color: '#68B5B9' }} onClick={handleClickOpenFullName}>Изменить ФИО</Button>
                                <Dialog
                                    open={openFullName}
                                    onClose={handleCloseFullName}
                                    aria-labelledby="alert-dialog-title-name"
                                    aria-describedby="alert-dialog-description-name"
                                >
                                    <DialogTitle id="alert-dialog-title-name">
                                        {"Изменить ФИО"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            id="text-full-name"
                                            defaultValue="Иванов И.И."
                                            variant="standard"
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleCloseFullName}>отмена</Button>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleSaveFullName} autoFocus>
                                            сохранить
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Button variant="text" sx={{ color: '#68B5B9' }}>Изменить аватар</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #CFCFCF',
                            height: '661px',
                            p: '40px',
                        }}>
                        <Typography variant="h6" sx={{ color: '#333333' }}>
                            Основные параметры
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
