import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";

import esriConfig from "@arcgis/core/config.js";
import { config } from "../../../config";

esriConfig.portalUrl = config.portalUrl;
if(config.proxyUrl && config.proxyUrl.length > 0) {
  esriConfig.request.proxyUrl = config.proxyUrl;
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
