import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  ghanaStripe: {
    height: 5,
    flexDirection: "row",
  },
  red: { flex: 1, backgroundColor: "#CE1126" },
  gold: { flex: 1, backgroundColor: "#FCD116" },
  green: { flex: 1, backgroundColor: "#006B3F" },
})

export function GenerateReportPDF({ report, updates }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.ghanaStripe}>
          <View style={styles.red} />
          <View style={styles.gold} />
          <View style={styles.green} />
        </View>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
          style={styles.logo}
        />
        <Text style={styles.header}>Ghana Report</Text>
        <View style={styles.section}>
          <Text>Report ID: {report.id}</Text>
          <Text>Status: {report.status}</Text>
          <Text>Submitted on: {new Date(report.date_submitted).toLocaleDateString()}</Text>
          <Text>Category: {report.category}</Text>
          <Text>Description: {report.description}</Text>
          <Text>Location: {report.location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Updates</Text>
          {updates.map((update, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>Status: {update.status}</Text>
              <Text>Date: {new Date(update.date_added).toLocaleDateString()}</Text>
              <Text>Message: {update.message}</Text>
            </View>
          ))}
        </View>
        <View style={styles.ghanaStripe}>
          <View style={styles.red} />
          <View style={styles.gold} />
          <View style={styles.green} />
        </View>
      </Page>
    </Document>
  )
}

