import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

import esriConfig from "@arcgis/core/config.js";
import { config } from "../../../config";

if(config.portalUrl && config.portalUrl.length > 0) {
  esriConfig.portalUrl = config.portalUrl;
}
if(config.proxyUrl && config.proxyUrl.length > 0) {
  esriConfig.request.proxyUrl = config.proxyUrl;
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
