import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ModelsController } from "./models.controller";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "models"),
      serveRoot: "/models",
      serveStaticOptions: {
        setHeaders: (res, path) => {
          if (path.endsWith(".glb")) {
            res.setHeader("Content-Type", "model/gltf-binary");
            res.setHeader("Content-Disposition", "inline");
          }
        },
      },
    }),
  ],
  controllers: [ModelsController],
})
export class ModelsModule {}
