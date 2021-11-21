import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import GesturePath from "./components/GesturePath";
import GestureRecorder from "./components/GestureRecorder";
import ToolButton from "./components/ToolButton";
import { storeData, getData } from "./services/StorageService";
import hskWordList from "./services/WordListService";

const styles = StyleSheet.create({
    safeAreaView: {
        ...StyleSheet.absoluteFill,
        display: "flex"
    },
    darkBackground: {
        backgroundColor: "black"
    },
    lightFont: {
        color: 'white'
    },
    preview: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        marginHorizontal: "10%"
    },
    hanzi: {
        fontSize: 80,
        textAlign: "center"
    },
    info: {
        marginLeft: 8,
        flex: 1
    },
    pinyin: {
        fontSize: 20,
        marginBottom: 4
    },
    meaning: {
        width: "100%",
        fontStyle: "italic",
        marginBottom: 12
    },
    centered: {
        textAlign: 'center'
    },
    count: {
        textAlign: 'center',
        marginBottom: 12
    },
    buttonsBar: {
        width: "100%",
        flexDirection: 'row',
        position: 'relative'
    },
    toolButton: {
        flex: 1,
        height: 32,
    },
    canvas: {
        flex: 1
    }
})

const PracScreen = ({route = {params: {}}}) => {
    const [index, setIndex] = useState(-1);
    const [hanziVisible, setHanziVisible] = useState(true);
    const [path, setPath] = useState([]);
    const [layout, setLayout] = useState({ width: 0, height: 0 })
    const [practiced, setPracticed] = useState(0);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const graphicsColor = isDarkMode ? "white" : "black";
   
    const { title, level } = route.params || {};
    const list = hskWordList[level-1]

    const lastSeenIndex = (exam) => `@LAST_SEEN_INDEX__${exam}`;
    const getStorageKey = (exam, index) => `@PRACTICE_COUNT__${exam}_${index}_${list[index].pinyin}`;

    const setPracticedCount = () => {
        let newCount = 0;
        setPracticed(currentCount => {
            newCount = currentCount + 1;
            return currentCount + 1
        });
    }

    const getPracticedCount = index => {
        getData(getStorageKey(title, index)).then(newCount => setPracticed(parseInt(newCount, 10) || 0));
    }

    useEffect(() => {
        getData(lastSeenIndex(title)).then(newIndex => {
            setIndex(newIndex && newIndex >= 0 ? parseInt(newIndex, 10) : 0);
        });
    }, [])

    useEffect(() => {
        if (index >= 0) {
            getPracticedCount(index);
            storeData(lastSeenIndex(title), `${index}`);
        }
    }, [index])

    useEffect(() => {
        if (index >= 0) {
            storeData(getStorageKey(title, index), `${practiced}`);
        }
    }, [practiced])

    if (index < 0) {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <ActivityIndicator color="black" size="large" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, isDarkMode && styles.darkBackground]}>
            <View style={styles.preview}>
                {hanziVisible && (<Text style={[styles.hanzi, isDarkMode && styles.lightFont]}>
                    {list[index].hanzi}
                </Text>)}
                <View style={styles.info}>
                    <Text style={[styles.pinyin, hanziVisible && styles.centered, isDarkMode && styles.lightFont]}>
                        {list[index].pinyin}
                    </Text>
                    <Text style={[styles.meaning, hanziVisible && styles.centered, isDarkMode && styles.lightFont]}>
                        {list[index].meaning}
                    </Text>
                </View>
            </View>
            <Text style={[styles.count, isDarkMode && styles.lightFont]}>Practiced {practiced} times</Text>
            <View style={styles.buttonsBar}>
                <ToolButton name="caret-left" color={graphicsColor} size={24} style={styles.toolButton} onPress={() => setIndex(currentIndex => currentIndex - 1 >= 0 ? currentIndex - 1 : list.length - 1)}/>
                <ToolButton name="eraser" color={graphicsColor} size={24} style={styles.toolButton} onPress={() => setPath([])}/>
                <ToolButton name={hanziVisible ? "eye" : "eye-slash"} color={graphicsColor} size={24} style={styles.toolButton} onPress={() => setHanziVisible(isVisible => !isVisible)}/>
                <ToolButton name="check" color={graphicsColor} size={24} style={styles.toolButton} onPress={() => {
                    setPath([]);
                    setPracticedCount(index, currentCount => currentCount + 1);
                    // setPracticed(currentCount => currentCount + 1);
                }} />
                <ToolButton font name="caret-right" color={graphicsColor} size={24} style={styles.toolButton} onPress={() => {
                    setPath([]);
                    setIndex(currentIndex => currentIndex + 1 < list.length ? currentIndex + 1 : 0);
                }} />
            </View>
            <View style={styles.canvas}>
                <GesturePath path={path} color={graphicsColor} layout={layout} />
                <GestureRecorder onPathChanged={(newPath) => {
                    setPath(currPath => [...currPath, newPath]);
                }} onLayout={event => {
                    const {height, width} = event.nativeEvent.layout
                    setLayout({height, width});
                }} />
            </View>
        </SafeAreaView>
    );
}

export default PracScreen;