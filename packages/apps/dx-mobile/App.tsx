import React from 'react';
import { Text, View } from 'react-native';
import styles from './AppStyles';
import { useAppVersions } from './src/api/app-versions';

export default function App(): JSX.Element {
  const appVersions = useAppVersions({ serverVersion: '', appVersion: '' });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {!appVersions.loading && (
        <Text>
          {appVersions.data.appVersion}-{appVersions.data.serverVersion}
        </Text>
      )}
    </View>
  );
}
