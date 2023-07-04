import Prompt from '@models/prompt';
import { connectToDB } from '@utils/db';

export const GET = async (request, { params }) => {
  // const { userId } = request.query;

  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      'creator'
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
