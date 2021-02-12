import env from "dotenv"
env.config();
import "./lib/commands"
import bot from "./config/bot"

bot.launch();