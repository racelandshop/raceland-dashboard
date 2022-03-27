import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HomeAssistant } from "custom-card-helpers";


@customElement("raceland-dashboard-add-cameras")
class RacelandDashboardAddCameras extends LitElement {
    @property() public hass!: HomeAssistant;


    protected render() {
        console.log("Rendering add cameras dashboard")
        return html`
            <p>This is a test Par</p>
        `
    }

    static get styles(): CSSResultGroup {
        return [
            css``
        ]
    }
}


declare global {
    interface HTMLElementTagNameMap {
      "raceland-dashboard-add-cameras": RacelandDashboardAddCameras;
    }
  }
