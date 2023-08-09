import React, { FC } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Meal } from '../../types'
import { Button, Icon } from '@rneui/themed'
import usefoodStorage from '../../hooks/useFoodStorage'


type MealItemsProps = Meal & {
    isAbleToAdd?: boolean;
    onCompleteAddRemove? : () => void;
    itemPosition : number;
}


const MealItem: FC<MealItemsProps> = ({ calories, portion, name, isAbleToAdd, onCompleteAddRemove,itemPosition }) => {
    const { onSaveTodayFood, onDeleteTodayFood } = usefoodStorage();

    const handleIconPress = async () => {
        try {
            if (isAbleToAdd) {
                await onSaveTodayFood({ calories, portion, name });
                ToastAndroid.showWithGravityAndOffset(
                    'Comida guardada exitosamente!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } else {
                await onDeleteTodayFood(itemPosition ?? -1)
                ToastAndroid.showWithGravityAndOffset(
                    'Comida eliminada exitosamente!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                onCompleteAddRemove?.();
            }

        } catch (error) {
            console.error(error)
            ToastAndroid.showWithGravityAndOffset(
                'Comida no agregada',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.portion}>{portion}</Text>
            </View>

            <View style={styles.rightContainer}>
                <Button
                    icon={<Icon name={isAbleToAdd ? 'add-circle-outline' : "close"} />}
                    type='clear'
                    style={styles.iconButton}
                    onPress={handleIconPress}
                />
                <Text style={styles.calories}>{calories} cal</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ade8af",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: '500'
    },
    portion: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '500'
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calories: {
        fontSize: 18,

    },
    iconButton: {
        marginBottom: -8
    }
});

export default MealItem;
