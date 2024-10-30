import fs from "fs";
import path from "path";
import chalk from "chalk";

// This function is used to capitalize the first letter of a string
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// This function is used to format a category name to be displayed in the terminal
export function formatCategoryName(category: string): string {
  //1. Replace all underscores or dashes with spaces
  //2. Capitalize the first letter of each word
  //3. Join the words back together
  return category
    .replace(/_|-/g, " ")
    .split(" ")
    .map(capitalizeFirstLetter)
    .join(" ");
}

// This function is used to get the tools data from the tools.json file
export const getToolsData = async () => {
  const toolsPath = path.join(__dirname, "../data/tools.json");
  try {
    const tools = JSON.parse(fs.readFileSync(toolsPath, { encoding: "utf-8" }));
    return tools;
  } catch (error) {
    console.log(
      chalk.red.bold(
        "💥 Oops! An error occurred while listing the categories. Please try again.",
        error
      )
    );
  }
};
