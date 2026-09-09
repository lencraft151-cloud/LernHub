export default {
  id: 'ge8-industrielle-revolution',
  title: 'Industrielle Revolution',
  summary: 'Zwischen 1750 und 1900 veränderten Dampfmaschine und Fabriksystem die Arbeit, die Städte und die Gesellschaft grundlegend — und brachten die Soziale Frage hervor.',
  estimatedMinutes: 32,
  aliases: ['Dampfmaschine', 'Fabrik', 'Soziale Frage', 'Urbanisierung', 'Kinderarbeit', 'Proletariat', 'Manufaktur'],
  competencies: [
    { id: 'ursachen', title: 'Voraussetzungen und Ursachen', description: 'Erklären, warum die Industrialisierung in England begann.' },
    { id: 'technik', title: 'Technische Neuerungen', description: 'Schlüsselerfindungen und ihre Wirkung beschreiben.' },
    { id: 'arbeit', title: 'Wandel der Arbeit', description: 'Den Übergang von Heimarbeit zur Fabrik erklären.' },
    { id: 'soziale-frage', title: 'Soziale Frage', description: 'Lebensbedingungen der Arbeiterschaft beschreiben und beurteilen.' },
    { id: 'antworten', title: 'Lösungsansätze', description: 'Reaktionen von Staat, Kirche, Unternehmern und Arbeiterbewegung vergleichen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Warum in England — und warum überhaupt?',
      blocks: [
        { type: 'text', html: 'Die Industrialisierung begann um 1750 in <strong>England</strong>. Das war kein Zufall: Dort trafen mehrere Voraussetzungen zusammen.' },
        {
          type: 'list',
          items: [
            '<strong>Rohstoffe:</strong> große Kohle- und Eisenerzvorkommen im eigenen Land',
            '<strong>Kapital:</strong> Gewinne aus Kolonialhandel und Bankwesen standen für Investitionen bereit',
            '<strong>Arbeitskräfte:</strong> Bevölkerungswachstum und die Auflösung der bäuerlichen Bindung setzten Menschen frei',
            '<strong>Absatzmärkte:</strong> das Kolonialreich sicherte Nachfrage',
            '<strong>Verkehr:</strong> Inseln mit Häfen, Kanäle, später Eisenbahn',
            '<strong>Erfindergeist:</strong> Patentrecht und wirtschaftliche Freiheit belohnten Innovationen',
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Deutschland kam später',
          html: 'In Deutschland setzte die Industrialisierung erst um 1835 ein — mit dem <strong>Deutschen Zollverein</strong> '
            + 'und dem Bau der <strong>Eisenbahn</strong> (erste Strecke Nürnberg–Fürth, 1835). '
            + 'Gründe für die Verzögerung: die Zersplitterung in Kleinstaaten, Zollgrenzen, '
            + 'die späte Bauernbefreiung und fehlendes Kapital. '
            + 'Zentren wurden das Ruhrgebiet, Sachsen und Oberschlesien.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Technik und der Wandel der Arbeit',
      blocks: [
        {
          type: 'table',
          caption: 'Schlüsselerfindungen',
          head: ['Erfindung', 'Person / Jahr', 'Wirkung'],
          rows: [
            ['Verbesserte Dampfmaschine', 'James Watt, 1769', 'Antriebskraft unabhängig von Wasser und Wind — Fabriken konnten überall stehen'],
            ['Mechanischer Webstuhl', 'Edmund Cartwright, 1785', 'Vervielfachte die Textilproduktion'],
            ['Kokshochofen', 'Abraham Darby, ab 1709', 'Eisenverhüttung mit Kohle statt Holz — Massenproduktion von Eisen'],
            ['Dampflokomotive', 'George Stephenson, 1825', 'Schneller Transport von Rohstoffen, Waren und Menschen'],
            ['Bessemer-Verfahren', 'Henry Bessemer, 1855', 'Billiger Stahl in großen Mengen'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Dampfmaschine war der Schlüssel',
          html: 'Vorher trieb <strong>Wasserkraft</strong> die Maschinen an — Betriebe mussten an Flüssen stehen und '
            + 'standen im Winter oder bei Trockenheit still. Die Dampfmaschine machte Antriebskraft '
            + '<strong>ortsunabhängig und ganzjährig verfügbar</strong>. Erst dadurch konnten Fabriken dort entstehen, '
            + 'wo Kohle und Arbeitskräfte waren.',
        },
        {
          type: 'table',
          caption: 'Vom Handwerk zur Fabrik',
          head: ['', 'Handwerk / Heimarbeit (vorher)', 'Fabrik (nachher)'],
          rows: [
            ['Arbeitsort', 'eigenes Haus, eigene Werkstatt', 'fremde Fabrikhalle'],
            ['Arbeitszeit', 'selbst bestimmt, nach Jahreszeit', 'Fabrikordnung, Schichten, Uhr'],
            ['Werkzeug', 'im eigenen Besitz', 'Eigentum des Fabrikbesitzers'],
            ['Tätigkeit', 'ganzes Produkt, viele Fertigkeiten', 'einzelner Arbeitsschritt, Arbeitsteilung'],
            ['Verdienst', 'Preis für das Produkt', 'Lohn für die Zeit'],
            ['Qualifikation', 'jahrelange Lehre', 'kurze Anlernzeit — auch Frauen und Kinder'],
          ],
        },
        { type: 'text', html: 'Diese Umstellung nennt man <strong>Proletarisierung</strong>: Aus selbstständigen Handwerkern wurden Lohnarbeiter, die außer ihrer Arbeitskraft nichts besaßen. Gleichzeitig zogen Millionen Menschen in die Städte — die <strong>Urbanisierung</strong>. Essen wuchs zwischen 1850 und 1900 von rund 9 000 auf über 290 000 Einwohner.' },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Die Soziale Frage und die Antworten darauf',
      blocks: [
        { type: 'text', html: 'Die Lebensbedingungen der Arbeiterfamilien waren katastrophal. Diese Gesamtlage nannten die Zeitgenossen die <strong>Soziale Frage</strong>.' },
        {
          type: 'list',
          items: [
            '<strong>Arbeitszeit:</strong> 14 bis 16 Stunden täglich, sechs Tage pro Woche',
            '<strong>Lohn:</strong> reichte kaum zum Überleben; Frauen und Kinder mussten mitverdienen',
            '<strong>Kinderarbeit:</strong> Kinder ab fünf Jahren arbeiteten in Bergwerken und Fabriken',
            '<strong>Sicherheit:</strong> keine Unfallverhütung, keine Versicherung bei Krankheit oder Unfall',
            '<strong>Wohnen:</strong> feuchte Mietskasernen, Schlafburschen, mehrere Familien in einem Raum',
            '<strong>Gesundheit:</strong> Tuberkulose, Cholera-Epidemien, hohe Kindersterblichkeit',
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Vier Wege der Reaktion',
          html: '<strong>Selbsthilfe der Arbeiter:</strong> Gewerkschaften, Streiks, Genossenschaften, '
            + 'Arbeiterparteien (1875 Gründung der SAP, später SPD).<br>'
            + '<strong>Unternehmerische Fürsorge:</strong> Werkssiedlungen, Kranken- und Sparkassen einzelner Fabrikanten '
            + '(z. B. Krupp, Zeiss) — teils aus Verantwortung, teils zur Bindung der Arbeiter.<br>'
            + '<strong>Kirchen:</strong> Innere Mission und katholische Sozialbewegung gründeten Einrichtungen und Vereine.<br>'
            + '<strong>Staat:</strong> Bismarcks Sozialgesetze — Krankenversicherung 1883, Unfallversicherung 1884, '
            + 'Invaliditäts- und Altersversicherung 1889.',
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Bismarcks doppelte Strategie',
          html: 'Bismarck bekämpfte die Sozialdemokratie zugleich mit <strong>Zuckerbrot und Peitsche</strong>: '
            + 'Die <strong>Sozialistengesetze</strong> (1878–1890) verboten sozialdemokratische Organisationen, '
            + 'während die <strong>Sozialgesetze</strong> die Arbeiter durch echte Absicherung an den Staat binden sollten. '
            + 'Die SPD-Anhängerschaft wuchs dennoch weiter — die Sozialversicherung dagegen wurde zum Vorbild '
            + 'für viele Länder und ist die Grundlage des heutigen deutschen Sozialstaats.',
        },
        {
          type: 'example',
          title: 'Beurteilung — Fortschritt oder Katastrophe?',
          task: 'Wie ist die Industrielle Revolution zu bewerten?',
          steps: [
            { text: 'Kurzfristig', detail: 'Verelendung breiter Schichten, Kinderarbeit, Wohnungsnot, Umweltzerstörung.' },
            { text: 'Langfristig', detail: 'Massiver Anstieg des Wohlstands, Rückgang der Kindersterblichkeit, Bildung für alle, moderne Medizin.' },
            { text: 'Politisch', detail: 'Die Arbeiterbewegung erkämpfte Rechte, die heute selbstverständlich sind: Achtstundentag, Streikrecht, Sozialversicherung.' },
            { text: 'Ökologisch', detail: 'Der Beginn des massenhaften Verbrennens fossiler Energieträger — Ursprung des heutigen Klimaproblems.' },
          ],
          result: 'Eine begründete Bewertung muss zwischen den Zeitebenen und den betroffenen Gruppen unterscheiden — ein einfaches Urteil greift zu kurz.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Beginn um 1750 in England, in Deutschland erst ab etwa 1835.',
    'Voraussetzungen: Kohle und Eisen, Kapital, Arbeitskräfte, Märkte, Verkehr, Erfindergeist.',
    'James Watts Dampfmaschine (1769) machte Antriebskraft ortsunabhängig.',
    'Fabriksystem: Arbeitsteilung, fremde Werkzeuge, Fabrikordnung, Lohnarbeit.',
    'Urbanisierung: Millionen zogen in die Industriestädte.',
    'Soziale Frage: 14–16 Stunden Arbeit, Kinderarbeit, Mietskasernen, keine Absicherung.',
    'Antworten: Gewerkschaften und Arbeiterparteien, Unternehmerfürsorge, Kirchen, Sozialgesetze.',
    'Bismarck: Sozialistengesetze 1878 und Sozialversicherungen 1883–1889.',
  ],
  commonMistakes: [
    {
      mistake: '„Die Industrielle Revolution war eine Revolution wie 1789."',
      why: 'Das Wort Revolution legt einen Umsturz nahe.',
      fix: 'Es war kein politischer Umsturz, sondern ein tiefgreifender wirtschaftlicher und gesellschaftlicher Wandel über mehrere Jahrzehnte.',
    },
    {
      mistake: 'Die Dampfmaschine wird James Watt als Erfindung zugeschrieben.',
      why: 'Sein Name ist mit ihr verbunden.',
      fix: 'Thomas Newcomen baute schon 1712 eine Dampfmaschine. Watt verbesserte sie 1769 entscheidend und machte sie wirtschaftlich einsetzbar.',
    },
    {
      mistake: 'Bismarcks Sozialgesetze werden nur als Menschenfreundlichkeit gedeutet.',
      why: 'Sie brachten den Arbeitern tatsächlich Verbesserungen.',
      fix: 'Sie waren Teil einer politischen Strategie: Sie sollten die Arbeiter der Sozialdemokratie entziehen und an den Staat binden.',
    },
    {
      mistake: 'Nur die Nachteile werden genannt.',
      why: 'Die Quellen zur Sozialen Frage sind besonders eindrücklich.',
      fix: 'Eine Bewertung unterscheidet zwischen kurz- und langfristigen Folgen und zwischen betroffenen Gruppen.',
    },
  ],
  recap: 'Die Industrielle Revolution begann um 1750 in England, weil dort Kohle, Kapital, freie Arbeitskräfte, Absatzmärkte und ein günstiges Rechtssystem zusammentrafen. James Watts verbesserte Dampfmaschine machte Antriebskraft ortsunabhängig und ermöglichte das Fabriksystem: Arbeitsteilung, fremde Produktionsmittel und Lohnarbeit ersetzten die selbstständige Heimarbeit. Millionen zogen in die Städte. Die Folge waren katastrophale Lebensbedingungen — 14 bis 16 Stunden Arbeit, Kinderarbeit, Mietskasernen, keine Absicherung —, die man als Soziale Frage bezeichnete. Darauf reagierten die Arbeiterbewegung mit Gewerkschaften und Parteien, einzelne Unternehmer und die Kirchen mit Fürsorge und der Staat mit Bismarcks Sozialversicherungen von 1883 bis 1889.',
  simpler: 'Vor etwa 250 Jahren arbeiteten die meisten Menschen zu Hause oder auf dem Feld, mit eigenen Werkzeugen und in eigenem Tempo. Dann kam die Dampfmaschine: Sie konnte Maschinen antreiben, egal wo sie stand. So entstanden Fabriken, und die Menschen zogen in die Städte, um dort zu arbeiten. In den Fabriken machte jeder nur noch einen kleinen Handgriff, 14 Stunden am Tag, für wenig Geld — auch Kinder. Weil so viele arm und krank waren, nannte man das die Soziale Frage. Die Arbeiter gründeten Gewerkschaften, und schließlich führte der Staat Kranken-, Unfall- und Rentenversicherung ein — die Grundlage unseres heutigen Sozialsystems.',
  deeper: 'Die Forschung streitet über den Begriff „Revolution": Wirtschaftshistoriker betonen, dass das Wachstum über Jahrzehnte allmählich verlief, und sprechen deshalb eher von einer Industrialisierung. Umstritten ist auch die Lebensstandard-Debatte: Ob und wann die Reallöhne der Arbeiter stiegen, ist statistisch schwer zu bestimmen — die pessimistische Deutung (Verelendung) und die optimistische (langfristiger Wohlstandsgewinn) stützen sich auf unterschiedliche Indikatoren wie Löhne, Körpergröße und Lebenserwartung. Man unterscheidet inzwischen mehrere industrielle Revolutionen: die erste mit Dampf und Textil, die zweite ab 1870 mit Elektrizität, Chemie und Fließband, die dritte mit Computern und die vierte mit Digitalisierung und Vernetzung. Auch der Klimawandel hat hier seinen historischen Ausgangspunkt.',
  glossary: [
    { term: 'Manufaktur', definition: 'Vorform der Fabrik: viele Handwerker arbeiten arbeitsteilig unter einem Dach, aber ohne Maschinenantrieb.' },
    { term: 'Proletariat', definition: 'Klasse der Lohnarbeiter, die außer ihrer Arbeitskraft keine Produktionsmittel besitzen.' },
    { term: 'Soziale Frage', definition: 'Zeitgenössischer Begriff für die Notlage der Arbeiterschaft im 19. Jahrhundert.' },
    { term: 'Urbanisierung', definition: 'Starkes Wachstum der Städte durch Zuwanderung.' },
    { term: 'Mietskaserne', definition: 'Dicht belegtes Mietshaus in Arbeitervierteln mit oft katastrophalen Wohnverhältnissen.' },
    { term: 'Zollverein', definition: 'Ab 1834 gemeinsamer Wirtschaftsraum deutscher Staaten ohne Binnenzölle.' },
  ],
  questions: [
    {
      id: 'q1', type: 'multi', difficulty: 2, competency: 'ursachen',
      prompt: 'Welche Voraussetzungen begünstigten den Beginn der Industrialisierung in England?',
      options: [
        { id: 'a', text: 'Große Kohle- und Eisenerzvorkommen' },
        { id: 'b', text: 'Kapital aus Kolonialhandel und Bankwesen' },
        { id: 'c', text: 'Ein einheitlicher Zollverein deutscher Staaten' },
        { id: 'd', text: 'Absatzmärkte im Kolonialreich' },
        { id: 'e', text: 'Verfügbare Arbeitskräfte durch Bevölkerungswachstum' },
      ],
      answer: ['a', 'b', 'd', 'e'],
      explanation: 'Der Zollverein war eine deutsche Entwicklung ab 1834 und half Deutschland beim Aufholen — er erklärt nicht den englischen Vorsprung.',
    },
    {
      id: 'q2', type: 'mc', difficulty: 2, competency: 'ursachen',
      prompt: 'Warum begann die Industrialisierung in Deutschland erst rund 80 Jahre später als in England?',
      options: [
        { id: 'a', text: 'Weil es in Deutschland keine Kohle gab' },
        { id: 'b', text: 'Weil die Zersplitterung in Kleinstaaten mit Zollgrenzen den Handel behinderte' },
        { id: 'c', text: 'Weil in Deutschland die Dampfmaschine unbekannt war' },
        { id: 'd', text: 'Weil es keine Arbeitskräfte gab' },
      ],
      answer: 'b',
      explanation: 'Zollgrenzen, die späte Bauernbefreiung und fehlendes Kapital bremsten Deutschland. Kohle war im Ruhrgebiet reichlich vorhanden.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'technik',
      prompt: 'Warum war die verbesserte Dampfmaschine für die Industrialisierung so entscheidend?',
      options: [
        { id: 'a', text: 'Sie war die erste Maschine überhaupt' },
        { id: 'b', text: 'Sie machte Antriebskraft ortsunabhängig und ganzjährig verfügbar' },
        { id: 'c', text: 'Sie ersetzte die Eisenbahn' },
        { id: 'd', text: 'Sie war günstiger als menschliche Arbeit im Handwerk' },
      ],
      answer: 'b',
      explanation: 'Vorher hing der Antrieb von Wasserkraft ab — Betriebe mussten an Flüssen stehen und fielen bei Trockenheit oder Frost aus. Die Dampfmaschine löste diese Bindung.',
    },
    {
      id: 'q4', type: 'match', difficulty: 2, competency: 'arbeit',
      prompt: 'Ordne jedem Merkmal die passende Arbeitsform zu.',
      pairs: [
        { left: 'Werkzeug im eigenen Besitz', right: 'Handwerk / Heimarbeit' },
        { left: 'Arbeitszeit nach Fabrikordnung und Uhr', right: 'Fabrik' },
        { left: 'Herstellung des ganzen Produkts', right: 'Handwerk / Heimarbeit' },
        { left: 'Einzelner Arbeitsschritt in Arbeitsteilung', right: 'Fabrik' },
      ],
      explanation: 'Der Übergang zur Fabrik bedeutete: fremde Werkzeuge, fremd bestimmte Zeit und nur noch ein Teilschritt am Produkt.',
    },
    {
      id: 'q5', type: 'cloze', difficulty: 2, competency: 'soziale-frage',
      prompt: 'Vervollständige die Aussagen zur Sozialen Frage.',
      segments: [
        'Die Arbeitszeit betrug häufig ',
        { blank: 'zeit', accept: ['14 bis 16', '14-16', '14 - 16', '14 bis 16 Stunden'] },
        ' Stunden täglich. Weil der Lohn nicht reichte, mussten auch ',
        { blank: 'wer', accept: ['Frauen und Kinder', 'Kinder und Frauen', 'Kinder'] },
        ' mitarbeiten. Gewohnt wurde in engen ',
        { blank: 'wohnen', accept: ['Mietskasernen', 'Mietskaserne'] },
        '.',
      ],
      explanation: '14 bis 16 Stunden Arbeit, Kinder- und Frauenarbeit aus wirtschaftlicher Not, Wohnen in Mietskasernen — das kennzeichnete die Soziale Frage.',
    },
    {
      id: 'q6', type: 'match', difficulty: 3, competency: 'antworten',
      prompt: 'Ordne jeder Antwort auf die Soziale Frage den passenden Akteur zu.',
      pairs: [
        { left: 'Gewerkschaften und Streiks', right: 'Arbeiterbewegung' },
        { left: 'Werkssiedlungen und Betriebskrankenkassen', right: 'einzelne Unternehmer' },
        { left: 'Innere Mission und katholische Sozialvereine', right: 'Kirchen' },
        { left: 'Kranken-, Unfall- und Rentenversicherung', right: 'Staat unter Bismarck' },
      ],
      explanation: 'Alle vier Akteure reagierten — mit Selbsthilfe, betrieblicher Fürsorge, kirchlicher Wohltätigkeit und staatlicher Sozialgesetzgebung.',
    },
    {
      id: 'q7', type: 'order', difficulty: 2, competency: 'antworten',
      prompt: 'Bringe Bismarcks Sozialgesetze in die richtige zeitliche Reihenfolge.',
      items: [
        'Krankenversicherung (1883)',
        'Unfallversicherung (1884)',
        'Invaliditäts- und Altersversicherung (1889)',
      ],
      explanation: 'Zuerst kam 1883 die Krankenversicherung, 1884 folgte die Unfallversicherung, 1889 die Alters- und Invaliditätsversicherung.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'antworten',
      prompt: 'Bismarck führte die Sozialgesetze ein, weil er der Sozialdemokratie politisch nahestand.',
      answer: false,
      explanation: 'Falsch. Bismarck verbot sozialdemokratische Organisationen durch die Sozialistengesetze. Die Sozialgesetze sollten die Arbeiter der SPD entziehen und an den Staat binden — „Zuckerbrot und Peitsche".',
    },
    {
      id: 'q9', type: 'analysis', difficulty: 3, competency: 'soziale-frage',
      prompt: 'Analysiere die Quelle: Was erfährst du über die Arbeitsbedingungen, und wie ist die Quelle einzuordnen?',
      context: 'Aus einem Bericht des preußischen Fabrikinspektors, 1876:\n\n'
        + '„In der Spinnerei arbeiten 34 Kinder unter vierzehn Jahren, das jüngste ist neun. Die Arbeit beginnt '
        + 'um halb sechs Uhr morgens und endet um sieben Uhr abends; eine Mittagspause von einer halben Stunde '
        + 'wird gewährt. Die Luft ist von Staub gesättigt, die Fenster bleiben geschlossen, damit die Fäden '
        + 'nicht reißen. Mehrere Kinder wiesen Verkrümmungen des Rückens auf. Auf meine Vorhaltung erklärte '
        + 'der Fabrikherr, die Eltern selbst drängten auf die Beschäftigung ihrer Kinder, da der Lohn des '
        + 'Vaters die Familie nicht ernähre."',
      keywords: [
        { label: 'Kinderarbeit ab neun Jahren', any: ['kinderarbeit', 'neun', 'kinder', '9 jahre'] },
        { label: 'überlange Arbeitszeit', any: ['13', 'arbeitszeit', 'halb sechs', 'stunden', 'lang'] },
        { label: 'gesundheitsschädliche Bedingungen', any: ['staub', 'gesundheit', 'luft', 'verkruemmung', 'krank'] },
        { label: 'wirtschaftlicher Zwang der Familien', any: ['lohn', 'eltern', 'not', 'ernaehrt', 'zwang', 'armut'] },
        { label: 'Quellenkritik: amtlicher Bericht', any: ['fabrikinspektor', 'amtlich', 'behoerde', 'quelle', 'perspektive'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Die Quelle beschreibt Kinderarbeit in einer Spinnerei: 34 Kinder unter vierzehn Jahren, das jüngste erst neun Jahre alt. Die Arbeitszeit reicht von halb sechs Uhr morgens bis sieben Uhr abends, also rund dreizehn Stunden bei nur einer halben Stunde Pause. Die Bedingungen sind gesundheitsschädlich: staubgesättigte Luft, geschlossene Fenster aus Produktionsgründen und bereits sichtbare Rückenverkrümmungen bei mehreren Kindern. Bemerkenswert ist die Begründung des Fabrikherrn: Die Eltern selbst drängten auf die Arbeit ihrer Kinder, weil der Lohn des Vaters die Familie nicht ernährte. Damit zeigt die Quelle den wirtschaftlichen Zwang, der die Kinderarbeit trug — sie war nicht nur Ausbeutung durch die Fabrikanten, sondern für die Familien eine Überlebensnotwendigkeit. Einzuordnen ist der Text als amtlicher Bericht eines Fabrikinspektors: Er will Missstände dokumentieren und ist daher vermutlich zuverlässig in den Fakten, gibt aber die Sicht der Behörde wieder, nicht die der Arbeiterfamilien selbst.',
      explanation: 'Erwartet werden die inhaltlichen Befunde (Kinderarbeit, Arbeitszeit, Gesundheit), die Erklärung durch wirtschaftlichen Zwang und eine kurze Einordnung der Quellenart.',
    },
  ],
};
