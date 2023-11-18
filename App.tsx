import React from 'react';
import StoneBag from './StoneBag';
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme




const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <StoneBag />
    </GluestackUIProvider>
  );
};

export default App;
