import React from "react";
import { useSelector } from "react-redux";
import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import roboto from "../../fonts/roboto/Roboto-Regular.ttf";
import robotoBold from "../../fonts/roboto/Roboto-Bold.ttf";
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
    marginTop: 20,
    padding: 10,
  },

  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    marginTop: 5,
    fontFamily: "Roboto",
  },

  bold: {
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export function PDF() {
  const routes = useSelector((state) => state.routeList.routes);

  const document = (
    <Document>
      <Page style={styles.page} wrap size="A4">
        {routes.map(
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
                  <Text style={styles.bold}>Дополнительно: </Text>
                  {additionalData}
                </Text>
              )}
            </View>
          )
        )}
      </Page>
    </Document>
  );

  // const [instance, updateInstance] = usePDF({ document });
  return (
    <div className="pdf">
      <PDFViewer height="100%" width="100%">
        {document}
      </PDFViewer>
    </div>
  );
}
