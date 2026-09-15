import type { SVGProps } from "react";

export default function NexusIcon({
	width = 512,
	height = 512,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width={width}
			height={height}
			fill="none"
			aria-label="Nexus"
			role="img"
			{...props}
		>
			<defs>
				<linearGradient
					id="nexus-icon-background"
					x1="72"
					y1="34"
					x2="447"
					y2="480"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#B6FF00" />
					<stop offset="1" stopColor="#8CF000" />
				</linearGradient>
				<filter
					id="nexus-icon-shadow"
					x="56"
					y="139"
					width="400"
					height="238"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feDropShadow
						dx="0"
						dy="12"
						stdDeviation="10"
						floodColor="#5D9B00"
						floodOpacity="0.4"
					/>
				</filter>
			</defs>

			<rect
				x="4"
				y="4"
				width="504"
				height="504"
				rx="108"
				fill="url(#nexus-icon-background)"
			/>
			<g filter="url(#nexus-icon-shadow)">
				<path
					d="M159 345C113.6 345 79 306.4 79 254.5C79 202.6 113.6 153 159 153C184.5 153 204.5 164.4 224.5 184.4L340.7 300.6C350.3 310.2 360.6 314.5 371.7 314.5C390.4 314.5 406 289.7 406 254.5C406 219.3 390.4 194.5 371.7 194.5C360.6 194.5 350.3 198.8 340.7 208.4L292.5 256.6L252.5 216.6L300.7 168.4C320.7 148.4 344.1 137 371.7 137C417.1 137 451 191.6 451 254.5C451 317.4 417.1 372 371.7 372C344.1 372 320.7 360.6 300.7 340.6L184.5 224.4C176.9 216.8 168.9 212.5 159 212.5C140.3 212.5 124 231.3 124 254.5C124 277.7 140.3 296.5 159 296.5C168.9 296.5 176.9 292.2 184.5 284.6L207.5 261.6L247.5 301.6L224.5 324.6C204.5 344.6 184.5 345 159 345Z"
					fill="#151515"
				/>
			</g>
		</svg>
	);
}
