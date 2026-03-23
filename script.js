// Fonction pour gérer la navigation entre les onglets
function changerEcran(idEcranCible) {
    // 1. On cache tous les écrans en leur retirant la classe "actif"
    const ecrans = document.querySelectorAll('.ecran');
    ecrans.forEach(ecran => {
        ecran.classList.remove('actif');
    });

    // 2. On affiche l'écran demandé
    const ecranCible = document.getElementById(idEcranCible);
    ecranCible.classList.add('actif');

    // 3. Optionnel : On met à jour l'état visuel des boutons du menu
    // (Tu peux ajouter cette logique plus tard pour peaufiner l'UI)
}

// Définition du "moule" pour toutes nos cartes politiques
class CartePolitique {
    constructor(id, prenom, nom, role, rarete, stats, imagePath) {
        this.id = id; // Un identifiant unique (ex: "carte_001")
        this.prenom = prenom;
        this.nom = nom;
        this.role = role; // Ex: "Trésorier", "Candidat"...
        this.rarete = rarete; // Ex: "Commun", "Rare", "Légendaire"
        this.image = imagePath; // Le lien vers la photo du politicien
        
        // Les 6 statistiques (un objet contenant les notes de 1 à 99)
        this.stats = {
            CHA: stats.CHA, // Charisme
            ELO: stats.ELO, // Éloquence
            STR: stats.STR, // Stratégie
            RIG: stats.RIG, // Rigueur
            RES: stats.RES, // Réseau
            TER: stats.TER  // Terrain
        };

        // On calcule automatiquement la note globale (Général/OVR) à la création de la carte
        this.noteGlobale = this.calculerNoteGlobale();
    }

    // Méthode (fonction interne) pour calculer la moyenne des stats
    calculerNoteGlobale() {
        let total = this.stats.CHA + this.stats.ELO + this.stats.STR + 
                    this.stats.RIG + this.stats.RES + this.stats.TER;
        // On divise par 6 et on arrondit à l'entier le plus proche
        return Math.round(total / 6); 
    }
}

// --- EXEMPLE DE CRÉATION DE CARTES ---

// On crée une base de données de cartes (un tableau JavaScript)
const collectionDeCartes = [
    // Création d'un Trésorier Légendaire
    new CartePolitique(
        "c_001", "Jean-Claude", "Dufinance", "Trésorier", "Légendaire", 
        { CHA: 25, ELO: 40, STR: 80, RIG: 95, RES: 70, TER: 30 },
        "images/jean_claude.jpg"
    ),
    
    // Création d'une Responsable Terrain Commune
    new CartePolitique(
        "c_002", "Martine", "Pavé", "Responsable Terrain", "Commun", 
        { CHA: 50, ELO: 45, STR: 30, RIG: 60, RES: 40, TER: 85 },
        "images/martine.jpg"
    )
];

// Si tu fais un console.log(collectionDeCartes[0]), tu verras toutes les infos de Jean-Claude !
