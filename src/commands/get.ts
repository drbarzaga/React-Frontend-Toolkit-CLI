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

      // Convert the received category to lowercase and replace spaces with hyphens
      const userEnteredCategory = category;
      category = category.toLowerCase().replace(/ /g, "-");

      const tools = data[category];
      if (tools) {
        console.log(
          chalk.bgGray.green.bold(
            ` React Tools for ${userEnteredCategory} category: `
          )
        );
        console.log("");
        tools.forEach((tool, index) => {
          console.log(`  ${chalk.bgGray.black.bold(` ${tool.name} `)}`);
          console.log(`  Description: ${tool.description}`);
          if (tool.url) {
            console.log(`  URL: ${chalk.blue(tool.url)}`);
          }
          if (tool.github) {
            console.log(`  GitHub: ${chalk.blue(tool.github)}`);
          }
          if (tool.commandToInstall) {
            console.log(
              `  Install: ${chalk.bgGray.yellow.italic(
                ` ${tool.commandToInstall} `
              )}`
            );
          }
          if (tool.tags) {
            console.log(`Tags: ${chalk.blue(tool.tags.join(", "))}`);
          }
          if (index !== tools.length - 1) {
            console.log("");
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
