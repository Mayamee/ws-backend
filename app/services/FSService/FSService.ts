import fs from "fs";
import path from "path";
import { ROOT_CONTENT_DIR } from "@/constants";

class FSService {
  constructor(private contentPath: string) {}

  async getFileContent(fileRelativePath: string): Promise<string> {
    const filePath = path.join(
      ROOT_CONTENT_DIR,
      this.contentPath,
      fileRelativePath
    );

    if (!fs.existsSync(filePath)) {
      return "";
    }

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
  async saveFileContent(
    fileRelativePath: string,
    fileContent: string
  ): Promise<void> {
    const filePath = path.join(
      ROOT_CONTENT_DIR,
      this.contentPath,
      fileRelativePath
    );
    const fileDir = path.dirname(filePath);

    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, {
        recursive: true,
      });
    }

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

export { FSService };
