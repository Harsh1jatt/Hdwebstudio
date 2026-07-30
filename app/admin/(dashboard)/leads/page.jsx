import { requireAdmin } from '../../../../lib/auth';
import LeadsManager from '../../../../components/admin/leads/LeadsManager';

export default async function AdminLeadsPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <LeadsManager />
    </div>
  );
}
