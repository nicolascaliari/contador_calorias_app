import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import Header from '../../components/Header/Header';
import { Button, Icon } from "@rneui/base";
import { Input } from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import usefoodStorage from '../../hooks/useFoodStorage';
import { Meal } from '../../types';
import MealItem from '../../components/MealItem/MealItem';


const AddFood = () => {

    const [visible, setIsVisible] = useState<boolean>(false);
    const [foods, setFoods] = useState<Meal[]>([]);
    const [search, setSearch] = useState<string>('');
    const { onGetFood } = usefoodStorage();




    useEffect(() => {
        loadFoods().catch(null)
    }, [])


    const loadFoods = async () => {
        try {
            const foodsResponse = await onGetFood();
            setFoods(foodsResponse);
        } catch (error) {
            console.error(error);
        }
    }


    const handleModalClose = async (shouldUpdate?: boolean) => {

        if (shouldUpdate) {
            ToastAndroid.showWithGravityAndOffset(
                'Comida guardada exitosamente!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            loadFoods();
        }

        setIsVisible(false);
    }



    const handleSearchPress = async () => {
        try {
            const result = await onGetFood();
            setFoods(result.filter((item: Meal) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.addFoodContainer}>
                <View style={styles.legendContainer}>
                    <Text style={styles.addFoodLegend}>Add Food</Text>
                </View>

                <View style={styles.addFoodBtnContainer}>
                    <Button
                        icon={<Icon name="add-circle-outline" color="#fff" />}
                        radius="lg"
                        color="#4ecb71"
                        onPress={() => setIsVisible(true)}
                    />
                </View>

            </View>


            <View style={styles.searchContainer}>

                <View style={styles.inputContainer}>
                    <Input placeholder='apples, pie, soda...' value={search} onChangeText={(text: string) => setSearch(text)} />
                </View>
                <Button
                    title="Search"
                    color="#ade8af"
                    titleStyle={styles.searchBtnTitle}
                    radius="lg"
                    onPress={handleSearchPress}
                />
            </View>
            <ScrollView style={styles.content}>
                {foods?.map(meal => (
                    <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd />
                ))}
            </ScrollView>

            <AddFoodModal visible={visible} onClose={handleModalClose} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#FFF',
        flex: 1,
    },
    addFoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24
    },
    legendContainer: {
        flex: 1,
    },
    addFoodBtnContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    addFoodLegend: {
        fontSize: 20
    },
    searchContainer: {
        flexDirection: "row"
    },
    inputContainer: {
        flex: 1,
        marginLeft: -12
    },
    searchBtnTitle: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold'
    },
    content: {

    }


})

export default AddFood;