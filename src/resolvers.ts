const resolvers = {
  Query: {
    mealByName: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealByName(args.name)
      return data
    },

    mealsByFirstLetter: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealsByFirstLetter(args.letter)
      return data
    },

    mealByID: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealByID(args.id)
      return data
    },

    randomMeal: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getRandomMeal()
      return data
    },

    randomMealSelection: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getRandomMealSelection()
      return data
    },

    allCategories: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getAllCategories()
      return data
    },

    allIngredients: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getAllIngredients()
      return data
    },

    latestMeals: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getLatestMeals()
      return data
    },

    mealsByMainIngredient: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealsByMainIngredient(args.mainIngredient)
      return data
    },

    mealsByIngredients: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealsByIngredients(args.ingredients)
      return data
    },

    mealsByCategory: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealsByCategory(args.category)
      return data
    },

    mealsByArea: async (parent: any, args: any, ctx: any) => {
      const data = ctx.dataSources.mealsAPI.getMealsByArea(args.area)
      return data
    }
  }
}

export default resolvers
