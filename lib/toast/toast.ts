import toast from "react-hot-toast";

export async function toastPromise(
  action: (resolve: any, reject: any) => void,
  options?: {
    loading?: string;
    success?: string;
    error?: string;
  }
) {
  await toast.promise(
    new Promise(async (resolve, reject) => {
      action(resolve, reject);
    }),
    {
      loading: options?.loading ?? "toaster.loading",
      success: options?.success ?? "toaster.success",
      error: options?.error ?? "toaster.error",
    }
  );
}
