import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../../../../controllers/postController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const posts = await getAllPosts();
    return Response.json({ success: true, data: posts, message: 'Fetched all posts' });
  } else {
    const post = await getPostById(params.id);
    return Response.json({ success: true, data: post, message: 'Fetched post' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const post = await createPost(data);
  return Response.json({ success: true, data: post, message: 'Post created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const post = await updatePost(params.id, data);
  return Response.json({ success: true, data: post, message: 'Post updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deletePost(params.id);
  return Response.json({ success: true, data: null, message: 'Post deleted' });
}
