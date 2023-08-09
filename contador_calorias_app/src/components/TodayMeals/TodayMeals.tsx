import { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Meal } from "../../types";
import MealItem from "../MealItem/MealItem";

type todayMealsProps = {
    foods: Meal[];
    onCompleteAddRemove?: () => void;
}

const TodayMeals: FC<todayMealsProps> = ({ foods, onCompleteAddRemove }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comidas</Text>
            <ScrollView style={styles.content}>
                {foods?.map((meal: Meal, index) =>
                (<MealItem key={`today-meal-item-${meal.name}-${index}`}
                    {...meal}
                    itemPosition={index}
                    onCompleteAddRemove={onCompleteAddRemove} />))}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24

    },
    title: {
        fontSize: 16,
    },
    content: {
        marginVertical: 16
    },
    leftContainer: {
        flex: 1,

    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    today: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 14
    },
    rightItem: {
        flexDirection: 'row',
        marginBottom: 8,

    },
    rightItemLegend: {
        flex: 1
    },
    rightItemValue: {
        flex: 1,
        textAlign: 'right'
    }
})


export default TodayMeals;