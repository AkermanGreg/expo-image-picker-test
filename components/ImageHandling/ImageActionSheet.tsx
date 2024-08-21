import React, { useCallback, useState } from "react";
import { Linking } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import CameraIcon from "@/app/icons/cameraIcon";

interface ImageActionSheetProps {
  onSelectImage: (
    image: { uri: string | undefined; selected: boolean },
    width: number,
    height: number,
  ) => void;
  cameraStatus: ImagePicker.CameraPermissionResponse | undefined | null;
  requestCameraPermission: () => Promise<ImagePicker.CameraPermissionResponse>;
  mediaLibraryStatus:
    | ImagePicker.MediaLibraryPermissionResponse
    | undefined
    | null;
  requestMediaLibraryPermission: () => Promise<ImagePicker.MediaLibraryPermissionResponse>;
  isAvatarChange: boolean | undefined | null;
  allowsEditing: boolean;
  onPress?: () => void; // Optional onPress prop
  onClose?: () => void; // Optional onClose prop
}

const ImageActionSheet: React.FC<ImageActionSheetProps> = ({
  onSelectImage,
  cameraStatus,
  requestCameraPermission,
  mediaLibraryStatus,
  requestMediaLibraryPermission,
  isAvatarChange = false,
  allowsEditing = false,
  onPress,
  onClose, // Destructure onClose prop
}) => {
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = useCallback(() => {
    setShowActionsheet(false);
    if (onClose) {
      onClose(); // Call onClose prop if defined
    }
  }, [onClose]);

  const timeoutDelay = 300;

  const handleSelectImagePress = useCallback(async () => {
    handleClose();
    setTimeout(async () => {
      if (mediaLibraryStatus) {
        if (
          mediaLibraryStatus.status ===
            ImagePicker.PermissionStatus.UNDETERMINED ||
          (mediaLibraryStatus.status === ImagePicker.PermissionStatus.DENIED &&
            mediaLibraryStatus.canAskAgain)
        ) {
          const permission = await requestMediaLibraryPermission();
          if (permission.granted) {
            const options: ImagePicker.ImagePickerOptions = {
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: allowsEditing,
              quality: 1,
            };

            const result: ImagePicker.ImagePickerResult =
              await ImagePicker.launchImageLibraryAsync(options);
            if (!result.cancelled) {
              try {
                const aspectRatio =
                  result.assets[0].width / result.assets[0].height;
                const resizedWidth = 50;
                const resizedHeight = Math.round(resizedWidth / aspectRatio);

                const manipulatedImage: ImageManipulator.ImageResult =
                  await ImageManipulator.manipulateAsync(
                    result.assets[0].uri,
                    [
                      {
                        resize: { width: resizedWidth, height: resizedHeight },
                      },
                    ],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
                  );

                onSelectImage(
                  {
                    uri: manipulatedImage.uri,
                    selected: true,
                  },
                  resizedWidth,
                  resizedHeight,
                );

                if (onPress) {
                  onPress();
                }
              } catch (error) {
                console.error("Image manipulation error:", error);
              }
            }
          }
        } else if (
          mediaLibraryStatus.status === ImagePicker.PermissionStatus.DENIED
        ) {
          console.log("Media library permission denied");
          await Linking.openSettings();
        } else {
          const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: allowsEditing,
            quality: 1,
          };

          const result: ImagePicker.ImagePickerResult =
            await ImagePicker.launchImageLibraryAsync(options);
          if (!result.canceled) {
            try {
              const aspectRatio =
                result.assets[0].width / result.assets[0].height;
              const resizedWidth = 50;
              const resizedHeight = Math.round(resizedWidth / aspectRatio);

              const manipulatedImage: ImageManipulator.ImageResult =
                await ImageManipulator.manipulateAsync(
                  result.assets[0].uri,
                  [{ resize: { width: resizedWidth, height: resizedHeight } }],
                  { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
                );

              onSelectImage(
                {
                  uri: manipulatedImage.uri,
                  selected: true,
                },
                resizedWidth,
                resizedHeight,
              );

              if (onPress) {
                onPress();
              }
            } catch (error) {
              console.error("Image manipulation error:", error);
            }
          }
        }
      }
    }, timeoutDelay);
  }, [
    mediaLibraryStatus,
    requestMediaLibraryPermission,
    onSelectImage,
    onPress,
    handleClose,
  ]);

  const handleTakePhotoPress = useCallback(async () => {
    handleClose();
    setTimeout(async () => {
      if (cameraStatus) {
        if (
          cameraStatus.status === ImagePicker.PermissionStatus.UNDETERMINED ||
          (cameraStatus.status === ImagePicker.PermissionStatus.DENIED &&
            cameraStatus.canAskAgain)
        ) {
          const permission = await requestCameraPermission();
          if (permission.granted) {
            const options: ImagePicker.ImagePickerOptions = {
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            };

            const result: ImagePicker.ImagePickerResult =
              await ImagePicker.launchCameraAsync(options);
            if (!result.canceled) {
              try {
                const aspectRatio =
                  result.assets[0].width / result.assets[0].height;
                const resizedWidth = 50;
                const resizedHeight = Math.round(resizedWidth / aspectRatio);

                const manipulatedImage: ImageManipulator.ImageResult =
                  await ImageManipulator.manipulateAsync(
                    result.assets[0].uri,
                    [
                      {
                        resize: { width: resizedWidth, height: resizedHeight },
                      },
                    ],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
                  );

                onSelectImage(
                  {
                    uri: manipulatedImage.uri,
                    selected: true,
                  },
                  resizedWidth,
                  resizedHeight,
                );

                if (onPress) {
                  onPress();
                }
              } catch (error) {
                console.error("Image manipulation error:", error);
              }
            }
          }
        } else if (
          cameraStatus.status === ImagePicker.PermissionStatus.DENIED
        ) {
          console.log("Camera permission denied");
          await Linking.openSettings();
        } else {
          const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          };

          const result: ImagePicker.ImagePickerResult =
            await ImagePicker.launchCameraAsync(options);
          if (!result.canceled) {
            try {
              const aspectRatio =
                result.assets[0].width / result.assets[0].height;
              const resizedWidth = 50;
              const resizedHeight = Math.round(resizedWidth / aspectRatio);

              const manipulatedImage: ImageManipulator.ImageResult =
                await ImageManipulator.manipulateAsync(
                  result.assets[0].uri,
                  [{ resize: { width: resizedWidth, height: resizedHeight } }],
                  { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
                );

              onSelectImage(
                {
                  uri: manipulatedImage.uri,
                  selected: true,
                },
                resizedWidth,
                resizedHeight,
              );

              if (onPress) {
                onPress();
              }
            } catch (error) {
              console.error("Image manipulation error:", error);
            }
          }
        }
      }
    }, timeoutDelay);
  }, [
    cameraStatus,
    requestCameraPermission,
    onSelectImage,
    onPress,
    handleClose,
  ]);

  return (
    <Box>
      {isAvatarChange ? (
        <Pressable
          onPress={() => setShowActionsheet(true)}
          bg="$carbonGray"
          borderRadius="$3xl"
          py="$0.5"
          px="$4"
        >
          <Text
            fontFamily="$medium"
            fontSize="$xs"
            fontWeight="$mediumfw"
            textAlign="center"
          >
            Change Profile Photo
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setShowActionsheet(true);
            if (onPress) {
              onPress();
            }
          }}
        >
          <CameraIcon w="$6" h="$6" mr="$4" />
        </Pressable>
      )}
    
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ActionsheetItem onPress={handleSelectImagePress}>
            <ActionsheetItemText>Choose Existing</ActionsheetItemText>
          </ActionsheetItem>

          <ActionsheetItem onPress={handleTakePhotoPress}>
            <ActionsheetItemText>Take Photo</ActionsheetItemText>
          </ActionsheetItem>

          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Cancel</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default ImageActionSheet;
