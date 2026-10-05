import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import { Layout } from "@/components/clc/Layout";
import { useClc } from "@/lib/clc/store";

export const Route = createFileRoute("/prescription")({
  component: PrescriptionPage,
  head: () => ({ meta: [{ title: "Upload Prescription — CLC CureLifeCare" }] }),
});

function PrescriptionPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addPrescription = useClc((s) => s.addPrescription);
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);
  const [drag, setDrag] = useState(false);

  function handle(f: File) {
    setFile(f);
    setDone(false);
  }

  return (
    <Layout>
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Prescription
          </div>
          <h1>Upload prescription</h1>
          <p>JPG, PNG or PDF — reviewed by a pharmacist in the admin queue</p>
        </div>
        <div className="card" style={{ maxWidth: 560, padding: 24, marginBottom: 48 }}>
          <div
            className={`upload-zone ${drag ? "drag" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              const f = e.dataTransfer.files[0];
              if (f) handle(f);
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handle(f);
              }}
            />
            <FileUp size={28} style={{ margin: "0 auto 10px", color: "var(--color-forest)" }} />
            <p style={{ fontWeight: 500, marginBottom: 6 }}>Drop file here or click to browse</p>
            <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>JPG, PNG or PDF · Max 5 MB</p>
          </div>
          {file ? (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: "0.9rem" }}>
                <strong>
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </strong>
              </p>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginTop: 12 }}
                onClick={() => {
                  addPrescription(file.name, Math.round(file.size / 1024));
                  setDone(true);
                }}
              >
                Submit for review
              </button>
            </div>
          ) : null}
          {done ? (
            <p style={{ marginTop: 16, color: "var(--color-forest)", fontWeight: 500 }}>
              Prescription submitted. A pharmacist will review it from the admin dashboard.
            </p>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
