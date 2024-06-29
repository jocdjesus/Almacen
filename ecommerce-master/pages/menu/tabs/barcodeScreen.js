import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const BarcodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      const apiUrl = `http://localhost:3140/getCodigoBarras?codigoBarras=${data}`;
      try {
        const res = await axios.get(apiUrl);
        if (res.status === 200) {
          Alert.alert("Existente", "El codigo de barras ya existe");
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

  const renderCamera = () => {
    return (
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={handleBarCodeScanned}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Escanear" onPress={handleScanAgain} />
      {scanned ? null : renderCamera()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
});

export default BarcodeScannerScreen;
