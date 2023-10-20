import { writable } from 'svelte/store';

export const ingredients = writable<string[]>([]);

export const addIngredient = (ingredientName: string) => {
	ingredients.update((cur) => [...cur, ingredientName]);
};

export const removeIngredient = (ingredientName: string) => {
	ingredients.update((ingredients) =>
		ingredients.filter((ingredient) => ingredient != ingredientName)
	);
};
