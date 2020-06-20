"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        mealByName: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealByName(args.name);
            return data;
        },
        mealsByFirstLetter: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealsByFirstLetter(args.letter);
            return data;
        },
        mealByID: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealByID(args.id);
            return data;
        },
        randomMeal: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getRandomMeal();
            return data;
        },
        randomMealSelection: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getRandomMealSelection();
            return data;
        },
        allCategories: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getAllCategories();
            return data;
        },
        allIngredients: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getAllIngredients();
            return data;
        },
        latestMeals: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getLatestMeals();
            return data;
        },
        mealsByMainIngredient: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealsByMainIngredient(args.mainIngredient);
            return data;
        },
        mealsByIngredients: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealsByIngredients(args.ingredients);
            return data;
        },
        mealsByCategory: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealsByCategory(args.category);
            return data;
        },
        mealsByArea: async (parent, args, ctx) => {
            const data = ctx.dataSources.mealsAPI.getMealsByArea(args.area);
            return data;
        }
    }
};
exports.default = resolvers;
