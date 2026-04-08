import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import esriConfig from "@arcgis/core/config";
import { config } from "../../../config";

esriConfig.portalUrl = config.portalUrl;
if(config.proxyUrl && config.proxyUrl.length > 0) {
  esriConfig.request.proxyUrl = config.proxyUrl;
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
