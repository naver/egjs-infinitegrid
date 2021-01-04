module.exports = {
	testMatch: ["<rootDir>/test/unit/**/*.spec.ts"],
	transform: {
		"^.+\\.svelte$": [
			"svelte-jester",
			{
				preprocess: true,
			},
		],
		"^.+\\.js$": "babel-jest",
		"^.+\\.ts$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "svelte"],
};
