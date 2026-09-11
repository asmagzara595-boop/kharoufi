# Validation — 10 September 2026

## Completed checks

- Final production build completed successfully with exit code 0, including compilation, lint/type validation, static generation and build traces. Production output is isolated in `.next-production` so the development server can stay running.
- The final standalone ESLint run passed with exit code 0. The restarted development server returned HTTP 200 at `http://127.0.0.1:3000`.
- 45 public, checkout, customer, farmer and administrator URLs returned HTTP 200. Exact results are in `route-checks.json`.
- TypeScript and ESLint passed after the shared-copy and profile changes.
- A customer reserved Nour with a 30% simulated deposit, selected a care plan and farm pickup, reached confirmation and opened the customer tracking page.
- Changing the pension recalculated the total and outstanding balance while preserving the simulated amount already paid. Calendar-month pricing was corrected during validation.
- A farmer recorded a weight of 19.1 kg. The farmer profile, customer health page and read-only catalog tool all returned the updated value.
- A farmer added a new young-lamb listing and a health update successfully.
- A client message appeared in the shared local conversation.
- An administrator approved a mock farm dossier, and filtering to the approved status showed the correct row.
- Marketplace search and favorites were exercised.
- Landing, marketplace, checkout, customer overview, new farmer listing and admin orders were checked at 1440, 1024 and 390 pixels. None had document-level horizontal overflow.
- Desktop landing, tablet admin table and mobile detail/table layouts were visually inspected. Mobile profile details were moved ahead of the long history; table rows become labeled cards on mobile.
- The browser error log contained no application errors during the checked flows. Development hot-reload warnings occurred while shared source files were being edited.
- WebMCP `search_kharoufi_lambs` returned the current shared record. An invalid non-string query was rejected intentionally.
- Application source scans found no previous brand name or adult-sheep terminology.

## Scope and remaining limits

Real lamb photographs remain missing and are labeled explicitly. Full translations, real authentication, backend storage, payments, verification and delivery integrations are outside this local prototype. Test records may remain in the preview browser.

File-upload previews are implemented with file-type and size checks, but a full browser upload test was not completed. The route checks do not imply exhaustive testing of every possible form combination. Refer to README.md and IMPLEMENTATION.md for the full implementation boundaries.
