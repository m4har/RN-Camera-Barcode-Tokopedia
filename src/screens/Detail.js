import React from 'react'
import {View, Text} from 'react-native'

const Detail = (props) => {
  const data = props.navigation.state.params.ScanDetail
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:20}}>{data}</Text>
    </View>
  )
}

export default Detail