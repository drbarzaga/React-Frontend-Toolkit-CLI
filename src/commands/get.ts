import { Command } from "commander";
import chalk from "chalk";
import { ToolsData } from "../../types/types";
import toolsData from "../../data/tools.json";

export default function getCommand(program: Command) {
  program
    .command("get <category>")
    .description("Get tools for a specific category")
    .alias("g")
    .action((category: string) => {
      const data = toolsData as ToolsData;
      const tools = data[category];
      if (tools) {
        console.log(chalk.green(`Tools for <${category}> category:`));
        tools.forEach((tool) => {
          console.log(chalk.blue(`\nName: ${tool.name}`));
          console.log(chalk.blue(`Description: ${tool.description}`));
          if (tool.url) {
            console.log(chalk.blue(`URL: ${tool.url}`));
          }
          if (tool.github) {
            console.log(chalk.blue(`GitHub: ${tool.github}`));
          }
          if (tool.commandToInstall) {
            console.log(
              chalk.green(`Command to install: ${tool.commandToInstall}`)
            );
          }
          if (tool.tags) {
            console.log(chalk.blue(`Tags: ${tool.tags.join(", ")}`));
          }
        });
      } else {
        console.log(
          chalk.red(
            "Category not found. Use 'list' command to see available categories"
          )
        );
      }
    });
}
