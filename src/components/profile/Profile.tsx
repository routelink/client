import { Avatar, Button, Box, Container, Typography } from '@mui/material';

export default function Profile() {
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
                                <Button variant="text" sx={{color: '#68B5B9'}}>изменить аватар</Button>
                                <Button variant="text" sx={{color: '#68B5B9'}}>изменить фио</Button>
                                <Button variant="text" sx={{color: '#68B5B9'}}>изменить пароль</Button>
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
