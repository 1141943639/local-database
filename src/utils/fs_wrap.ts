export default async function fsWrap<T extends unknown[]>(
  fn: (callback: (err: NodeJS.ErrnoException | null, ...arg: T) => void) => void
): Promise<T> {
  return new Promise((resolve, reject) => {
    fn((err, ...arg) => {
      if (err) return reject(err);
      resolve(arg);
    });
  });
}
