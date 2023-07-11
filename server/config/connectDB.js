import mongoose from "mongoose";
import chalk from "chalk";

const connectionToDB = async () => {
	try {
		const connectionParams = {
			dbName: process.env.DB_NAME,
		};
		const connect = await mongoose.connect(
			process.env.CONNECTION_URL,
			connectionParams
		);
		console.log(
			`${chalk.blue.bold(
				`MongoDB Connected: ${connect.connection.host}`
			)}`
		);
	} catch (error) {
		console.error(`${chalk.red.bold(`Error: ${error.message}`)}`);
		process.exit(1);
	}
};

export default connectionToDB;