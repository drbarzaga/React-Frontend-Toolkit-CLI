import { exec } from "child_process";
import { describe, it, expect } from "vitest";
import path from "path";

const cliPath = path.resolve(__dirname, "../index.ts");

function runCLI(args: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`npx ts-node ${cliPath} ${args}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}
describe("CLI Tests", () => {
  it("should display help information", async () => {
    const output = await runCLI("--help");
    expect(output).toContain("Usage:");
  });

  it("should display version information", async () => {
    const output = await runCLI("--version");
    expect(output).toMatch(/\d+\.\d+\.\d+/);
  });
});
