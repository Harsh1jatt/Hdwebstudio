import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { requireAdminApi } from "@/lib/auth";
import PricingPlan from "@/models/PricingPlan";
import { pricingPayloadSchema } from "@/utils/pricingValidation";

export async function GET(req) {
  const auth = await requireAdminApi(req);

  if (auth instanceof Response) return auth;

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10)
    );

    const perPage = Math.min(
      50,
      Math.max(
        1,
        parseInt(searchParams.get("perPage") || "20", 10)
      )
    );

    const published = searchParams.get("published");
    const sort = searchParams.get("sort") || "order";

    const filter = {};

    if (published === "true") {
      filter.published = true;
    } else if (published === "false") {
      filter.published = false;
    }

    const sortMap = {
      order: {
        order: 1,
        createdAt: 1,
      },
      newest: {
        createdAt: -1,
      },
    };

    const sortObj = sortMap[sort] || sortMap.order;

    const [docs, total] = await Promise.all([
      PricingPlan.find(filter)
        .sort(sortObj)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean(),

      PricingPlan.countDocuments(filter),
    ]);

    const items = docs.map((d) => ({
      ...d,
      id: d._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      items,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.error("GET /api/admin/pricing ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load pricing plans.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  const auth = await requireAdminApi(req);

  if (auth instanceof Response) return auth;

  try {
    await connectDB();

    const body = await req.json();

    console.log(
      "CREATE PRICING PAYLOAD:",
      JSON.stringify(body, null, 2)
    );

    const result = pricingPayloadSchema.safeParse(body);

    if (!result.success) {
      console.error(
        "PRICING VALIDATION ERROR:",
        JSON.stringify(result.error.flatten(), null, 2)
      );

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const existing = await PricingPlan.findOne({
      slug: result.data.slug,
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "A plan with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const doc = await PricingPlan.create(result.data);

    return NextResponse.json(
      {
        success: true,
        item: {
          ...doc.toObject(),
          id: doc._id.toString(),
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/pricing ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create pricing plan.",
      },
      {
        status: 500,
      }
    );
  }
}