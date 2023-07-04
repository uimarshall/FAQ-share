import Prompt from '@models/prompt';
import { connectToDB } from '@utils/db';

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};

// export const POST = async (req, res) => {
//   const { userId, prompt, tag } = await req.json();
//   try {
//     await connectToDB();
//     const newPrompt = await Prompt.create({ creator: userId, prompt, tag });
//     res.status(201).json({ success: true, data: newPrompt });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
