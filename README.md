# Kharoufi

Choose it. Follow it. Receive it.

Local Next.js App Router / React / TypeScript prototype, adapted from 29 Stitch exports. French is the initial interface language. Green, gold, white, Inter and Plus Jakarta Sans follow the source design system.

## Run

On this computer, from this folder:

```powershell
.\Start-Kharoufi.ps1
```

On another computer with Node.js 20.9+ and npm:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. If the port is already serving Kharoufi, use that running server instead of starting another copy.

```sh
npm run typecheck
npm run lint
npm run build
```

## Try the connected journeys

1. Open the marketplace, search or filter, favorite an agneau, and open its profile.
2. Choose Reserve, a deposit/full payment, a care plan, and delivery/pickup. Complete the simulated reservation without entering card details.
3. Open the customer dashboard to view the reserved agneau, growth history, health, pension, payments and reception. Edit the pension or delivery from Deliveries.
4. Open `/farmer` from the account menu or login demo. Add an agneau, then record weight, health or photo updates from Care updates. View the same update at `/customer/lambs/[id]`.
5. Send a demo message from either role and read it in the other. Messages remain in the browser; nothing is sent externally.
6. Open `/admin/verifications` to approve or reject a fictitious application. Search and filter administration tables; resolve the example dispute.

## Structure

- `app/`: App Router entry points, validated route dispatcher, loading/error/not-found states and metadata.
- `components/`: shared UI, layouts, marketplace, public, customer, farmer and dashboard modules.
- `types/`: shared models; `data/`: central entities, navigation, French copy and informational content.
- `lib/store.tsx`: local persistence adapter; replace with authenticated APIs later.
- `lib/format.ts`: dates, money, age and calendar-month quotes.
- `lib/model-tools.tsx`: optional read-only WebMCP catalog search with validated inputs.

The route dispatcher composes React modules; it does not embed or display exported HTML. See IMPLEMENTATION.md for the mapping from every source screen to its new route.

## Data and limitations

- All accounts are openly accessible **demo roles**, with no real authentication or authorization.
- Payments, verification, veterinary dossiers, earnings and delivery status are simulated. No backend, bank, payment provider, official certification or tracking service is connected.
- Browser local storage persists changes within that browser and origin. This is a single-device demonstration, not multi-user synchronization. Use one host consistently: `127.0.0.1` and `localhost` have separate browser storage.
- Ages and pricing dates use the fixed demonstration date, **10 September 2026**. Initial agneaux are approximately 2–3 months old. Future weights are estimates, not guarantees.
- Supplied animal photographs were unsuitable. Labeled placeholders are intentional. Provide genuine photos of the six young agneaux and a matching hero photo before commercial use. Uploaded previews are not age-verified and are limited to 1.5 MB; browser storage has a limited capacity.
- The main French interface copy is centralized in `data/copy.ts`, with navigation and informational copy in adjacent files. EN / AR / Tunisian Arabic dictionaries are not yet translated. Selectors save a visible preference; French remains rendered. Logical RTL styling is prepared but full translated RTL QA remains future work.
- Reducing an already-paid reservation below the paid amount asks for a later refund workflow; no refund is silently simulated.
- Farmer onboarding accepts a fictional document reference and optional photo preview. It does not collect identity documents or perform actual verification.
- Use Profile/Settings → Reset demonstration to restore initial records. Test records may be present in the preview browser.

The original archive and extracted references are preserved separately outside the application source. No original project name or mature animal asset is shipped in the application.
