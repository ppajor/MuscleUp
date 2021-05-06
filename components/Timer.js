import React,{useState, useEffect} from 'react'
import {Modal,Text,TouchableHighlight, Alert} from "react-native";

const Timer = (props) => {

    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const showTime = () => {
        return Math.floor((time / 3600)) + ":" + Math.floor((time / 60) % 60) + ":" + time % 60;
    }

    const endReading = () => {
        setTimerOn(false);
        setModalVisible(true);
    }



    return (
        <>
            <Text>{showTime()}</Text>
            <TouchableHighlight onPress={() => setTime(0)}><Text>WYCZYSC</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => setTimerOn(false)}><Text>STOP</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => setTimerOn(true)}><Text>WZNOW</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => endReading()} ><Text>ZAKOŃCZ</Text></TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Timer został wyłączony.");
                    setModalVisible(!modalVisible);
                }}
            >
             
            </Modal>
        </>
    );
}

export default Timer