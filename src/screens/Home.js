import React from 'react'
import {View, Text, Button} from 'react-native'

const Home = (props) => {
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Button title='Open Camera' onPress={()=> props.navigation.navigate('Camera')}/>
    </View>
  )
}

export default Home