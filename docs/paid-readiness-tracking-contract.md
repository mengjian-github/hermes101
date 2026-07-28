# hermes101.dev paid-readiness tracking contract

Scope: future paid search readiness only. This contract does not create, publish, mutate, or fund ad campaigns.

## UTM contract

Landing URLs preserve these parameters on same-origin navigation for the browser session:

- `utm_source`: `google` or `microsoft`
- `utm_medium`: `cpc`
- `utm_campaign`: `hermes101_tutorial_search_v1`
- `utm_term`: keyword
- `utm_content`: `{adgroup}_{rsa_variant}`
- `utm_id`: platform campaign id

Implementation: `src/layouts/Layout.astro` stores incoming UTM parameters in `sessionStorage.hermes101_utm_params` and appends missing UTM parameters to same-origin links before click navigation.

## Events

Primary conversion until a paid/signup product exists:

- `start_install_click`: click to `/setup`
- `start_quickstart_click`: click to `/quickstart`
- `start_7days_click`: click to the 7-day learning-path index
- `install_command_copy`: successful clipboard copy of the Linux/macOS/WSL2/Termux or Windows install command
- `official_docs_click`: click to official Nous Research docs or source references
- `product_referral_click`: click to a Nextfield product/workflow referral such as ShipSolo
- `lead_intent_click`: click to request a guide or open a GitHub issue
- `github_click`: click to `https://github.com/mengjian-github/hermes101`
- `tutorial_page_view`: first-party page-view debug event sent after UTM decoration initializes
- `homepage_faq_click`: click from the homepage answer-first FAQ block
- `setup_success_click`: explicit “first chat works” click after install/provider/plain CLI verification
- `setup_checklist_complete`: all visible setup checklist items toggled complete in one page session
- `conversion_goal`: emitted after a mapped primary action, with `goal_name` and `source_event`

Secondary events:

- `doc_nav_click`: navigation/header/footer/documentation links
- `next_day_click`: click from setup or the 7-day index into the next tutorial step
- `tutorial_day_click`: click to `/7-days/day-N/`
- `resource_click`: click to `/resources`
- `language_switch_click`: click on elements marked with `data-language-switch` or `hreflang`
- `mobile_menu_toggle`: mobile navigation open/close state
- `faq_expand`: FAQ accordion expansion
- `setup_tab_switch`: OS setup tab selection
- `setup_check_item_toggle`: setup checklist item checked or unchecked
- `scroll_depth`: 50% / 90% content depth milestone
- `setup_command_copy`, `first_chat_command_copy`, `first_chat_prompt_copy`, `command_copy`: command-copy intent events for non-install commands
- `command_copy_failed`: clipboard and fallback copy both failed; never counted as a conversion

Link events include `page_location`, `page_path`, `link_url`, `link_path`, `link_text`, `outbound`, and current UTM fields when present. Copy events are emitted only after the Clipboard API or fallback succeeds and include `copy_success`, `copy_method`, `copy_surface`, and `intended_event`.

## Analytics backend contract

Build-time variables:

- `PUBLIC_GA4_MEASUREMENT_ID`: `G-FDGWTRC2MF`; loads Google tag and sends `gtag('event', ...)`
- `PUBLIC_PLAUSIBLE_DOMAIN`: defaults to `hermes101.dev`; loads Plausible tagged-events script and sends custom events
- `PUBLIC_PLAUSIBLE_HOST`: defaults to `https://plausible.shipsolo.io` so the site uses the self-hosted Plausible instance instead of plausible.io
- `PUBLIC_CLARITY_PROJECT_ID`: `x1tz4iudu9`; loads Microsoft Clarity and sends `clarity('event', ...)`

Runtime debug surface: `window.__hermes101_events` and `window.hermes101Analytics.track(name, params)`.

## Validation status

Browser backend creation is complete for GA4 property/web stream and Microsoft Clarity project. Production smoke should verify that deployed HTML includes `G-FDGWTRC2MF`, `x1tz4iudu9`, Plausible `data-domain="hermes101.dev"`, and the `plausible.shipsolo.io` script host, then run `window.hermes101Analytics.track(...)` in the browser.
