import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from "react-native";

export default function Index() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Wave</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Article Title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: "center",
        marginBottom: 16,
    },
    headerText: {
        fontSize: 32,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    textArea: {
        height: 100,
    },
    categories: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 20,
    },
    selectedText: {
        fontSize: 16,
    },
});
