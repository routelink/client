import {
    Box,
    Container,
    Typography,
    Button,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import * as React from 'react';
import AvatarBox from './box/Avatar';


export default function Profile() {
    const [openAvatar, setOpenAvatar] = React.useState(false);
    const [openName, setOpenName] = React.useState(false);
    const handleClickOpenAvatar = () => {
        setOpenAvatar(true);
    };
    const handleCloseAvatar = () => {
        setOpenAvatar(false);
    };
    const handleSaveAvatar = () => {
        console.log('save avatar');
    };

    const handleClickOpenName = () => {
        setOpenName(true);
    };
    const handleCloseName = () => {
        setOpenName(false);
    };
    const handleSaveName = () => {
        console.log('save name');
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
                                        {<AvatarBox />}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleCloseAvatar}>отмена</Button>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleSaveAvatar} autoFocus>
                                            сохранить
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <Button variant="text" sx={{ color: '#68B5B9' }} onClick={handleClickOpenName}>изменить фио</Button>
                                <Dialog
                                    open={openName}
                                    onClose={handleCloseName}
                                    aria-labelledby="alert-dialog-title-name"
                                    aria-describedby="alert-dialog-description-name"
                                >
                                    <DialogTitle id="alert-dialog-title-name">
                                        {"изменить фио"}
                                    </DialogTitle>
                                    <DialogContent>
                                        {<AvatarBox />}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleCloseName}>отмена</Button>
                                        <Button sx={{ color: '#0E0E0E' }} onClick={handleSaveName} autoFocus>
                                            сохранить
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Button variant="text" sx={{ color: '#68B5B9' }}>изменить аватар</Button>
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
