import Icon from "../components/icon";
import { toast } from "sonner";


export const useToast = () => {

  const success = (message: string) => {
    toast.success(message, {
      icon: (<Icon name="Check" width={20} height={20} stroke="green" />),
      className: "flex items-center justify-center gap-2 border border-2 border-green-300 rounded-lg px-6 py-2 bg-white text-green-600",
    });
  }

  const error = (message: string) => {
    toast.error(message, {
      icon: (<Icon name="X" width={24} height={24} stroke="red" />),
      className: "flex items-center justify-center gap-2 border border-2 border-red-300 rounded-lg px-6 py-2 bg-white text-red-600",
    });
  };

  const info = (message: string) => {
    toast(message, {
      icon: (<Icon name="Info" width={24} height={24} stroke="blue" />),
      className: "flex items-center justify-center gap-2 border border-2 border-blue-300 rounded-lg px-6 py-2 bg-white text-blue-600",
    });
  }

  const warning = (message: string) => {
    toast(message, {
      icon: (<Icon name="warning" width={24} height={24} stroke="yellow" />),
      className: "flex items-center justify-center gap-2 border border-2 border-yellow-300 rounded-lg px-6 py-2 bg-white text-yellow-600",
    });
  }


  return { success, error, info, warning };

}
