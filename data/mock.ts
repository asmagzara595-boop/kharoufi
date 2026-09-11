import type {
  Lamb,
  Farm,
  FeedingPlan,
  User,
  Verification,
  Dispute,
} from "@/types";
export const DEMO_DATE = "2026-09-10";
export const farms: Farm[] = [
  {
    id: "f1",
    name: "Ferme El Baraka",
    farmer: "Mahmoud Trabelsi",
    location: "Béja",
    verified: true,
    description:
      "Une ferme familiale dans les collines de Béja. Pâturage quotidien, alimentation adaptée et suivi régulier.",
  },
  {
    id: "f2",
    name: "Domaine des Oliviers",
    farmer: "Hassen Ben Salem",
    location: "Sidi Bouzid",
    verified: true,
    description:
      "Élevage familial avec parcours ombragés et suivi individuel des jeunes agneaux.",
  },
  {
    id: "f3",
    name: "Henchir Thibar",
    farmer: "Amel Mansouri",
    location: "Jendouba",
    verified: true,
    description:
      "Un élevage à taille humaine, spécialisé dans les races locales.",
  },
];
export const plans: FeedingPlan[] = [
  {
    id: "pasture",
    name: "Pâturage essentiel",
    monthly: 45,
    description: "Pâturage, foin, eau fraîche et suivi hebdomadaire.",
  },
  {
    id: "balanced",
    name: "Équilibre naturel",
    monthly: 65,
    description: "Pâturage et ration complémentaire adaptée à la croissance.",
  },
  {
    id: "premium",
    name: "Suivi renforcé",
    monthly: 85,
    description: "Alimentation personnalisée et suivi plus fréquent.",
  },
];
export const initialLambs: Lamb[] = [
  "Nour",
  "Sami",
  "Amal",
  "Yasmine",
  "Zied",
  "Lina",
].map((name, i) => ({
  id: `l${i + 1}`,
  name,
  breed: (["Barbarine", "Noire de Thibar", "Queue fine de l’Ouest"] as const)[
    i % 3
  ],
  birthDate: ["2026-07-10", "2026-07-02", "2026-06-10"][i % 3],
  sex: i % 2 ? "Femelle" : "Mâle",
  weight: [18.2, 20.1, 24.3, 19.4, 21.2, 23.8][i],
  expectedWeight: 42 + i,
  price: 480 + i * 35,
  careFee: 45,
  farmId: `f${(i % 3) + 1}`,
  health: "Bon état général",
  status: "Disponible",
  feedingPlanId: "pasture",
  tag: `TN-2026-00${i + 1}`,
  weights: [
    { date: "2026-08-13", weight: 12 + i },
    { date: "2026-08-27", weight: 15 + i },
    { date: DEMO_DATE, weight: [18.2, 20.1, 24.3, 19.4, 21.2, 23.8][i] },
  ],
  healthRecords: [
    {
      id: `h${i}`,
      date: "2026-09-08",
      title: "Contrôle de routine",
      notes:
        "Appétit et mobilité normaux. Aucun signe clinique observé dans ce dossier de démonstration.",
      vet: "Dr. Leïla Gharbi",
    },
  ],
}));
export const users: User[] = [
  {
    id: "c1",
    name: "Karim Ben Salah",
    email: "karim@example.test",
    role: "customer",
    phone: "",
    address: "Tunis",
  },
  {
    id: "u2",
    name: "Mahmoud Trabelsi",
    email: "mahmoud@example.test",
    role: "farmer",
    phone: "",
    address: "Béja",
  },
  {
    id: "a1",
    name: "Amel",
    email: "admin@example.test",
    role: "admin",
    phone: "",
    address: "Tunis",
  },
];
export const initialVerifications: Verification[] = [
  {
    id: "v1",
    farm: "Ferme des Collines",
    location: "Kef",
    status: "En attente",
    notes: "Identité et photos du site déposées — dossier fictif.",
  },
  {
    id: "v2",
    farm: "Henchir Saada",
    location: "Nabeul",
    status: "En attente",
    notes: "Document de propriété à contrôler — dossier fictif.",
  },
];
export const initialDisputes: Dispute[] = [
  {
    id: "d1",
    orderId: "EXEMPLE",
    subject: "Demande de changement de date",
    status: "Ouvert",
  },
];
