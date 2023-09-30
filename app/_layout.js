import { Slot } from 'expo-router';
import { TodosContext, TodosProvider } from '../context/TodosContext';
import { View, Text } from 'react-native';
import { colors } from '../constants/colors';
import { useContext } from 'react';
import { ToggleStyle } from '../components/ToggleStyle'

const SlotWrapper = () => {
  const { colors } = useContext(TodosContext)
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: colors.bg}}>
      <ToggleStyle />
      <Slot />
    </View>
  )
}

export default function HomeLayout() {

  return (
    <TodosProvider>
        <SlotWrapper />
    </TodosProvider>
  );
}
