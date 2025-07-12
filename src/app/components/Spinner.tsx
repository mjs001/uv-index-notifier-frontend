"use client";

export default function Spinner() {
	return (
		<div className="flex justify-center items-center mt-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
				width="50"
				height="50"
				style={{
					shapeRendering: "auto",
					display: "block",
					background: "transparent",
				}}
			>
				<g>
					<circle
						strokeDasharray="164.93361431346415 56.97787143782138"
						r="35"
						strokeWidth="10"
						stroke="#21d19f"
						fill="none"
						cy="50"
						cx="50"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0 50 50;360 50 50"
							dur="1s"
							repeatCount="indefinite"
						/>
					</circle>
				</g>
			</svg>
		</div>
	);
}
