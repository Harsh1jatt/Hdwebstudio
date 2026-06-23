import connectDB from '../../lib/db';
import Admin from '../../models/Admin';
import SetupAdminForm from '../../components/Admin/SetupAdminForm.client';
import { redirect } from 'next/navigation';

export default async function SetupAdminPage(){
  await connectDB();
  const cnt = await Admin.countDocuments();
  if (cnt > 0) redirect('/admin/login');
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <SetupAdminForm />
    </div>
  );
}
