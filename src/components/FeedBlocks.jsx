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
            const res = await axios.get(`https://espority-backend.onrender.com/quadra`);
            console.log(res.data)
            setBlocks(res.data);
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    };

    const printBlocks = block.map((singleBlock) => (
        <CardBlock
            infoBlocks={singleBlock}
            key={singleBlock.id}
        />
    ));
    

    return (
        <ScrollView>
            {printBlocks}
        </ScrollView>
    );
};