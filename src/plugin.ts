import "reflect-metadata";
import streamDeck from "@elgato/streamdeck";
import { ExecuteCommand } from "./actions/execute-command.js";

// Register the Execute Command action
streamDeck.actions.registerAction(new ExecuteCommand());

// Connect to the Stream Deck
streamDeck.connect();

// Log plugin start
streamDeck.logger.info("Shell Executor plugin started");
