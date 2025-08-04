import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["400"],
	subsets: ["latin"],
});

const roboto = Roboto({
	variable: "--font-roboto",
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SafelyOutside",
	description:
		"Check the times of day in which the UV index is below 1 in your location.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${poppins.variable} ${roboto.variable} antialiased min-h-screen`}
			>
				<div className="min-h-screen w-full flex flex-col justify-between relative">
					<div>
						<Header />
						{children}
					</div>
					<Footer />
				</div>

			</body>
		</html>
	);
}
