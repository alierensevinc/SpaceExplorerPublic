import React from 'react';
import Matter from 'matter-js';
import {Image, View} from 'react-native';
import {getProps} from "../util/props";

const Player = props => {
    const {widthBody, heightBody, xBody, yBody} = getProps(props);

    return (
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}>
            <Image
                style={{
                    width: widthBody,
                    height: heightBody
                }}
                source={require('../../assets/fighter.png')}
            />
        </View>
    )
}

export default (world, pos, size) => {
    const initialPlayer = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label: 'Player'}
    )
    Matter.World.add(world, initialPlayer)

    return {
        body: initialPlayer,
        pos,
        renderer: <Player/>
    }
}
