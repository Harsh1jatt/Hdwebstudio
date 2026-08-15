"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function MediaManager() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingAlt, setEditingAlt] = useState(null);
  const [altValue, setAltValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12 });
      if (search) params.set("search", search);
      if (folder) params.set("folder", folder);
      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();
      setMedia(data.media || data.items || data.data || []);
      setTotalPages(data.totalPages || data.pages || 1);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [page, search, folder]);

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
      if (folder) fd.append("folder", folder);
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

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  const handleAltSave = async (id) => {
    try {
      await fetch(`/api/admin/media/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt: altValue }),
      });
      setMedia((prev) =>
        prev.map((m) => (m._id === id ? { ...m, alt: altValue } : m))
      );
    } catch {
      /* ignore */
    } finally {
      setEditingAlt(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      setMedia((prev) => prev.filter((m) => m._id !== id));
    } catch {
      /* ignore */
    } finally {
      setDeleteId(null);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const folders = [...new Set(media.map((m) => m.folder).filter(Boolean))];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Media</h1>
        <div className="flex gap-2">
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
            Upload
          </AdminButton>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <AdminInput
            id="media-search"
            label=""
            placeholder="Search by filename or alt text..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        {folders.length > 0 && (
          <select
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-700 shadow-sm"
          >
            <option value="">All folders</option>
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <AdminLoader />
      ) : media.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16 shadow-sm">
          <svg
            className="mb-3 h-12 w-12 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm font-medium text-slate-500">No media found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {media.map((item) => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.alt || item.filename}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2 p-3">
                  <p
                    className="truncate text-xs font-medium text-slate-700"
                    title={item.filename}
                  >
                    {item.filename}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatSize(item.size)}
                  </p>

                  {editingAlt === item._id ? (
                    <div className="flex gap-1">
                      <input
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs"
                        value={altValue}
                        onChange={(e) => setAltValue(e.target.value)}
                        placeholder="Alt text"
                      />
                      <button
                        onClick={() => handleAltSave(item._id)}
                        className="rounded-lg bg-blue-600 px-2 py-1 text-xs text-white"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditingAlt(null)}
                        className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <p
                      className="cursor-pointer truncate text-[11px] text-slate-400 hover:text-blue-600"
                      title="Click to edit alt text"
                      onClick={() => {
                        setEditingAlt(item._id);
                        setAltValue(item.alt || "");
                      }}
                    >
                      {item.alt || "No alt text — click to add"}
                    </p>
                  )}

                  <div className="flex gap-1.5 pt-1">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="flex-1 rounded-lg bg-slate-100 px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-200"
                    >
                      Copy URL
                    </button>
                    {deleteId === item._id ? (
                      <>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex-1 rounded-lg bg-red-600 px-2 py-1.5 text-[11px] font-medium text-white"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteId(null)}
                          className="rounded-lg bg-slate-100 px-2 py-1.5 text-[11px] font-medium text-slate-600"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteId(item._id)}
                        className="flex-1 rounded-lg bg-red-50 px-2 py-1.5 text-[11px] font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
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
        </>
      )}
    </div>
  );
}
