const formatSearch = (input: string) => {
		const formatted = input
			.trim()
			.replaceAll(" ", "%20")
			.replaceAll(",", "%2C");
		return formatted;
	};

export default formatSearch;
