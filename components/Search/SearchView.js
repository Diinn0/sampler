import React from "react";
import {
  Button,
  FlatList, Image, Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import MusicItem from "../SampleItem";


const formatResponse = (item) => {
  return {
    title: item.trackName,
    artist: item.artistName,
    artwork: item.artworkUrl100,
    genre: item.primaryGenreName,
    year: item.releaseDate,
    id: item.trackId.toString(),
  };
};

const searchItunes = async (query) => {
  if (query == "") return;
  const formattedQuery = query.split(" ").join("+");
  const response = await fetch(
    `https://itunes.apple.com/search?term=${formattedQuery}`
  );
  const json = await response.json();
  return json.results
    .filter((item) => item.trackId && item.trackName)
    .map(formatResponse);
};

const SearchView = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [listResults, setListResults] = useState([]);

  const [item, setItem] = useState({title: "", artist: "", artwork: "", genre: "", year: "", id: ""});
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    searchItunes(input).then((result) => {
      setListResults(result);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(handleSubmit, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return (
    <View>
      <Text style={styles.header}>SearchView</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Search iTunes"
      />
      <FlatList
        data={listResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              setItem(item);
            }}
          >
            <MusicItem item={item} />
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
                  onAdd(item);
                  setVisible(!visible);
                }}
            >
              <Text style={styles.textStyle}>Add to Library</Text>
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
    backgroundColor: "blue",
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

export default SearchView;
