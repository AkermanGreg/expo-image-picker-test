import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  VStack,
  Image,
  Pressable,
  HStack
} from "@gluestack-ui/themed";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageActionSheet from "@/components/ImageHandling/ImageActionSheet";
import XIcon from "@icons/xIcon";

export default function WelcomeScreen() {
  const [selectedImages, setSelectedImages] = useState<
    { uri: string | undefined; selected: boolean; width: number; height: number }[]
  >([]);
  
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const handleRemoveImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleImageSelectionError = (error: string) => {
    Alert.alert("Image Selection Error", error);
  };

  return (
    <SafeAreaView bgColor="$backgroundDarkMain" flex={1}>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
      >
        <VStack my="$12" mx="$4" alignItems="center">
          <Text size="2xl" mb="$2" textAlign="center">
            Expo Image Picker Test
          </Text>
      
          
          <HStack px="$4">
            {selectedImages.map((image, index) => (
              <Pressable key={index} testID={`image-pressable-${index}`}>
                <Pressable
                  onPress={() => handleRemoveImage(index)}
                  testID={`remove-image-button-${index}`}
                >
                  <XIcon w="$6" h="$6" ml={55} testID={`remove-image-icon-${index}`} />
                </Pressable>
                <Image
                  source={{ uri: image.uri }}
                  alt="Selected Image"
                  ml="$4"
                  mb="$12"
                  resizeMode="cover"
                  style={{
                    width: image.width,
                    height: image.height,
                  }}
                  testID={`selected-image-${index}`}
                />
              </Pressable>
            ))}
          </HStack>

          <ImageActionSheet
            cameraStatus={cameraStatus}
            requestCameraPermission={requestCameraPermission}
            mediaLibraryStatus={mediaLibraryStatus}
            requestMediaLibraryPermission={requestMediaLibraryPermission}
            onSelectImage={(image, width, height) => {
              if (image) {
                setSelectedImages(prevImages => [
                  ...prevImages,
                  { ...image, width, height },
                ]);
              } else {
                handleImageSelectionError(
                  "Failed to select image. Please try again.",
                );
              }
            }}
            isAvatarChange={false}
            allowsEditing={false}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
