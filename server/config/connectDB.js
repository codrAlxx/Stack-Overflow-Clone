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
		// console.log(process.env.CONNECTION_URL)
			console.log(connect.connection._connectionString)
		console.log(
			`${chalk.blue.bold(
				`MongoDB Hello Connected: ${connect.connection.host}`
			)}`
		);
	} catch (error) {
		console.error(`${chalk.red.bold(`Error: ${error.message}`)}`);
		process.exit(1);
	}
};

export default connectionToDB;