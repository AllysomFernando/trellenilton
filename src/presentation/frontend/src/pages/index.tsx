import React from "react";
import BoardForm from "../components/Board/BoardForm";
import BoardList from "@/components/Board/BoardList";
import { authorQuoteMap, quotes } from "@/utils/data";
import { Board } from "@/components/Board/Boards";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const Home = () => {
	return (
		<div className={inter.className}>
			<h1>My Boards</h1>
			<BoardForm onSubmit={(e) => console.log("submited", e)} />
			<BoardList />
			<Board initial={authorQuoteMap} />
		</div>
	);
};

export default Home;
