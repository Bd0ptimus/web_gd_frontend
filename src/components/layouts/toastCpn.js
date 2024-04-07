import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastCpn () {
    const toastWarning = (message) => {
        toast.warning(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const toastSuccess = (message) => {
        toast.success(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <ToastContainer />
    )
}

ToastCpn.toastWarning = toast.warning;
ToastCpn.toastSuccess = toast.success;
export default ToastCpn;