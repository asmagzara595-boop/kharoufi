// Translation source: French is the initial language. English, Arabic and Tunisian Arabic namespaces can mirror these keys.
export const content: Record<
  string,
  { title: string; intro: string; sections: [string, string][] }
> = {
  "how-it-works": {
    title: "Choisir. Suivre. Recevoir.",
    intro:
      "Une relation directe avec l’éleveur, depuis les premiers mois de votre agneau.",
    sections: [
      [
        "1. Choisissez votre agneau",
        "Explorez les profils de jeunes agneaux de 2–3 mois. Comparez la race, la naissance, le poids actuel, la ferme et le prix.",
      ],
      [
        "2. Réservez à votre rythme",
        "Choisissez un acompte de 30 % ou un règlement complet simulé, une formule de pension et une date de réception.",
      ],
      [
        "3. Suivez sa croissance",
        "Retrouvez les pesées et les soins partagés par l’éleveur. Le poids futur est toujours une estimation, jamais une garantie.",
      ],
      [
        "4. Préparez la réception",
        "Organisez une livraison ou un retrait à la ferme. Échangez avec l’éleveur avant de confirmer les derniers détails.",
      ],
    ],
  },
  "for-farmers": {
    title: "Votre ferme. Votre savoir-faire.",
    intro:
      "Présentez vos jeunes agneaux et construisez une relation suivie avec vos clients.",
    sections: [
      [
        "Présentez votre ferme",
        "Complétez votre profil, les informations de votre exploitation et un dossier de vérification simulé.",
      ],
      [
        "Publiez vos agneaux",
        "Ajoutez une fiche par agneau de 2–3 mois, avec sa date de naissance, sa race, son poids, sa santé et ses tarifs.",
      ],
      [
        "Partagez les nouvelles",
        "Enregistrez une pesée, un soin ou une photo. Vos clients retrouvent les mises à jour dans leur espace.",
      ],
      [
        "Organisez votre activité",
        "Consultez les commandes, échangez avec vos clients et préparez les réceptions depuis un seul espace.",
      ],
    ],
  },
  "trust-safety": {
    title: "La confiance se construit au quotidien.",
    intro:
      "Des informations compréhensibles et un suivi visible à chaque étape.",
    sections: [
      [
        "Une fiche individuelle",
        "Chaque agneau possède un identifiant et un historique partagé entre les différents espaces.",
      ],
      [
        "Des informations de santé transparentes",
        "Le carnet rassemble les observations et interventions déclarées. Un vétérinaire doit valider les vrais dossiers avant toute utilisation commerciale.",
      ],
      [
        "Un prix détaillé",
        "Le prix de l’agneau, la pension estimée et le transport sont affichés séparément avant confirmation.",
      ],
      [
        "Les limites de cette démonstration",
        "Les fermes, vérifications et paiements sont fictifs. Il n’existe aucun séquestre bancaire, certification officielle ou garantie commerciale dans ce prototype.",
      ],
    ],
  },
  faq: {
    title: "Vos questions, simplement.",
    intro: "L’essentiel pour commencer avec Kharoufi.",
    sections: [
      [
        "Quel âge ont les agneaux ?",
        "Les agneaux du catalogue de démonstration ont environ 2–3 mois au 10 septembre 2026. Ils restent à la ferme pendant leur croissance.",
      ],
      [
        "Le poids futur est-il garanti ?",
        "Non. Le poids futur est une estimation. La croissance dépend de chaque animal, de sa santé, de son alimentation et de la durée de pension.",
      ],
      [
        "Comment la pension est-elle calculée ?",
        "Le tarif mensuel de la formule choisie est multiplié par le nombre de mois commencés jusqu’à la réception. Le récapitulatif montre le calcul estimé.",
      ],
      [
        "Puis-je choisir un retrait à la ferme ?",
        "Oui. Le retrait à la ferme est proposé sans frais de transport dans la démonstration. La livraison est simulée à 60 TND.",
      ],
      [
        "Un paiement est-il réellement effectué ?",
        "Non. Aucune carte n’est demandée et aucun débit n’est effectué. Les opérations sont enregistrées uniquement dans votre navigateur.",
      ],
      [
        "Puis-je changer de formule ou de date ?",
        "Oui, depuis votre espace client. Le total et le solde simulés sont recalculés.",
      ],
      [
        "Pourquoi les photos sont-elles manquantes ?",
        "Les exports présentent des animaux adultes. Des emplacements explicites les remplacent en attendant de vraies photos d’agneaux de 2–3 mois.",
      ],
    ],
  },
};
export const locales = ["fr", "en", "ar", "aeb"] as const;
