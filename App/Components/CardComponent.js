import { view, text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons }  from "@expo/vector-icons";

export default function CardComponent({title, description, icon}) {
	return(
		<TouchableOpacity style={styles.card}>
			<view style={styles.iconContainer}>
				<Ionicons name={icon} size={32} color="#1976d2" />
			</view>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = styleSheet.create({
	card: {
		width: "45%",
		alignItems: "center",
		backGroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
		elevation: 3,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2},
		shadowRadius: 4,
	},

	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#E3F2FD",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},

	textContainer: {
		flex: 1,
		alignItems: "center",
	},

	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
		color: "#1976D2",
	},

	description: {
		fontSize: 14,
		color: "#555",
	},

});