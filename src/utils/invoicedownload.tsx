import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import LeagueSpantanFont from "../assets/LeagueSpartan-Regular.ttf";
import LeagueSpantanFontBold from "../assets/LeagueSpartan-Bold.ttf";

// Register a font (Optional, using standard Helvetica for now)
Font.register({
  family: "League Spartan",
  fonts: [
    { src: LeagueSpantanFont },
    { src: LeagueSpantanFontBold, fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "League Spartan",
    fontSize: 10,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    color: "#333",
  },
  // 1. Header Section (Company Left, Image Right)
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 1,
    color: "#555",
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 4,
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
    marginBottom: 15,
  },
  addressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  addressBlock: {
    textAlign: "right",
    fontSize: 9,
    lineHeight: 1.4,
    color: "#7E88C3",
  },

  // 3. The "Grid" (Payment Date, Bill To, Send To)
  gridContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  gridColumn: {
    width: "33%",
  },
  columnLabel: {
    fontSize: 9,
    color: "#7E88C3",
    marginBottom: 4,
  },
  columnValue: {
    fontSize: 10,
    fontWeight: "bold",
  },
  columnSubValue: {
    fontSize: 9,
    color: "#7E88C3",
    marginTop: 2,
  },

  // 4. The Table Container (Grey Background wrapper)
  tableWrapper: {
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    padding: 15,
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
  },

  // Columns alignment
  colItem: { width: "40%", textAlign: "left" },
  colQty: { width: "15%", textAlign: "center", color: "#6366f1" },
  colPrice: { width: "20%", textAlign: "right", color: "#6366f1" },
  colTotal: { width: "25%", textAlign: "right", fontWeight: "bold" },

  headerText: {
    fontSize: 9,
    color: "#9ca3af", // Light grey text for headers
    fontWeight: "normal",
  },
  rowText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
  },

  // 5. The Dark Footer Bar
  footerBar: {
    backgroundColor: "#252945", // The Dark Navy Blue from your screenshot
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
  postCode?: string;
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
          <Text style={[styles.invoiceValue, { color: "#7E88C3" }]}>
            #{data.invoiceId}
          </Text>
          <Text style={{ fontSize: 9, color: "#7E88C3" }}>
            {data.description}
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressBlock}>{data.addressLine1}</Text>
          <Text style={styles.addressBlock}>{data.addressLine2}</Text>
          <Text style={styles.addressBlock}>{data.postCode}</Text>
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
              style={[styles.rowText, styles.colQty, { fontWeight: "bold" }]}
            >
              {item.qty}
            </Text>
            <Text
              style={[styles.rowText, styles.colPrice, { fontWeight: "bold" }]}
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
