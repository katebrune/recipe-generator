<script>
	import { addIngredient, ingredients, removeIngredient } from '../stores/ingredientStore';

	let ingredientToAdd = '';
	function handleSubmit() {
		addIngredient(ingredientToAdd);
		ingredientToAdd = '';
	}

	let query = 'What recipe can I make with ... ?';
	ingredients.subscribe((v) => {
		v.length > 0
			? (query = `What recipe can I make with ${v.join(', ')}?`)
			: (query = 'What recipe can I make with ... ?');
	});

	let output = undefined;
	let loading = false;
	async function generateRecipe() {
		loading = true;
		const response = await fetch('/api/chat-completion', {
			method: 'POST',
			body: JSON.stringify({
				text: query
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		output = await response.json();
		loading = false;
	}
</script>

<main class="h-full overflow-scroll">
	<h1 class="text-2xl font-bold text-center text-gray-700 md:text-3xl">Recipe Generator</h1>
	<div class="border-2 border-blue-300 rounded-lg p-2 bg-blue-200 text-gray-700 font-noraml my-4">
		<ol>
			<li>1. Add ingredients that you have available on the left</li>
			<li>2. Click button on the right to generate a recipe you could make!</li>
		</ol>
	</div>
	<div class="grid grid-cols-2 gap-4 overflow-hidden">
		<div class="col-span-1">
			<form class="" on:submit|preventDefault={handleSubmit}>
				<div class="flex flex-col text-sm mb-2">
					<label for="ingredient" class="font-bold mb-2 text-gray-600">Ingredient:</label>
					<input
						required
						type="text"
						name="ingredien"
						bind:value={ingredientToAdd}
						placeholder="What ingredient do you have?"
						class="appearance-none bg-white flex items-center shadow-sm border border-gray-200 rounded-md my-2 py-2 px-4 focus:outline-none focus:border-gray-500 rounded-lg bg-gray-50 shadow-sm"
					/>
				</div>
				<button
					type="submit"
					class="w-full shadow-sm rounded bg-blue-700 hover:bg-blue-600 text-gray-100 font-medium py-2 px-4"
					>Add</button
				>
			</form>
			<div class="overflow-y-auto">
				{#each $ingredients as ingredient}
					<li
						class="bg-white flex items-center shadow-sm border border-gray-200 rounded-md my-2 py-2 px-4"
					>
						<span class="flex-1 text-gray-800">{ingredient}</span>
						<button
							type="button"
							class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
							on:click={() => removeIngredient(ingredient)}>Delete</button
						>
					</li>
				{/each}
			</div>
		</div>
		<div class="col-span-1">
			<div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-600 mt-6 shadow-lg">
				<div class="my-4 text-gray-700 font-semibold font-mono tracking-wide">
					{query}
				</div>
				{#if loading}
					<div role="status" class="max-w-sm animate-pulse">
						<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
						<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
						<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
						<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
						<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
						<span class="sr-only">Loading...</span>
					</div>
				{/if}
				{#if !loading && output}
					{output}
				{/if}
			</div>
			<button
				on:click={generateRecipe}
				class="w-full shadow-sm rounded bg-blue-700 hover:bg-blue-600 text-gray-100 font-medium py-2 px-4 mt-4"
				>✨ Generate Recipe</button
			>
		</div>
	</div>
</main>
