import { PolymerElement } from "@polymer/polymer";
import { customElement, property } from "lit/decorators";
import { RacelandRouterPage, RouterOptions } from "./raceland_dashboard_router_page";
import { HomeAssistant } from "custom-card-helpers"

@customElement("developer-tools-router")
class RacelandToolsRouter extends RacelandRouterPage {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public narrow!: boolean;

  protected routerOptions: RouterOptions = {
    // defaultPage: "info",
    beforeRender: (page) => {
      if (!page || page === "not_found") {
        // If we can, we are going to restore the last visited page.
        return this._currentPage ? this._currentPage : "state";
      }
      return undefined;
    },
    cacheAll: true,
    showLoading: true,
    routes: {
      event: {
        tag: "Add Camera", //TODO: translate?
        load: () => import("./panels/add_camera"),
      },
    },
  };

  protected createLoadingScreen() {
    const loadingScreen = super.createLoadingScreen();
    loadingScreen.noToolbar = true;
    return loadingScreen;
  }

  protected createErrorScreen(error: string) {
    const errorEl = super.createErrorScreen(error);
    errorEl.toolbar = false;
    return errorEl;
  }

  protected updatePageEl(el) {
    if ("setProperties" in el) {
      // As long as we have Polymer pages
      (el as PolymerElement).setProperties({
        hass: this.hass,
        narrow: this.narrow,
      });
    } else {
      el.hass = this.hass;
      el.narrow = this.narrow;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "raceland-dashboard-router": RacelandToolsRouter;
  }
}
