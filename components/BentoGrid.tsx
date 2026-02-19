import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid max-w-7xl auto-rows-[minmax(220px,auto)] grid-cols-1 gap-8 p-8 md:grid-cols-4 md:auto-rows-[220px]",
                className
            )}
        >
            {children}
        </div>
    );
};
