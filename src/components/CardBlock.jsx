import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export const CardBlock = ({ infoBlocks }) => {
    const navigation = useNavigation();

    const goToDetailPage = () => {
        navigation.navigate('BlocksDetailScreen', {
            infoBlocks: infoBlocks,
        });
    };

    return (
        <Pressable
            style={styles.mainContainer}
            android_ripple={{ color: '#00000088' }}
            onPress={goToDetailPage}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: "https://i.imgur.com/0mpg3sp.jpeg" }}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{infoBlocks.nome}</Text>
                <Text style={styles.textAddress}>{infoBlocks.complexo_esportivo.rua}, {infoBlocks.complexo_esportivo.numero}</Text>
                <Text style={styles.textAddress}>{infoBlocks.complexo_esportivo.bairro} - {infoBlocks.complexo_esportivo.cidade} - MG</Text>
                <View style={styles.priceAndRatingContainer}>
                    <Text style={styles.price}>R${infoBlocks.preco}/h</Text>
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={14} color="#FFD700" />
                        <Text style={styles.rating}>4.5</Text>
                        <Text style={styles.reviews}>(10 avaliações)</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        margin: 14,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 6,
        marginBottom: 10,
    },
    image: {
        height: 200,
        width: '100%',
    },
    textContainer: {
        marginTop: 10,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4E4E4E',
    },
    textAddress: {
        fontSize: 14,
        color: '#4E4E4E',
    },
    priceAndRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4E4E4E',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        marginLeft: 4,
        color: '#4E4E4E',
    },
    reviews: {
        fontSize: 12,
        marginLeft: 4,
        color: '#4E4E4E',
    },
});
