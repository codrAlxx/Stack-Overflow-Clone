import express from 'express'
import chalk from "chalk";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use(cors({
    origin: '*'
}));

app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API")
})


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

connectionToDB();

await connectionToDB

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)


const PORT = process.env.PORT || 5050



app.listen(PORT, () => {
	console.log(
		`${chalk.green.bold("✔")} 👍 Server running in ${chalk.yellow.bold(
			process.env.NODE_ENV
		)} mode on port ${chalk.blue.bold(PORT)}`
	);
});