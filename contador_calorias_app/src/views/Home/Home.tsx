import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Meal, RootStackParams } from '../../types';
import usefoodStorage from '../../hooks/useFoodStorage';
import { useFocusEffect } from '@react-navigation/native';
import TodayCalories, { TodayCaloriesProps } from '../../components/TodayCalories/TodayCalories';
import TodayMeals from '../../components/TodayMeals/TodayMeals';


const totalCaloriesPerDay = 2000;

const Home = () => {
    const [todayFood, setTodayFood] = useState<Meal[]>([])
    const { onGetTodayFood } = usefoodStorage();
    const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>()
    const { navigate } = useNavigation<StackNavigationProp<RootStackParams, "Home">>();

    const calculateTodayStatistics = (meals: Meal[]) => {
        try {
            const caloriesConsumed = meals.reduce((acum, curr) => acum + Number(curr.calories), 0)

            const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
            const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

            setTodayStatistics({
                consumed: caloriesConsumed,
                percentage,
                remaining: remainingCalories,
                total: totalCaloriesPerDay,
            })

        } catch (error) {
            console.error(error)
        }
    }


    const loadTodayFood = useCallback(async () => {
        try {
            const todayFoodResponse = (await onGetTodayFood() as Meal[]);
            console.log(todayFoodResponse)
            calculateTodayStatistics(todayFoodResponse);
            setTodayFood(todayFoodResponse)
        } catch (error) {
            setTodayFood([]);
            console.error(error);
        }
    }, [])

    useFocusEffect(useCallback(() => {
        loadTodayFood().catch(null)
    }, [loadTodayFood]))


    const handleAddCaloriesPress = () => {
        navigate('AddFood')
    }

    console.log(todayFood)

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.caloriesContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.caloriesLegend}>Calories</Text>
                </View>

                <View style={styles.rightContainer}>
                    <Button
                        icon={<Icon name='add-circle-outline' />}
                        radius='lg' color='#4ecb71'
                        onPress={handleAddCaloriesPress}
                    />
                </View>
            </View>
            <TodayCalories {...todayStatistics} />

            <TodayMeals foods={todayFood} onCompleteAddRemove={() => loadTodayFood()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#FFF',
        flex: 1
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    caloriesContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 24,

    },
    caloriesLegend: {
        fontSize: 20,

    }
})


export default Home;