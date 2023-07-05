import Prompt from '@models/prompt';
import { connectToDB } from '@utils/db';

// GET

export const GET = async (request, { params }) => {
  // const { userId } = request.query;

  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

// PUT OR PATCH - UPDATE PROMPT

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    let promptToBeUpdated = await Prompt.findById(params.id);
    if (!promptToBeUpdated) {
      return new Response('Prompt not found', { status: 404 });
    }

    promptToBeUpdated.prompt = prompt;
    promptToBeUpdated.tag = tag;
    const updatedPrompt = await promptToBeUpdated.save();
    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 });
  }
};

// DELETE

// export const DELETE = async (request, { params }) => {
//   try {
//     await connectToDB();
//     // await Prompt.findByIdAndDelete(params.id);
//     const promptToBeDeleted = await Prompt.findById(params.id);
//     if (!promptToBeDeleted) {
//       return new Response('Prompt not found', { status: 404 });
//     }
//     await promptToBeDeleted.remove();
//     return new Response('Prompt deleted successfully', { status: 200 });
//   } catch (error) {
//     return new Response('Failed to delete prompt', { status: 500 });
//   }
// };

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting prompt', { status: 500 });
  }
};
