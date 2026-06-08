export const weddingConfig = {
  groomName: "Giulio",
  brideName: "Kary",
  initials: "K & G",
  date: "26 Settembre 2026",
  dateShort: "26 · 09 · 2026",
  weddingDate: new Date("2026-09-26T11:00:00"),
  city: "Italia",

  // Ceremony
  ceremonyVenue: "Chiesa di Santa Maria",
  ceremonyAddress: "Via Roma 1, Città",
  ceremonyTime: "16:00",
  ceremonyMapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.0!2d12.4922!3d41.8902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUzJzI0LjciTiAxMsKwMjknMzIuMCJF!5e0!3m2!1sit!2sit!4v1234567890",

  // Reception
  receptionVenue: "Villa Mare",
  receptionAddress: "Via del Mare 10, Città",
  receptionTime: "19:00",
  receptionMapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.0!2d12.4922!3d41.8902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUzJzI0LjciTiAxMsKwMjknMzIuMCJF!5e0!3m2!1sit!2sit!4v1234567891",

  // FAQ
  faqItems: [
    {
      question: "Dove posso parcheggiare?",
      answer:
        "È disponibile un ampio parcheggio gratuito presso la location. Potete parcheggiare direttamente nei pressi della villa.",
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

  // Gifts / Regali
  giftEnabled: true,
  giftBlurb:
    "Se vorrete farci un dono, accompagnateci nel nostro viaggio di nozze. Sarà il primo orizzonte che guarderemo insieme.",
  giftCardTitle: "Contributo",
  giftDescription:
    "Per chi lo desidera, contributo in busta il giorno delle nozze oppure tramite bonifico.",
  giftIban: "IT 1234 5678 9101 1121 3141 516",

  // Footer
  footerMessage: "Vi aspettiamo.",

  // ───────────────────────────────────────────────────────────────
  // Tutti i testi dell'interfaccia — modificali qui
  // ───────────────────────────────────────────────────────────────
  text: {
    // Busta iniziale (schermata di apertura)
    envelope: {
      invitation: "Siete Cordialmente Invitati",
      title: "Al nostro matrimonio",
      cta: "✦ Tocca per aprire ✦",
      letterNote: "Vi aspettiamo",
    },

    // Sezione hero (nomi)
    hero: {
      intro: "Vi aspettiamo",
    },

    // Conto alla rovescia
    countdown: {
      label: "Il grande giorno si avvicina",
      title: "Conto alla rovescia",
      days: "Giorni",
      hours: "Ore",
      minutes: "Minuti",
      seconds: "Secondi",
    },

    // Sezione location
    details: {
      label: "Dove ci troviamo",
      title: "La location",
      subtitle: "Tutto quello che devi sapere per raggiungerci",
      ceremonyLabel: "Cerimonia",
      timePrefix: "ore",
    },

    // Domande frequenti
    faq: {
      label: "Tutto quello che c'è da sapere",
      title: "Domande",
    },

    // Modulo di conferma (RSVP)
    rsvp: {
      label: "La vostra presenza è un dono",
      title: "Conferma la tua presenza",
      deadlinePrefix: "Vi preghiamo di rispondere entro il",
      deadlineDate: "30 aprile 2026",
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

    // Sezione regali
    gifts: {
      label: "Con tutto il nostro affetto",
      title: "Regali",
      reveal: "Rivela",
      hide: "Nascondi",
      copy: "Copia IBAN",
      copied: "Copiato",
    },

    // Footer
    footer: {
      closing: "Con amore,",
    },
  },
};
