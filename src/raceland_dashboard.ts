import { LitElement, html, css, } from "lit"
import { property } from "lit/decorators";
import { HomeAssistant } from 'custom-card-helpers';
import { Route } from "./types"
import { navigate } from "./frontend_release/common/navigate";
import "./raceland_dashboard_router"

class RacelandDashboard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public route!: Route;

  @property() public narrow!: boolean;

  static get properties() {
    return {
      hass: { type: Object }, //is this required?
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
    };
  }

  render() {
    console.log("render dashboard")
    const page =  this._page;
    return html`
      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>Raceland Dashboard master</div>
          </app-toolbar>
          <ha-tabs
            scrollable
            attr-for-selected="page-name"
            .selected=${page}
            @iron-activate=${this.handlePageSelected}
          >
            <paper-tab page-name="add_camera">
              Teste tabs
            </paper-tab>
            <paper-tab page-name="add_camera_2">
              Teste tabs 2
            </paper-tab>
          </ha-tabs>
        </app-header>
        <raceland-dashboard-router
          .route=${this.route}
          .narrow=${true}
          .hass=${this.hass}>
        </raceland-dashboard-router>
      </ha-app-layout>
    `;
  }

  private handlePageSelected(ev) {
    const newPage = ev.detail.item.getAttribute("page-name");
    if (newPage !== this._page) {
      navigate(`/raceland_dashboard/${newPage}`, { replace: true });
    } else {
      scrollTo(0, 0);
    }
  }

  private get _page() {
    return this.route.path.substr(1);
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