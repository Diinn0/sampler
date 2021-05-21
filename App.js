import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import SamplerView from "./components/SamplerView";
import SearchView from "./components/Search/SearchView";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState} from "react/cjs/react.development";

const Tabs = createBottomTabNavigator();

const App = () => {
    const [libraryList, setLibraryList] = useState([]);

    const data = [
        {
            name: "Guitar",
            uri: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
            color: "#ff0000",
        },
        {
            name: "Cymbal",
            uri: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
            color: "#08ff00",
        }
    ]

    const addItem = (item) => {
        setLibraryList((prev) => {
            if (prev.indexOf(item) === -1) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const removeItem = (item) => {
        const list = [...libraryList];
        let remove = list.indexOf(item);
        list.splice(remove, 1);
        setLibraryList(list);
    }

    return (
        <NavigationContainer>
            <Tabs.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        switch (route.name) {
                            case "Sampler":
                                iconName = focused ? "library" : "library-outline";
                                break;
                            case "Search":
                                iconName = focused ? "musical-notes" : "musical-notes-outline";
                                break;
                            default:
                                iconName = "ban";
                                break;
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{activeTintColor: "blue", inactiveTintColor: "gray"}}
            >
                <Tabs.Screen name="Sampler">
                    {(props) => <SamplerView {...props} data={data} onRemove={removeItem} />}
                </Tabs.Screen>
                <Tabs.Screen name="Search">
                    {(props) => <SearchView {...props} onAdd={addItem}/>}
                </Tabs.Screen>
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default App;
