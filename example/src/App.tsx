import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Silent, { SilentStatus, Mode } from 'react-native-silent';

export default function App() {
  const [isEnabledValue, setIsEnabledValue] = React.useState<boolean>(false);
  const [silentStatus, setSilentStatus] = React.useState<SilentStatus>({
    status: false,
    mode: Mode.NORMAL,
  });

  const getIsEnabled = () => {
    Silent.isEnabled().then((value) => {
      console.log('isEnabledValue changed', value);
      setIsEnabledValue(value);
    });
  };

  React.useEffect(() => {
    getIsEnabled();
    const listener = Silent.addListener((status) => {
      console.log('silentStatus changed', status);
      setSilentStatus(status);
    });
    () => {
      Silent.removeListener(listener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>isEnabled: {`${isEnabledValue}`}</Text>
        <Text style={styles.label}>
          Current Status: {`${silentStatus.status}`}
        </Text>
        <Text style={styles.label}>Current Mode: {`${silentStatus.mode}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
