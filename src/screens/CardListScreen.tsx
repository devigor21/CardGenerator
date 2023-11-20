import { FlatList, SafeAreaView, StyleSheet, LogBox } from 'react-native';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import ItemSeparator from '../components/ItemSeparator';
import CardItem from '../components/CardItem';
import { push, unshift } from '../store/cardSlice';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const CardListScreen = () => {
  const cardList = useAppSelector(state => state.card.list);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={cardList}
        renderItem={({ item }) => <CardItem card={item} />}
        keyExtractor={item => item.id}
        onStartReached={() => dispatch(unshift())}
        onEndReached={() => dispatch(push())}
        ItemSeparatorComponent={ItemSeparator}
        initialScrollIndex={1}
        initialNumToRender={1}
        getItemLayout={(_, index) => ({
          length: 120.5,
          offset: 120.5 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
