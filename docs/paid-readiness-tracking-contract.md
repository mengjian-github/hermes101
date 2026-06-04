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
- `github_click`: click to `https://github.com/mengjian-github/hermes101`

Secondary events:

- `doc_nav_click`: navigation/header/footer/documentation links
- `tutorial_day_click`: click to `/7-days/day-N/`
- `resource_click`: click to `/resources`
- `language_switch_click`: click on elements marked with `data-language-switch` or `hreflang`

All events include `page_location`, `page_path`, `link_url`, `link_path`, `link_text`, `outbound`, and the current UTM fields when present.

## Analytics backend contract

Build-time variables:

- `PUBLIC_GA4_MEASUREMENT_ID`: `G-FDGWTRC2MF`; loads Google tag and sends `gtag('event', ...)`
- `PUBLIC_PLAUSIBLE_DOMAIN`: defaults to `hermes101.dev`; loads Plausible tagged-events script and sends custom events
- `PUBLIC_CLARITY_PROJECT_ID`: `x1tz4iudu9`; loads Microsoft Clarity and sends `clarity('event', ...)`

Runtime debug surface: `window.__hermes101_events` and `window.hermes101Analytics.track(name, params)`.

## Validation status

Browser backend creation is complete for GA4 property/web stream and Microsoft Clarity project. Production smoke should verify that deployed HTML includes `G-FDGWTRC2MF`, `x1tz4iudu9`, and Plausible `data-domain="hermes101.dev"`, then run `window.hermes101Analytics.track(...)` in the browser.
