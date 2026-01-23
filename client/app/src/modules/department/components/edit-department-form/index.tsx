import { Controller, useForm } from "react-hook-form";
import { departmentSchema, type DepartmentSchemaPayload } from "../../schemas/departmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentDefaultValues } from "../../schemas/departmentDefaultValue";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDepartmentByIdAPI, updateDepartmentAPI } from "../../../../services/departmentService";
import { authHook } from "../../../../store/authStore";
import Loader from "../../../../components/loader";
import Icon from "../../../../components/icon";
import { useToast } from "@/hooks/toast";
import InputComponent from "@/components/input-component";


const EditDepartmentForm = () => {

    const { user } = authHook();
    const navigate = useNavigate();
    const toast = useToast();

    if (!user || user.role !== 'Admin') {
        navigate(-1);
    }

    const { id } = useParams();

    const { handleSubmit, control, reset, formState: { errors }, } = useForm<DepartmentSchemaPayload>({
        resolver: zodResolver(departmentSchema),
        defaultValues: departmentDefaultValues
    });

    const { isPending } = useQuery({
        queryKey: ['department', id],
        queryFn: () => getDepartmentByIdAPI(Number(id))
            .then((res) => {
                reset(res.data.data);
            })
            .catch((err) => {
                console.log(err)
            })
    })

    const updateDepartmentMutation = useMutation({
        mutationFn: (data: DepartmentSchemaPayload) => updateDepartmentAPI(Number(id), data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Department updated successfully')
                    navigate('/home/department')
                } else {
                    toast.error('Something went wrong')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })

    const onSubmit = async (data: DepartmentSchemaPayload) => {
        try {
            updateDepartmentMutation.mutate(data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {isPending && <Loader />}
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
                    <Icon name="Clock" width={22} height={22} stroke="white" />
                    <span> {updateDepartmentMutation.isPending ? 'Updatting...' : 'Update Department'}</span>
                </button>
            </form>
        </>
    )
}

export default EditDepartmentForm