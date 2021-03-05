const stringToArray = string => string.split(',')
  .map(s => s.trim())
  .filter(s => s);

const RecipeStorage = {
  get: function() {
    const strRecipes = localStorage.getItem('vueRecipes');
    let recipes;

    try {
      recipes = JSON.parse(strRecipes);
    } catch (e) {
      console.error(e.message);
    }

    return Array.isArray(recipes) ? recipes : [];
  },
  set: function(newRecipes) {
    if (Array.isArray(newRecipes)) {
      localStorage.setItem('vueRecipes', JSON.stringify(newRecipes));
      return newRecipes;
    }
    return undefined;
  },
  wipe: function() {
    localStorage.removeItem('vueRecipes');
  },
};

const defaultRecipes = [{
    id: 1,
    name: 'Ground Bison Monster Mash™ with Sweet Potato',
    image: 'https://excelev8.com/wp-content/uploads/2018/12/Bison-Monster-Mash-Sweet-Potato-Large-Pic-e1544139303947.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'lean grass-fed bison',
      'medium-grain rice',
      'sweet potatoes',
      'spinach and peppers', 
      'beef talLow',
      'chicken bone broth',
    ],
  }, {
    id: 2,
    name: 'Ground Bison Monster Mash™ with Yukon Gold Potato',
    image: 'https://excelev8.com/wp-content/uploads/2018/12/Bison-Monster-Mash-pic-e1544634082230.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'lean grass-fed bison',
      'medium-grain rice',
      'yukon gold potatoes',
      'spinach and peppers', 
      'beef talLow',
      'chicken bone broth',
    ],
  }, {
    id: 3,
    name: 'Line Caught Salmon with Rice',
    image: 'https://excelev8.com/wp-content/uploads/2018/12/Salmon-Rice-w-Peppers-Pic-e1544139142582.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'line-caught salmon',
      'medium-grain rice',
      'low-gas vegetable medley',
      'beef talLow',
      'chicken bone broth',
    ],
  }, {
    id: 4,
    name: 'Line Caught Salmon with Rice Spinach and Peppers',
    image: 'https://excelev8.com/wp-content/uploads/2018/12/Line-Caught-Salmon-Rice-e1544720940652.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 5,
    name: 'Line Caught Salmon Low Carb',
    image: 'https://excelev8.com/wp-content/uploads/2019/03/Wendy-Hilll-Photography_20181202_Excelev8_34-Line-Caught-Salmon-and-Rice-Large-min.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3',
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 6,
    name: 'Country Breakfast Scramble with Sweet Potato',
    image: 'https://excelev8.com/wp-content/uploads/2018/12/Breakfast-Scramble-Sweet-Potato-Large-Pic-e1544138509946.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 7,
    name: 'Country Breakfast Scramble with Yukon Gold Potato',
    image: 'https://excelev8.com/wp-content/uploads/2018/12/Breakfast-Scramble-Potatos-Large-e1544634096156.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 8,
    name: 'Grass Fed Steak with Green Beans and Yukon Gold Potato',
    image: 'https://excelev8.com/wp-content/uploads/2019/03/Wendy-Hill-Photography_Excelev8_36-Steak-Green-Beans-and-Potatoes-min-e1551731410968.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 9,
    name: 'Chicken Breast with Rice Spinach and Peppers',
    image: 'https://excelev8.com/wp-content/uploads/2019/03/Wendy-Hill-Photography_Excelev8_48-Chickeb-Breast-with-Spinach-Peppers-and-Rice-min.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 10,
    name: 'Ground Beef Lite with Egg Patties',
    image: 'https://excelev8.com/wp-content/uploads/2020/11/eggwhitepatties.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 11,
    name: 'Boneless Pork Chop Lite',
    image: 'https://excelev8.com/wp-content/uploads/2020/11/pork-chop-1.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }, {
    id: 12,
    name: 'Vanilla Yogurt Parfait with Mango & Strawberry',
    image: 'https://excelev8.com/wp-content/uploads/2021/02/mango-parfait.jpg',
    time: 30,
    calories: 360,
    ingredients: [
      'ingredient 1',
      'ingredient 2',
      'ingredient 3', 
      'ingredient 4',
      'ingredient 5',
    ],
  }];

Vue.component('modal', {
  template: '#modal-template',
});

new Vue({
  el: '#app',
  data: {
    activeModal: null,
    activeRecipe: 3,
    calories: null,
    image: null,
    ingredients: null,
    name: null,
    recipes: [],
    showModal: false,
    time: null,
  },
  mounted: function() {
    const recipes = RecipeStorage.get();
    this.recipes = recipes.length ? recipes : defaultRecipes;
  },
  watch: {
    recipes: function(val) {
      RecipeStorage.set(val);
    },
  },
  methods: {
    deleteRecipe: function(id) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    },
    handleFormSubmit: function() {
      if (this.activeModal === 'add') {
        this.add();
      } else if (this.activeModal === 'edit') {
        this.edit();
      }
    },
    openAddRecipe: function() {
      this.showModal = true;
      this.activeModal = 'add';
    },
    add: function() {
      const recipe = {
        id: Math.random(),
        name: this.name,
        ingredients: stringToArray(this.ingredients),
        image: this.image,
        time: this.time,
        calories: this.calories,
      };
      this.recipes.push(recipe);
      this.resetForm();
      this.showModal = false;
    },
    openEditRecipe: function(id) {
      const recipe = this.recipes.find(recipe => recipe.id === id);

      this.showModal = true;
      this.activeModal = 'edit';
      this.activeRecipe = id;
      this.calories = recipe.calories;
      this.image = recipe.image;
      this.ingredients = recipe.ingredients.join(', ');
      this.name = recipe.name;
      this.time = recipe.time;
    },
    edit: function() {
      this.recipes = this.recipes.map((recipe) => {
        if (recipe.id === this.activeRecipe) {
          return {
            id: this.activeRecipe,
            name: this.name,
            ingredients: stringToArray(this.ingredients),
            image: this.image,
            time: this.time,
            calories: this.calories,
          };
        }
        return recipe;
      });
      this.resetForm();
      this.showModal = false;
    },
    resetForm: function() {
      this.name = null;
      this.ingredients = null;
      this.image = null;
      this.time = null;
      this.calories = null;
    },
  },
});
