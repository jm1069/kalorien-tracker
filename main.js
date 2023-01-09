const foods = [
    {name: 'Test', calories: 100, protein: 50, fat: 2.5}
];

function calculateTotals(){
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    
    for (const food of foods) {
      totalCalories += food.calories;
      totalProtein += food.protein;
      totalFat += food.fat;
    }
    
    return {totalCalories, totalProtein, totalFat};
}

function addFood(){
    const name = document.getElementById('name').value;
    const calories = parseInt(document.getElementById('calories').value);
    const protein = parseInt(document.getElementById('protein').value);
    const fat = parseInt(document.getElementById('fat').value);

    if (name.trim() === '' || calories <= 0 || protein <= 0 || fat <= 0) {
        alert('Bitte gültige Werte eingeben!');
        return;
    }

    foods.push({name: name, calories: calories, protein: protein, fat: fat});
    console.log(foods)
    console.log('Total', calculateTotals());
}
