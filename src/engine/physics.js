import Matter from 'matter-js';
import {Dimensions} from "react-native";
import {getRandom} from "../util/random";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine;

    touches.forEach(t => {
        console.log(entities.Player.body);
        if (t.type === 'start') {
            if (t.event.changedTouches[0].pageX < windowWidth / 2 && entities.Player.body.position.x > 25) {
                Matter.Body.setVelocity(entities.Player.body, {
                    x: -10,
                    y: 0
                })
            } else if (t.event.changedTouches[0].pageX > windowWidth / 2 && entities.Player.body.position.x < windowWidth - 25) {
                Matter.Body.setVelocity(entities.Player.body, {
                    x: 10,
                    y: 0
                })
            }
        }
        if (t.type === 'end') {
            Matter.Body.setVelocity(entities.Player.body, {
                x: 0,
                y: 0
            })
        }
    });

    Matter.Engine.update(engine, time.delta);

    for (let i = 1; i <= 6; i++) {
        if (entities[`Obstacle${i}`].body.bounds.max.y > windowHeight + 40) {
            Matter.Body.setPosition(entities[`Obstacle${i}`].body, {
                x: getRandom(40, windowWidth - 40),
                y: -windowHeight
            });
            if (i === 3 || i === 6) {
                entities.Fall += 0.5;
            }
            dispatch({type: 'new_point'})
        }
    }

    if (entities.Player.body.position.x < 25 || entities.Player.body.position.x > windowWidth - 25) {
        Matter.Body.setVelocity(entities.Player.body, {
            x: 0,
            y: 0
        })
    }

    for (let i = 1; i <= 6; i++) {
        Matter.Body.translate(entities[`Obstacle${i}`].body, {x: 0, y: entities.Fall})
    }

    Matter.Events.on(engine, 'collisionStart', (event) => {
        if (event.source.pairs.list.length < 2 && (
            event.source.pairs.list[0].bodyB.label === 'BorderRight' ||
            event.source.pairs.list[0].bodyB.label === 'BorderLeft')) {
            Matter.Body.setVelocity(entities.Player.body, {
                x: 0,
                y: 0
            })
        } else {
            console.log("Collision");
            console.log(event.source.pairs);
            dispatch({type: 'game_over'});
        }
    })

    return entities;
}

export default Physics;
