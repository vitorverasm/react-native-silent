import { NativeModules } from 'react-native';

type SilentType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Silent } = NativeModules;

export default Silent as SilentType;
