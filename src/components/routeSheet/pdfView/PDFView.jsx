import React from "react";
import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import Roboto from "../../../assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoBold from "../../../assets/fonts/Roboto/Roboto-Bold.ttf";
import "./PDFView.css";

Font.register({
  family: "Roboto",
  fonts: [{ src: Roboto }, { src: RobotoBold, fontWeight: 700 }],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingRight: 70,
    fontSize: 14,
    fontFamily: "Roboto",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  header: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },

  section: {
    marginTop: 20,
    paddingLeft: 10,
  },

  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  text: {
    marginTop: 5,
  },

  bold: {
    fontWeight: "bold",
  },
});

export function PDFView({ routes }) {
  const document = (
    <Document title="Маршрутный лист">
      <Page style={styles.page} wrap size="A4">
        <Text style={styles.header}>Маршрутный лист</Text>
        {routes?.map(
          ({
            id,
            name = "",
            address = "",
            contacts = "",
            additionalData = "",
          }) => (
            <View key={id} style={styles.section} wrap={false}>
              <Text style={styles.name}>{name}</Text>
              {address && (
                <Text style={styles.text}>
                  <Text style={styles.bold}>Адрес: </Text>
                  {address}
                </Text>
              )}
              {contacts && (
                <Text style={styles.text}>
                  <Text style={styles.bold}>Контакты: </Text>
                  {contacts}
                </Text>
              )}
              {additionalData && (
                <Text style={styles.text}>
                  <Text style={styles.bold}>Примечание: </Text>
                  {additionalData}
                </Text>
              )}
            </View>
          )
        )}
      </Page>
    </Document>
  );

  return (
    <div className="pdf">
      <PDFViewer>{document}</PDFViewer>
    </div>
  );
}
