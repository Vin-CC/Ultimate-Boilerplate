import localFont from "next/font/local";

export const cal = localFont({
  src: "./CalSans-SemiBold.otf",
  variable: "--font-cal",
  weight: "600",
  display: "swap",
});

export const fontMapper = {
  "font-cal": cal.variable,
} as Record<string, string>;
