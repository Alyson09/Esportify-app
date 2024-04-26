import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { CardBlock } from './CardBlock';
import { LinkBlock } from '../Linkendpoints/Links';

export const FeedBlocks = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const response = await axios.get(LinkBlock);
            setBlocks(response.data);
        } catch (error) {
            console.error('Erro ao buscar os blocos:', error);
        }
    };

    const printBlocks = blocks.map((block) => (
        <CardBlock
            infoBlocks={block}
            key={block.id}
        />
    ));

    return (
        <ScrollView>
            {printBlocks}
        </ScrollView>
    );
};
