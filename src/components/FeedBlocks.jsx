import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { CardBlock } from './CardBlock';


export const FeedBlocks = () => {
    const [block, setBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/Block`);
            console.log(res.data)
            setBlocks(res.data);
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    };

    const printBlocks = block.map((block) => (
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