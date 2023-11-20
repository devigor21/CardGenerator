import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';

const Stack = createNativeStackNavigator();

const CardStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CardList" component={CardListScreen} />
    <Stack.Screen name="CardDetail" component={CardDetailScreen} />
  </Stack.Navigator>
);

export default CardStack;
