import { readdirSync } from 'fs';
import { join } from 'path';
import { ProcessFilesInDirectoryOption } from 'types/utils/process_files_in_directory_type';

export default function processFilesInDirectory<R = unknown>(
  dir: string,
  handle?: (result: R) => void,
  option?: ProcessFilesInDirectoryOption
): unknown[] {
  const fileNameArr = readdirSync(dir);
  const { ignoreFile = [] } = option || {};

  return fileNameArr
    .filter((val) => !ignoreFile.includes(val))
    .map((fileName) => {
      const path = join(dir, fileName);
      let result: unknown;

      try {
        result = require(path)?.default;
        handle?.(result as R);
      } catch (err) {
        console.error(err);
      }
      return result;
    });
}
