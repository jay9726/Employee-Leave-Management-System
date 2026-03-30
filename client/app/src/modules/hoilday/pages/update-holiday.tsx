import UpdateHolidayForm from "../components/update-holiday-form";

const UpdateHoliday = () => {
  return (
      <div className="w-full h-full flex justify-between">
        <div className="flex w-full h-full bg-linear-to-br from-blue-400 via-blue-400 to-purple-400 items-center justify-center p-12">
          <div className="flex flex-col gap-2 text-white text-center">
            <h1 className="text-4xl font-bold">Update Company Holiday</h1>
            <p className="text-lg ">
              Manage your company holidays easily
            </p>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center bg-gray-50 p-10">
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Update Holiday Details
            </h2>

            <UpdateHolidayForm />

          </div>
        </div>
      </div>
  );
};

export default UpdateHoliday;