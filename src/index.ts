#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import listCommand from "./commands/list";
import getCommand from "./commands/get";

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
