import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const FrameCompany = ({ companyId }) => {
    const [companyInfo, setCompanyInfo] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCompanyInfo();
    }, []);

    const fetchCompanyInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Company`);
            setCompanyInfo(response.data);
        } catch (error) {
            console.error('Erro ao buscar informações da empresa:', error);
        }
    };

    const goToDetailPageCompany = () => {
        navigation.navigate('CompanyDetailScreen', {
            infoCompany: companyInfo
        });
    };

    if (!companyInfo) {
        return null; 
    }

    return (
        <Pressable
            style={styles.infoCopanyContainer}
            android_ripple={{ color: '#00000088' }}
            onPress={goToDetailPageCompany}
        >
            <View style={styles.bannerAndTextContainer}>
                <View style={styles.bannerCompanyContainer}>
                    <Image
                        source={{ uri: companyInfo.banner }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textSubtitle}>{companyInfo.name}</Text>
                </View>
            </View>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    infoCopanyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20
    },
    bannerAndTextContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    bannerCompanyContainer: {
        overflow: 'hidden',
        padding: 6,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    textContainer: {
        alignItems: 'center',
        marginLeft: 15
    },
    textSubtitle: {
        fontWeight: 'bold', 
        color: '#797979',
        textAlign: 'center',
    },
    image: {
        height: 70,
        width: 70,
    }
});