import { EmployeeManagementTable } from './employeeManagementTable'
import { AddEmployeeButton } from './AddEmployeeButton'
import { Box, Stack } from '@mui/material'

export function EmployeeManagement() {
    return (
        <Box>
            <Stack direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}>
                <AddEmployeeButton />
                <div>Сотрудник</div>
            </Stack>
            <Stack direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            padding={1}>
            </Stack>


            <EmployeeManagementTable />
        </Box>
    )

}
