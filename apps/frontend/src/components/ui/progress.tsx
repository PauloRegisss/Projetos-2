import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";

function Progress({ className, ...props }: ProgressPrimitive.Root.Props) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
			{...props}
		>
			<ProgressPrimitive.Track className="size-full">
				<ProgressPrimitive.Indicator className="size-full bg-primary transition-transform duration-300" />
			</ProgressPrimitive.Track>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
