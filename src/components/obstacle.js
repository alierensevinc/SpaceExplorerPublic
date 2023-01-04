import React from 'react';
import Matter from 'matter-js';
import {Image, View} from 'react-native';
import {getProps} from "../util/props";

const Obstacle = props => {
    const {widthBody, heightBody, xBody, yBody} = getProps(props);

    return (
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
        }}>
            <Image
                style={{
                    width: widthBody,
                    height: heightBody
                }}
                source={require('../../assets/asteroid.png')}
            />
        </View>
    )
}

export default (world, label, pos, size) => {
    const initialObstacle = Matter.Bodies.circle(
        pos.x,
        pos.y,
        size.width / 2,
        {label: label}
    )
    Matter.World.add(world, initialObstacle)

    return {
        body: initialObstacle,
        pos,
        renderer: <Obstacle/>
    }
}
