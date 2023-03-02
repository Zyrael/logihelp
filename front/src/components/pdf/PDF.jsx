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
import { useSelector } from "react-redux";
import roboto from "../../fonts/Roboto-Regular.ttf";
import robotoBold from "../../fonts/Roboto-Bold.ttf";
import "./PDF.css";

Font.register({
  family: "Roboto",
  fonts: [{ src: roboto }, { src: robotoBold, fontWeight: 700 }],
});

const styles = StyleSheet.create({
  page: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
  },

  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  text: {
    fontFamily: "Roboto",
  },
});

export function PDF() {
  const routes = useSelector((state) => state.routeList.routes);

  const viewRoutes = routes.map(
    ({ name = "", address = "", contacts = "", additionalData = "" }) => (
      <View style={styles.section}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{address}</Text>
        <Text style={styles.text}>{contacts}</Text>
        <Text style={styles.text}>{additionalData}</Text>
      </View>
    )
  );

  return (
    <div className="pdf">
      <PDFViewer height="700px" width="600px">
        <Document>
          <Page style={styles.page} wrap size="A4">
            {viewRoutes}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}