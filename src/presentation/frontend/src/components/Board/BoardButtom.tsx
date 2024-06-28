import React from "react";

interface AddBoardButtonProps {
	onClick: () => void;
}

const AddBoardButton = ({ onClick }: AddBoardButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center justify-center w-32 h-32 p-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg shadow-md "
		>
			+
		</button>
	);
};

export default AddBoardButton;
