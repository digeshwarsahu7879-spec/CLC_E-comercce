import { createFileRoute, Link } from "@tanstack/react-router";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";

export const Route = createFileRoute("/admin/prescriptions")({
  component: AdminRx,
  head: () => ({ meta: [{ title: "Admin Prescriptions — CLC" }] }),
});

function AdminRx() {
  const prescriptions = useClc((s) => s.prescriptions);
  const setPrescriptionStatus = useClc((s) => s.setPrescriptionStatus);
  const showToast = useClc((s) => s.showToast);

  return (
    <AdminLayout active="rx">
      <h1 className="admin-page-title">Prescriptions</h1>
      <p className="admin-page-sub">Customer uploads from the storefront appear here for pharmacist review.</p>
      {prescriptions.length === 0 ? (
        <div className="card" style={{ padding: 28, textAlign: "center" }}>
          <p style={{ color: "var(--color-muted)", marginBottom: 12 }}>No prescription uploads yet.</p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", marginBottom: 20 }}>
            Customers can submit a file from the storefront upload page.
          </p>
          <Link to="/prescription" className="btn btn-ghost">
            Open customer upload page
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>File</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.id}</strong>
                    </td>
                    <td>{p.customerName}</td>
                    <td>
                      {p.fileName}
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{p.sizeKb} KB</span>
                    </td>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                    <td>
                      <span
                        className={`status-pill ${p.status === "reviewed" ? "status-ok" : p.status === "rejected" ? "status-bad" : "status-warn"}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        {p.status === "pending" ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setPrescriptionStatus(p.id, "reviewed");
                                showToast("Prescription approved");
                              }}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => {
                                setPrescriptionStatus(p.id, "rejected");
                                showToast("Prescription rejected");
                              }}
                            >
                              Reject
                            </button>
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
