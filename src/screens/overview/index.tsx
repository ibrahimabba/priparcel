import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';
import FooterButtons from './components/FooterButtons';
import {useDispatch} from '../../hooks/useRedux';
import {uploadBarcodePicuresAsync} from '../../store/reducers/barcode/barcodeThunks';
import {OverviewScreenProps} from '../../../types';

import RenderItem from './components/RenderItem';
import ListEmptyComponent from './components/ListEmptyComponent';
import ImageModal from '../capture/components/ImageModal';

export interface Img {
  uri: string;
  fileName: string;
  width: number;
  height: number;
}
export default function Overview({navigation}: OverviewScreenProps) {
  const [galleryImages, setGalleryImages] = useState<Img[]>();
  const [pressedImage, setPressedImage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLoadedImage, setLastLoadedImage] = useState<string>('');
  const [lastPageReached, setLastPageReached] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getGalleryImages();
  }, [isFocused]);

  const getGalleryImages = async () => {
    const photosIdentifiers = await CameraRoll.getPhotos({
      groupTypes: 'Album',
      groupName: 'priparcel',
      first: 15,
    });

    const photos: Img[] = [];
    photosIdentifiers.edges.forEach(edge => {
      photos.push({
        uri: edge.node.image.uri,
        fileName: edge.node.image.filename || '',
        width: edge.node.image.width,
        height: edge.node.image.height,
      });
    });
    setLastLoadedImage(photosIdentifiers.page_info.end_cursor || '');
    setGalleryImages(photos);
  };

  const handleSaveAndNext = () => {
    if (galleryImages) {
      dispatch(
        uploadBarcodePicuresAsync({
          photos: galleryImages,
          actionType: 'Save and next',
        }),
      );
      navigation.navigate('Capture', {screen: 'Barcode'});
    }
  };
  const handleSaveAndQuit = () => {
    if (galleryImages) {
      dispatch(
        uploadBarcodePicuresAsync({
          photos: galleryImages,
          actionType: 'Save and quit',
        }),
      );
      navigation.navigate('Capture', {screen: 'Barcode'});
    }
  };
  const handleQuitWithoutSaving = () => {
    if (galleryImages && galleryImages.length > 0) {
      const photoUris = galleryImages?.map(img => img.uri) || [];
      CameraRoll.deletePhotos(photoUris);
      Toast.show({
        type: 'success',
        text1: 'Deleted',
        text2: 'Photos deleted successfully 👋',
      });
      navigation.navigate('Capture', {screen: 'Barcode'});
    } else {
      Toast.show({
        type: 'info',
      });
    }
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleOpenModal = (uri: string) => {
    setPressedImage(uri);
    setModalVisible(true);
  };

  const loadMoreImages = async () => {
    if (!galleryImages || lastPageReached) {
      return;
    }
    const photosIdentifiers = await CameraRoll.getPhotos({
      groupTypes: 'Album',
      groupName: 'priparcel',
      after: lastLoadedImage,
      first: 15,
    });
    const photos = [...galleryImages];
    photosIdentifiers.edges.forEach(edge => {
      edge.node.image;
      photos.push({
        uri: edge.node.image.uri,
        fileName: edge.node.image.filename || '',
        width: edge.node.image.width,
        height: edge.node.image.height,
      });
    });
    setLastLoadedImage(photosIdentifiers.page_info.end_cursor || '');
    setGalleryImages(photos);
    if (!photosIdentifiers.page_info.has_next_page) {
      setLastPageReached(true);
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={galleryImages}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({item}) => (
          <RenderItem item={item} onPress={handleOpenModal} />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        keyExtractor={(_, i) => i.toString()}
        onEndReached={loadMoreImages}
      />
      <ImageModal
        pressedImage={pressedImage}
        closeModal={handleCloseModal}
        modalVisible={modalVisible}
      />
      <FooterButtons
        handleQuitWithoutSaving={handleQuitWithoutSaving}
        handleSaveAndNext={handleSaveAndNext}
        handleSaveAndQuit={handleSaveAndQuit}
      />
    </View>
  );
}
