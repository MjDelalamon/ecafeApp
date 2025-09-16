import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QrTest() {
  const { mobile, points } = useLocalSearchParams<{
    mobile: string;
    points: string;
  }>();

  const router = useRouter();

  // Dummy points, later this can be dynamic
  const displayPoints = points ? parseInt(points, 10) : 0;

  return (
    <View style={styles.container}>
      {/* QR Code at the top */}
      <View style={styles.qrContainer}>
        {mobile ? (
          <QRCode value={mobile} size={180} />
        ) : (
          <Text style={styles.error}>No mobile number found</Text>
        )}
      </View>

      {/* Points Section */}
      <Text style={styles.pointsText}>⭐ Points: {points}</Text>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add e-Money</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Redeem Rewards</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fdfcf9",
    padding: 20,
  },
  qrContainer: {
    marginTop: 50,
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  pointsText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4e342e",
    marginBottom: 20,
  },
  buttonGroup: {
    width: "100%",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#795548",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#6d4c41",
    fontWeight: "bold",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});
