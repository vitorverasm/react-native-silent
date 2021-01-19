import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

type SilentNative = {
  isEnabled(): Promise<boolean>;
  registerObserver(): void;
  unregisterObserver(): void;
};

/**
 * ## MODE
 *
 * - SILENT: When device is in do not disturb mode
 * - VIBRATE: When device is in vibrate mode
 * - NORMAL: When device is in normal noisy mode
 * - MUTED: When device is with volume 0
 */
export enum Mode {
  SILENT = 'SILENT',
  VIBRATE = 'VIBRATE',
  NORMAL = 'NORMAL',
  MUTED = 'MUTED',
}

export type SilentStatus = {
  status: boolean;
  mode: Mode;
};

type SilentType = {
  isEnabled(): Promise<boolean>;
  addListener(
    callback: (event: SilentStatus) => void
  ): EmitterSubscription | null;
  removeListener(listener: EmitterSubscription): void;
};

const SilentNativeModule = NativeModules.Silent as SilentNative;

const Silent: SilentType = {
  isEnabled: () => {
    if (Platform.OS === 'android') {
      return SilentNativeModule.isEnabled();
    }
    return Promise.resolve(true);
  },
  addListener: (
    callback = (event) => {
      console.log(event);
    }
  ) => {
    if (Platform.OS === 'android') {
      SilentNativeModule.registerObserver();
      const eventEmitter = new NativeEventEmitter(NativeModules.Silent);
      const eventListener = eventEmitter.addListener('RNSilentEvent', callback);
      return eventListener;
    }
    return null;
  },
  removeListener: (listener: EmitterSubscription) => {
    if (Platform.OS === 'android') {
      SilentNativeModule.unregisterObserver();
      listener.remove();
    }
  },
};

export default Silent as SilentType;
