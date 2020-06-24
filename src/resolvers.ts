import { Resolvers } from './gen/graphql-types'

const resolvers: Resolvers = {
  Query: {
    mealByName: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealByName(args.name)
      return data
    },

    mealsByFirstLetter: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealsByFirstLetter(args.letter)
      return data
    },

    mealByID: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealByID(args.id)
      return data
    },

    randomMeal: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getRandomMeal(args.id)
      return data
    },

    randomMealSelection: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getRandomMealSelection(args.id)
      return data
    },

    allCategories: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getAllCategories()
      return data
    },

    allIngredients: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getAllIngredients()
      return data
    },

    latestMeals: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getLatestMeals()
      return data
    },

    mealsByMainIngredient: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealsByMainIngredient(args.mainIngredient)
      return data
    },

    mealsByIngredients: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealsByIngredients(args.ingredients)
      return data
    },

    mealsByCategory: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealsByCategory(args.category)
      return data
    },

    mealsByArea: async (parent, args, ctx) => {
      const data = ctx.dataSources.mealsAPI.getMealsByArea(args.area)
      return data
    }
  },

  Meal: {
    id: me => me.id,
    name: me => me.name,
    drinkAlternate: me => me.drinkAlternate,
    category: me => me.category,
    area: me => me.area,
    instructions: me => me.instructions,
    thumbnail: me => me.thumbnail,
    tags: me => me.tags,
    youtube: me => me.youtube,
    ingredients: me => me.ingredients,
    source: me => me.source,
    dateModified: me => me.dateModified
  },

  Category: {
    id: me => me.id,
    name: me => me.name,
    thumbnail: me => me.thumbnail,
    description: me => me.description
  },

  Ingredient: {
    id: me => me.id,
    name: me => me.name,
    description: me => me.description,
    kind: me => me.kind
  },

  MeasuredIngredient: {
    name: me => me.name,
    amount: me => me.amount
  }
}

export default resolvers
