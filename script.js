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
    constructor(id, prenom, nom, role, parti, logoParti, rarete, stats, imagePath) {
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.role = role;
        this.parti = parti; 
        this.logoParti = logoParti; // URL de l'image du logo
        this.rarete = rarete;
        this.image = imagePath;
        this.stats = stats;
        this.noteGlobale = this.calculerNoteGlobale();
    }

    calculerNoteGlobale() {
        let total = this.stats.CHA + this.stats.ELO + this.stats.STR + 
                    this.stats.RIG + this.stats.RES + this.stats.TER;
        return Math.round(total / 6); 
    }
}

// --- EXEMPLE DE CRÉATION DE CARTES ---
const prenoms = ["Jean-Marc", "Patrick", "Ségolène", "Valérie", "Xavier", "Arnaud", "Nathalie", "Édouard"];
const noms = ["Balkany", "De La Villardière", "Levallois", "Montbourg", "Pécresse", "Sarkoz", "Dufour", "Bouchard"];

function genererNomAleatoire() {
    const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const nom = noms[Math.floor(Math.random() * noms.length)];
    return { prenom, nom };
}

// 3. CRÉATION D'UNE CARTE DE TEST
const nomAleatoire = genererNomAleatoire();
const maPremiereCarte = new CartePolitique(
    "c_test_1", 
    nomAleatoire.prenom, 
    nomAleatoire.nom, 
    "Candidat", 
    "Parti Socialiste", 
    "https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_Parti_Socialiste.svg", // Logo PS
    "Légendaire", 
    { CHA: 88, ELO: 85, STR: 70, RIG: 40, RES: 92, TER: 65 },
    "https://randomuser.me/api/portraits/men/32.jpg" // Visage aléatoire
);
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

// Fonction pour créer l'HTML d'une carte et l'afficher dans l'inventaire
function afficherCarte(carteObject) {
    // On cible la boîte vide dans notre index.html
    const inventaire = document.getElementById('inventaire-cartes');

    // On fabrique le bloc HTML avec les données de la carte
    const htmlDeLaCarte = `
        <div class="carte" id="${carteObject.id}">
            <div class="carte-header">
                <div class="carte-note">${carteObject.noteGlobale}</div>
                <div class="carte-role-abrege">${carteObject.role.substring(0, 3)}</div>
                <div class="carte-logo-parti">
                    <img src="${carteObject.logoParti}" alt="Logo Parti">
                </div>
            </div>
            
            <div class="carte-photo">
                <img src="${carteObject.image}" alt="Photo de ${carteObject.nom}">
            </div>
            
            <div class="carte-infos">
                <div class="carte-nom">${carteObject.prenom} <br> ${carteObject.nom}</div>
                <div class="carte-stats-grid">
                    <div class="stat-item"><span>CHA</span> <span class="stat-valeur">${carteObject.stats.CHA}</span></div>
                    <div class="stat-item"><span>RIG</span> <span class="stat-valeur">${carteObject.stats.RIG}</span></div>
                    <div class="stat-item"><span>ELO</span> <span class="stat-valeur">${carteObject.stats.ELO}</span></div>
                    <div class="stat-item"><span>RES</span> <span class="stat-valeur">${carteObject.stats.RES}</span></div>
                    <div class="stat-item"><span>STR</span> <span class="stat-valeur">${carteObject.stats.STR}</span></div>
                    <div class="stat-item"><span>TER</span> <span class="stat-valeur">${carteObject.stats.TER}</span></div>
                </div>
            </div>
        </div>
    `;

    // On injecte ce HTML dans la page
    inventaire.innerHTML += htmlDeLaCarte;
}

// On lance l'affichage de notre carte de test !
afficherCarte(maPremiereCarte);
