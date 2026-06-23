import { requireAdmin } from '../../../lib/adminAuth';
import connectDB from '../../../lib/db';
import Contact from '../../../models/Contact';
import AdminLayout from '../../../components/Admin/AdminLayout.client';
import GlassCard from '../../../components/common/GlassCard';
import PageHeader from '../../../components/common/PageHeader';
import DataTable from '../../../components/common/DataTable.client';
import LeadsManager from '../../../components/Admin/LeadsManager.client';

export default async function LeadsPage(){
  const session = await requireAdmin();
  await connectDB();
  const leads = await Contact.find().sort({ createdAt: -1 }).limit(100).lean();

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Message', accessor: 'message' },
    { header: 'Created', accessor: 'created' }
  ];

  return (
    <AdminLayout>
      <PageHeader title="Leads" subtitle={`Signed in as ${session.user.email}`} />
      <GlassCard>
        <LeadsManager initial={JSON.parse(JSON.stringify(leads))} />
      </GlassCard>
    </AdminLayout>
  )
}
