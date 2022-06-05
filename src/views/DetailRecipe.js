import axios from "axios"
import React, { useEffect, useState } from "react"
import Ionicon from "react-native-vector-icons/Ionicons"
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"

const DetailRecipe = ({route,navigation}) => {
    const [key] = useState(route.params.key)
    const [data,setData] = useState([])
    const [author, setAuthor] = useState('')
    const [ingredinent,setIngredient] = useState([])
    const [direction,setDirection] = useState([])
    const [isStep, setIsStep] = useState(false)

    useEffect(() => {
      axios.get(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${key}`)
        .then(response => {
            setData(response.data.results)
            setAuthor(response.data.results.author.user)
            setIngredient(response.data.results.ingredient)
            setDirection(response.data.results.step)
        })
    }, [])

    return (
        <SafeAreaView>
            <ImageBackground source={{ uri: data.thumb }} style={{ 
                width: '100%',
                height: 270,
                justifyContent: 'space-between'
             }}>
            <View style={{ 
                paddingTop: 20,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
             }}>
            <View style={{ 
                flexDirection: 'row',
                alignItems: 'flex-end'
             }}>
            <Ionicon name="arrow-back-outline" color="#fff" size={35} onPress={() => navigation.goBack()} />
             <Text style={{ 
                 color: '#fff',
                 fontFamily: 'Poppins-Medium',
                 fontSize: 20
              }}> Menu Details</Text>
              </View>
              <Ionicon name="bookmark-outline" color="#fff" size={30} />
            </View>
            <View style={{ 
                paddingBottom: 35
             }}>
                <Text style={{ 
                    fontFamily: 'Poppins-Regular',
                    color: '#fff',
                    textAlign: 'center'
                 }}>{data.times}</Text>
            </View>
            </ImageBackground>

            <ScrollView showsVerticalScrollIndicator={false} style={{ 
                backgroundColor: '#fff',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                transform: [
                    {translateY: -30}
                ]
             }}>
                 <View style={{ 
                     paddingTop: 20,
                     paddingHorizontal: 20
                  }}>
                 <Text style={{ 
                     fontFamily: 'Poppins-Medium',
                     fontSize: 18,
                     color: '#000'
                  }}>{data.title}</Text>
                  <Text style={{ 
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      marginBottom: 10
                   }}>
                      {data.desc}
                  </Text>
                  <Text style={{ 
                      fontFamily: 'Poppins-Medium',
                      color: '#000',
                      fontSize: 16,
                      marginBottom: 10
                   }}>Resep dari {author}</Text>

                   <View style={{ borderWidth: 1, borderColor: '#A5BECC', marginBottom: 20 }}></View>

                   <View style={{ 
                       flexDirection: 'row',
                       justifyContent: 'space-between',
                       marginBottom: 20
                    }}>
                        <TouchableWithoutFeedback onPress={() => setIsStep(false)}>
                       <Text style={[styles.tabs, isStep ? '' : styles.tabActive]}>Bahan</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => setIsStep(true)}>
                       <Text style={[styles.tabs, isStep ? styles.tabActive : '']}>Step</Text>
                        </TouchableWithoutFeedback>
                   </View>
                   <View style={{ 
                       paddingBottom: 270
                    }}>
                   {
                       !isStep && 
                            ingredinent.map((e,index) => 
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <Text style={{ 
                                        fontFamily: 'Poppins-Regular'
                                     }}>{e}</Text>
                                </View>
                            )
                    }
                   {
                       isStep && 
                            direction.map((e,index) => 
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <Text style={{ 
                                        fontFamily: 'Poppins-Regular'
                                     }}>{e}</Text>
                                </View>
                            )
                    }
                    </View>
                 </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabs: {
        width: '47%',
        paddingVertical: 10,
        borderRadius: 11,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
    },
    tabActive: {
        backgroundColor: '#FAC213',
        color: '#fff'
    }
})

export default DetailRecipe