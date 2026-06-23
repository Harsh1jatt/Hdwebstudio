import { requireAdmin } from '../../lib/adminAuth';
import connectDB from '../../lib/db';
import Contact from '../../models/Contact';
import AdminLayout from '../../components/Admin/AdminLayout.client';
import GlassCard from '../../components/common/GlassCard';
import DashboardCard from '../../components/common/DashboardCard';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable.client';
import LeadsSparkline from '../../components/common/LeadsSparkline.client';

export default async function AdminPage(){
  const session = await requireAdmin();
  await connectDB();
  const leads = await Contact.find().sort({ createdAt: -1 }).limit(200).lean();

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Message', accessor: 'message' },
    { header: 'Created', accessor: 'created' }
  ];

  const leadsForClient = leads.map(l => ({ ...l, created: new Date(l.createdAt).toLocaleString() }));

  return (
    <AdminLayout>
      <PageHeader title="Dashboard" subtitle={`Signed in as ${session.user.email}`} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Leads" value={leads.length} />
        <DashboardCard title="New Leads Today" value={leads.filter(l=>{ const d=new Date(l.createdAt); const today=new Date(); return d.toDateString()===today.toDateString(); }).length} />
        <DashboardCard title="Total Projects" value={12} />
        <DashboardCard title="Conversion Rate" value={`7.8%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Leads Trend</h3>
          <LeadsSparkline leads={JSON.parse(JSON.stringify(leads))} />
        </GlassCard>
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
          <DataTable columns={columns} data={JSON.parse(JSON.stringify(leadsForClient))} />
        </GlassCard>
      </div>
    </AdminLayout>
  )
}
