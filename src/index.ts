#!/usr/bin/env node
import figlet from "figlet";
import { Command } from "commander";
import listCommand from "./commands/list";
import getCommand from "./commands/get";
import chalk from "chalk";

console.log(
  chalk.green.bold(
    figlet.textSync("React Frontend Toolkit - CLI", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

const program = new Command();

program
  .name("react-frontend-toolkit")
  .version("0.0.1")
  .alias("rft-cli")
  .description(
    "A command-line tool designed to give developers quick access to a curated list of essential libraries and tools for frontend and React development, sourced from the React Frontend Toolkit repository"
  );

listCommand(program);
getCommand(program);

program.parse(process.argv);
