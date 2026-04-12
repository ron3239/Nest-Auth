import { Controller, Get, Param, Res } from "@nestjs/common";
import type { Response } from "express";
import { join } from "path";
import * as fs from "fs";

@Controller("models")
export class ModelsController {
  @Get(":filename")
  getModel(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), "models", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Model not found" });
    }

    const ext = filename.split(".").pop()?.toLowerCase();
    const contentType =
      ext === "glb"
        ? "model/gltf-binary"
        : ext === "gltf"
          ? "application/json"
          : "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.sendFile(filePath);
  }

  @Get()
  listModels() {
    const modelsDir = join(process.cwd(), "models");

    if (!fs.existsSync(modelsDir)) {
      return [];
    }

    return fs
      .readdirSync(modelsDir)
      .filter((f) => f.endsWith(".glb") || f.endsWith(".gltf"));
  }
}
