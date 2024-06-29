import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AltaProductoScreen = ({ route, navigation }) => {
  const { barcodeData } = route.params;
  const [nombreOriginal, setNombreOriginal] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");

  const handleGuardar = () => {
    const datos = {
      barcodeData: barcodeData,
      nombreOriginal: nombreOriginal,
      nombre: nombre,
      categoria: categoria,
    };
    const apiUrl = "http://localhost:3140/addproducto";

    axios
      .post(apiUrl, datos)
      .then((response) => {
        navigation.navigate("Menu");
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        Escaneaste el código de barras: {barcodeData}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre original del producto"
        value={nombreOriginal}
        onChangeText={setNombreOriginal}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Contenedor para el Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Categoría:</Text>
        <Picker
          style={styles.picker}
          selectedValue={categoria}
          onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
        >
          <Picker.Item label="Selecciona una categoría..." value="" />
          <Picker.Item label="Electrónica" value="Electrónica" />
          <Picker.Item label="Ropa" value="Ropa" />
          <Picker.Item label="Limpieza" value="Limpieza" />
          <Picker.Item label="Sextoy" value="Sextoy" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>

      {/*<TextInput
        style={styles.input}
        placeholder="Fecha de Vencimiento"
        value={fechaVencimiento}
        onChangeText={setFechaVencimiento}
        keyboardType="numeric"
  />

      <TextInput
        style={styles.input}
        placeholder="Marca del producto"
        value={marca}
        onChangeText={setMarca}
      />*/}
      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerLabel: {
    flex: 1,
    marginRight: 10,
  },
  picker: {
    flex: 2,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#F9F8FC",
  },
  button: {
    backgroundColor: "#5BC777",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default AltaProductoScreen;
