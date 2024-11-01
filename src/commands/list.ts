import { Command } from "commander";
import { Tool, ToolsData } from "../../types/types";
import chalk from "chalk";
import { formatCategoryName, getToolsData } from "../utils";
import inquirer from "inquirer";

const showTools = async (categories: string[]) => {
  // Load the tools data
  const toolsData = await getToolsData();

  // Check if all the categories tools are empty
  const allEmpty = categories.every(
    (category) => toolsData[category as keyof typeof toolsData].length === 0
  );

  if (allEmpty) {
    console.log(
      chalk.yellow.bold(
        "No tools available for the selected categories. Please try again with different categories."
      )
    );
    return;
  }

  categories.forEach((category) => {
    const tools = toolsData[category as keyof typeof toolsData];
    if (tools.length > 0) {
      // Now list all the tools in the category
      console.log(
        `${chalk.bgGray.green.bold(` ${formatCategoryName(category)} `)}\n`
      );

      tools.forEach((tool: Tool) => {
        console.log(`  ${chalk.bgGray.black.bold(` ${tool.name} `)}`);
        console.log(`  Description: ${tool.description}`);
        console.log(`  WebSite: ${chalk.blue(tool.url)}`);
        if (tool.github) {
          console.log(`  GitHub: ${chalk.blue(tool.github)}`);
        }
        if (tool.commandToInstall) {
          console.log(
            `  Install: ${chalk.bgGray.yellow(` ${tool.commandToInstall} `)}`
          );
        }
        if (tool.tags) {
          console.log(`  Tags: ${tool.tags.join(", ")}`);
        }
        console.log("");
      });
    }
  });
};

export default function listCommand(program: Command) {
  program
    .command("list")
    .alias("l")
    .description("List all available categories of tools.")
    .action(async (options) => {
      try {
        const toolsData = await getToolsData();
        const categories = Object.keys(toolsData) as (keyof ToolsData)[];

        // Allow selecting multiple categories
        const { selectedCategories } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedCategories",
            message: "Select the categories you want to view React tools for:",
            choices: categories.map((category) => ({
              name: formatCategoryName(category as string),
              value: category,
            })),
            pageSize: 15,
          },
        ]);

        showTools(selectedCategories);
      } catch (error) {
        console.log(
          chalk.red.bold(
            "💥 Oops! An error occurred while listing the categories. Please try again.",
            error
          )
        );
      }
    });
}
