"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function MediaPicker({ value, onChange, label = "Image" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 block text-[13px] font-semibold text-slate-700">
          {label}
        </p>
      )}

      {value ? (
        <div className="relative inline-block overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <img
            src={value}
            alt="Selected"
            className="h-32 w-32 object-cover"
          />
          <div className="flex gap-1 p-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex-1 rounded-lg bg-red-50 px-2 py-1 text-[11px] font-medium text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-blue-400 hover:text-blue-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs font-medium">Select Image</span>
        </button>
      )}

      {open && (
        <PickerModal
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

function PickerModal({ onSelect, onClose }) {
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
      const params = new URLSearchParams({ page, perPage: 12 });
      if (search) params.set("q", search);
      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();
      setMedia(data.media || data.items || data.data || []);
      setTotalPages(data.totalPages || data.pages || 1);
    } catch {
      /* ignore */
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
      if (!res.ok) throw new Error();
      await fetchMedia();
    } catch {
      /* ignore */
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-16"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Select Media</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-3 border-b border-slate-100 px-6 py-3">
          <div className="flex-1">
            <AdminInput
              id="picker-search"
              label=""
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="flex items-end">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <AdminButton
              onClick={() => fileRef.current?.click()}
              loading={uploading}
              loadingText="Uploading..."
            >
              Upload New
            </AdminButton>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {loading ? (
            <AdminLoader />
          ) : media.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">
              No media found
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {media.map((item) => (
                <button
                  key={item.id || item._id}
                  type="button"
                  onClick={() => onSelect(item.url)}
                  className="group overflow-hidden rounded-xl border border-slate-200 transition hover:border-blue-400 hover:ring-2 hover:ring-blue-400/30"
                >
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="truncate px-2 py-1.5 text-[11px] text-slate-500">
                    {item.filename}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 border-t border-slate-100 px-6 py-3">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-slate-500">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
