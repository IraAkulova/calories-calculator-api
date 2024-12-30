export const transformFoodResponse = (response: any): any => {
  const transformedFoods = response.foods.food.map((food: any) => {
    const nutrients = food.food_description.match(
      /Calories:\s([\d.]+)kcal\s\|\sFat:\s([\d.]+)g\s\|\sCarbs:\s([\d.]+)g\s\|\sProtein:\s([\d.]+)g/,
    );

    return {
      id: food.food_id,
      name: food.food_name,
      calories: nutrients ? parseFloat(nutrients[1]) : null,
      fat: nutrients ? parseFloat(nutrients[2]) : null,
      carbs: nutrients ? parseFloat(nutrients[3]) : null,
      protein: nutrients ? parseFloat(nutrients[4]) : null,
    };
  });

  return transformedFoods;
};
