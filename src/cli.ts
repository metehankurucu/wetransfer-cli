#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs";

import { upload } from "./index.js";

program.version("1.0.0").description("WeTransfer CLI");

program
  .command("upload")
  .description("Upload a file")
  .argument("<file>", "File to upload")
  .action(async (file) => {
    const spinner = ora("Uploading file").start();
    try {
      const fullPath = `${process.cwd()}/${file}`;

      const isExist = fs.existsSync(fullPath);

      if (!isExist) {
        spinner.fail("File does not exist: " + fullPath);
        return;
      }

      const { url } = await upload(fullPath);

      spinner.succeed("File uploaded: " + chalk.blueBright(url));
    } catch (error) {
      spinner.fail("Error..." + error);
    }
  });

program.parse(process.argv);
