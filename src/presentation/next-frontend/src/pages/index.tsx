import React from "react";
import BoardForm from "../components/Board/BoardForm";
import BoardList from "@/components/Board/BoardList";
import { authorQuoteMap, quotes } from "@/utils/data";
import { Board } from "@/components/Board/Boards";

const Home = () => {
	return (
		<div>
			<h1>My Boards</h1>
			<BoardForm onSubmit={(e) => console.log("submited", e)} />
			<BoardList />
			<Board initial={authorQuoteMap} />
		</div>
	);
};

export default Home;
