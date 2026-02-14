import { getAllTeam, getTeamById, createTeam, updateTeam, deleteTeam } from '../../../../controllers/teamController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const team = await getAllTeam();
    return Response.json({ success: true, data: team, message: 'Fetched all team members' });
  } else {
    const member = await getTeamById(params.id);
    return Response.json({ success: true, data: member, message: 'Fetched team member' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const member = await createTeam(data);
  return Response.json({ success: true, data: member, message: 'Team member created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const member = await updateTeam(params.id, data);
  return Response.json({ success: true, data: member, message: 'Team member updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteTeam(params.id);
  return Response.json({ success: true, data: null, message: 'Team member deleted' });
}
