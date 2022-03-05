import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const RoomScreenStyle = StyleSheet.create({
    base: {
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        width: '100%',
        marginBottom: '20%',
    },
    cardContentContainer: {
        alignItems: 'center',
    },
});

export class RoomScreen extends React.Component<Props> {
    render(): React.ReactNode {
        let info: Any = this.props.route.params
        console.log('INFO: ' + info)
        return (
            <View style={RoomScreenStyle.base}>
                <ScrollView
                    style={RoomScreenStyle.cardContainer}
                    contentContainerStyle={RoomScreenStyle.cardContentContainer}
                    showsVerticalScrollIndicator={false}>
                    <Text>{info.name}</Text>
                </ScrollView>
            </View>
        );
    }
}
