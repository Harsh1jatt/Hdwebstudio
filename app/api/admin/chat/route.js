import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import Post from "@/models/Post";
import Service from "@/models/Service";
import Project from "@/models/Project";
import FAQ from "@/models/FAQ";
import Testimonial from "@/models/Testimonial";
import Story from "@/models/Story";
import Contact from "@/models/Contact";
import SiteSettings from "@/models/SiteSettings";

// Simple intent parser — no external AI API needed
function parseIntent(text) {
  const lower = text.toLowerCase().trim();

  // List commands
  if (/^(show|list|get|view)\s+(all\s+)?(unpublished|draft|published)\s+(posts|blogs|articles)/i.test(lower)) {
    const status = lower.includes("unpublished") || lower.includes("draft") ? "draft" : "published";
    return { action: "list", entity: "post", filter: { status } };
  }
  if (/^(show|list|get|view)\s+(all\s+)?leads?/i.test(lower)) {
    return { action: "list", entity: "lead" };
  }
  if (/^(show|list|get|view)\s+(all\s+)?(posts|blogs|articles)/i.test(lower)) {
    return { action: "list", entity: "post" };
  }
  if (/^(show|list|get|view)\s+(all\s+)?services?/i.test(lower)) {
    return { action: "list", entity: "service" };
  }
  if (/^(show|list|get|view)\s+(all\s+)?(projects?|portfolio)/i.test(lower)) {
    return { action: "list", entity: "project" };
  }
  if (/^(show|list|get|view)\s+(all\s+)?faqs?/i.test(lower)) {
    return { action: "list", entity: "faq" };
  }
  if (/^(show|list|get|view)\s+(all\s+)?testimonials?/i.test(lower)) {
    return { action: "list", entity: "testimonial" };
  }
  if (/^(show|list|get|view)\s+(all\s+)?stories?/i.test(lower)) {
    return { action: "list", entity: "story" };
  }

  // Publish/unpublish
  if (/^(publish|unpublish)\s+(the\s+)?(latest\s+)?draft\s+(post|blog|article)/i.test(lower)) {
    const publish = lower.startsWith("publish");
    return { action: publish ? "publish" : "unpublish", entity: "post", target: "latest draft" };
  }

  // Create commands — extract name after "create a (new) <entity> called/named <name>"
  const createMatch = lower.match(
    /^create\s+(?:a\s+)?(?:new\s+)?(service|project|faq|testimonial|story|blog|post|article)\s+(?:called|named|titled|:)\s+(.+)$/i
  );
  if (createMatch) {
    return { action: "create", entity: createMatch[1].replace(/s$/, ""), name: createMatch[2].trim() };
  }
  // Also match: create a new service called X
  const createMatch2 = lower.match(
    /^create\s+(?:a\s+)?(?:new\s+)?(service|project|faq|testimonial|story|blog|post|article)\s+(.+)$/i
  );
  if (createMatch2) {
    return { action: "create", entity: createMatch2[1].replace(/s$/, ""), name: createMatch2[2].trim() };
  }

  // Update commands — extract entity and field
  const updateMatch = lower.match(
    /^update\s+(?:the\s+)?(.+?)\s+(description|title|tagline|content|answer|question|name|slug|status)\s+(?:to|:)\s+(.+)$/i
  );
  if (updateMatch) {
    return {
      action: "update",
      entityName: updateMatch[1].trim(),
      field: updateMatch[2].trim(),
      value: updateMatch[3].trim(),
    };
  }

  // Delete commands
  const deleteMatch = lower.match(
    /^delete\s+(?:the\s+)?(.+)$/i
  );
  if (deleteMatch) {
    return { action: "delete", entityName: deleteMatch[1].trim(), confirm: true };
  }

  // Mark lead
  const leadMatch = lower.match(
    /^(mark|set)\s+(?:the\s+)?lead\s+(.+?)\s+(?:as\s+)?(contacted|new|qualified|closed)/i
  );
  if (leadMatch) {
    return { action: "update_lead", leadName: leadMatch[2].trim(), status: leadMatch[3].trim() };
  }

  // Update site settings
  const settingsMatch = lower.match(
    /^(change|update|set)\s+(?:the\s+)?(?:homepage?\s+)?(hero\s+heading|hero\s+description|hero\s+title|tagline|whatsapp\s+number|phone|email|website\s+name|brand\s+name|company\s+name|cta)\s+(?:to|:)\s+(.+)$/i
  );
  if (settingsMatch) {
    return {
      action: "update_settings",
      field: settingsMatch[2].trim(),
      value: settingsMatch[3].trim(),
    };
  }

  // Help
  if (/^(help|commands|what can you do|how|options)/i.test(lower)) {
    return { action: "help" };
  }

  return { action: "unknown", text };
}

// Resolve entity name to a document
async function findEntityByName(Model, name) {
  const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  return Model.findOne({
    $or: [{ title: regex }, { name: regex }, { question: regex }, { slug: regex }],
  }).lean();
}

// Get model for entity type
function getModel(entity) {
  const map = {
    post: Post, blog: Post, article: Post,
    service: Service,
    project: Project,
    faq: FAQ, faqs: FAQ,
    testimonial: Testimonial, testimonials: Testimonial,
    story: Story, stories: Story,
  };
  return map[entity] || null;
}

export async function POST(req) {
  const auth = await requireAdminApi(req);
  if (auth instanceof Response) return auth;

  await connectDB();

  const { message } = await req.json();
  if (!message?.trim()) {
    return NextResponse.json({ success: false, error: "Please enter a command." }, { status: 400 });
  }

  const intent = parseIntent(message);

  try {
    switch (intent.action) {
      case "help": {
        return NextResponse.json({
          success: true,
          response: `Here are the commands I understand:

**Content Management:**
• "Create a service called [name]"
• "Create a project called [name]"
• "Create a blog about [topic]"
• "Create a FAQ about [topic]"
• "Create a testimonial from [name]"

**Publishing:**
• "Publish the latest draft post"
• "Unpublish the latest draft post"

**Updates:**
• "Update [item name] description to: [new text]"
• "Update [item name] title to: [new title]"

**Deletion:**
• "Delete [item name]"

**Lists:**
• "Show all posts"
• "Show unpublished blogs"
• "Show all services"
• "Show all projects"
• "Show all leads"
• "Show all FAQs"
• "Show all testimonials"
• "Show all stories"

**Settings:**
• "Change website name to: [name]"
• "Change phone to: [number]"
• "Change email to: [email]"

**Leads:**
• "Mark lead [name] as contacted"`,
          actions: [],
        });
      }

      case "list": {
        let results = [];
        let Model = null;

        if (intent.entity === "lead") {
          results = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();
          const items = results.map((r) => ({
            id: r._id.toString(),
            name: r.name || "Unknown",
            phone: r.phone || "",
            email: r.email || "",
            date: r.createdAt,
          }));
          return NextResponse.json({
            success: true,
            response: `Found ${results.length} lead(s):`,
            items,
            links: [{ label: "View all leads", href: "/admin/leads" }],
          });
        }

        Model = getModel(intent.entity);
        if (!Model) {
          return NextResponse.json({ success: false, response: "I don't know how to list that entity." });
        }

        const filter = intent.filter || {};
        results = await Model.find(filter).sort({ createdAt: -1 }).limit(10).lean();
        const label = intent.entity.charAt(0).toUpperCase() + intent.entity.slice(1);
        const items = results.map((r) => ({
          id: r._id.toString(),
          title: r.title || r.name || r.question || "Untitled",
          status: r.status || (r.published ? "published" : "draft"),
          date: r.createdAt,
          editHref: `/admin/${intent.entity === "post" ? "blog" : intent.entity + "s"}/${r._id}`,
        }));
        return NextResponse.json({
          success: true,
          response: `Found ${results.length} ${label}(s):`,
          items,
          links: [{ label: `Manage ${label}s`, href: `/admin/${intent.entity === "post" ? "blog" : intent.entity + "s"}` }],
        });
      }

      case "create": {
        const Model = getModel(intent.entity);
        if (!Model) {
          return NextResponse.json({ success: false, response: `I don't know how to create a "${intent.entity}".` });
        }

        const name = intent.name;
        const slug = name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        let doc;
        if (intent.entity === "post" || intent.entity === "blog" || intent.entity === "article") {
          doc = await Post.create({
            title: name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            slug,
            excerpt: "",
            content: "",
            contentFormat: "html",
            status: "draft",
            author: auth.name || "Admin",
          });
          return NextResponse.json({
            success: true,
            response: `Created new blog post "${doc.title}" as draft.`,
            actions: [{ label: "Edit Post", href: `/admin/blog/${doc._id}` }],
          });
        }

        if (intent.entity === "service") {
          doc = await Service.create({
            slug,
            eyebrow: name,
            title: name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            tagline: "",
            description: "",
            overview: { heading: name, paragraphs: [], highlights: [] },
            published: false,
          });
          return NextResponse.json({
            success: true,
            response: `Created new service "${doc.title}" as draft.`,
            actions: [{ label: "Edit Service", href: `/admin/services/${doc._id}` }],
          });
        }

        if (intent.entity === "project") {
          doc = await Project.create({
            title: name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            slug,
            shortDescription: "",
            description: "",
            published: false,
          });
          return NextResponse.json({
            success: true,
            response: `Created new project "${doc.title}" as draft.`,
            actions: [{ label: "Edit Project", href: `/admin/projects/${doc._id}` }],
          });
        }

        if (intent.entity === "faq") {
          doc = await FAQ.create({
            question: name,
            answer: "",
            published: false,
          });
          return NextResponse.json({
            success: true,
            response: `Created new FAQ "${doc.question}" as draft.`,
            actions: [{ label: "Edit FAQ", href: `/admin/faqs/${doc._id}` }],
          });
        }

        if (intent.entity === "testimonial") {
          doc = await Testimonial.create({
            name: name,
            content: "",
            published: false,
          });
          return NextResponse.json({
            success: true,
            response: `Created new testimonial from "${doc.name}" as draft.`,
            actions: [{ label: "Edit Testimonial", href: `/admin/testimonials/${doc._id}` }],
          });
        }

        if (intent.entity === "story") {
          doc = await Story.create({
            title: name,
            slug,
            slides: [],
            status: "draft",
          });
          return NextResponse.json({
            success: true,
            response: `Created new story "${doc.title}" as draft.`,
            actions: [{ label: "Edit Story", href: `/admin/stories/${doc._id}` }],
          });
        }

        return NextResponse.json({ success: false, response: "I couldn't create that item." });
      }

      case "publish":
      case "unpublish": {
        const Model = getModel(intent.entity);
        if (!Model) {
          return NextResponse.json({ success: false, response: "Unknown entity type." });
        }

        const doc = await Model.findOne({ status: "draft" }).sort({ createdAt: -1 });
        if (!doc) {
          return NextResponse.json({ success: false, response: `No draft ${intent.entity}(s) found to ${intent.action}.` });
        }

        const newStatus = intent.action === "publish" ? "published" : "draft";
        const isPost = intent.entity === "post" || intent.entity === "blog";

        if (isPost) {
          await Post.findByIdAndUpdate(doc._id, {
            status: newStatus,
            publishedAt: intent.action === "publish" ? new Date() : null,
          });
        } else {
          await Model.findByIdAndUpdate(doc._id, {
            status: newStatus,
            ...(intent.entity === "story" ? {} : { published: intent.action === "publish" }),
          });
        }

        const title = doc.title || doc.name || doc.question || "Untitled";
        return NextResponse.json({
          success: true,
          response: `${intent.action === "publish" ? "Published" : "Unpublished"} "${title}".`,
          actions: [{ label: "View", href: `/admin/${isPost ? "blog" : intent.entity + "s"}/${doc._id}` }],
        });
      }

      case "update": {
        const Model = getModel(intent.entityName);
        if (!Model) {
          // Try searching across all models
          const entityModels = [
            { Model: Post, type: "post" },
            { Model: Service, type: "service" },
            { Model: Project, type: "project" },
            { Model: FAQ, type: "faq" },
            { Model: Testimonial, type: "testimonial" },
            { Model: Story, type: "story" },
          ];

          for (const { Model: M, type } of entityModels) {
            const doc = await findEntityByName(M, intent.entityName);
            if (doc) {
              const update = { [intent.field]: intent.value };
              await M.findByIdAndUpdate(doc._id, update);
              const title = doc.title || doc.name || doc.question || "Untitled";
              return NextResponse.json({
                success: true,
                response: `Updated ${intent.field} of "${title}" to "${intent.value}".`,
                actions: [{ label: "View", href: `/admin/${type === "post" ? "blog" : type + "s"}/${doc._id}` }],
              });
            }
          }
          return NextResponse.json({ success: false, response: `Could not find an item matching "${intent.entityName}".` });
        }

        const doc = await findEntityByName(Model, intent.entityName);
        if (!doc) {
          return NextResponse.json({ success: false, response: `Could not find "${intent.entityName}".` });
        }

        const update = { [intent.field]: intent.value };
        await Model.findByIdAndUpdate(doc._id, update);
        const title = doc.title || doc.name || doc.question || "Untitled";
        return NextResponse.json({
          success: true,
          response: `Updated ${intent.field} of "${title}" to "${intent.value}".`,
          actions: [{ label: "View", href: `/admin/${intent.entityName === "post" ? "blog" : intent.entityName + "s"}/${doc._id}` }],
        });
      }

      case "delete": {
        // Search across all models
        const entityModels = [
          { Model: Post, type: "post", path: "blog" },
          { Model: Service, type: "service", path: "services" },
          { Model: Project, type: "project", path: "projects" },
          { Model: FAQ, type: "faq", path: "faqs" },
          { Model: Testimonial, type: "testimonial", path: "testimonials" },
          { Model: Story, type: "story", path: "stories" },
        ];

        for (const { Model: M, type, path } of entityModels) {
          const doc = await findEntityByName(M, intent.entityName);
          if (doc) {
            const title = doc.title || doc.name || doc.question || "Untitled";
            await M.findByIdAndDelete(doc._id);
            return NextResponse.json({
              success: true,
              response: `Deleted "${title}" (${type}).`,
              actions: [{ label: `View ${type}s`, href: `/admin/${path}` }],
            });
          }
        }
        return NextResponse.json({ success: false, response: `Could not find "${intent.entityName}" to delete.` });
      }

      case "update_settings": {
        let settings = await SiteSettings.findOne();
        if (!settings) settings = new SiteSettings();

        const fieldMap = {
          "hero heading": null,
          "hero description": null,
          "hero title": null,
          "tagline": "brand.tagline",
          "whatsapp number": "contact.whatsapp",
          "phone": "contact.phone",
          "email": "contact.email",
          "website name": "brand.name",
          "brand name": "brand.name",
          "company name": "brand.name",
          "cta": null,
        };

        const fieldPath = fieldMap[intent.field];
        if (fieldPath) {
          const [section, key] = fieldPath.split(".");
          settings[section][key] = intent.value;
          await settings.save();
          return NextResponse.json({
            success: true,
            response: `Updated ${intent.field} to "${intent.value}".`,
            actions: [{ label: "View Settings", href: "/admin/settings" }],
          });
        }

        return NextResponse.json({
          success: false,
          response: `I can update tagline, whatsapp number, phone, email, website name. For other fields, use the Settings page.`,
        });
      }

      case "update_lead": {
        const lead = await Contact.findOne({
          name: new RegExp(intent.leadName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
        });
        if (!lead) {
          return NextResponse.json({ success: false, response: `Could not find a lead matching "${intent.leadName}".` });
        }

        const statusMap = { contacted: "contacted", new: "new", qualified: "qualified", closed: "closed" };
        lead.status = statusMap[intent.status] || intent.status;
        await lead.save();

        return NextResponse.json({
          success: true,
          response: `Marked lead "${lead.name}" as ${intent.status}.`,
          actions: [{ label: "View Leads", href: "/admin/leads" }],
        });
      }

      default:
        return NextResponse.json({
          success: true,
          response: `I didn't understand that command. Type "help" to see what I can do.`,
          actions: [],
        });
    }
  } catch (err) {
    console.error("[chat] Error:", err);
    return NextResponse.json({
      success: false,
      response: `An error occurred: ${err.message}`,
      actions: [],
    });
  }
}
