import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import HorarioSelector from '../components/HorarioSelector'


export const BlocksDetailScreen = ({ route }) => {

    const detailInfoBlocks = route.params.infoBlocks

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.bannerBlockContainer}>
                    <Image
                        source={{ uri: detailInfoBlocks.banner }}
                        style={styles.image}
                    />
                </View>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{detailInfoBlocks.title}</Text>
            </View>
            <View>
                <Text style={styles.sectionContainer}>{detailInfoBlocks.endereco}</Text>
                <HorarioSelector dia = "segunda: 12"/>
                <HorarioSelector dia = "Terça: 13"/>
                <HorarioSelector dia = "Quarta: 14"/>
                <HorarioSelector dia = "Quinta: 15"/>
                <HorarioSelector dia = "Sexta: 16"/>
                <HorarioSelector dia = "Sábado: 17"/>
                <HorarioSelector dia = "Domingo: 18"/>
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        margin: 5 
    },
    headerContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    bannerBlockContainer: {
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
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E4E4E',
        marginTop: 10,
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 10,
    },
    textContainer: {
        alignItems: 'center'
    }
})