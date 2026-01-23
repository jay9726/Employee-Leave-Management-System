import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LeaveRequest {
    leaveRequestId: number;
    applicationId: number;
    departmentId: number;
    fromDate: string;
    toDate: string;
    reason: string;
    status: string;
    adminComment: string;
    userName: string;
    departmentName: string;
}

interface LeaveRequestState {
    leaveRequest: LeaveRequest[];

}

const initialState: LeaveRequestState = {
    leaveRequest: [],
};

const leaveRequestSlice = createSlice({
    name: "leaveRequest",
    initialState,
    reducers: {
        setLeaveRequests(state, action: PayloadAction<LeaveRequest[]>) {
            state.leaveRequest = action.payload;
        },
        addLeaveRequest(state, action: PayloadAction<LeaveRequest>) {
            state.leaveRequest.push(action.payload);
        },
        updateLeaveReqeust(state, action: PayloadAction<LeaveRequest>){
            const index = state.leaveRequest.findIndex(lr => lr.leaveRequestId === action.payload.leaveRequestId);
            if(index !== -1){
                state.leaveRequest[index] = action.payload;
            }
        }
    },
});

export const { setLeaveRequests, addLeaveRequest, updateLeaveReqeust } = leaveRequestSlice.actions;
export default leaveRequestSlice.reducer;
