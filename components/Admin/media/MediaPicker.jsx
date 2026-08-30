"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import { Plus, X, Image as ImageIcon, UploadCloud, Check } from "lucide-react";

export default function MediaPicker({ value, onChange, label = "Image" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-[13px] font-semibold text-slate-700">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative inline-block overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <div className="relative aspect-video w-48 overflow-hidden rounded-xl bg-slate-100 sm:w-60">
            <img
              src={value}
              alt="Selected Asset"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-1.5 flex gap-1.5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex-1 rounded-lg bg-slate-100 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex-1 rounded-lg bg-red-50 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-32 w-full max-w-sm flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-xs">
            <ImageIcon className="h-5 w-5 text-slate-400" />
          </div>
          <span className="text-xs font-semibold">Select / Upload Image</span>
        </button>
      )}

      {open && (
        <PickerModal
          selectedUrl={value}
          onSelect={(url) => {
            onChange(url);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function PickerModal({ selectedUrl, onSelect, onClose }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fileRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: "16" });
      if (search.trim()) params.set("q", search.trim());
      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();
      setMedia(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to upload image.");
      }

      if (data?.item?.url) {
        onSelect(data.item.url);
      } else {
        await fetchMedia();
      }
    } catch (err) {
      alert(err.message || "Upload failed. Please check file format and size.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Media Library</h2>
            <p className="text-xs text-slate-500">Select an existing image or upload a new one.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-6 py-3 bg-slate-50/50">
          <div className="flex-1 min-w-[200px]">
            <AdminInput
              id="picker-search"
              placeholder="Search by name or alt text..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              className="hidden"
              onChange={handleUpload}
            />
            <AdminButton
              type="button"
              onClick={() => fileRef.current?.click()}
              loading={uploading}
              loadingText="Uploading..."
            >
              <UploadCloud className="h-4 w-4" />
              Upload Image
            </AdminButton>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <AdminLoader />
          ) : media.length === 0 ? (
            <div className="py-12 text-center">
              <ImageIcon className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-2 text-sm font-semibold text-slate-700">No images found</p>
              <p className="mt-1 text-xs text-slate-400">Click &quot;Upload Image&quot; above to add your first asset.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {media.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.url)}
                    className={`group relative overflow-hidden rounded-xl border text-left transition ${
                      isSelected
                        ? "border-blue-600 ring-2 ring-blue-600/30"
                        : "border-slate-200 hover:border-blue-400 hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                    {isSelected && (
                      <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <div className="p-2 bg-white">
                      <p className="truncate text-[11px] font-semibold text-slate-800">
                        {item.filename || item.originalName || "Asset"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-3">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
