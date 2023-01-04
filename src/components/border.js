import React from 'react';
import Matter from 'matter-js';
import {View} from 'react-native';
import {getProps} from "../util/props";

const Border = props => {
    const {widthBody, heightBody, xBody, yBody} = getProps(props);

    return (
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            opacity: 0,
            color: '#000'
        }}/>
    )
}

export default (world, label, pos, size) => {
    const initialBorder = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: label,
            isStatic: true
        }
    )
    Matter.World.add(world, initialBorder)

    return {
        body: initialBorder,
        pos,
        renderer: <Border/>
    }
}