"use client";

import { verifyOtp } from "@/lib/actions/auth";
import { getErrorMessage } from "@/lib/actions/error";
import { toastPromise } from "@/lib/toast/toast";
import { Input, InputProps } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const numberOfDigits = 6;

export default function OtpInput({
  identifier,
  type,
}: {
  identifier: string;
  type: string;
}) {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [error, setError] = useState<string | null>(null);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      const el = otpBoxReference.current[index + 1] as HTMLInputElement;
      el.focus();
    }
  }

  function handleBackspaceAndEnter(
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace" && !target.value && index > 0) {
      const el = otpBoxReference.current[index - 1] as HTMLInputElement;
      el.focus();
    }
    if (e.key === "Enter" && target.value && index < numberOfDigits - 1) {
      const el = otpBoxReference.current[index + 1] as HTMLInputElement;
      el.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    const paste = e.clipboardData.getData("text");
    if (paste.length === 6) {
      setOtp(paste.split(""));

      const el = otpBoxReference.current[5] as HTMLInputElement;
      el.focus();
    }
  }

  useEffect(() => {
    if (otp.join("").length === 6) {
      toastPromise(async (resolve: any, reject: any) => {
        try {
          await verifyOtp({
            otp: otp.join(""),
            identifier,
            type,
          });
          router.push("/signin");
          resolve();
        } catch (error) {
          setError(getErrorMessage(error));
          reject(error);
        }
      });
    }
  }, [otp]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 shrink-0 justify-center items-center">
        {[...Array(numberOfDigits)].map((digit, index) => (
          <OtpOneInput
            key={`otp-one-input-${index}`}
            index={index}
            value={otp[index]}
            onPaste={handlePaste}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => {
              (otpBoxReference as any).current[index] = reference;
            }}
            autoFocus={index === 0}
          />
        ))}
      </div>
      {error && <p className="text-red-500 px-8 mt-2">{error}</p>}
    </div>
  );
}

const OtpOneInput = forwardRef(
  (
    { index, ...props }: { index: number } & InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <Input
        ref={ref}
        id={`otp-input-${index}`}
        maxLength={1}
        classNames={{
          base: "!h-28 shrink-0 !w-16",
          inputWrapper: "!h-full !w-full",
          innerWrapper: "!h-full !w-full !p-0",
          mainWrapper: "!h-full !w-full",
          input: "!h-full !w-full text-5xl font-bold text-center mx-auto",
        }}
        {...props}
      />
    );
  }
);
OtpOneInput.displayName = "OtpOneInput";