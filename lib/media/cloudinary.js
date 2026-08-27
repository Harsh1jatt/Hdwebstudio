import { v2 as cloudinary } from "cloudinary";

/*
 * Configure Cloudinary once.
 */
if (!cloudinary.config().cloud_name) {
  cloudinary.config({
    cloud_name:
      process.env.CLOUDINARY_CLOUD_NAME,

    api_key:
      process.env.CLOUDINARY_API_KEY,

    api_secret:
      process.env.CLOUDINARY_API_SECRET,

    secure: true,
  });
}

/*
 * Cloudinary folder structure.
 *
 * Cloudinary:
 *
 * hd-web-studios/
 * ├── blog/
 * ├── services/
 * ├── projects/
 * ├── stories/
 * ├── team/
 * ├── media/
 * └── og/
 */
const FOLDERS = {
  blog: "hd-web-studios/blog",
  services: "hd-web-studios/services",
  projects: "hd-web-studios/projects",
  stories: "hd-web-studios/stories",
  team: "hd-web-studios/team",
  media: "hd-web-studios/media",
  og: "hd-web-studios/og",
  general: "hd-web-studios/media",
};

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
  const withoutExtension = String(
    filename || "upload"
  ).replace(/\.[^.]+$/, "");

  return (
    withoutExtension
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "upload"
  );
}

/**
 * Upload a buffer to Cloudinary.
 *
 * IMPORTANT:
 *
 * We use:
 *
 * folder: "hd-web-studios/blog"
 *
 * and:
 *
 * public_id: "my-blog-image-abc1"
 *
 * instead of putting the entire folder path inside public_id.
 *
 * This ensures Cloudinary actually places the asset inside
 * the requested folder.
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
  const folderPath =
    FOLDERS[folder] || FOLDERS.media;

  let assetName;

  if (title) {
    const slug =
      slugifyForCloudinary(title);

    const suffix = Math.random()
      .toString(36)
      .slice(2, 7);

    assetName = `${slug}-${suffix}`;
  } else {
    const safeName =
      sanitizeFilename(filename);

    const suffix = Date.now().toString(36);

    assetName = `${safeName}-${suffix}`;
  }

  /*
   * Cloudinary automatically determines the image format.
   *
   * We don't force `format` here because forcing it can
   * cause unnecessary transformation/conversion behaviour.
   */
  const resourceType =
    mimeType?.startsWith("image/")
      ? "image"
      : "auto";

  const result = await new Promise(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            /*
             * THIS is the actual folder.
             */
            folder: folderPath,

            /*
             * Only the asset name belongs here.
             * Do NOT put hd-web-studios/blog/... here.
             */
            public_id: assetName,

            resource_type: resourceType,

            /*
             * Store alt text as Cloudinary context.
             */
            context: alt
              ? `alt=${alt}`
              : undefined,
          },
          (error, uploadResult) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(uploadResult);
          }
        );

      uploadStream.end(buffer);
    }
  );

  return {
    url: result.secure_url,

    /*
     * This should now be something like:
     *
     * hd-web-studios/blog/my-post-abc12
     */
    publicId: result.public_id,

    width: result.width || 0,

    height: result.height || 0,

    format: result.format || "",
  };
}

/**
 * Delete an image from Cloudinary.
 */
export async function deleteFromCloudinary(
  publicId
) {
  if (!publicId) return;

  try {
    const result =
      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: "image",
          invalidate: true,
        }
      );

    /*
     * Cloudinary commonly returns:
     * "ok"
     * "not found"
     */
    if (
      result?.result !== "ok" &&
      result?.result !== "not found"
    ) {
      console.warn(
        "Unexpected Cloudinary delete result:",
        result
      );
    }
  } catch (error) {
    console.error(
      "Cloudinary delete failed:",
      error?.message || error
    );

    throw error;
  }
}

/**
 * Extract a Cloudinary public ID from a URL.
 *
 * This exists mainly for old media records that don't
 * have publicId stored in MongoDB.
 *
 * Example:
 *
 * https://res.cloudinary.com/demo/image/upload/v1234/
 * hd-web-studios/blog/my-post-abc1.jpg
 *
 * becomes:
 *
 * hd-web-studios/blog/my-post-abc1
 */
export function extractPublicId(url) {
  if (
    !url ||
    !url.includes("cloudinary.com")
  ) {
    return null;
  }

  try {
    const uploadIndex =
      url.indexOf("/upload/");

    if (uploadIndex === -1) {
      return null;
    }

    let publicPath = url.slice(
      uploadIndex + "/upload/".length
    );

    /*
     * Remove transformation segments if present.
     *
     * Example:
     * c_fill,w_500,h_500/v1234/folder/file.jpg
     */
    const segments =
      publicPath.split("/");

    while (
      segments.length > 0 &&
      (
        segments[0].includes(",") ||
        segments[0].startsWith("c_") ||
        segments[0].startsWith("w_") ||
        segments[0].startsWith("h_") ||
        segments[0].startsWith("q_") ||
        segments[0].startsWith("f_")
      )
    ) {
      segments.shift();
    }

    /*
     * Remove version segment.
     */
    if (
      segments[0] &&
      /^v\d+$/.test(segments[0])
    ) {
      segments.shift();
    }

    if (segments.length === 0) {
      return null;
    }

    publicPath = segments.join("/");

    /*
     * Remove extension.
     */
    publicPath =
      publicPath.replace(
        /\.[a-zA-Z0-9]+$/,
        ""
      );

    return publicPath || null;
  } catch {
    return null;
  }
}

export { FOLDERS };

export default cloudinary;