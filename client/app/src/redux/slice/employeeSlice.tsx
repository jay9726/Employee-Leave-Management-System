import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Employee {
    applicationId: number,
    fullName: string,
    email: string,
    departmentId: number,
    departmentName: string
}


interface EmployeeState {
    employee : Employee[]
} 

const initialState : EmployeeState = {
    employee : []
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployee(state, action:PayloadAction<Employee[]>){
            state.employee = action.payload
        },
        addEmployee(state, action:PayloadAction<Employee>){
            state.employee.push(action.payload)
        },
        updateEmployee(state, action:PayloadAction<Employee>){
            const index = state.employee.findIndex(emp => emp.applicationId === action.payload.applicationId)
            if(index !== -1){
                state.employee[index] = action.payload
            }
        },
        deleteEmployee(state, action:PayloadAction<number>){
            state.employee = state.employee.filter(emp => emp.applicationId !== action.payload)
        }
    }
})

export const { setEmployee, addEmployee, updateEmployee, deleteEmployee} = employeeSlice.actions
export default employeeSlice.reducer