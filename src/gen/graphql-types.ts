import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  allCategories: Maybe<Array<Maybe<Category>>>;
  allIngredients: Maybe<Array<Maybe<Ingredient>>>;
  latestMeals: Maybe<Array<Maybe<Meal>>>;
  mealByID: Maybe<Meal>;
  mealByName: Maybe<Meal>;
  mealsByArbitraryString: Maybe<Array<Maybe<Meal>>>;
  mealsByArea: Maybe<Array<Maybe<Meal>>>;
  mealsByCategory: Maybe<Array<Maybe<Meal>>>;
  mealsByFirstLetter: Maybe<Array<Maybe<Meal>>>;
  mealsByIngredients: Maybe<Array<Maybe<Meal>>>;
  mealsByMainIngredient: Maybe<Array<Maybe<Meal>>>;
  randomMeal: Maybe<Meal>;
  randomMealSelection: Maybe<Array<Maybe<Meal>>>;
};


export type QueryMealByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMealByNameArgs = {
  name: Scalars['String'];
};


export type QueryMealsByArbitraryStringArgs = {
  str: Scalars['String'];
};


export type QueryMealsByAreaArgs = {
  area: Area;
};


export type QueryMealsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryMealsByFirstLetterArgs = {
  letter: Scalars['String'];
};


export type QueryMealsByIngredientsArgs = {
  ingredients: Maybe<Array<Scalars['String']>>;
};


export type QueryMealsByMainIngredientArgs = {
  mainIngredient: Scalars['String'];
};


export type QueryRandomMealArgs = {
  id: Scalars['Int'];
};


export type QueryRandomMealSelectionArgs = {
  id: Scalars['Int'];
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  drinkAlternate: Maybe<Scalars['String']>;
  category: Maybe<Scalars['String']>;
  area: Maybe<Scalars['String']>;
  instructions: Maybe<Array<Maybe<Scalars['String']>>>;
  thumbnail: Maybe<Scalars['String']>;
  tags: Maybe<Array<Maybe<Scalars['String']>>>;
  youtube: Maybe<Scalars['String']>;
  ingredients: Maybe<Array<Maybe<MeasuredIngredient>>>;
  source: Maybe<Scalars['String']>;
  dateModified: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  thumbnail: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  kind: Maybe<Scalars['String']>;
};

export type MeasuredIngredient = {
  __typename?: 'MeasuredIngredient';
  name: Maybe<Scalars['String']>;
  amount: Maybe<Scalars['String']>;
};

export enum Area {
  American = 'AMERICAN',
  British = 'BRITISH',
  Canadian = 'CANADIAN',
  Chinese = 'CHINESE',
  Dutch = 'DUTCH',
  Egyptian = 'EGYPTIAN',
  French = 'FRENCH',
  Greek = 'GREEK',
  Indian = 'INDIAN',
  Irish = 'IRISH',
  Italian = 'ITALIAN',
  Jamaican = 'JAMAICAN',
  Japanese = 'JAPANESE',
  Kenyan = 'KENYAN',
  Malaysian = 'MALAYSIAN',
  Mexican = 'MEXICAN',
  Moroccan = 'MOROCCAN',
  Russian = 'RUSSIAN',
  Spanish = 'SPANISH',
  Thai = 'THAI',
  Tunisian = 'TUNISIAN',
  Turkish = 'TURKISH',
  Unknown = 'UNKNOWN',
  Vietnamese = 'VIETNAMESE'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Meal: ResolverTypeWrapper<Meal>;
  Category: ResolverTypeWrapper<Category>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  MeasuredIngredient: ResolverTypeWrapper<MeasuredIngredient>;
  Area: Area;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars['Int'];
  String: Scalars['String'];
  Meal: Meal;
  Category: Category;
  Ingredient: Ingredient;
  MeasuredIngredient: MeasuredIngredient;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allCategories: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  allIngredients: Resolver<Maybe<Array<Maybe<ResolversTypes['Ingredient']>>>, ParentType, ContextType>;
  latestMeals: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType>;
  mealByID: Resolver<Maybe<ResolversTypes['Meal']>, ParentType, ContextType, RequireFields<QueryMealByIdArgs, 'id'>>;
  mealByName: Resolver<Maybe<ResolversTypes['Meal']>, ParentType, ContextType, RequireFields<QueryMealByNameArgs, 'name'>>;
  mealsByArbitraryString: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryMealsByArbitraryStringArgs, 'str'>>;
  mealsByArea: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryMealsByAreaArgs, 'area'>>;
  mealsByCategory: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryMealsByCategoryArgs, 'category'>>;
  mealsByFirstLetter: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryMealsByFirstLetterArgs, 'letter'>>;
  mealsByIngredients: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryMealsByIngredientsArgs, never>>;
  mealsByMainIngredient: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryMealsByMainIngredientArgs, 'mainIngredient'>>;
  randomMeal: Resolver<Maybe<ResolversTypes['Meal']>, ParentType, ContextType, RequireFields<QueryRandomMealArgs, 'id'>>;
  randomMealSelection: Resolver<Maybe<Array<Maybe<ResolversTypes['Meal']>>>, ParentType, ContextType, RequireFields<QueryRandomMealSelectionArgs, 'id'>>;
};

export type MealResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meal'] = ResolversParentTypes['Meal']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  drinkAlternate: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  area: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instructions: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  thumbnail: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  youtube: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ingredients: Resolver<Maybe<Array<Maybe<ResolversTypes['MeasuredIngredient']>>>, ParentType, ContextType>;
  source: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateModified: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MeasuredIngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeasuredIngredient'] = ResolversParentTypes['MeasuredIngredient']> = {
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Query: QueryResolvers<ContextType>;
  Meal: MealResolvers<ContextType>;
  Category: CategoryResolvers<ContextType>;
  Ingredient: IngredientResolvers<ContextType>;
  MeasuredIngredient: MeasuredIngredientResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
