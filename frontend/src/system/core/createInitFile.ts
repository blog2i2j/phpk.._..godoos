import { InitFileItem } from '../type/type';
import { join } from './Path';

export const createInitFile = async (fs: any, file: InitFileItem, path = '') => {
  if (file.type === 'file') {
    if (file.content) {
      await fs.writeFile(join(path, file.name), file.content, {
        flag: 'wx',
      });
      file.mode && (await fs.chmod(join(path, file.name), file.mode));
    }
  } else if (file.type === 'dir') {
    const tempPath = join(path, file.name);
    await fs.mkdir(tempPath);
    file.mode && (await fs.chmod(tempPath, file.mode));

    if (file.children?.length) {
      for (let i = 0; i < file.children.length; i++) {
        await createInitFile(fs, file.children[i], tempPath);
      }
    }
  }
};
