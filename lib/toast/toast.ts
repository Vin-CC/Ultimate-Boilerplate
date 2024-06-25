"use client";

import toast from "react-hot-toast";

export async function toastPromise(
  action: (resolve: any, reject: any) => void,
  globalT?: any,
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
      loading:
        options?.loading ?? globalT ? globalT("toaster.loading") : "Loading",
      success:
        options?.success ?? globalT ? globalT("toaster.success") : "Success",
      error: options?.error ?? globalT ? globalT("toaster.error") : "Error",
    }
  );
}
