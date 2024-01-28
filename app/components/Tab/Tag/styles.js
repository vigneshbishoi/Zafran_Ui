import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    tabBar: {
        flexDirection: "row"
    },
    tab: {
        width: "auto",
        padding: 4,
    },
    viewLabel: {
        width: "auto",
        alignSelf: "flex-start",
        borderBottomWidth: 3,
        paddingBottom: 5,
        marginHorizontal: 5,
    },
});
