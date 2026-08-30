import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

/**
 * Cloudinary folder mapping.
 *
 * hd-web-studios/
 * ├── services/
 * ├── projects/
 * ├── team/
 * ├── media/
 * └── og/
 */
const FOLDERS = {
  services: "hd-web-studios/services",
  projects: "hd-web-studios/projects",
  team: "hd-web-studios/team",
  media: "hd-web-studios/media",
  og: "hd-web-studios/og",
  general: "hd-web-studios/media",
};

export function getCloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();
  const cloudName = (
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    ""
  )
    .replace(/^["']|["']$/g, "")
    .trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "")
    .replace(/^["']|["']$/g, "")
    .trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "")
    .replace(/^["']|["']$/g, "")
    .trim();

  return { cloudinaryUrl, cloudName, apiKey, apiSecret };
}

export function isCloudinaryConfigured() {
  const { cloudinaryUrl, cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  if (cloudinaryUrl && cloudinaryUrl.startsWith("cloudinary://")) {
    return true;
  }
  return Boolean(cloudName && apiKey && apiSecret);
}

export function configureCloudinary() {
  const { cloudinaryUrl, cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  if (cloudinaryUrl && cloudinaryUrl.startsWith("cloudinary://")) {
    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
      secure: true,
    });
    return true;
  }

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    return true;
  }

  return false;
}

function slugifyForCloudinary(title) {
  return (
    String(title || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "untitled"
  );
}

function sanitizeFilename(filename) {
  const withoutExtension = String(filename || "upload").replace(/\.[^.]+$/, "");

  return (
    withoutExtension
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "upload"
  );
}

/**
 * Upload a buffer directly to Cloudinary via streaming.
 */
export async function uploadToCloudinary(
  buffer,
  {
    filename,
    mimeType,
    folder = "media",
    title = "",
    alt = "",
  } = {}
) {
  const isReady = configureCloudinary();
  if (!isReady) {
    throw new Error(
      "Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables."
    );
  }

  const folderPath = FOLDERS[folder] || FOLDERS.media;

  let assetName;
  if (title) {
    const slug = slugifyForCloudinary(title);
    const suffix = Math.random().toString(36).slice(2, 7);
    assetName = `${slug}-${suffix}`;
  } else {
    const safeName = sanitizeFilename(filename);
    const suffix = Date.now().toString(36);
    assetName = `${safeName}-${suffix}`;
  }

  const resourceType = mimeType?.startsWith("image/") ? "image" : "auto";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        public_id: assetName,
        resource_type: resourceType,
        context: alt ? `alt=${encodeURIComponent(alt)}` : undefined,
        overwrite: false,
        unique_filename: true,
      },
      (error, uploadResult) => {
        if (error) {
          console.error("[Cloudinary] Upload error:", error);
          reject(new Error(error.message || "Cloudinary upload failed"));
          return;
        }

        if (!uploadResult || !uploadResult.secure_url) {
          reject(new Error("Cloudinary upload failed to return a secure URL"));
          return;
        }

        resolve({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          width: uploadResult.width || 0,
          height: uploadResult.height || 0,
          format: uploadResult.format || "",
        });
      }
    );

    const readable = Readable.from(buffer);
    readable.on("error", (err) => {
      console.error("[Cloudinary] Buffer stream error:", err);
      reject(err);
    });
    uploadStream.on("error", (err) => {
      console.error("[Cloudinary] UploadStream error:", err);
      reject(err);
    });

    readable.pipe(uploadStream);
  });
}

/**
 * Delete an asset from Cloudinary by public ID.
 */
export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  configureCloudinary();

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result?.result !== "ok" && result?.result !== "not found") {
      console.warn("[Cloudinary] Unexpected delete result:", result);
    }
    return result;
  } catch (error) {
    console.error("[Cloudinary] Delete failed:", error?.message || error);
    throw error;
  }
}

/**
 * Extract a Cloudinary public ID from a URL.
 */
export function extractPublicId(url) {
  if (!url || !url.includes("cloudinary.com")) {
    return null;
  }

  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    let publicPath = url.slice(uploadIndex + "/upload/".length);

    const segments = publicPath.split("/");

    // Remove transformation segments
    while (
      segments.length > 0 &&
      (segments[0].includes(",") ||
        segments[0].startsWith("c_") ||
        segments[0].startsWith("w_") ||
        segments[0].startsWith("h_") ||
        segments[0].startsWith("q_") ||
        segments[0].startsWith("f_"))
    ) {
      segments.shift();
    }

    // Remove version segment (e.g. v123456789)
    if (segments[0] && /^v\d+$/.test(segments[0])) {
      segments.shift();
    }

    if (segments.length === 0) return null;

    publicPath = segments.join("/");
    publicPath = publicPath.replace(/\.[a-zA-Z0-9]+$/, "");

    return publicPath || null;
  } catch {
    return null;
  }
}

export { FOLDERS };
export default cloudinary;