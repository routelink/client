import { EMTable } from './emTable'
import { AddEmployeeButton } from './AddEmployeeButton'
import { Stack } from '@mui/material'

export function EmployeeManagement() {
    return (
        <Stack direction="column" spacing="10px">
            <Stack direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing="10px">
                <AddEmployeeButton />
                <span>Сотрудник</span>
            </Stack>
            <EMTable />
        </Stack>
    )

}
