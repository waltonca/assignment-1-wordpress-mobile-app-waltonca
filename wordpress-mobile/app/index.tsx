import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

const categories = ["Arts + Music", "Events", "Food + Drink", "Opinion"];

export default function Index() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

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

            <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}

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
    image: {
        width: 200,
        height: 200,
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
