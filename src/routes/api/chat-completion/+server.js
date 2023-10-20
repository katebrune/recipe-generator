import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { text } = await request.json();

	return await openai.chat.completions
		.create({
			messages: [{ role: 'user', content: text }],
			model: 'gpt-3.5-turbo'
		})
		.then((output) => {
			return json(output.choices[0].message.content);
		});
}
