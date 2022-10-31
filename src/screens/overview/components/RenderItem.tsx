import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Img} from '..';

interface Props {
  item: Img;
  onPress: (uri: string) => void;
}
export default function RenderItem({item, onPress}: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(item.uri)}>
      <Image
        source={{uri: item.uri}}
        style={{width: 116, height: 120, borderRadius: 5, margin: 2}}
      />
    </TouchableOpacity>
  );
}
