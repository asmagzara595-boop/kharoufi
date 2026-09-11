import { EmptyState } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="container">
      <EmptyState
        title="Page introuvable"
        description="Cette adresse ne correspond à aucune page Kharoufi."
        href="/"
        label="Revenir à l’accueil"
      />
    </div>
  );
}
