import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Register a font (Optional, using standard Helvetica for now)
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    color: "#333", // Dark Grey Text
  },
  // 1. Header Section (Company Left, Image Right)
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 1,
    color: "#555",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 4, // Note: support for borderRadius in PDF is limited, simpler to use square
    objectFit: "cover",
  },

  // 2. Sub-Header (Invoice Details Left, Address Right)
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  invoiceLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },
  invoiceValue: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15, // Space between ID and Date
  },
  addressBlock: {
    textAlign: "right",
    fontSize: 9,
    lineHeight: 1.4,
    color: "#666", // Light blue-ish grey in your design
  },

  // 3. The "Grid" (Payment Date, Bill To, Send To)
  gridContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  gridColumn: {
    width: "33%", // 3 Columns
  },
  columnLabel: {
    fontSize: 9,
    color: "#888", // Light label
    marginBottom: 4,
  },
  columnValue: {
    fontSize: 10,
    fontWeight: "bold",
  },
  columnSubValue: {
    fontSize: 9,
    color: "#666",
    marginTop: 2,
  },

  // 4. The Table Container (Grey Background wrapper)
  tableWrapper: {
    backgroundColor: "#f3f4f6", // Very light grey background for the whole list
    borderRadius: 8,
    overflow: "hidden", // Keeps the footer corners inside
  },
  tableHeader: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // Subtle divider
  },
  // Columns alignment
  colItem: { width: "40%", textAlign: "left" },
  colQty: { width: "15%", textAlign: "center", color: "#6366f1" }, // Indigo color for numbers
  colPrice: { width: "20%", textAlign: "right", color: "#6366f1" },
  colTotal: { width: "25%", textAlign: "right", fontWeight: "bold" },

  headerText: {
    fontSize: 9,
    color: "#9ca3af", // Light grey text for headers
    fontWeight: "bold",
  },
  rowText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
  },

  // 5. The Dark Footer Bar
  footerBar: {
    backgroundColor: "#1e1e2e", // The Dark Navy Blue from your screenshot
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountDueLabel: {
    color: "#fff",
    fontSize: 10,
  },
  amountDueValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

interface InvoiceItem {
  name: string;
  qty: number | string;
  price: number | string;
  total: number | string;
}

interface InvoiceData {
  companyName: string;
  phone?: string;
  website?: string;
  logoUrl?: string;
  invoiceId?: string | number;
  description?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  country?: string;
  date?: string;
  dueDate?: string;
  clientName?: string;
  clientAddress1?: string;
  clientAddress2?: string;
  clientAddress3?: string;
  clientCountry?: string;
  clientEmail?: string;
  items: InvoiceItem[];
  grandTotal?: number | string;
}

type InvoicePDFProps = { data: InvoiceData };

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* 1. Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.companyName}>{data.companyName}</Text>
          <Text style={styles.contactInfo}>Phone: {data.phone}</Text>
          <Text style={styles.contactInfo}>{data.website}</Text>
        </View>
        {data.logoUrl && (
          <Image src={data.logoUrl} style={styles.profileImage} />
        )}
      </View>

      {/* 2. Sub-Header (Invoice # & Address) */}
      <View style={styles.subHeaderContainer}>
        <View>
          <Text style={[styles.invoiceValue, { color: "#6366f1" }]}>
            #{data.invoiceId}
          </Text>
          <Text style={{ fontSize: 9, color: "#888" }}>{data.description}</Text>
        </View>
        <View>
          <Text style={styles.addressBlock}>{data.addressLine1}</Text>
          <Text style={styles.addressBlock}>{data.addressLine2}</Text>
          <Text style={styles.addressBlock}>{data.addressLine3}</Text>
          <Text style={styles.addressBlock}>{data.country}</Text>
        </View>
      </View>

      {/* 3. Three Column Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.gridColumn}>
          <Text style={styles.columnLabel}>Payment Date</Text>
          <Text style={styles.columnValue}>{data.date}</Text>
          <Text style={[styles.columnLabel, { marginTop: 10 }]}>
            Payment Due
          </Text>
          <Text style={styles.columnValue}>
            {data.dueDate &&
              new Date(data.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </Text>
        </View>
        <View style={styles.gridColumn}>
          <Text style={styles.columnLabel}>Bill To</Text>
          <Text style={styles.columnValue}>{data.clientName}</Text>
          <Text style={styles.columnSubValue}>{data.clientAddress1}</Text>
          <Text style={styles.columnSubValue}>{data.clientAddress2}</Text>
          <Text style={styles.columnSubValue}>{data.clientAddress3}</Text>
          <Text style={styles.columnSubValue}>{data.clientCountry}</Text>
        </View>
        <View style={styles.gridColumn}>
          <Text style={styles.columnLabel}>Send to</Text>
          <Text style={styles.columnValue}>{data.clientEmail}</Text>
        </View>
      </View>

      {/* 4. The Table Block */}
      <View style={styles.tableWrapper}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.colItem]}>Item Name</Text>
          <Text style={[styles.headerText, styles.colQty]}>QTY.</Text>
          <Text style={[styles.headerText, styles.colPrice]}>Price</Text>
          <Text style={[styles.headerText, styles.colTotal]}>Total</Text>
        </View>

        {/* Rows */}
        {data.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.rowText, styles.colItem]}>{item.name}</Text>
            <Text
              style={[styles.rowText, styles.colQty, { fontWeight: "normal" }]}
            >
              {item.qty}
            </Text>
            <Text
              style={[
                styles.rowText,
                styles.colPrice,
                { fontWeight: "normal" },
              ]}
            >
              NGN {item.price}
            </Text>
            <Text style={[styles.rowText, styles.colTotal]}>
              NGN {item.total}
            </Text>
          </View>
        ))}

        {/* 5. The Dark Footer Bar */}
        <View style={styles.footerBar}>
          <Text style={styles.amountDueLabel}>Amount Due</Text>
          <Text style={styles.amountDueValue}>NGN {data.grandTotal}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
