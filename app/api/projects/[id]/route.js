import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../../../../controllers/projectController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const projects = await getAllProjects();
    return Response.json({ success: true, data: projects, message: 'Fetched all projects' });
  } else {
    const project = await getProjectById(params.id);
    return Response.json({ success: true, data: project, message: 'Fetched project' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const project = await createProject(data);
  return Response.json({ success: true, data: project, message: 'Project created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const project = await updateProject(params.id, data);
  return Response.json({ success: true, data: project, message: 'Project updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteProject(params.id);
  return Response.json({ success: true, data: null, message: 'Project deleted' });
}
