import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const VentasScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [scannedData, setScannedData] = useState(null); 
  const [currentQuantity, setCurrentQuantity] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);
      const apiUrl = `http://localhost:3140/getCodigoBarras?codigoBarras=${data}`;
      try {
        const res = await axios.get(apiUrl);

        if (res.status === 200) {
          setQuantity(res.data.cantidad);
          setCurrentQuantity(res.data.cantidad);
          setCounter((prevCounter) => prevCounter + 1); 
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          navigation.navigate("AltaProducto", { barcodeData: data });
        } else {
          console.error("Error al realizar la solicitud:", error);
        }
      }
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  const handleFinishScan = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de finalizar el escaneo?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const apiUrl = `http://localhost:3140/descontarCantidad`;
              const requestBody = {
                codigoBarras: scannedData, 
                cantidad: counter,
              };
  
              const response = await axios.put(apiUrl, requestBody);
              
              if (response.status === 200) {
                setCounter(0);
                setQuantity(0);
                navigation.navigate("Menu"); 
              } else {
                if (response.data.message === "Cantidad insuficiente en inventario") {
                  setCounter(0);
                  setQuantity(0);
                }
                Alert.alert("Error", response.data.message || "Error al actualizar la cantidad");
              }
            } catch (error) {
              if (error.response?.data?.message === "Cantidad insuficiente en inventario") {
                setCounter(0);
                setQuantity(0);
              }
              Alert.alert("Error", error.response?.data?.message || "Error al realizar la solicitud");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarCodeScanned}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            Productos escaneados: {counter}
          </Text>
          <Text style={styles.overlayText}>
            Cantidad en almacén: {quantity}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "blue" }]}
        onPress={handleScanAgain}
      >
        <Text style={styles.buttonText}>Nuevo escaneo</Text>
      </TouchableOpacity>
      {scanned && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={handleFinishScan}
        >
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    fontSize: 18,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default VentasScreen;
