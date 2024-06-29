import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ProfileScreen = () => {
  const [user, setUser] = React.useState({
    usuario: "A",
    nombre: "A",
    apellidop: "Apellido1",
    apellidom: "Apellido2",
    email: "a@gmail.com",
    fechaNacimiento: "1970-09-26",
    genero: "masculino",
    departamento: "1",
    status: "activo",
    contacto: "1",
    salario: "1",
    calle: "1",
    numeroI: "1",
    numeroE: "1",
    ciudad: "1",
    estado: "1",
    cp: "1",
    rango: "admin",
  });

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  /*const apiUrl = "http://localhost:3120/getUsuario";

  //const response = await axios.post(apiUrl,)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userString);
        const response = await axios.get(apiUrl, {
          params: { email: userData.email },
        });
        setUser(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);*/

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text
          style={styles.userName}
        >{`${user.nombre} ${user.apellidop} ${user.apellidom}`}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text
          style={styles.userInfoItem}
        >{`Fecha de nacimiento: ${user.fechaNacimiento}`}</Text>
        <Text style={styles.userInfoItem}>{`Género: ${user.genero}`}</Text>
        <Text
          style={styles.userInfoItem}
        >{`Departamento: ${user.departamento}`}</Text>
        <Text
          style={styles.userInfoItem}
        >{`Ubicación: ${user.ciudad}, ${user.estado}, ${user.cp}`}</Text>
        <Text style={styles.userInfoItem}>{`Salario: ${user.salario}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20, 
    color: '#109743',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F9F8FC',
    padding: "20px",
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  userName: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#F9F8FC',
    padding: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  userInfoItem: {
    marginBottom: 5,
  },
});

export default ProfileScreen;
