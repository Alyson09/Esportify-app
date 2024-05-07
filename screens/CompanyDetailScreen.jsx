import { View, Text, StyleSheet } from 'react-native'
import { FrameCompany } from '../components/FrameCompany'

export const CompanyDetailScreen = ({ route }) => {

    const infoCompany = route.params.infoCompany

    return (
        <View style={styles.mainContainer}>
            <FrameCompany detailInfoCompany={infoCompany}/>
            <View style={styles.sectionContainer}>
                <Text style={styles.textTitle}>Quem Somos?</Text>
                <View style={{ padding: 8 }}>
                    <Text style={{ textAlign: 'justify' }}>{infoCompany.description}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E4E4E',
        marginTop: 10 
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 30
    }
})