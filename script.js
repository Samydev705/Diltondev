//Script JavaScript pour le portfolio DiltonDev - Version Mailto uniquement

document.addEventListener("DOMContentLoaded", function () {
  /* =======================
       VARIABLES GLOBALES
       ======================= */
  const hamburger = document.querySelector(".hamburger") || null;
  const navMenu = document.querySelector(".nav-menu") || null;
  const navLinks = document.querySelectorAll(".nav-link") || [];
  const contactForm = document.getElementById("contactForm") || null;
  const navbar = document.querySelector(".navbar") || null;

  // Boutons pour la section "Mes tarifs"
  const btnStatique = document.getElementById("btn-statique") || null;
  const btnDynamique = document.getElementById("btn-dynamique") || null;
  const tarifStatique = document.getElementById("tarif-statique") || null;
  const tarifDynamique = document.getElementById("tarif-dynamique") || null;

  // Configuration email - Adresse où les messages seront envoyés
  const VOTRE_EMAIL = "Diltondev@gmail.com";

  /* =======================
       MENU HAMBURGER MOBILE
       ======================= */
  if (hamburger && navMenu) {
    function toggleMobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  // Fermer le menu mobile quand on clique sur un lien
  if (navLinks.length > 0 && hamburger && navMenu) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  /* =======================
       NAVIGATION FLUIDE (smooth scroll)
       ======================= */
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      if (
        link.getAttribute("href") &&
        link.getAttribute("href").startsWith("#")
      ) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        });
      }
    });
  }

  /* =======================
       EFFET SCROLL SUR LA NAVBAR
       ======================= */
  if (navbar) {
    function handleScroll() {
      const scrolled = window.pageYOffset;
      if (scrolled > 50) {
        navbar.style.background = "rgba(10, 14, 39, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
      } else {
        navbar.style.background = "rgba(10, 14, 39, 0.95)";
        navbar.style.boxShadow = "none";
      }
    }
    window.addEventListener("scroll", handleScroll);
  }

  /* =======================
       GESTION DE LA SECTION "MES TARIFS"
       ======================= */
  if (btnStatique && btnDynamique && tarifStatique && tarifDynamique) {
    btnStatique.addEventListener("click", () => {
      tarifStatique.style.display = "block";
      tarifDynamique.style.display = "none";

      btnStatique.classList.add("active");
      btnDynamique.classList.remove("active");
    });

    btnDynamique.addEventListener("click", () => {
      tarifStatique.style.display = "none";
      tarifDynamique.style.display = "block";

      btnDynamique.classList.add("active");
      btnStatique.classList.remove("active");
    });

    // Initialiser le bouton "Apps mobiles" comme actif par défaut
    btnDynamique.classList.add("active");
    tarifStatique.style.display = "none";
    tarifDynamique.style.display = "block";
  }

  /* =======================
       GESTION DU FORMULAIRE DE CONTACT
       ======================= */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Récupération des données du formulaire
      const formData = {
        nom: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        sujet: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      // Validation des champs
      if (!validerFormulaire(formData)) {
        return;
      }

      // Afficher le loader sur le bouton
      const submitBtn = contactForm.querySelector(".btn-submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Ouverture de votre email...";
      submitBtn.disabled = true;

      // Envoyer avec la méthode Mailto
      envoyerEmailAvecMailto(formData, submitBtn, originalText);
    });
  }

  /* =======================
       FONCTION DE VALIDATION DU FORMULAIRE
       ======================= */
  function validerFormulaire(data) {
    // Vérifier que tous les champs sont remplis
    if (!data.nom || !data.email || !data.sujet || !data.message) {
      afficherMessage(
        "Veuillez remplir tous les champs obligatoires.",
        "error"
      );
      return false;
    }

    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      afficherMessage("Veuillez entrer une adresse email valide.", "error");
      return false;
    }

    // Vérifier la longueur du nom
    if (data.nom.length < 2) {
      afficherMessage("Le nom doit contenir au moins 2 caractères.", "error");
      return false;
    }

    // Vérifier la longueur du sujet
    if (data.sujet.length < 5) {
      afficherMessage("Le sujet doit contenir au moins 5 caractères.", "error");
      return false;
    }

    // Vérifier la longueur du message
    if (data.message.length < 10) {
      afficherMessage(
        "Le message doit contenir au moins 10 caractères.",
        "error"
      );
      return false;
    }

    return true;
  }

  /* =======================
       ENVOI D'EMAIL AVEC MAILTO
       Cette méthode ouvre le client email de l'utilisateur
       ======================= */
  function envoyerEmailAvecMailto(data, submitBtn, originalText) {
    // Construire le lien mailto avec toutes les informations
    const sujetEncode = encodeURIComponent(`[Contact Portfolio] ${data.sujet}`);
    const corpsEmail = encodeURIComponent(
      `Bonjour DILTON DEV,\n\n` +
        `Vous avez reçu un nouveau message depuis votre portfolio :\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 NOM: ${data.nom}\n` +
        `📧 EMAIL: ${data.email}\n` +
        `📝 SUJET: ${data.sujet}\n\n` +
        `💬 MESSAGE:\n${data.message}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `⏰ Date: ${new Date().toLocaleString("fr-FR")}\n` +
        `🌐 Envoyé depuis: Portfolio DiltonDev\n\n` +
        `Pour répondre, utilisez directement l'adresse: ${data.email}`
    );

    const mailtoLink = `mailto:Diltondev@gmail.com?subject=${sujetEncode}&body=${corpsEmail}`;

    // Vérifier si la longueur de l'URL n'est pas trop grande (limite des navigateurs)
    if (mailtoLink.length > 2000) {
      // Si l'URL est trop longue, utiliser une version simplifiée
      const corpsEmailSimple = encodeURIComponent(
        `Message de: ${data.nom} (${data.email})\n` +
          `Sujet: ${data.sujet}\n\n${data.message}`
      );
      const mailtoLinkSimple = `mailto:Diltondev@gmail.com?subject=${sujetEncode}&body=${corpsEmailSimple}`;
      window.location.href = mailtoLinkSimple;
    } else {
      // Ouvrir le client email avec le message complet
      window.location.href = mailtoLink;
    }

    // Simuler un délai et afficher un message de confirmation
    setTimeout(() => {
      afficherMessage(
        'Votre client email a été ouvert avec le message pré-rempli. Veuillez cliquer sur "Envoyer" dans votre application email pour finaliser l\'envoi.',
        "info"
      );
      restaurerBouton(submitBtn, originalText);
      contactForm.reset(); // Vider le formulaire
    }, 1500);
  }

  /* =======================
       FONCTION D'AFFICHAGE DES MESSAGES DE STATUT
       ======================= */
  function afficherMessage(message, type) {
    // Supprimer les anciens messages
    const ancienMessage = document.querySelector(".form-message");
    if (ancienMessage) {
      ancienMessage.remove();
    }

    // Créer le nouveau message
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="message-icon">${getMessageIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;

    // Styles CSS du message
    messageDiv.style.cssText = `
            padding: 1rem 1.5rem;
            margin: 1rem 0;
            border-radius: 12px;
            font-weight: 500;
            text-align: left;
            animation: slideDown 0.3s ease-out;
            position: relative;
            overflow: hidden;
        `;

    // Couleurs selon le type de message
    if (type === "success") {
      messageDiv.style.background = "rgba(16, 185, 129, 0.15)";
      messageDiv.style.color = "#10b981";
      messageDiv.style.border = "1px solid rgba(16, 185, 129, 0.3)";
    } else if (type === "error") {
      messageDiv.style.background = "rgba(239, 68, 68, 0.15)";
      messageDiv.style.color = "#ef4444";
      messageDiv.style.border = "1px solid rgba(239, 68, 68, 0.3)";
    } else if (type === "info") {
      messageDiv.style.background = "rgba(59, 130, 246, 0.15)";
      messageDiv.style.color = "#3b82f6";
      messageDiv.style.border = "1px solid rgba(59, 130, 246, 0.3)";
    }

    // Ajouter le message avant le premier élément du formulaire
    contactForm.insertBefore(messageDiv, contactForm.firstChild);

    // Scroll vers le message pour s'assurer qu'il est visible
    messageDiv.scrollIntoView({ behavior: "smooth", block: "center" });

    // Faire disparaître le message après 8 secondes
    setTimeout(() => {
      if (messageDiv && messageDiv.parentNode) {
        messageDiv.style.animation = "slideUp 0.3s ease-out";
        setTimeout(() => {
          if (messageDiv.parentNode) {
            messageDiv.remove();
          }
        }, 300);
      }
    }, 8000);
  }

  /* =======================
       FONCTION POUR OBTENIR L'ICÔNE DU MESSAGE
       ======================= */
  function getMessageIcon(type) {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "💌";
      default:
        return "📝";
    }
  }

  /* =======================
       FONCTION POUR RESTAURER LE BOUTON D'ENVOI
       ======================= */
  function restaurerBouton(submitBtn, originalText) {
    if (submitBtn) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  /* =======================
       AJOUT D'ANIMATIONS CSS POUR LES MESSAGES
       ======================= */
  const animationStyles = document.createElement("style");
  animationStyles.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
                max-height: 0;
            }
            to {
                opacity: 1;
                transform: translateY(0);
                max-height: 100px;
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
                max-height: 100px;
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
                max-height: 0;
            }
        }
        
        .form-message {
            transition: all 0.3s ease;
        }
        
        .message-icon {
            font-size: 1.2em;
            flex-shrink: 0;
        }

        /* Style pour les boutons actifs des tarifs */
        .tarif-toggle button.active {
            background: var(--accent-blue, #2563eb) !important;
            color: var(--text-primary, #ffffff) !important;
            transform: scale(1.05);
        }
    `;
  document.head.appendChild(animationStyles);

  /* =======================
       GESTION DES ERREURS GLOBALES
       ======================= */
  window.addEventListener("error", function (e) {
    console.error("Erreur JavaScript:", e.error);
  });

  /* =======================
       LOG DE DÉMARRAGE
       ======================= */
  console.log("🚀 Portfolio DiltonDev - JavaScript chargé avec succès!");
  console.log("📧 Email de destination: Diltondev@gmail.com");
  console.log("⚡ Méthode d'envoi: Mailto (Simple et Efficace)");
  console.log(
    "✅ Tous les emails clients seront envoyés vers Diltondev@gmail.com"
  );
});
