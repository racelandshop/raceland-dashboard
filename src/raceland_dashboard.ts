import { LitElement, html, css, } from "lit"
import { property } from "lit/decorators";
import { HomeAssistant } from 'custom-card-helpers';
import { Route } from "./types"

class RacelandDashboard extends LitElement {

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public route!: Route;

  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
    };
  }

  //Continue in render()
  // protected render(): TemplateResult {
  //   const page = this._page;
  //   return html`
  //     <ha-app-layout>
  //       <app-header fixed slot="header">
  //         <app-toolbar>
  //           <ha-menu-button
  //             .hass=${this.hass}
  //             .narrow=${this.narrow}
  //           ></ha-menu-button>
  //           <div main-title>${this.hass.localize("panel.developer_tools")}</div>
  //         </app-toolbar>
  //         <ha-tabs
  //           scrollable
  //           attr-for-selected="page-name"
  //           .selected=${page}
  //           @iron-activate=${this.handlePageSelected}
  //         >
  //           <paper-tab page-name="state">
  //             ${this.hass.localize(
  //               "ui.panel.developer-tools.tabs.states.title"
  //             )}
  //           </paper-tab>
  //           <paper-tab page-name="service">
  //             ${this.hass.localize(
  //               "ui.panel.developer-tools.tabs.services.title"
  //             )}
  //           </paper-tab>
  //           <paper-tab page-name="template">
  //             ${this.hass.localize(
  //               "ui.panel.developer-tools.tabs.templates.title"
  //             )}
  //           </paper-tab>
  //           <paper-tab page-name="event">
  //             ${this.hass.localize(
  //               "ui.panel.developer-tools.tabs.events.title"
  //             )}
  //           </paper-tab>
  //           <paper-tab page-name="statistics">
  //             ${this.hass.localize(
  //               "ui.panel.developer-tools.tabs.statistics.title"
  //             )}
  //           </paper-tab>
  //         </ha-tabs>
  //       </app-header>
  //       <developer-tools-router
  //         .route=${this.route}
  //         .narrow=${this.narrow}
  //         .hass=${this.hass}
  //       ></developer-tools-router>
  //     </ha-app-layout>
  //   `;

  render() {

    return html`
      <raceland-dashboard-router
        .route=${this.route}
        .narrow=${true}
        .hass=${this.hass}>
      </raceland-dashboard-router>
    `;
  }

  static get styles() {
    return css`
      :host {
        background-color: var(--app-header-background-color);
        padding: 16px;
        display: block;
      }
      wired-card {
        background-color: var(--card-color-background);
        padding: 16px;
        display: block;
        font-size: 18px;
        max-width: 600px;
        margin: 0 auto;
      }
    `;
  }
}
customElements.define("raceland-dashboard", RacelandDashboard)