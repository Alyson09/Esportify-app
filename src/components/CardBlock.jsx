import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
                <Text style={styles.textTitle}>{infoBlocks.complexo_esportivo.rua}</Text>
                <Text style={styles.textTitle}>{infoBlocks.complexo_esportivo.bairro}</Text>
                <Text style={styles.textTitle}>{infoBlocks.complexo_esportivo.cidade}</Text>
                <Text style={styles.textTitle}>{infoBlocks.complexo_esportivo.numero}</Text>
                <Text style={styles.textTitle}>{infoBlocks.complexo_esportivo.cep}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        margin: 14,
        borderRadius: 6,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 4,
    },
    image: {
        height: 200,
        width: 400,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E4E4E',
    },
    textSubtitle: {
        fontWeight: 'bold', 
        color: '#49494949',
    },
    textContainer: {
        marginTop: 10,    
    }
});


