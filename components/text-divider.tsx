import { Divider } from "@nextui-org/divider";

export default function TextDivider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 text-sm text-foreground-500 items-center">
      <Divider className="!shrink" />
      <span className="shrink-0">{children}</span>
      <Divider className="!shrink" />
    </div>
  );
}
