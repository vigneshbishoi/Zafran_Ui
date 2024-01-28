import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        width: "100%"
    },
    row: {
        flexDirection :'row',
        alignItems: 'center',
        marginHorizontal: 35,
      },
      column: {
        flexDirection: 'column',
      },
      mr12: {
        marginHorizontal: 5,
      },
      mt12: {
        marginTop: 20,
      },
      mt24: {
        marginTop: 20,
      },
      mr4: {
        marginRight: 4,
      },
      mb12: {
        marginBottom: 20,
      },
      upperCase: {
        textTransform: 'uppercase',
      },
      noBorder: {
        borderWidth: 0,
      },
      whiteBackgroundContainer: {
        // backgroundColor: colors.WHITE,
        flex: 1,
      },
      bold: {
        fontWeight: 'bold',
      },
      fill: {
        flex: 1,
      },
      capitalize: {
        textTransform: 'capitalize',
      },
      positiveText: {
        // color: colors.GREEN,
      },
      negativeText: {
        // color: colors.RED,
      },
      centerAlignedText: {
        textAlign: 'center',
      },
      centerAligned: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      highlightedInfoText: {
        fontSize: 12,
        padding: 8,
        borderRadius: 2,
      },
      // use CustomCard when background is non-white else use this style
      card: {
        // borderColor: colors.SILVER,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderRadius: 5,
        padding: 12,
      },
      underline: {
        textDecorationLine: 'underline',
      },
      greyBar: {
        height: 1,
      },
      p16: {
        padding: 16,
      },
      navigationHeaderBorder: {
        borderBottomWidth: 1,
      },
      containerStyle: {
        flexDirection: 'row',
        // borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
      },
      textInputStyle: {
        padding: 0,
        color: 'black',
      },
});
