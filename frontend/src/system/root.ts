import { SystemStateEnum } from './type/enum';
import { Setting, SystemOptions, WinAppOptions } from './type/type';
import { reactive, markRaw } from 'vue';
import { Tree } from '../util/Tree';
import { BrowserWindow } from './window/BrowserWindow';
import { OsFileWithoutContent } from './core/FileSystem';
import { Notify } from './notification/Notification';
import { Menu } from './menu/Menu';
export type RootState = ReturnType<typeof initRootState>;

function initRootState(options: SystemOptions) {
  const rootState = reactive({
    ref: undefined,
    state: SystemStateEnum.close as SystemStateEnum,
    apps: [] as Array<OsFileWithoutContent>,
    magnet: [] as Array<OsFileWithoutContent>,
    menulist: [] as Array<OsFileWithoutContent>,
    notify: [] as Array<Notify>,
    message: {
      notify: [] as Array<Notify>,
      system: [] as Array<Notify>,
    },
    windowTree: new Tree<BrowserWindow>(),
    windowOrder: new Array<BrowserWindow>(),
    windowMap: {
      Desktop: new Map<string, WinAppOptions>(),
      Magnet: new Map<string, WinAppOptions>(),
      Menulist: new Map<string, WinAppOptions>(),
      Builtin: new Map<string, WinAppOptions>(),
    } as {
      [key: string]: Map<string, WinAppOptions>;
    },
    topWindow: undefined as BrowserWindow | undefined,
    winnum: 0,
    info: {
      screenWidth: window?.innerWidth || 0,
      screenHeight: window?.innerHeight || 0,
      mouseX: 0,
      mouseY: 0,
      battery: {
        isCharging: false,
        chargeLevel: 0,
      },
      brightness: 50,
      connection: {
        effectiveType: '4g',
        rtt: 0,
        downlink: 0,
        saveData: false,
      },
    },
    options: {} as SystemOptions,
    clipboard: {} as any,
    settings: [] as Setting[],
    contextMenu: null as Menu | null,
    error: '',
  });
  options.desktop?.forEach((item) => {
    if (typeof item.window.content !== 'string') {
      item.window.content = markRaw(item.window.content);
    }
  });
  options.magnet?.forEach((item) => {
    if (typeof item.window.content !== 'string') {
      item.window.content = markRaw(item.window.content);
    }
  });
  options.menulist?.forEach((item) => {
    if (typeof item.window.content !== 'string') {
      item.window.content = markRaw(item.window.content);
    }
  });
  rootState.options = options;
  return rootState;
}

export { initRootState };
