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
      const params = new URLSearchParams({
        page: String(page),
        perPage: "24",
      });

      if (search.trim()) {
        params.set("q", search.trim());
      }

      if (folder) {
        params.set("folder", folder);
      }

      const res = await fetch(`/api/admin/media?${params.toString()}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load media");
      }

      setMedia(Array.isArray(data.items) ? data.items : []);
      setTotalPages(Number(data.totalPages) || 1);
    } catch (error) {
      console.error("Failed to fetch media:", error);
      setMedia([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, search, folder]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      if (folder) {
        formData.append("folder", folder);
      }

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setPage(1);

      // Refresh media list.
      await fetchMedia();
    } catch (error) {
      console.error("Media upload failed:", error);
      alert(error.message || "Failed to upload media");
    } finally {
      setUploading(false);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  const handleCopy = async (url) => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleAltSave = async (id) => {
    if (!id) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alt: altValue.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update alt text");
      }

      setMedia((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                alt: altValue.trim(),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update alt text:", error);
      alert(error.message || "Failed to update alt text");
    } finally {
      setEditingAlt(null);
      setAltValue("");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete media");
      }

      setMedia((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete media:", error);
      alert(error.message || "Failed to delete media");
    } finally {
      setDeleteId(null);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "—";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1048576) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  /*
   * Folder values come from the current result set.
   * The API stores the logical folder key:
   * blog, services, projects, stories, team, media, og, general.
   */
  const folders = [
    ...new Set(
      media
        .map((item) => item.folder)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Media Library
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Upload, manage and organize your website images.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
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

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <AdminInput
            id="media-search"
            label=""
            placeholder="Search by filename or alt text..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
              setDeleteId(null);
            }}
          />
        </div>

        {folders.length > 0 && (
          <select
            value={folder}
            onChange={(event) => {
              setFolder(event.target.value);
              setPage(1);
              setDeleteId(null);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All folders</option>

            {folders.map((folderName) => (
              <option key={folderName} value={folderName}>
                {folderName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Content */}
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

          <p className="text-sm font-medium text-slate-500">
            No media found
          </p>

          {(search || folder) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFolder("");
                setPage(1);
              }}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Media grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {media.map((item) => {
              /*
               * IMPORTANT:
               * API returns `id`, not `_id`.
               *
               * Using item._id here caused every card to have
               * undefined as its ID, which made delete confirmation
               * appear on every card.
               */
              const itemId = item.id;

              const isEditingAlt = editingAlt === itemId;
              const isDeleting = deleteId === itemId;

              return (
                <div
                  key={itemId}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={item.url}
                      alt={item.alt || item.originalName || item.filename || "Media"}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-2 p-3">
                    <p
                      className="truncate text-xs font-medium text-slate-700"
                      title={item.filename}
                    >
                      {item.filename || item.originalName || "Untitled"}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] text-slate-400">
                        {formatSize(item.size)}
                      </p>

                      {item.folder && (
                        <span className="max-w-[120px] truncate rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                          {item.folder}
                        </span>
                      )}
                    </div>

                    {/* Alt text */}
                    {isEditingAlt ? (
                      <div className="flex gap-1">
                        <input
                          autoFocus
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-blue-500"
                          value={altValue}
                          onChange={(event) =>
                            setAltValue(event.target.value)
                          }
                          placeholder="Alt text"
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleAltSave(itemId);
                            }

                            if (event.key === "Escape") {
                              setEditingAlt(null);
                              setAltValue("");
                            }
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => handleAltSave(itemId)}
                          className="rounded-lg bg-blue-600 px-2 py-1 text-xs text-white transition hover:bg-blue-700"
                          title="Save alt text"
                        >
                          ✓
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingAlt(null);
                            setAltValue("");
                          }}
                          className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 transition hover:bg-slate-200"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="block w-full truncate text-left text-[11px] text-slate-400 hover:text-blue-600"
                        title="Click to edit alt text"
                        onClick={() => {
                          setEditingAlt(itemId);
                          setAltValue(item.alt || "");
                        }}
                      >
                        {item.alt || "No alt text — click to add"}
                      </button>
                    )}

                    {/* Actions */}
                    <div className="flex gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.url)}
                        className="flex-1 rounded-lg bg-slate-100 px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-200"
                      >
                        Copy URL
                      </button>

                      {isDeleting ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleDelete(itemId)}
                            className="flex-1 rounded-lg bg-red-600 px-2 py-1.5 text-[11px] font-medium text-white transition hover:bg-red-700"
                          >
                            Confirm
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteId(null)}
                            className="rounded-lg bg-slate-100 px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-200"
                            title="Cancel delete"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteId(itemId);
                            setEditingAlt(null);
                            setAltValue("");
                          }}
                          className="flex-1 rounded-lg bg-red-50 px-2 py-1.5 text-[11px] font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  setPage((current) => current - 1);
                  setDeleteId(null);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-slate-500">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => {
                  setPage((current) => current + 1);
                  setDeleteId(null);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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