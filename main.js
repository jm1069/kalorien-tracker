const foods = [];

function calculateTotalMacros(){
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    for (const food of foods) {
      totalCarbs += food.carbs;
      totalProtein += food.protein;
      totalFat += food.fat;
    }
    
    return {totalProtein, totalCarbs, totalFat};
}

function calculateTotalCalories(){
    let totalCalories = 0;
    let caloriesGoal = 1900;
    
    for (const food of foods) {
      totalCalories += food.calories;
    }
    
    return {totalCalories, caloriesGoal};
}

function addFood(){
    const name = document.getElementById('name').value;
    const calories = parseFloat(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const carbs = parseFloat(document.getElementById('carbs').value)
    const fat = parseFloat(document.getElementById('fat').value);

    if (name.trim() === '' || calories <= 0 || protein <= 0 || carbs <= 0 ||fat <= 0) {
        alert('Please enter a valid values for all the fields');
        return;
    }

    foods.push({name: name, calories: calories, carbs: carbs, protein: protein, fat: fat});
    console.log(foods)
    console.log('Total', calculateTotalCalories());
    console.log('Total', calculateTotalMacros());
    visualizeData();
}

function visualizeData(){
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            // labels: ['Calories', 'Calories Goal'],
            datasets: [{
                data: calculateTotalCalories(),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}