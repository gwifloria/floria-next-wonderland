//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { handleError, validateObjectId } from "../lib/api-helpers";
import dbConnect from "../lib/mongoose";
import Lab, { ILab } from "../models/Lab";
import { ApiResponse, LabUpdateInput } from "../type";

// GET /api/labs/[id] - 获取单个 lab
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ILab>>> {
  try {
    await dbConnect();

    const { id } = params;

    const idValidation = validateObjectId(id);
    if (idValidation) return idValidation;

    const lab = await Lab.findById(id).lean<ILab>();

    if (!lab) {
      return NextResponse.json({ error: "Lab not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lab retrieved successfully",
      data: lab,
    });
  } catch (error) {
    console.error("Lab fetch failed:", error);
    return handleError(error);
  }
}

// PUT /api/labs/[id] - 更新 lab
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ILab>>> {
  try {
    await dbConnect();

    const { id } = params;
    const body: LabUpdateInput = await request.json();

    const idValidation = validateObjectId(id);
    if (idValidation) return idValidation;

    // 验证字段值
    if (body.type && !["bug", "issue", "idea"].includes(body.type)) {
      return NextResponse.json(
        { error: "Type must be 'bug', 'issue', or 'idea'" },
        { status: 400 }
      );
    }

    if (
      body.status &&
      !["open", "inProgress", "resolved"].includes(body.status)
    ) {
      return NextResponse.json(
        { error: "Status must be 'open', 'inProgress', or 'resolved'" },
        { status: 400 }
      );
    }

    const updateData: Partial<ILab> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.category !== undefined) updateData.category = body.category;

    const lab = await Lab.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!lab) {
      return NextResponse.json({ error: "Lab not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lab updated successfully",
      data: lab,
    });
  } catch (error) {
    console.error("Lab update failed:", error);
    return handleError(error);
  }
}

// DELETE /api/labs/[id] - 删除 lab
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ILab>>> {
  try {
    await dbConnect();

    const { id } = params;

    const idValidation = validateObjectId(id);
    if (idValidation) return idValidation;

    const lab = await Lab.findByIdAndDelete(id);

    if (!lab) {
      return NextResponse.json({ error: "Lab not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lab deleted successfully",
      data: lab,
    });
  } catch (error) {
    console.error("Lab deletion failed:", error);
    return handleError(error);
  }
}
