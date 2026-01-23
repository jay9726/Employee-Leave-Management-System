import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';


interface Department {
  id?: number;
  departmentName: string;
  description: string;
}


interface DepartmentState {
    department: Department[];
}

const initialState : DepartmentState = {
  department: [],
};


const departmentSlice = createSlice({
  name: 'department',
  initialState,
    reducers: {
    setDepartments(state, action: PayloadAction<Department[]>) {
        state.department = action.payload;
    },
    addDepartment(state, action: PayloadAction<Department>) {
      state.department.push(action.payload);
    },
    updateDepartment(state, action: PayloadAction<Department>) {
      const index = state.department.findIndex(dept => dept.id === action.payload.id);
        if (index !== -1) {
          state.department[index] = action.payload;
        }
    },  
    removeDepartment(state, action: PayloadAction<number>) {
      state.department = state.department.filter(dept => dept.id !== action.payload);
    },
  },
});

export const { setDepartments, addDepartment, updateDepartment, removeDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;