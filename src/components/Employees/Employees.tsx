import { EMTable } from './emTable'
import { AddEmployeeButton } from './AddEmployeeButton'
import { Stack } from '@mui/material'

export function Employees() {
    return (
        <Stack direction="column" spacing="10px">
            <AddEmployeeButton />
            <EMTable />
        </Stack>
    )

}
