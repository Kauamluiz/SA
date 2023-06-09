import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import api from '../../api';
import { Entypo } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton'
import { Context } from '../../context/dataContext'
import { ImageBackground } from 'react-native';

const MedicoesSala = ({navigation}) => {

  const { state, dispatch } = useContext(Context);

  const onRegisterPressed = async () => {

    try{

      const data = await api.post('/med/register', {
          setor: name,

      });

      if(data.status === 200){

          console.log(data);
          alert(data.data.message)
          navigation.navigate('Setors')

      }else{

          console.log(data)

      }

    }catch (error){

      console.log(error);
    
    }
  }


  const [medicoes, setMedicoes] = useState({});

  useEffect(() => {
      const onScreenLoad = async () => {
          const list = await api.get('/med/findClass', {
            params: {
                idSala: state.idSetor,
              }
        });
        console.log(list.data)
          setMedicoes(list.data.medicoes)
          dispatch({type: "update", payload: false})
      }
      onScreenLoad();
  }, [state.update]
  )

  const seeReview = async (item) => {
      await dispatch({type: 'setRestaurant', payload: item});
      //navigation.navigate('RestaurantReviews');
  }

  return (
    <View style={styles.view}>
    <ImageBackground source={require('../../assets/images/setor.png')} style={styles.imageBackground}>
    
    <View onPress={onRegisterPressed} style={styles.container}>
      <CustomButton text='Voltar' onPress={() => navigation.navigate("SalasDoSetor")} />
      <FlatList
          data={medicoes}
          renderItem={({ item }) => {
              return (
                  <View style={styles.containers}>
                      <TouchableOpacity style={styles.texts} onPress={() => seeReview(item)}>
                              <Text style={styles.title}>{item.medicao} lux</Text>
                              <Text style={styles.item}>Registrado: {item.createdAt.slice(0,10)}</Text>
                      </TouchableOpacity>
                  </View>
              )
          }
          }
          keyExtractor={(item) => item.id}
      />
         </View>
    </ImageBackground>
    </View>
  )
}

export default MedicoesSala

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(136, 138, 138, 0.4)',
    alignItems: 'center',
    padding: 15,
    width: '85%',
    height: '100%'
  },
  view: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F8B500',
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    width: "100%",

  },
  text:{
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 20
  },
  containers: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    minWidth: 335
  },
  texts: {
      height: 120,
      width: '80%',
      justifyContent: "center",
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
  },
  item: {
      fontSize: 15,
      fontWeight: 'bold',
  },
  icon: {
      margin: 0
  }
})