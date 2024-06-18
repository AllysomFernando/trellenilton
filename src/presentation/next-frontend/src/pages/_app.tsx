import { AppProps } from "next/app";
import "../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Component {...pageProps} />{" "}
			</body>
		</html>
	);
}

export default MyApp;
