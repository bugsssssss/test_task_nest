import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Test",
	description: "test task for backend dev",
	icons: {
		icon: "/icon.svg",
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
