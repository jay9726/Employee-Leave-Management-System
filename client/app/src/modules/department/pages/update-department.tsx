import { authHook } from "@/store/authStore";
import Icon from "../../../components/icon";
import EditDepartmentForm from "../components/edit-department-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UpdateDepartment = () => {

    const { user } = authHook();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "Admin") {
            navigate(-1);
        }
    }, [user])

    return (
        <div className="w-full flex justify-center max-h-screen">
            <div className="w-full max-w-md my-4">
                <div className=" shadow-xl rounded-3xl p-8  ">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3">
                            <Icon name="EditBadge" width={28} height={28} stroke="white" />
                        </div>
                        <h3 className="text-center text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Update Department
                        </h3>
                        <p className="text-gray-500 text-sm mt-2">Modify department information</p>
                    </div>

                    <EditDepartmentForm />

                </div>
            </div>
        </div>
    );
};

export default UpdateDepartment;
