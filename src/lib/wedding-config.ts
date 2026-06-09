// ════════════════════════════════════════════════════════════════
//  CONFIGURAZIONE INVITO — ordinata come appare nella pagina
//  (dall'alto verso il basso). Modifica qui tutti i contenuti.
// ════════════════════════════════════════════════════════════════

export const weddingConfig = {
  // ─────────────────────────────────────────────
  // 1 · BUSTA (schermata iniziale)
  // ─────────────────────────────────────────────
  initials: "K & G",

  // ─────────────────────────────────────────────
  // 2 · HERO / SPOSI
  // ─────────────────────────────────────────────
  brideName: "Kary",
  groomName: "Giulio",
  date: "26 Settembre 2026",
  city: "Italia",

  // ─────────────────────────────────────────────
  // 3 · CONTO ALLA ROVESCIA
  // ─────────────────────────────────────────────
  weddingDate: new Date("2026-09-26T11:00:00"),

  // ─────────────────────────────────────────────
  // 4 · LOCATION (Cerimonia)
  // ─────────────────────────────────────────────
  ceremonyVenue: "Tavernetta Beach",
  ceremonyAddress: "Loc, Spiaggia di Porto Taverna, SUD, 07020 Vaccileddi SS",
  ceremonyTime: "11:30",
  ceremonyMapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6035.442422704241!2d9.6578387!3d40.8560443!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12decd8750088e8b%3A0xcd0b1622c433e3de!2sTavernetta%20Beach!5e0!3m2!1sen!2sca!4v1780933529717!5m2!1sen!2sca",

  // ─────────────────────────────────────────────
  // 5 · DOMANDE FREQUENTI
  // ─────────────────────────────────────────────
  faqItems: [
    {
      question: "Dove posso parcheggiare?",
      answer:
        "È disponibile un ampio parcheggio gratuito presso la location. Potete parcheggiare direttamente nei pressi del locale.",
    },
    {
      question: "Qual è il dress code?",
      answer:
        "Il dress code è elegante. Vi chiediamo gentilmente di evitare il bianco. Sentitevi liberi di esprimere la vostra personalità con colori e stili adatti all'occasione.",
    },
    {
      question: "I bambini sono benvenuti?",
      answer:
        "I bambini sono i benvenuti. Per il ricevimento vi chiediamo di comunicarci in anticipo la loro presenza, così potremo organizzarci al meglio.",
    },
    {
      question: "È prevista una lista nozze?",
      answer:
        "Il vostro affetto è il dono più grande. Per chi lo desidera, trovate i dettagli nella sezione Regali qui sotto.",
    },
  ],

  // ─────────────────────────────────────────────
  // 6 · REGALI
  // ─────────────────────────────────────────────
  giftEnabled: true,
  giftBlurb:
    "Se vorrete farci un dono, accompagnateci nel nostro viaggio di nozze. Sarà il primo orizzonte che guarderemo insieme.",
  giftCardTitle: "Contributo",
  giftDescription:
    "Per chi lo desidera, contributo in busta il giorno delle nozze oppure tramite bonifico.",
  giftAccountName: "Giulio Ciro Formicola",
  giftIban: "IT 13J0 3058 0160 4100 5716 83064",

  // ─────────────────────────────────────────────
  // 7 · FOOTER
  // ─────────────────────────────────────────────
  footerMessage: "Vi aspettiamo.",
  dateShort: "26 · 09 · 2026",

  // ════════════════════════════════════════════════════════════════
  //  TESTI DELL'INTERFACCIA — in ordine di apparizione nella pagina
  // ════════════════════════════════════════════════════════════════
  text: {
    // 1 · Busta iniziale (schermata di apertura)
    envelope: {
      invitation: "Siete Cordialmente Invitati",
      title: "Al nostro matrimonio",
      cta: "✦ Tocca per aprire ✦",
      letterNote: "Vi aspettiamo",
    },

    // 2 · Hero (sopra i nomi)
    hero: {
      intro: "Vi aspettiamo",
    },

    // 3 · Conto alla rovescia
    countdown: {
      label: "Il grande giorno si avvicina",
      title: "Conto alla rovescia",
      // Sottotitolo sotto il titolo. Usa {date} per inserire la data del
      // matrimonio. Lascia "" per nasconderlo.
      subtitle: "{date}",
      days: "Giorni",
      hours: "Ore",
      minutes: "Minuti",
      seconds: "Secondi",
    },

    // 4 · Sezione location
    details: {
      label: "Dove ci troviamo",
      title: "La location",
      subtitle: "Tutto quello che devi sapere per raggiungerci",
      ceremonyLabel: "Cerimonia & Ricevimento",
      timePrefix: "ore",
    },

    // 5 · Modulo di conferma (RSVP)
    rsvp: {
      label: "La vostra presenza è un dono",
      title: "Conferma la tua presenza",
      deadlinePrefix: "Vi preghiamo di rispondere entro il",
      deadlineDate: "31 luglio 2026",
      inviteCodeLabel: "Codice invito",
      inviteCodePlaceholder: "Inserisci il codice ricevuto",
      nameLabel: "Nome completo",
      namePlaceholder: "Nome e cognome",
      attendingQuestion: "Partecipi?",
      attendingYes: "Sì, ci sarò",
      attendingNo: "Purtroppo non posso",
      dietaryLabel: "Intolleranze o allergie",
      dietaryPlaceholder: "Es: vegetariano, celiaco, senza lattosio...",
      messageLabel: "Un messaggio per gli sposi",
      messagePlaceholder: "Scrivi un pensiero o un augurio...",
      submitIdle: "Conferma la tua presenza",
      submitPending: "Invio in corso...",
      // Ospiti aggiuntivi
      extraGuestsLabel: "Ospiti aggiuntivi",
      addGuest: "Aggiungi",
      noGuests:
        'Nessun ospite aggiuntivo — clicca "Aggiungi" per inserirne uno.',
      guestLabel: "Ospite",
      guestNameLabel: "Nome completo *",
      guestNamePlaceholder: "Nome e cognome",
      guestDietaryLabel: "Allergie",
      guestDietaryPlaceholder: "Intolleranze o allergie...",
      // Stato di successo
      successTitle: "Grazie mille!",
      successMessage:
        "La tua risposta è stata ricevuta con gioia.\nNon vediamo l'ora di festeggiare insieme.",
      // Messaggi di validazione / errore
      errInviteCode: "Inserisci il codice invito",
      errName: "Inserisci il tuo nome completo",
      errGuestName: "Inserisci il nome",
      errInvalidCode: "Codice invito non valido. Riprova.",
      errSend: "Errore nell'invio. Riprova più tardi.",
      errNetwork: "Errore di rete. Riprova.",
    },

    // 6 · Domande frequenti
    faq: {
      label: "Tutto quello che c'è da sapere",
      title: "Domande",
    },

    // 7 · Sezione regali
    gifts: {
      label: "Con tutto il nostro affetto",
      title: "Regali",
      reveal: "Rivela",
      hide: "Nascondi",
      copy: "Copia IBAN",
      copied: "Copiato",
    },

    // 8 · Alloggio
    accommodation: {
      title: "Alloggio",
      residenceName: "Residence Lu Nibareddu",
      // Testo prima e dopo il nome del residence (evidenziato in oro).
      descriptionBefore:
        "Per chi non avesse ancora prenotato l’alloggio, consigliamo il ",
      descriptionAfter:
        ", situato nelle vicinanze della location del matrimonio. Per ricevere tutte le informazioni e procedere con la prenotazione, potrete contattarci direttamente.",
      shuttle:
        "Il residence metterà inoltre a disposizione degli invitati un servizio navetta di andata e ritorno da e per il luogo della cerimonia.",
    },

    // 9 · Footer
    footer: {
      closing: "Con amore,",
    },
  },
};
