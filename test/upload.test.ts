import path from "path";
import { upload } from "../src";

describe("WeTransfer Upload Function", () => {
  it(
    "should upload a file and return a URL",
    async () => {
      const filePath = path.resolve(__dirname, "file.txt");
      const result = await upload(filePath);
      expect(result).toHaveProperty("url");
      expect(typeof result.url).toBe("string");
      console.log(result);
      expect(result.url).toContain("https://we.tl");
    },
    1000 * 60 * 10
  );
});
