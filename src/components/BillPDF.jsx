/* eslint-disable react/prop-types */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';


const BillPDF = ({ bill, user }) => {    

    const styles = StyleSheet.create({
        page: {
            mergin: 10,
            padding: 10
        },
        section: {
            margin: 10,
            padding: 10,
            borderBottom: '4px solid #212529',
        },
        containerFluid: {
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
            borderBottom: '4px solid #212529',
        },
        container: {
            maxWidth: '1320px',
            paddingRight: '25px',
            paddingLeft: '25px',
        },
        header: {
            width: '170px',
            backgroundColor: '#212529',
        },
        image: {
            width: '140px',
            height: '60px',
        },
        p3: {
            padding: '16px'
        },


    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.image} src="/logo.png" />
                </View>
                <View style={styles.container}>
                    <Text >A demo text</Text>
                </View>
            </Page>
        </Document>
    )
}

export default BillPDF
