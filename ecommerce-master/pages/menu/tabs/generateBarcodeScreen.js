import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, Alert } from "react-native";
import Barcode from "react-native-barcode-svg"; // Importa el componente de react-native-barcode-svg
import axios from "axios";

const GenerateBarcodeScannerScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [barcodeData, setBarcodeData] = useState(null);

  const handleSearch = () => {
    const apiUrl = "http://localhost:3140/getOneProducto";
    axios
      .get(apiUrl, {
        params: {
          item_No: searchText,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setBarcodeData(response.data);
        } else {
          console.error("Error al enviar los datos:", response.data);
          Alert.alert("Error", "No se encontró el producto.");
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        Alert.alert("Error", "Hubo un problema al realizar la búsqueda.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Busca por SKU de producto..."
      />
      <Button title="Buscar" onPress={handleSearch} />
      {barcodeData && (
        <View style={styles.barcodeContainer}>
          <Barcode value={barcodeData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  barcodeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default GenerateBarcodeScannerScreen;
