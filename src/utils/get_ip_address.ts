import os from 'os';

/**
 * 获取当前机器的ip地址
 */
export default function getIpAddress(): string | undefined {
  const iFaces = os.networkInterfaces();

  for (const dev in iFaces) {
    const iface = iFaces[dev];

    if (!iface) continue;

    for (let i = 0; i < iface.length; i++) {
      const { family, address, internal } = iface[i];

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address;
      }
    }
  }
}
