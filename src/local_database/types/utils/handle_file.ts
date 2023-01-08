import { Mode, OpenMode, PathLike } from 'fs';

export interface HandleFileOption {
  path: PathLike;
  flags: OpenMode;
  mode: Mode;
}
