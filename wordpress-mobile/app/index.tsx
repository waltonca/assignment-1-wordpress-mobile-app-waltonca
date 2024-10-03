import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
const categories = ["Arts + Music", "Events", "Food + Drink", "Opinion"];

export default function Index() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>(categories[0]);

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

            <Text style={styles.label}>Category:</Text>
            <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={categories.map((cat) => ({ label: cat, value: cat }))}
                style={pickerSelectStyles}
                value={category}
                placeholder={{ label: "Select a category...", value: null }}
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
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        color: "black",
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        color: "black",
        marginBottom: 10,
    },
});
