import fs from 'node:fs/promises'
import path from 'node:path'
import { ROOT_CONTENT_DIR } from '@/constants'

class FSService {
  constructor(private contentPath: string) {}

  async getFileContent(fileRelativePath: string): Promise<string> {
    const filePath = path.join(ROOT_CONTENT_DIR, this.contentPath, fileRelativePath)

    try {
      await fs.access(filePath)
      return fs.readFile(filePath, {
        encoding: 'utf-8',
      })
    } catch {
      return ''
    }
  }
  async saveFileContent(
    fileRelativePath: string,
    fileContent: string,
    append: boolean = false
  ): Promise<void> {
    const filePath = path.join(ROOT_CONTENT_DIR, this.contentPath, fileRelativePath)
    const fileDir = path.dirname(filePath)

    await fs.access(fileDir).catch(() => {
      fs.mkdir(fileDir, {
        recursive: true,
      })
    })

    await fs.writeFile(filePath, fileContent, {
      encoding: 'utf-8',
      flag: append ? 'a' : 'w',
    })
  }
}

export { FSService }
