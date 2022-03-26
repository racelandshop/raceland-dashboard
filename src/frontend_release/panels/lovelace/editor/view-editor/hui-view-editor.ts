import "../../../../components/ha-form/ha-form";
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import memoizeOne from "memoize-one";
import { fireEvent } from "../../../../common/dom/fire_event";
import { slugify } from "../../../../common/string/slugify";
import type { HaFormSchema } from "../../../../components/ha-form/types";
import type { LovelaceViewConfig } from "../../../../data/lovelace";
import type { HomeAssistant } from "../../../../types";
import {
  DEFAULT_VIEW_LAYOUT,
  PANEL_VIEW_LAYOUT,
  SIDEBAR_VIEW_LAYOUT,
} from "../../views/const";

declare global {
  interface HASSDomEvents {
    "view-config-changed": {
      config: LovelaceViewConfig;
    };
  }
}

@customElement("hui-view-editor")
export class HuiViewEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public isNew!: boolean;

  @state() private _config!: LovelaceViewConfig;

  private _suggestedPath = false;

  private _schema = memoizeOne((localize): HaFormSchema[] => [
    { name: "title", selector: { text: {} } },
    {
      name: "icon",
      selector: {
        icon: {},
      },
    },
    { name: "path", selector: { text: {} } },
    { name: "theme", selector: { theme: {} } },
    {
      name: "type",
      selector: {
        select: {
          options: [
            DEFAULT_VIEW_LAYOUT,
            SIDEBAR_VIEW_LAYOUT,
            PANEL_VIEW_LAYOUT,
          ].map((type) => ({
            value: type,
            label: localize(`ui.panel.lovelace.editor.edit_view.types.${type}`),
          })),
        },
      },
    },
  ]);

  set config(config: LovelaceViewConfig) {
    this._config = config;
  }

  get _type(): string {
    if (!this._config) {
      return DEFAULT_VIEW_LAYOUT;
    }
    return this._config.panel
      ? PANEL_VIEW_LAYOUT
      : this._config.type || DEFAULT_VIEW_LAYOUT;
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    const schema = this._schema(this.hass.localize);
    const data = {
      theme: "Backend-selected",
      ...this._config,
      type: this._type,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;

    if (config.type === "masonry") {
      delete config.type;
    }

    if (
      this.isNew &&
      !this._suggestedPath &&
      config.title &&
      (!this._config.path ||
        config.path === slugify(this._config.title || "", "-"))
    ) {
      config.path = slugify(config.title, "-");
    }

    fireEvent(this, "view-config-changed", { config });
  }

  private _computeLabelCallback = (schema: HaFormSchema) => {
    if (schema.name === "path") {
      return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.url`);
    }
    return (
      this.hass!.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      ) || this.hass.localize("ui.panel.lovelace.editor.edit_view.type")
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-view-editor": HuiViewEditor;
  }
}
