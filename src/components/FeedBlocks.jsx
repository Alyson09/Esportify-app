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
            const response = await axios.get('https://espority-backend.onrender.com/quadra', {
                headers: {
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOGY3ZWJiLTBlZWEtNzZkNy1hMDhmLWQ1NjdjNGUwNWJjNSIsImlhdCI6MTcxNTk4OTQ3MiwiZXhwIjoxNzE1OTkzMDEyfQ.Kezj3gSWFQyZ5RJcm5OFX31Bu7T6ilr2keeHNERVz68"
                }
            });
            setBlocks(response.data.courts);
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