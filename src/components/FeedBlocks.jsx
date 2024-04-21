import { ScrollView } from 'react-native'
import { CardBlock } from './CardBlock'
import { BLOCKS } from '../data/mock-data'

export const FeedBlocks = () => {

    const printBlocks = BLOCKS.map((Blocks) => (
        <CardBlock 
            infoBlocks={Blocks}
            key={Blocks.id}
        />
    ))

    return(
        <ScrollView>
            {printBlocks}
        </ScrollView>
    )
}