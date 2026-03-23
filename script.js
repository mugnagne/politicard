// --- 1. NAVIGATION ENTRE LES ÉCRANS ---
function changerEcran(idEcranCible) {
    const ecrans = document.querySelectorAll('.ecran');
    ecrans.forEach(ecran => {
        ecran.classList.remove('actif');
    });
    const ecranCible = document.getElementById(idEcranCible);
    ecranCible.classList.add('actif');
}

// --- 2. LE MOULE DE LA CARTE (Version avec Parti Politique) ---
class CartePolitique {
    constructor(id, prenom, nom, role, parti, logoParti, rarete, stats, imagePath) {
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.role = role;
        this.parti = parti; 
        this.logoParti = logoParti; 
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

// --- 3. GÉNÉRATEUR DE NOMS ---
const prenoms = ["Jean-Marc", "Patrick", "Ségolène", "Valérie", "Xavier", "Arnaud", "Nathalie", "Édouard"];
const noms = ["Balkany", "De La Villardière", "Levallois", "Montbourg", "Pécresse", "Sarkoz", "Dufour", "Bouchard"];

function genererNomAleatoire() {
    const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const nom = noms[Math.floor(Math.random() * noms.length)];
    return { prenom, nom };
}

// --- 4. CRÉATION D'UNE CARTE DE TEST ---
const nomAleatoire = genererNomAleatoire();
const maPremiereCarte = new CartePolitique(
    "c_test_1", 
    nomAleatoire.prenom, 
    nomAleatoire.nom, 
    "Candidat", 
    "Parti Socialiste", 
    "https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_Parti_Socialiste.svg",
    "Légendaire", 
    { CHA: 88, ELO: 85, STR: 70, RIG: 40, RES: 92, TER: 65 },
    "https://randomuser.me/api/portraits/men/32.jpg"
);

// --- 5. INJECTION HTML (L'affichage visuel) ---
function afficherCarte(carteObject) {
    const inventaire = document.getElementById('inventaire-cartes');
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
    inventaire.innerHTML += htmlDeLaCarte;
}

// On lance l'affichage au chargement
afficherCarte(maPremiereCarte);
