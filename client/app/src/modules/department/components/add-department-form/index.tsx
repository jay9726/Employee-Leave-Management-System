import { Controller, useForm } from "react-hook-form";
import { departmentSchema, type DepartmentSchemaPayload } from "../../schemas/departmentSchema";
import { departmentDefaultValues } from "../../schemas/departmentDefaultValue";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addDepartmentAPI } from "../../../../services/departmentService";
import { useNavigate } from "react-router-dom";
import { authHook } from "../../../../store/authStore";
import Loader from "../../../../components/loader";
import Icon from "../../../../components/icon";
import { useToast } from "@/hooks/toast";
import InputComponent from "@/components/input-component";

const AddDepartmentForm = () => {

    const { user } = authHook();
    const navigate = useNavigate();
    const toast = useToast();

    if (!user || user.role !== 'Admin') {
        navigate(-1);
    }

    const { handleSubmit, control, formState: { errors } } = useForm<DepartmentSchemaPayload>({
        resolver: zodResolver(departmentSchema),
        defaultValues: departmentDefaultValues
    });

    const addDepartmentMutation = useMutation({
        mutationFn: (data: DepartmentSchemaPayload) => addDepartmentAPI(data)
            .then((res) => {
                if (res.status === 201) {
                    navigate('/home/department')
                    toast.success('Department added successfully')
                } else {
                    toast.error('Something went wrong')
                }
            })
    })

    const onSubmit = async (data: DepartmentSchemaPayload) => {
        try {
            addDepartmentMutation.mutate(data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {addDepartmentMutation.isPending && <Loader />}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 my-3">

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700 ">
                        Department Name
                    </label>

                    <Controller
                        name="departmentName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputComponent
                                {...field}
                                placeholder="Enter Department Name"
                                wrapperclassName="w-full"
                                error={fieldState.error?.message}
                                leftIcon={<Icon name="Building" width={16} height={16} stroke="blue" />}
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-700">
                        Department Description
                    </label>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                rows={4}
                                placeholder="Describe the department's role and responsibilities..."
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
                            />
                        )}
                    />

                    {errors.description && (
                        <div className="flex items-center gap-1">
                            <Icon name="X" width={19} height={19} stroke="red" />
                            <small className="text-red-500 text-sm">
                                {errors.description.message}
                            </small>
                        </div>
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                    {addDepartmentMutation.isPending ? 'Adding...' : 'Add Department'}
                    <Icon name="ArrowRight" width={20} height={20} stroke="white" />
                </button>
            </form>
        </>
    );
};

export default AddDepartmentForm;