# react-native-silent

Library to detect if the device is in silent mode

### WARNING!! This library only works for android, iOS still work in progress!

## Installation

```sh
npm install react-native-silent
```

## Usage

```js
import Silent from "react-native-silent";

// ...Inside your functional component

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
      if (listener) {
        Silent.removeListener(listener);
      }
    };
  }, []);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
