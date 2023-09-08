import {View, Text, StyleSheet, TextInput, Button, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {db} from "../fireBase";
import {ref, set, off, onValue} from "firebase/database";

export function AddData() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [data, setData] = useState(null);

    // function to add data to firebase realtime DB

    const dataAddOn = async () => {
        await set(ref(db, "post/" + title), {
            title: title,
            body: body
        });
        setTitle("")
        setBody("")
    }

    useEffect(() => {
        const dataRef = ref(db, 'post');

        const dataListener = onValue(dataRef, (snapshot) => {
            const newData = snapshot.val();
            setData(newData);
        });

        return () => {
            off(dataRef, 'value', dataListener);
        };
    }, []);

    console.log(data)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>FetchData</Text>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Body"
                value={body}
                onChangeText={text => setBody(text)}
                style={styles.input}
            />
            <Button
                title="Add Data"
                onPress={dataAddOn}
            />
            {data !== null && (
                <ScrollView style={styles.data}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.dataText}>Title: </Text>
                        <Text>{data.E.title}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.dataText}>Body: </Text>
                        <Text>{data.E.body}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

//{"E": {"body": "A", "title": "E"}}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 100,
        fontWeight: "bold"
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        fontSize: 18,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    data: {
        borderWidth: 1,
        marginTop: 30,
        borderRadius: 20,
        padding: 30,
    },
    dataText: {
        color: "blue",
        fontWeight: "bold",
    }
});