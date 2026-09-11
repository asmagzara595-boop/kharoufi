# Kharoufi — inspection and implementation

## Original material

The original ZIP on the Desktop is preserved. Its contents were extracted under the task's `work/stitch` directory, outside this application. All 29 HTML documents were parsed for headings, imagery, fonts, colors, and structure. The 32 PNGs were inspected as a contact sheet: 29 page screenshots and three standalone photographs. A shared DESIGN.md supplies the design tokens. There is no existing application, package manager, component library, or bundled font file. HTML references external Google Fonts, Tailwind CDN, Material Symbols, and remote images.

The screenshots are references, not application assets. The standalone photos show mature animals, including prominent horns; none are suitable for 2–3-month-old lamb profiles. None are copied into the application. Actual lamb photos remain an explicit delivery limitation. Local Inter and Plus Jakarta Sans font packages replace external font requests.

## Reconciliation

Public pages mixed English and French, while customer, farmer, and administrator pages are predominantly French. French is the prototype's initial language. Original layouts repeat headers, use conflicting account names, mix public and account navigation, and repeat animal details with inconsistent weights and financial claims. Shared components replace those repeated structures. Bank escrow, official certification, and blockchain claims are not presented as working services. Verification labels explicitly refer to fictional demonstration dossiers.

## Implementation sequence

1. Shared tokens, local fonts, public header, three account layouts, landing and marketplace.
2. Shared typed records and persistent browser state; lamb profiles, reservation, confirmation, customer monitoring.
3. Farmer onboarding, listings, care updates, orders and delivery; administrator review queues.
4. Complete navigation, responsive checks at 1440 / 1024 / 390, interaction tests, type/lint checks and production build; retain localhost development server.

## Screen-to-route mapping

| Stitch screen purpose           | Connected route                          |
| ------------------------------- | ---------------------------------------- |
| Public landing                  | `/`                                      |
| Marketplace                     | `/marketplace`                           |
| Animal passport / public detail | `/marketplace/[id]`                      |
| Authentication                  | `/login`, `/register`                    |
| Four-step customer onboarding   | `/customer/onboarding`                   |
| Checkout                        | `/checkout/[id]`                         |
| Reservation confirmation        | `/checkout/[id]/confirmation`            |
| Customer dashboard              | `/customer`                              |
| Reserved livestock              | `/customer/lambs`                        |
| Individual monitoring           | `/customer/lambs/[id]`                   |
| Health and biometric history    | `/customer/lambs/[id]/health`            |
| Pastoral plan selection         | `/customer/lambs/[id]/feeding`           |
| Customer/farmer messaging       | `/customer/messages`, `/farmer/messages` |
| Customer payments               | `/customer/payments`                     |
| Delivery management             | `/customer/deliveries`                   |
| Profile settings                | `/customer/profile`                      |
| Partner accreditation           | `/farmer/onboarding`                     |
| Farmer dashboard                | `/farmer`                                |
| Livestock management            | `/farmer/livestock`                      |
| Add livestock                   | `/farmer/livestock/new`                  |
| Sold animal management          | `/farmer/livestock/[id]`                 |
| Mobile care / weight entry      | `/farmer/care-updates/new`               |
| Orders and customers            | `/farmer/orders`, `/farmer/customers`    |
| Earnings and payouts            | `/farmer/earnings`                       |
| Admin overview                  | `/admin`                                 |
| Farm accreditation queue        | `/admin/verifications`                   |
| Livestock moderation            | `/admin/livestock`                       |
| Escrow/dispute workspace        | `/admin/payments`, `/admin/disputes`     |
| National deliveries             | `/admin/deliveries`                      |

Consistent supplementary routes cover how it works, farmer introduction, safety, FAQ, notifications, farmer deliveries/settings, and admin farms/orders/users/settings. The original static financial and logistics screens become local mock records, without suggesting live bank or tracking integrations.

## Media replacements required

- Landing: genuine Tunisian farm photo featuring an approximately 2–3-month-old lamb.
- Six initial lamb profiles: individual real photos matched to each record's birth date and breed.
- Care journal: dated photos supplied by the farmer; image upload previews are supported locally.

Neutral labeled camera containers deliberately replace missing imagery. No adult animal image is shipped. Uploaded images are user-provided previews, not automatically age-verified. Profiles display ages relative to the fixed demonstration date, 10 September 2026, so records do not silently age out of the intended range.

## Integration boundaries

The local store is the replacement boundary for authenticated API reads/mutations. All roles are openly accessible demo views, not secured accounts. Data is browser-local and is shared across role views in the same browser. No personal identity, payment card, bank, real verification, veterinary certification, delivery telemetry or external messages are processed. Future deployment requires server authentication, authorization, input validation, media storage, real records and payment/provider integrations.
