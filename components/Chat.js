//import components from react-native
import { StyleSheet, View, Text } from 'react-native';

//import from react
import { useEffect } from 'react';

//create navigation from start page with props
const Chat = ({ route, navigation }) => {

  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []); //the empty dependency array means this will only be mounted once, ie when user enters their username

  //page content
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>Write a message</Text>
    </View>
  );
}

//page styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  }
});

export default Chat;