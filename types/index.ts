export type Role = "customer" | "farmer" | "admin";
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  address: string;
};
export type Customer = User & { role: "customer" };
export type Farmer = User & { role: "farmer"; farmId: string };
export type Farm = {
  id: string;
  name: string;
  farmer: string;
  location: string;
  verified: boolean;
  description: string;
};
export type Breed = "Barbarine" | "Noire de Thibar" | "Queue fine de l’Ouest";
export type WeightRecord = { date: string; weight: number };
export type HealthRecord = {
  id: string;
  date: string;
  title: string;
  notes: string;
  vet: string;
};
export type Vaccination = HealthRecord & { nextDate?: string };
export type FeedingPlan = {
  id: string;
  name: string;
  monthly: number;
  description: string;
};
export type Lamb = {
  id: string;
  name: string;
  breed: Breed;
  birthDate: string;
  sex: "Mâle" | "Femelle";
  weight: number;
  expectedWeight: number;
  price: number;
  careFee: number;
  farmId: string;
  health: string;
  status: "Disponible" | "Réservé";
  feedingPlanId: string;
  weights: WeightRecord[];
  healthRecords: HealthRecord[];
  photo?: string;
  tag: string;
};
export type CareUpdate = {
  id: string;
  lambId: string;
  date: string;
  title: string;
  notes: string;
  photo?: string;
};
export type Reservation = {
  id: string;
  lambId: string;
  customerId: string;
  planId: string;
  purchase: "deposit" | "full";
  date: string;
  months: number;
  total: number;
  paid: number;
  deliveryId: string;
};
export type Order = Reservation & {
  status: "Réservée" | "En préparation" | "Terminée";
};
export type Payment = {
  id: string;
  orderId: string;
  label: string;
  amount: number;
  status: "Simulé" | "À venir";
  date: string;
};
export type Delivery = {
  id: string;
  orderId: string;
  mode: "delivery" | "pickup";
  date: string;
  address: string;
  status: "À programmer" | "Programmée" | "En préparation" | "Terminée";
};
export type Message = { id: string; sender: Role; text: string; date: string };
export type Notification = {
  id: string;
  title: string;
  href: string;
  read: boolean;
};
export type Verification = {
  id: string;
  farm: string;
  location: string;
  status: "En attente" | "Approuvée" | "Refusée";
  notes: string;
};
export type Dispute = {
  id: string;
  orderId: string;
  subject: string;
  status: "Ouvert" | "Résolu";
  resolution?: string;
};
