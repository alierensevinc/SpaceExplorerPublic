import React, {useEffect, useState} from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StatusBar} from 'expo-status-bar';
import {GameEngine} from "react-native-game-engine";
import Physics from "./src/engine/physics";
import Entities from "./src/engine/entities";
import {getRandom} from "./src/util/random";

const images = {
    1: require('./assets/Space001.png'),
    2: require('./assets/Space002.png'),
    3: require('./assets/Space003.png')
}

const App = () => {
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(false);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [newHighScore, setNewHighScore] = useState(false);
    const [imageBackgroundLink, setImageBackgroundLink] = useState(require('./assets/stars.png'));

    useEffect(() => {
        setRunning(false);
        getData().then(() => {
            console.log("High Score Loaded");
        });
    }, []);

    const storeData = async (value) => {
        await AsyncStorage.setItem('@storage_Key', value.toString()).then(() => {
            getData();
        }).catch((error) => {
            console.log(error);
        });
    }

    const getData = async () => {
        await AsyncStorage.getItem('@storage_Key').then((value) => {
            if (value !== null) {
                setHighScore(Number(value));
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const startGame = () => {
        setImageBackgroundLink(images[`${getRandom(1, 3)}`]);
        setCurrentPoints(0);
        setNewHighScore(false);
        setRunning(true);
        gameEngine.swap(Entities())
    }

    const newPoint = () => {
        setCurrentPoints(currentPoints + 1);
    }

    const gameOver = () => {
        setRunning(false);
        gameEngine.stop();
        if (currentPoints > highScore) {
            setNewHighScore(true);
            storeData(currentPoints).then(() => {
                console.log("New High Score");
            });
        }
    }

    const switchEvent = (e) => {
        switch (e.type) {
            case 'new_point':
                newPoint();
                break;
            case 'game_over':
                gameOver();
                break;
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={imageBackgroundLink}
                style={styles.imageBackground}
            >
                {
                    running ?
                        <Text style={styles.point}>
                            {currentPoints}
                        </Text> : null
                }
                <GameEngine
                    ref={(ref) => {
                        setGameEngine(ref);
                    }}
                    systems={[Physics]}
                    entities={Entities()}
                    running={running}
                    style={styles.gameEngine}
                    onEvent={(e) => {
                        switchEvent(e);
                    }}
                >
                    <StatusBar style="auto" hidden={true}/>
                </GameEngine>
                {
                    !running ?
                        <>
                            <View style={styles.overlay}/>
                            <View style={styles.newGameContainer}>
                                {
                                    !newHighScore ?
                                        <Text style={styles.highScore}>
                                            {`High Score : ${highScore}`}
                                        </Text> : null
                                }
                                {
                                    newHighScore ?
                                        <Text style={styles.highScore}>
                                            {`New High Score : ${currentPoints}`}
                                        </Text> : currentPoints !== 0 ?
                                            <Text style={styles.highScore}>
                                                {`Your Score : ${currentPoints}`}
                                            </Text> : null
                                }
                                <TouchableOpacity
                                    style={styles.newGameButton}
                                    onPress={startGame}
                                >
                                    <Text style={styles.newGameButtonLabel}>
                                        START GAME
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </> : null
                }
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
    },
    gameEngine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    point: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        margin: 20,
        color: '#fff',
        zIndex: 100
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        opacity: 0.3
    },
    highScore: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
        color: '#fff',
        zIndex: 100
    },
    newGameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newGameButton: {
        backgroundColor: '#1CB5E0',
        opacity: 1,
        borderRadius: 10,
    },
    newGameButtonLabel: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        paddingVertical: 20,
        paddingHorizontal: 20
    }
});

export default App;