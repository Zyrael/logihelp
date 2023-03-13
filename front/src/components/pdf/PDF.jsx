import React from "react";
import cn from "classnames";
import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
  usePDF,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
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
            <View key={id} style={styles.section}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.text}>{address}</Text>
              <Text style={styles.text}>{contacts}</Text>
              <Text style={styles.text}>{additionalData}</Text>
            </View>
          )
        )}
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document });
  console.log(instance.blob);
  return (
    <div className="pdf">
      {instance.loading ? (
        <div>Loading</div>
      ) : (
        <PDFViewer height="100%" width="100%">
          {document}
        </PDFViewer>
      )}
    </div>
  );
}
