import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import { COMPANIES } from '../data/mock-data'
import { useNavigation } from '@react-navigation/native'

export const CardBlock = ({ infoBlocks }) => {

    const navigation = useNavigation()


    const goToDetailPage = () => {
        navigation.navigate('BlocksDetailScreen', {
            infoBlocks: infoBlocks,
        })
    }

    return(
        <Pressable 
            style={styles.mainContainer}
            android_ripple={{ color: '#00000088' }}
            onPress={goToDetailPage}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: infoBlocks.banner }}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{infoBlocks.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        margin: 14,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
    },
    image: {
        height: 200,
        width: 400,
    },
    //texto nome da arena
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E4E4E',
    },
    //texto de nome da empresa
    textSubtitle: {
        fontWeight: 'bold', 
        color: '#49494949'
    },
    textContainer: {
        marginTop: 10,    
    }
})