import { useActionState } from "react";
import { FormState } from "../../api/project";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ConfirmationModalProps {
    close: () => void;
    data:any;
    warnning?:string;
    action: (prevState: FormState, formData: FormData, dispatch: AppDispatch, axiosPrivate: any, data:any) =>  Promise<FormState>;
}

const ConfirmationModal = ({ close, data, action, warnning }: ConfirmationModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const axiosPrivate = useAxiosPrivate();
    const [state, formAction, isPending] = useActionState<FormState, FormData>(
        async (_prevState: FormState, formData: FormData) => {
            return await action(_prevState, formData, dispatch, axiosPrivate, data);
        },
        { errors: {}, message: "" }
    );
    if(state?.message?.includes("successfully")){
        close()
    }
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 w-full max-w-md">
            <form action={formAction} method="POST">
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>

                {state.message && (
                    <p
                        className={`text-sm mb-4 ${
                            state.message.includes("successfully")
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {state.message}
                    </p>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {warnning?warnning:''}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={close}
                        disabled={isPending}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        No
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmationModal;