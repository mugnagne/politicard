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

// --- 4. LE CATALOGUE OFFICIEL (La Base de Données) ---
// C'est ici que tu créeras à la main toutes les cartes uniques du jeu.
const catalogueCartes = [
    new CartePolitique("c_001", "Jean-Claude", "Dufinance", "Trésorier", "Les Conservateurs", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Logo_Les_Républicains.svg/120px-Logo_Les_Républicains.svg.png", "Rare", { CHA: 30, ELO: 40, STR: 70, RIG: 90, RES: 60, TER: 20 }, "https://randomuser.me/api/portraits/men/45.jpg"),
    new CartePolitique("c_002", "Martine", "Boulard", "Candidat", "Parti Socialiste", "https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_Parti_Socialiste.svg", "Légendaire", { CHA: 85, ELO: 80, STR: 65, RIG: 50, RES: 75, TER: 60 }, "https://randomuser.me/api/portraits/women/68.jpg"),
    new CartePolitique("c_003", "Yannick", "Arbre", "Responsable Terrain", "Les Écologistes", "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b5/Logo_Europe_Écologie_Les_Verts.svg/120px-Logo_Europe_Écologie_Les_Verts.svg.png", "Commun", { CHA: 40, ELO: 50, STR: 30, RIG: 60, RES: 40, TER: 85 }, "https://randomuser.me/api/portraits/men/22.jpg"),
    new CartePolitique("c_004", "Sophie", "Réseau", "Directeur Campagne", "Mouvement Centre", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Logo_Renaissance_%28parti_politique%29.svg/120px-Logo_Renaissance_%28parti_politique%29.svg.png", "Épique", { CHA: 60, ELO: 70, STR: 88, RIG: 75, RES: 85, TER: 40 }, "https://randomuser.me/api/portraits/women/42.jpg"),
    new CartePolitique("c_005", "Luc", "Micro", "Porte-parole", "Parti Socialiste", "https://upload.wikimedia.org/wikipedia/commons/2/26/Logo_Parti_Socialiste.svg", "Rare", { CHA: 75, ELO: 85, STR: 50, RIG: 30, RES: 65, TER: 30 }, "https://randomuser.me/api/portraits/men/31.jpg")
];

// --- 5. LES DONNÉES DU JOUEUR ---
let argentJoueur = 1500;
let inventaireJoueur = []; // Le tableau vide qui va stocker les cartes gagnées

// --- 6. FONCTION OUTIL : GÉNÉRER LE HTML D'UNE CARTE ---
// Au lieu de l'injecter direct, cette fonction "prépare" juste le code HTML
function genererHTMLCarte(carteObject) {
    return `
        <div class="carte" id="${carteObject.id}_${Math.random().toString(36).substr(2, 5)}">
            <div class="carte-header">
                <div class="carte-note">${carteObject.noteGlobale}</div>
                <div class="carte-role-abrege">${carteObject.role.substring(0, 3)}</div>
                <div class="carte-logo-parti"><img src="${carteObject.logoParti}" alt="Logo Parti"></div>
            </div>
            <div class="carte-photo"><img src="${carteObject.image}" alt="Photo"></div>
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
}

// --- 7. LA BOUTIQUE (Système de Gacha/Packs) ---
function ouvrirPack() {
    const prixPack = 500;
    
    // On vérifie si le joueur a assez d'argent
    if (argentJoueur >= prixPack) {
        
        // 1. On déduit l'argent et on met à jour l'en-tête HTML
        argentJoueur -= prixPack;
        document.getElementById('argent-joueur').innerText = argentJoueur;

        // 2. On prépare la zone d'affichage dans la boutique
        const zoneResultat = document.getElementById('resultat-pack');
        zoneResultat.innerHTML = ''; // On vide l'ouverture précédente

        // 3. On pioche 3 cartes au hasard dans le catalogue
        for (let i = 0; i < 3; i++) {
            // Un nombre au hasard entre 0 et la taille de notre catalogue
            const indexAleatoire = Math.floor(Math.random() * catalogueCartes.length);
            const carteTiree = catalogueCartes[indexAleatoire];
            
            // On ajoute la vraie carte dans l'inventaire du joueur
            inventaireJoueur.push(carteTiree);
            
            // On affiche la carte à l'écran
            zoneResultat.innerHTML += genererHTMLCarte(carteTiree);
        }

        // 4. On met à jour l'écran "Collection" pour qu'il affiche notre inventaire
        mettreAJourCollection();
        
    } else {
        alert("Fonds insuffisants ! Lance une campagne pour gagner plus de 💰.");
    }
}

// --- 8. MISE À JOUR DE LA COLLECTION ---
function mettreAJourCollection() {
    const zoneCollection = document.getElementById('inventaire-cartes');
    zoneCollection.innerHTML = ''; // On vide pour tout redessiner proprement
    
    // Si l'inventaire est vide
    if (inventaireJoueur.length === 0) {
        zoneCollection.innerHTML = '<p>Votre collection est vide. Achetez des packs dans la Boutique !</p>';
        return;
    }

    // Sinon, on affiche chaque carte possédée
    inventaireJoueur.forEach(carte => {
        zoneCollection.innerHTML += genererHTMLCarte(carte);
    });
}
// --- 9. GESTION DE L'ÉQUIPE (SQUAD) ---
let equipeActuelle = {
    "Candidat": null,
    "Directeur Campagne": null,
    "Trésorier": null,
    "Responsable Communication": null,
    "Responsable Terrain": null,
    "Porte-parole": null
};

// Fonction pour choisir une carte
function ouvrirSelecteur(roleCible) {
    // On filtre l'inventaire pour ne montrer que les cartes ayant le bon rôle
    const cartesCompatibles = inventaireJoueur.filter(c => c.role === roleCible);
    
    if (cartesCompatibles.length === 0) {
        alert("Vous n'avez aucune carte de type : " + roleCible + ". Allez à la boutique !");
        return;
    }

    // Pour simplifier ce MVP, on va juste prendre la première carte compatible trouvée
    // (Dans une version finale, on ouvrirait une fenêtre de choix)
    const carteChoisie = cartesCompatibles[0];
    assignerCarteAEquipe(roleCible, carteChoisie);
}

function assignerCarteAEquipe(role, carte) {
    equipeActuelle[role] = carte;
    
    // Mise à jour visuelle du slot
    // On trouve l'ID du slot HTML (attention aux correspondances d'ID)
    let idSlot = "";
    if(role === "Candidat") idSlot = "slot-Candidat";
    if(role === "Directeur Campagne") idSlot = "slot-Directeur";
    if(role === "Trésorier") idSlot = "slot-Tresorier";
    if(role === "Responsable Communication") idSlot = "slot-Com";
    if(role === "Responsable Terrain") idSlot = "slot-Terrain";
    if(role === "Porte-parole") idSlot = "slot-Porteparole";

    const slotDiv = document.getElementById(idSlot);
    if (slotDiv) {
        slotDiv.querySelector('.slot-content').innerHTML = genererHTMLCarte(carte);
        slotDiv.style.borderStyle = "solid";
        slotDiv.style.borderColor = "#ffd700";
    }

    calculerForceEquipe();
}

function calculerForceEquipe() {
    let totalStats = 0;
    let nbMembres = 0;

    for (let role in equipeActuelle) {
        if (equipeActuelle[role]) {
            totalStats += equipeActuelle[role].noteGlobale;
            nbMembres++;
        }
    }

    const scoreTotal = nbMembres > 0 ? Math.round(totalStats / nbMembres) : 0;
    document.getElementById('score-equipe').innerText = scoreTotal;

    // Si l'équipe est complète (6 membres), on affiche le bouton pour lancer la campagne
    if (nbMembres === 6) {
        document.getElementById('btn-lancer-campagne').style.display = "inline-block";
    }
}
// On initialise la collection au lancement (elle sera vide au début)
mettreAJourCollection();


