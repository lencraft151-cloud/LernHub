export default {
  id: 'pw9-wahlen',
  title: 'Demokratie und Wahlen in Deutschland',
  summary: 'Bei der Bundestagswahl hat jede Person zwei Stimmen. Erst- und Zweitstimme haben völlig unterschiedliche Aufgaben — die Zweitstimme entscheidet über die Machtverhältnisse.',
  estimatedMinutes: 30,
  aliases: ['Bundestagswahl', 'Erststimme', 'Zweitstimme', 'Fünf-Prozent-Hürde', 'Wahlgrundsätze', 'Direktmandat'],
  competencies: [
    { id: 'grundsaetze', title: 'Wahlgrundsätze', description: 'Die fünf Wahlgrundsätze benennen und erklären.' },
    { id: 'stimmen', title: 'Erst- und Zweitstimme', description: 'Die beiden Stimmen und ihre Wirkung unterscheiden.' },
    { id: 'huerde', title: 'Fünf-Prozent-Hürde', description: 'Sinn und Wirkung der Sperrklausel erklären.' },
    { id: 'sitze', title: 'Sitzverteilung', description: 'Den Weg von den Stimmen zu den Sitzen nachvollziehen.' },
    { id: 'regierung', title: 'Regierungsbildung', description: 'Von der Wahl zur Kanzlerwahl und Koalition.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Die fünf Wahlgrundsätze',
      blocks: [
        { type: 'text', html: 'Artikel 38 des Grundgesetzes legt fest, wie gewählt wird. Die fünf Grundsätze sind nicht verhandelbar — sie sichern faire Wahlen.' },
        {
          type: 'table',
          caption: 'Die Wahlgrundsätze nach Art. 38 GG',
          head: ['Grundsatz', 'Bedeutung'],
          rows: [
            ['allgemein', 'Alle Staatsbürger ab 18 Jahren dürfen wählen — unabhängig von Geschlecht, Einkommen, Bildung oder Herkunft.'],
            ['unmittelbar (direkt)', 'Die Stimmen wirken ohne Zwischeninstanz; es gibt keine Wahlmänner.'],
            ['frei', 'Niemand darf zur Wahl oder zu einer bestimmten Entscheidung gezwungen oder gedrängt werden.'],
            ['gleich', 'Jede Stimme hat dasselbe Gewicht — „one person, one vote".'],
            ['geheim', 'Niemand darf erfahren, wie eine Person gewählt hat — daher die Wahlkabine.'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Eselsbrücke',
          html: '<strong>A-U-F-G-G</strong>: <strong>a</strong>llgemein, <strong>u</strong>nmittelbar, '
            + '<strong>f</strong>rei, <strong>g</strong>leich, <strong>g</strong>eheim. '
            + 'Merksatz: „<strong>A</strong>lle <strong>u</strong>nsere <strong>F</strong>reunde '
            + '<strong>g</strong>ehen <strong>g</strong>ern wählen."',
        },
        { type: 'text', html: 'Wahlberechtigt ist bei Bundestagswahlen, wer <strong>Deutsche oder Deutscher</strong> ist, das <strong>18. Lebensjahr</strong> vollendet hat und seit mindestens drei Monaten in Deutschland wohnt. Bei Kommunal- und Europawahlen gelten teils andere Regeln — in mehreren Bundesländern darf man kommunal schon ab 16 wählen.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Erststimme und Zweitstimme',
      blocks: [
        { type: 'text', html: 'Auf dem Wahlzettel stehen zwei Spalten. Sie haben <strong>völlig unterschiedliche Aufgaben</strong> — und der Name führt in die Irre: Die „Zweitstimme" ist die <strong>wichtigere</strong>.' },
        {
          type: 'table',
          caption: 'Die beiden Stimmen im Vergleich',
          head: ['', 'Erststimme (links, schwarz)', 'Zweitstimme (rechts, blau)'],
          rows: [
            ['Man wählt …', 'eine Person aus dem eigenen Wahlkreis', 'eine Partei (Landesliste)'],
            ['Wahlsystem', 'Mehrheitswahl — wer die meisten Stimmen hat, gewinnt', 'Verhältniswahl'],
            ['Ergebnis', 'Direktmandat für den Wahlkreis', 'Anteil der Sitze für die Partei'],
            ['Bedeutung', 'bestimmt, wer den Wahlkreis vertritt', 'bestimmt die Stärkeverhältnisse im Bundestag'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Das Wichtigste in einem Satz',
          html: 'Die <strong>Erststimme</strong> entscheidet, <strong>wer</strong> für den Wahlkreis in den Bundestag kommt. '
            + 'Die <strong>Zweitstimme</strong> entscheidet, <strong>wie viele Sitze</strong> jede Partei insgesamt bekommt — '
            + 'und damit, wer regieren kann.',
        },
        { type: 'text', html: 'Deutschland ist in <strong>299 Wahlkreise</strong> eingeteilt. In jedem gewinnt genau eine Person das Direktmandat. Die Gesamtzahl der Sitze richtet sich aber nach den Zweitstimmen.' },
        {
          type: 'example',
          title: 'Beispiel 1 — warum die Zweitstimme wichtiger ist',
          task: 'Eine Partei gewinnt 20 Direktmandate, erhält aber nur 4 % der Zweitstimmen. Eine andere gewinnt kein Direktmandat, erhält aber 25 % der Zweitstimmen.',
          steps: [
            { text: 'Die Zweitstimmen bestimmen den Anteil an allen Sitzen.', detail: '25 % der Zweitstimmen bedeuten rund 25 % der Sitze.' },
            { text: 'Die 4-Prozent-Partei scheitert an der Sperrklausel.', detail: 'Sie zieht nur ein, wenn eine Ausnahme greift.' },
            { text: 'Die 25-Prozent-Partei wird eine der stärksten Fraktionen.' },
          ],
          result: 'Direktmandate bestimmen die Köpfe, die Zweitstimmen die Machtverhältnisse.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Sperrklausel, Sitze und Regierung',
      blocks: [
        { type: 'text', html: 'In den Bundestag zieht nur ein, wer <strong>mindestens 5 % der Zweitstimmen</strong> erreicht — die <strong>Fünf-Prozent-Hürde</strong>.' },
        {
          type: 'note',
          variant: 'info',
          title: 'Warum es die Hürde gibt',
          html: 'Sie soll eine <strong>Zersplitterung</strong> des Parlaments verhindern. In der Weimarer Republik gab es keine '
            + 'Sperrklausel; viele Kleinparteien machten stabile Mehrheiten fast unmöglich. Der Preis ist, dass die Stimmen '
            + 'für kleine Parteien im Ergebnis unberücksichtigt bleiben — ein bewusst in Kauf genommener Zielkonflikt '
            + 'zwischen <strong>Stabilität</strong> und <strong>genauer Abbildung des Wählerwillens</strong>. '
            + 'Für nationale Minderheiten und in bestimmten Fällen gibt es Ausnahmen.',
        },
        {
          type: 'steps',
          items: [
            { text: 'Alle Zweitstimmen werden gezählt.', detail: 'Parteien unter 5 % bleiben unberücksichtigt.' },
            { text: 'Die Sitze werden im Verhältnis der Zweitstimmen auf die Parteien verteilt.' },
            { text: 'Innerhalb der Parteien werden die Sitze auf die Bundesländer verteilt.' },
            { text: 'Zuerst rücken die gewählten Direktkandidaten ein, dann die Kandidaten der Landeslisten.' },
            { text: 'Der Bundestag konstituiert sich und wählt sein Präsidium.' },
            { text: 'Der Bundespräsident schlägt eine Person für das Kanzleramt vor, der Bundestag wählt sie mit absoluter Mehrheit.' },
          ],
        },
        { type: 'text', html: 'Weil selten eine Partei allein die absolute Mehrheit erreicht, bilden meist mehrere Parteien eine <strong>Koalition</strong>. Sie verhandeln einen <strong>Koalitionsvertrag</strong>, in dem sie ihre Vorhaben für die Wahlperiode festhalten.' },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Warum der Bundestag mehr als 598 Sitze haben kann',
          html: 'Gewinnt eine Partei in einem Bundesland mehr Direktmandate, als ihr nach Zweitstimmen zustehen, entstehen '
            + '<strong>Überhangmandate</strong>. Damit das Verhältnis wieder stimmt, erhalten die anderen Parteien '
            + '<strong>Ausgleichsmandate</strong>. Deshalb war der Bundestag zeitweise deutlich größer als vorgesehen. '
            + 'Eine Wahlrechtsreform hat die Größe inzwischen auf 630 Sitze festgeschrieben.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Fünf Wahlgrundsätze: allgemein, unmittelbar, frei, gleich, geheim (Art. 38 GG).',
    'Wahlberechtigt bei Bundestagswahlen: Deutsche ab 18 Jahren.',
    'Erststimme: Person im Wahlkreis, Mehrheitswahl, 299 Direktmandate.',
    'Zweitstimme: Partei, Verhältniswahl — entscheidet über die Sitzverteilung.',
    'Fünf-Prozent-Hürde verhindert Zersplitterung des Parlaments.',
    'Überhang- und Ausgleichsmandate können den Bundestag vergrößern.',
    'Der Bundestag wählt den Bundeskanzler mit absoluter Mehrheit.',
    'Meist ist eine Koalition mit Koalitionsvertrag nötig.',
  ],
  commonMistakes: [
    {
      mistake: '„Die Erststimme ist die wichtigere, weil sie zuerst kommt."',
      why: 'Der Name legt eine Rangfolge nahe.',
      fix: 'Die Zweitstimme bestimmt die Sitzverteilung und damit die Machtverhältnisse. Sie ist politisch entscheidend.',
    },
    {
      mistake: '„Mit der Erststimme wählt man eine Partei."',
      why: 'Die Kandidaten gehören ja zu Parteien.',
      fix: 'Mit der Erststimme wählt man eine Person im Wahlkreis. Man kann Erst- und Zweitstimme unterschiedlichen Parteien geben („Stimmensplitting").',
    },
    {
      mistake: '„Wir wählen den Bundeskanzler."',
      why: 'Im Wahlkampf stehen die Kanzlerkandidaten im Mittelpunkt.',
      fix: 'Der Bundestag wählt den Kanzler. Die Bürger wählen nur die Abgeordneten — der Kanzler wird indirekt bestimmt.',
    },
    {
      mistake: 'Die Wahlgrundsätze werden mit Grundrechten verwechselt.',
      why: 'Beide stehen im Grundgesetz.',
      fix: 'Die fünf Grundsätze regeln, wie gewählt wird (Art. 38). Grundrechte stehen in den Artikeln 1 bis 19.',
    },
  ],
  recap: 'Bundestagswahlen folgen fünf Grundsätzen: allgemein, unmittelbar, frei, gleich und geheim. Jede wahlberechtigte Person hat zwei Stimmen: Mit der Erststimme wird nach dem Mehrheitsprinzip eine Person aus einem der 299 Wahlkreise direkt gewählt, mit der Zweitstimme eine Partei. Die Zweitstimmen bestimmen im Verhältnis, wie viele Sitze jede Partei erhält — sie entscheiden also über die Machtverhältnisse. Wer unter fünf Prozent bleibt, zieht in der Regel nicht ein; diese Sperrklausel soll eine Zersplitterung wie in der Weimarer Republik verhindern. Anschließend wählt der Bundestag den Kanzler mit absoluter Mehrheit, wofür meist eine Koalition nötig ist.',
  simpler: 'Bei der Bundestagswahl kreuzt du zweimal an. Links wählst du einen Menschen aus deiner Gegend — wer dort die meisten Kreuze bekommt, zieht in den Bundestag ein. Rechts wählst du eine Partei. Diese zweite Stimme ist die wichtigere: Sie entscheidet, wie viele Plätze im Bundestag jede Partei bekommt. Parteien, die weniger als fünf von hundert Stimmen holen, kommen normalerweise nicht hinein. Und den Kanzler wählen nicht wir direkt, sondern die Abgeordneten im Bundestag.',
  deeper: 'Das deutsche System ist eine „personalisierte Verhältniswahl": Es verbindet den Vorteil der Verhältniswahl (genaue Abbildung der Stimmen) mit dem der Mehrheitswahl (persönliche Zurechenbarkeit). Bei der Sitzverteilung wird seit 2009 das Sainte-Laguë-Verfahren angewandt, das kleinere Parteien weniger benachteiligt als das frühere Hare-Niemeyer- oder dem Verfahren nach d\'Hondt. Die Wahlrechtsreform von 2023 hat die Sitzzahl auf 630 begrenzt und die Zweitstimmendeckung eingeführt: Ein Direktmandat wird nur zugeteilt, wenn es durch das Zweitstimmenergebnis der Partei im Land gedeckt ist — Überhangmandate entfallen damit, dafür können Wahlkreise unbesetzt bleiben. Das Bundesverfassungsgericht hat diese Reform 2024 im Kern bestätigt, die Grundmandatsklausel aber wieder in Kraft gesetzt.',
  glossary: [
    { term: 'Wahlkreis', definition: 'Einer von 299 Bezirken, in dem ein Direktmandat vergeben wird.' },
    { term: 'Direktmandat', definition: 'Sitz im Bundestag, den man durch die Mehrheit der Erststimmen im Wahlkreis erhält.' },
    { term: 'Landesliste', definition: 'Kandidatenliste einer Partei für ein Bundesland; über sie wirken die Zweitstimmen.' },
    { term: 'Fünf-Prozent-Hürde', definition: 'Sperrklausel: Nur Parteien ab 5 % der Zweitstimmen ziehen in der Regel ein.' },
    { term: 'Stimmensplitting', definition: 'Erst- und Zweitstimme werden unterschiedlichen Parteien gegeben.' },
    { term: 'Koalition', definition: 'Regierungsbündnis mehrerer Parteien mit gemeinsamem Koalitionsvertrag.' },
  ],
  questions: [
    {
      id: 'q1', type: 'multi', difficulty: 1, competency: 'grundsaetze',
      prompt: 'Welche der folgenden sind Wahlgrundsätze nach Artikel 38 des Grundgesetzes?',
      options: [
        { id: 'a', text: 'allgemein' },
        { id: 'b', text: 'geheim' },
        { id: 'c', text: 'öffentlich' },
        { id: 'd', text: 'gleich' },
        { id: 'e', text: 'frei' },
      ],
      answer: ['a', 'b', 'd', 'e'],
      explanation: 'Die fünf Grundsätze sind allgemein, unmittelbar, frei, gleich und geheim. „Öffentlich" wäre das Gegenteil von geheim.',
    },
    {
      id: 'q2', type: 'match', difficulty: 2, competency: 'grundsaetze',
      prompt: 'Ordne jedem Wahlgrundsatz die passende Erklärung zu.',
      pairs: [
        { left: 'allgemein', right: 'Alle Staatsbürger ab 18 dürfen wählen' },
        { left: 'geheim', right: 'Niemand erfährt, wie jemand gewählt hat' },
        { left: 'gleich', right: 'Jede Stimme zählt gleich viel' },
        { left: 'frei', right: 'Niemand darf zu einer Entscheidung gedrängt werden' },
        { left: 'unmittelbar', right: 'Es gibt keine Wahlmänner als Zwischeninstanz' },
      ],
      explanation: 'Jeder Grundsatz sichert einen anderen Aspekt fairer Wahlen — von der Zugangsberechtigung bis zur Stimmabgabe.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'stimmen',
      prompt: 'Was wird mit der Zweitstimme gewählt?',
      options: [
        { id: 'a', text: 'Eine Person aus dem eigenen Wahlkreis' },
        { id: 'b', text: 'Eine Partei über die Landesliste' },
        { id: 'c', text: 'Der Bundeskanzler' },
        { id: 'd', text: 'Der Bundespräsident' },
      ],
      answer: 'b',
      explanation: 'Mit der Zweitstimme wählt man eine Partei. Diese Stimme bestimmt, wie viele Sitze die Partei im Bundestag erhält.',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'stimmen',
      prompt: 'Vervollständige die Aussagen zur Bundestagswahl.',
      segments: [
        'Deutschland ist in ',
        { blank: 'wk', accept: ['299'] },
        ' Wahlkreise eingeteilt. Über die Sitzverteilung im Bundestag entscheidet die ',
        { blank: 'stimme', accept: ['Zweitstimme'] },
        '. Parteien müssen mindestens ',
        { blank: 'huerde', accept: ['5', 'fünf', 'fuenf'] },
        ' Prozent erreichen.',
      ],
      explanation: '299 Wahlkreise, die Zweitstimme bestimmt die Sitzverteilung, die Sperrklausel liegt bei 5 %.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 2, competency: 'huerde',
      prompt: 'Welches Ziel hat die Fünf-Prozent-Hürde?',
      options: [
        { id: 'a', text: 'Sie soll kleine Parteien benachteiligen' },
        { id: 'b', text: 'Sie soll eine Zersplitterung des Parlaments verhindern und stabile Mehrheiten ermöglichen' },
        { id: 'c', text: 'Sie soll die Wahlbeteiligung erhöhen' },
        { id: 'd', text: 'Sie soll die Zahl der Wahlkreise begrenzen' },
      ],
      answer: 'b',
      explanation: 'Die Sperrklausel geht auf die Erfahrung der Weimarer Republik zurück, in der viele Kleinparteien stabile Regierungen fast unmöglich machten.',
    },
    {
      id: 'q6', type: 'truefalse', difficulty: 2, competency: 'regierung',
      prompt: 'Die Bürgerinnen und Bürger wählen bei der Bundestagswahl direkt den Bundeskanzler.',
      answer: false,
      explanation: 'Falsch. Gewählt werden die Abgeordneten des Bundestages. Dieser wählt anschließend den Bundeskanzler mit absoluter Mehrheit.',
    },
    {
      id: 'q7', type: 'order', difficulty: 3, competency: 'sitze',
      prompt: 'Bringe den Weg von der Wahl zur Regierung in die richtige Reihenfolge.',
      items: [
        'Die Stimmen werden ausgezählt',
        'Parteien unter fünf Prozent bleiben unberücksichtigt',
        'Die Sitze werden nach dem Verhältnis der Zweitstimmen verteilt',
        'Der Bundestag tritt zusammen und konstituiert sich',
        'Die Parteien verhandeln über eine Koalition',
        'Der Bundestag wählt den Bundeskanzler',
      ],
      explanation: 'Auszählung → Sperrklausel → Sitzverteilung → Konstituierung → Koalitionsverhandlungen → Kanzlerwahl.',
    },
    {
      id: 'q8', type: 'numeric', difficulty: 3, competency: 'sitze',
      prompt: 'Eine Partei erhält 24 % der Zweitstimmen. Wie viele Sitze stehen ihr in einem Bundestag mit 630 Sitzen näherungsweise zu?',
      answer: 151, tolerance: 2,
      hint: 'Rechne 24 % von 630.',
      explanation: '630 · 0,24 = 151,2 — also etwa 151 Sitze. Die genaue Zahl ergibt sich aus dem Sainte-Laguë-Verfahren.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'huerde',
      prompt: 'Die Fünf-Prozent-Hürde ist umstritten. Nenne ein Argument dafür und ein Argument dagegen und beurteile kurz.',
      keywords: [
        { label: 'Pro: Stabilität / keine Zersplitterung', any: ['stabil', 'zersplitter', 'handlungsfaehig', 'mehrheit', 'weimar'] },
        { label: 'Contra: Stimmen verfallen', any: ['verfallen', 'nicht beruecksichtigt', 'gleichheit', 'unberuecksichtigt', 'verloren'] },
        { label: 'eigene Beurteilung', any: ['ich', 'ueberzeugt', 'meiner', 'abwaegend', 'insgesamt', 'ueberwiegt'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Für die Hürde spricht die Stabilität: Ohne Sperrklausel könnten viele Kleinparteien in den Bundestag einziehen, wodurch Mehrheiten und damit handlungsfähige Regierungen schwer zu bilden wären — genau daran litt die Weimarer Republik. Gegen die Hürde spricht der Grundsatz der Wahlgleichheit: Die Stimmen für Parteien knapp unter fünf Prozent bleiben im Ergebnis unberücksichtigt, obwohl es Millionen sein können. Abwägend überzeugt mich das Stabilitätsargument, weil eine arbeitsfähige Regierung Voraussetzung dafür ist, dass demokratische Entscheidungen überhaupt umgesetzt werden; allerdings sollte die Hürde nicht höher liegen als nötig.',
      explanation: 'Erwartet werden ein Pro-Argument (Stabilität), ein Contra-Argument (Wahlgleichheit, verfallende Stimmen) und eine begründete eigene Einschätzung.',
    },
  ],
};
