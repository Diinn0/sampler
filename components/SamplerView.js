import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import SampleItem from "../components/SampleItem";
import {ColorPicker, TriangleColorPicker} from 'react-native-color-picker'

const SamplerView = ({data, onRemove}) => {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState({name: "", color: "", uri: ""});
    const [color, setColor] = useState("#000000");

    const changeColor = (color) => {
        setItem({name: item.name, color: color, uri: item.uri});
    }

    const setModal = (item) => {
        setItem(item);
        setColor(item.color);
    }

    return (
        <View>
            <Text style={styles.header}>Samples</Text>
            <FlatGrid style={styles.center}
                itemDimension={100}
                data={data}
                renderItem={({ item }) => (<SampleItem item={item} setVisible={setVisible} setItem={setModal} />)}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{item.name}</Text>
                        <TextInput type="text" value={item.name} onChangeText={event => item.name = event} />
                        <TextInput type="text" value={item.uri} onChangeText={(event) => item.uri = event} />

                        <TriangleColorPicker
                            style={styles.color}
                            onColorSelected={color => item.color = color}
                            oldColor={color}
                        />

                        <TouchableOpacity
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => {
                                onRemove(item);
                                setVisible(!visible);
                            }}
                        >
                            <Text style={styles.textStyle}>Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setVisible(!visible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    color: { width: 200, height: 200},
    center: { margin: "auto" },
    header: {
        fontSize: 30,
        backgroundColor: "blue",
        color: "white",
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#f32121",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    info: {margin: 5},
    details: {color: "gray"},
    container: { flexDirection: "row" },
    title: { fontSize: 20 }
});


export default SamplerView;