"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0">{props.children}</div>
    </div>
  )
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio }
