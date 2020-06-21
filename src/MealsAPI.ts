import { RESTDataSource } from 'apollo-datasource-rest'
import _ from 'lodash'
import { Meal, Category, Ingredient, Area, Maybe } from './gen/graphql-types'

/**
 * The data from The MealDB is in the form:
 * data: { meals: [ {Meal1}, {Meal2}, {Meal3}, etc. ] }
 *
 * I am using a mealReducer to convert the incoming JSON into the form my GraphQL type expects
 * primarily because the JSON has types attached to the names, e.g., "strMeal", "idMeal".
 * There's no need for these since the GraphQL schema tracks the types of the fields.
 */
export default class MealsAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = `https://www.themealdb.com/api/json/v1/${process.env.API_KEY ?? '1'}`
  }

  // Converts the JSON data from The MealDB into the form the GraphQL schema expects
  mealReducer (incoming: any): Meal {
    const nullifyEmptyStr = (str: string): Maybe<string> => _.isEmpty(str) ? null : str

    return {
      id: parseInt(incoming.idMeal),
      name: incoming.strMeal,
      drinkAlternate: incoming.strDrinkAlternate,
      category: incoming.strCategory,
      area: incoming.strArea,
      // Remove empty strings. Some of the instructions have line breaks built into the string,
      // but I have chosen to remove them so the user of this server may format the instructions however they like.
      instructions: _.filter(_.split(incoming.strInstructions, '\r\n'), (line) => !_.isEmpty(line)),
      thumbnail: incoming.strMealThumb,
      tags: _.map(_.split(incoming.strTags, ','), nullifyEmptyStr),
      youtube: incoming.strYoutube,
      // Pair ingredients and their amounts from the API into objects,
      // and remove any empty strings from the resulting array.
      // Many of the meals do not use all 20 ingredients, so there's no reason
      // why the resulting GraphQL query should have more ingredients than are actually in use.
      ingredients: _.filter([
        { name: nullifyEmptyStr(incoming.strIngredient1), amount: nullifyEmptyStr(incoming.strMeasure1) },
        { name: nullifyEmptyStr(incoming.strIngredient2), amount: nullifyEmptyStr(incoming.strMeasure2) },
        { name: nullifyEmptyStr(incoming.strIngredient3), amount: nullifyEmptyStr(incoming.strMeasure3) },
        { name: nullifyEmptyStr(incoming.strIngredient4), amount: nullifyEmptyStr(incoming.strMeasure4) },
        { name: nullifyEmptyStr(incoming.strIngredient5), amount: nullifyEmptyStr(incoming.strMeasure5) },
        { name: nullifyEmptyStr(incoming.strIngredient6), amount: nullifyEmptyStr(incoming.strMeasure6) },
        { name: nullifyEmptyStr(incoming.strIngredient7), amount: nullifyEmptyStr(incoming.strMeasure7) },
        { name: nullifyEmptyStr(incoming.strIngredient8), amount: nullifyEmptyStr(incoming.strMeasure8) },
        { name: nullifyEmptyStr(incoming.strIngredient9), amount: nullifyEmptyStr(incoming.strMeasure9) },
        { name: nullifyEmptyStr(incoming.strIngredient10), amount: nullifyEmptyStr(incoming.strMeasure10) },
        { name: nullifyEmptyStr(incoming.strIngredient11), amount: nullifyEmptyStr(incoming.strMeasure11) },
        { name: nullifyEmptyStr(incoming.strIngredient12), amount: nullifyEmptyStr(incoming.strMeasure12) },
        { name: nullifyEmptyStr(incoming.strIngredient13), amount: nullifyEmptyStr(incoming.strMeasure13) },
        { name: nullifyEmptyStr(incoming.strIngredient14), amount: nullifyEmptyStr(incoming.strMeasure14) },
        { name: nullifyEmptyStr(incoming.strIngredient15), amount: nullifyEmptyStr(incoming.strMeasure15) },
        { name: nullifyEmptyStr(incoming.strIngredient16), amount: nullifyEmptyStr(incoming.strMeasure16) },
        { name: nullifyEmptyStr(incoming.strIngredient17), amount: nullifyEmptyStr(incoming.strMeasure17) },
        { name: nullifyEmptyStr(incoming.strIngredient18), amount: nullifyEmptyStr(incoming.strMeasure18) },
        { name: nullifyEmptyStr(incoming.strIngredient19), amount: nullifyEmptyStr(incoming.strMeasure19) },
        { name: nullifyEmptyStr(incoming.strIngredient20), amount: nullifyEmptyStr(incoming.strMeasure20) }
      ], ({ name }) => !_.isEmpty(name)),
      source: incoming.strSource,
      dateModified: incoming.dateModified
    }
  }

  categoryReducer (incoming: any): Category {
    return {
      id: parseInt(incoming.idCategory),
      name: incoming.strCategory,
      thumbnail: incoming.strCategoryThumb,
      description: incoming.strCategoryDescription
    }
  }

  ingredientReducer (incoming: any): Ingredient {
    return {
      id: parseInt(incoming.idIngredient),
      name: incoming.strIngredient,
      description: incoming.strDescription,
      kind: incoming.strType
    }
  }

  normalize <T>(data: T[], reducer: (datum: T) => T): T[] {
    return _.isArray(data) ? _.map(data, (datum: any) => reducer(datum)) : []
  }

  // Search for a meal by name
  async getMealByName (name: string): Promise<Meal[]> {
    const { meals } = await this.get(`/search.php?s=${name}`)
    return this.normalize(meals, this.mealReducer)
  }

  // List all meals by first letter
  async getMealsByFirstLetter (letter: string): Promise<Meal[]> {
    const { meals } = await this.get(`/search.php?f=${letter}`)
    return this.normalize(meals, this.mealReducer)
  }

  // Search for a meal by ID
  async getMealByID (id: number): Promise<Meal[]> {
    const { meals } = await this.get(`/lookup.php?i=${id}`)
    return this.normalize(meals, this.mealReducer)
  }

  // Get a single random meal
  async getRandomMeal (): Promise<Meal[]> {
    const { meals } = await this.get('/random.php')
    return this.normalize(meals, this.mealReducer)
  }

  // Get a selection of 10 random meals
  //! LOCKED TO PATREON SUPPORTERS
  async getRandomMealSelection (): Promise<Meal[]> {
    const { meals } = await this.get('/randomselection.php')
    return this.normalize(meals, this.mealReducer)
  }

  // Get a list of all meal categories
  async getAllCategories (): Promise<Category[]> {
    const { meals } = await this.get('/categories.php')
    return this.normalize(meals, this.categoryReducer)
  }

  // Get a list of all meal ingredients
  async getAllIngredients (): Promise<Ingredient[]> {
    const { meals } = await this.get('/list.php?i=list')
    return this.normalize(meals, this.ingredientReducer)
  }

  // Get the latest meals
  //! LOCKED TO PATREON SUPPORTERS
  async getLatestMeals (): Promise<Meal[]> {
    const { meals } = await this.get('/latest.php')
    return this.normalize(meals, this.mealReducer)
  }

  // Search for some meals by main ingredient
  async getMealsByMainIngredient (mainIngredient: string): Promise<Meal[]> {
    const { meals } = await this.get(`/filter.php?i=${mainIngredient}`)
    return this.normalize(meals, this.mealReducer)
  }

  // Search for meals by a list of ingredients
  //! LOCKED TO PATREON SUPPORTERS
  async getMealsByIngredients (ingredients: string[]): Promise<Meal[]> {
    const { meals } = await this.get(`/filter.php?i=${_.join(ingredients, ',')}`)
    return this.normalize(meals, this.mealReducer)
  }

  // Search for some meals by category
  async getMealsByCategory (category: string): Promise<Meal[]> {
    const { meals } = await this.get(`/filter.php?c=${category}`)
    return this.normalize(meals, this.mealReducer)
  }

  // Search for some meals by area (Italian, Japanese, etc.)
  async getMealsByArea (area: Area): Promise<Meal[]> {
    const { meals } = await this.get(`/filter.php?a=${area}`)
    return this.normalize(meals, this.mealReducer)
  }
}
