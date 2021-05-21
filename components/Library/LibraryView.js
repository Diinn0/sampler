import React, {useState} from "react";
import {FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MusicItem from "../SampleItem";

const LibraryView = ({libraryList, onRemove}) => {
    const [visible, setVisible] = useState(false);

    const [item, setItem] = useState({title: "", artist: "", artwork: "", genre: "", year: "", id: ""});

    return (
        <View>
            <Text style={styles.header}>LibraryView</Text>
            <FlatList
                data={libraryList}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                            setItem(item);
                        }}
                    >
                        <MusicItem item={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
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
                        <Text style={styles.modalText}>{item.title}</Text>
                        <Image style={styles.image} source={{uri: item.artwork}}/>
                        <View style={styles.info}>
                            <Text>Artist: <Text style={styles.details}>{item.artist}</Text></Text>
                            <Text>Genre: <Text style={styles.details}>{item.genre}</Text></Text>
                            <Text>Release Date: <Text style={styles.details}>{item.year.slice(0,4)}</Text></Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => {
                                onRemove(item);
                                setVisible(!visible);
                            }}
                        >
                            <Text style={styles.textStyle}>Remove from Library</Text>
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
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        backgroundColor: "tomato",
        color: "white",
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        elevation: 5
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
    image: {width: 100, height: 100, margin: 5, borderRadius: 50},
    info: {margin: 5},
    details: {color: "gray"},
    container: { flexDirection: "row" },
    title: { fontSize: 20 },
});

export default LibraryView;
