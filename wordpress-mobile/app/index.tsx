import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    Image,
    Pressable,
    Keyboard,
    ActivityIndicator,
    Alert
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import base64 from "base-64";
import utf8 from "utf8";

const categories = [
    { id: 2, label: "Food + Drink" },
    { id: 3, label: "Arts + Music" },
    { id: 4, label: "Opinion" },
    { id: 5, label: "Events" }
];
const mediaApiUrl =
    "https://nscc-0304263-wp-photos-d4efduf3azg6bsbb.northcentralus-01.azurewebsites.net/wp-json/wp/v2/media";
const postApiUrl =
    "https://nscc-0304263-wp-photos-d4efduf3azg6bsbb.northcentralus-01.azurewebsites.net/wp-json/wp/v2/posts";

export default function Index() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // WordPress Authentication
    const username = "W0486229";
    const password = "F6PQ yKFH JwOb kgs3 hsyj PJma";
    const credentials = `${username}:${password}`;
    const bytes = utf8.encode(credentials);
    const basicAuth = base64.encode(bytes);

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

    // Post media and return media ID
    const uploadMedia = async (uri: string) => {
        const filename = uri.split("/").pop();
        const formData = new FormData();

        formData.append("file", {
            uri,
            name: filename,
        } as any);

        const response = await fetch(mediaApiUrl, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + basicAuth,
                'Content-Disposition': 'formdata; filename=' + filename,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Media upload failed");
        }

        const data = await response.json();
        return data.id; // return media ID
    };

    // Create a post with media ID
    const createPost = async (mediaId: number) => {
        // x-www-form-urlencoded format
        // use URLSearchParams to create the body
        const postData = new URLSearchParams();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('featured_media', mediaId.toString());
        postData.append('categories', category.toString()); 
        postData.append('status', 'publish');
    
        const response = await fetch(postApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + basicAuth,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postData.toString()
        });
    
        if (!response.ok) {
            throw new Error('Post creation failed');
        }
    
        const data = await response.json();
        Alert.alert("Post created!", `Post ID: ${data.id}`);
    };

    const handlePublish = async () => {
        setIsLoading(true); // start loading. show loading indicator
        try {
            const mediaId = await uploadMedia(image!);
            await createPost(mediaId);

            // Post created successfully
            Alert.alert('Post created!', 'Your article has been published successfully.');
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false); // stop loading. hide loading indicator
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>The Wave</Text>
            </View>
            <Text style={styles.TitleText}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Article Title"
                value={title}
                onChangeText={setTitle}
                onBlur={() => Keyboard.dismiss()}
            />
            <Text style={styles.ContentText}>Content</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
                onBlur={() => Keyboard.dismiss()}
            />

            <Pressable style={styles.button} onPress={pickImage}>
                <Text style={styles.text}>Pick an image</Text>
            </Pressable>
            <View style={styles.imageContainer}>
                {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
            </View>

            <Text style={styles.labelText}>Category:</Text>
            <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={categories.map((cat) => ({ label: cat.label, value: cat.id }))}
                style={pickerSelectStyles}
                value={category}
                placeholder={{ label: "Select a category...", value: null }}
            />

            <Pressable onPress={handlePublish} style={({ pressed }) => [{
                backgroundColor: pressed ? '#ddd' : '#007BFF',
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,},]}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
            {isLoading ? 'Publishing...' : 'Publish'}
            </Text>
        </Pressable>

        {/* Show loading indicator when isLoading is true */}
        {isLoading && <ActivityIndicator size="large" color="#007BFF" />}
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
    labelText: {
        fontSize: 16,
        marginBottom: 8,
    },
    TitleText: {
        fontSize: 16,
        marginBottom: 8,
    },
    ContentText: {
        fontSize: 16,
        marginBottom: 8,
    },
    imageContainer: {
        alignItems: "center",
        paddingVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "indigo",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
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
