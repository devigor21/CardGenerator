import { memo } from 'react';

import { View } from 'react-native';

const ItemSeparator = () => (
  <View
    style={{
      height: 0.5,
      width: '100%',
      backgroundColor: '#C8C8C8',
    }}
  />
);

export default memo(ItemSeparator);
