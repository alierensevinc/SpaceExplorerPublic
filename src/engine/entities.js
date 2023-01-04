import Matter from "matter-js";
import {Dimensions} from "react-native";
import Player from "../components/player";
import Border from "../components/border";
import Obstacle from "../components/obstacle";
import {getRandom} from "../util/random";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Entities = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0;

    return {
        physics: {engine, world},
        Player: Player(
            world,
            {x: windowWidth / 2, y: windowHeight - 80},
            {height: 40, width: 40}
        ),
        Obstacle1: Obstacle(
            world,
            'Obstacle1',
            {x: getRandom(20, windowWidth - 20), y: -windowHeight},
            {height: 40, width: 40}
        ),
        Obstacle2: Obstacle(
            world,
            'Obstacle2',
            {x: getRandom(20, windowWidth - 20), y: -windowHeight * 1.33},
            {height: 40, width: 40}
        ),
        Obstacle3: Obstacle(
            world,
            'Obstacle3',
            {x: getRandom(20, windowWidth - 20), y: -windowHeight * 1.66},
            {height: 40, width: 40}
        ),
        Obstacle4: Obstacle(
            world,
            'Obstacle4',
            {x: getRandom(20, windowWidth - 20), y: -windowHeight * 1.99},
            {height: 40, width: 40}
        ),
        Obstacle5: Obstacle(
            world,
            'Obstacle5',
            {x: getRandom(20, windowWidth - 20), y: -windowHeight * 2.33},
            {height: 40, width: 40}
        ),
        Obstacle6: Obstacle(
            world,
            'Obstacle6',
            {x: getRandom(20, windowWidth - 20), y: -windowHeight * 2.66},
            {height: 40, width: 40}
        ),
        Velocity: 10,
        Fall: 3,
    }
}

export default Entities;