import { Mode, open, OpenMode, PathLike, write, fsync, close } from 'fs';
import fsWrap from './fs_wrap';

export default class HandleFile {
  fd?: number;
  constructor() {}

  async open(
    path: PathLike,
    flags?: OpenMode | undefined,
    mode?: Mode | undefined | null
  ): Promise<[number]> {
    const res = await fsWrap<[number]>((callback) =>
      open(path, flags, mode, callback)
    );
    const [fd] = res;
    this.fd = fd;
    return res;
  }

  async write<T extends NodeJS.ArrayBufferView | string>({
    data,
    offset,
    length,
    position,
    encoding,
  }: {
    data: T;
    offset?: number | undefined | null;
    length?: number | undefined | null;
    position?: number | undefined | null;
    encoding?: BufferEncoding | undefined | null;
  }): Promise<[number, string] | [number, NodeJS.ArrayBufferView]> {
    if (!this.fd) {
      this.throwNoFdError();
    }

    if (typeof data === 'string') {
      return await fsWrap<[number, string]>((callback) =>
        write(this.fd as number, data, position, encoding, callback)
      );
    } else {
      return await fsWrap<[number, NodeJS.ArrayBufferView]>((callback) =>
        write(this.fd as number, data, offset, length, position, callback)
      );
    }
  }

  throwNoFdError(): void {
    throw new Error('找不到fd, 请先调用open方法获取fd');
  }

  async fsync(): Promise<ReturnType<typeof fsync>> {
    if (!this.fd) {
      this.throwNoFdError();
    }

    await fsWrap((callback) => fsync(this.fd as number, callback));
  }

  async close(): Promise<ReturnType<typeof close>> {
    if (!this.fd) {
      this.throwNoFdError();
    }

    await fsWrap((callback) => close(this.fd as number, callback));
  }
}
