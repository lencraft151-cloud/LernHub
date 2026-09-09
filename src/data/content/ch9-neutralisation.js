export default {
  id: 'ch9-neutralisation',
  title: 'Neutralisation und Titration',
  summary: 'Bei der Neutralisation reagieren Oxonium- und Hydroxid-Ionen zu Wasser. Übrig bleibt ein Salz — und mit einer Titration lässt sich die Konzentration bestimmen.',
  estimatedMinutes: 28,
  aliases: ['Neutralisation', 'Titration', 'Äquivalenzpunkt', 'Salzbildung', 'Bürette', 'Indikator'],
  competencies: [
    { id: 'reaktion', title: 'Neutralisationsreaktion', description: 'Die Reaktion von Säure und Lauge auf Teilchenebene erklären.' },
    { id: 'salzbildung', title: 'Salzbildung', description: 'Reaktionsgleichungen aufstellen und Salze benennen.' },
    { id: 'titration', title: 'Titration', description: 'Den Ablauf einer Titration beschreiben.' },
    { id: 'rechnen', title: 'Titration berechnen', description: 'Unbekannte Konzentrationen berechnen.' },
    { id: 'alltag', title: 'Anwendungen', description: 'Neutralisation im Alltag erkennen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Was bei der Neutralisation passiert',
      blocks: [
        { type: 'text', html: 'Gibt man eine Säure und eine Lauge zusammen, heben sich ihre Wirkungen auf. Der Grund liegt in einer einzigen Reaktion:' },
        { type: 'formula', text: 'H₃O⁺ + OH⁻ → 2 H₂O', caption: 'Die eigentliche Neutralisationsreaktion' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Merksatz',
          html: 'Die <strong>saure</strong> Wirkung stammt von den Oxonium-Ionen, die <strong>alkalische</strong> von den '
            + 'Hydroxid-Ionen. Bei der Neutralisation verbinden sie sich zu <strong>Wasser</strong> — '
            + 'dem neutralen Stoff. Beide Wirkungen verschwinden also gleichzeitig, weil die verantwortlichen '
            + 'Teilchen verbraucht werden.',
        },
        { type: 'text', html: 'Die übrigen Ionen — das Säurerest-Ion und das Metall-Ion — bleiben in der Lösung. Dampft man das Wasser ein, kristallisiert daraus ein <strong>Salz</strong>.' },
        { type: 'formula', text: 'HCl + NaOH → NaCl + H₂O', caption: 'Salzsäure und Natronlauge ergeben Kochsalz und Wasser' },
        {
          type: 'note',
          variant: 'info',
          title: 'Exotherm — Vorsicht im Versuch',
          html: 'Die Neutralisation ist stark <strong>exotherm</strong>: Es wird Wärme frei. '
            + 'Bei konzentrierten Lösungen kann sich die Mischung erheblich erwärmen. '
            + 'Deshalb immer langsam zugeben und eine Schutzbrille tragen.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Salzbildung — Gleichungen aufstellen',
      blocks: [
        {
          type: 'table',
          caption: 'Säure + Lauge → Salz + Wasser',
          head: ['Säure', 'Lauge', 'Salz', 'Name des Salzes'],
          rows: [
            ['HCl', 'NaOH', 'NaCl', 'Natriumchlorid (Kochsalz)'],
            ['HCl', 'KOH', 'KCl', 'Kaliumchlorid'],
            ['HNO₃', 'NaOH', 'NaNO₃', 'Natriumnitrat'],
            ['H₂SO₄', 'NaOH', 'Na₂SO₄', 'Natriumsulfat'],
            ['H₂SO₄', 'Ca(OH)₂', 'CaSO₄', 'Calciumsulfat (Gips)'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Wie das Salz zusammengesetzt ist',
          html: 'Das Salz besteht aus dem <strong>Metall-Ion der Lauge</strong> und dem '
            + '<strong>Säurerest-Ion der Säure</strong>. Der Name folgt derselben Reihenfolge: '
            + 'erst das Metall, dann der Säurerest — Natrium + Chlorid = Natriumchlorid.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Gleichung ausgleichen',
          task: 'Stelle die Reaktionsgleichung für Schwefelsäure und Natronlauge auf.',
          steps: [
            { text: 'Ausgangsstoffe und Produkte notieren', math: 'H₂SO₄ + NaOH → Na₂SO₄ + H₂O' },
            { text: 'Natrium zählen: links 1, rechts 2', math: 'Faktor 2 vor NaOH' },
            { text: 'Neu zählen', math: 'H₂SO₄ + 2 NaOH → Na₂SO₄ + H₂O' },
            { text: 'Wasserstoff zählen: links 2 + 2 = 4, rechts 2', math: 'Faktor 2 vor H₂O' },
            { text: 'Endgültige Gleichung', math: 'H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O' },
          ],
          result: 'Weil Schwefelsäure zwei Protonen abgeben kann, braucht man zwei Formeleinheiten Natronlauge.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Titration — Konzentrationen bestimmen',
      blocks: [
        { type: 'text', html: 'Die <strong>Titration</strong> nutzt die Neutralisation als Messverfahren: Man gibt eine Lösung bekannter Konzentration tropfenweise zu einer Lösung unbekannter Konzentration, bis der Umschlagpunkt erreicht ist.' },
        {
          type: 'steps',
          items: [
            { text: 'Ein bekanntes Volumen der unbekannten Lösung in einen Erlenmeyerkolben geben.' },
            { text: 'Einige Tropfen Indikator zugeben.', detail: 'Meist Phenolphthalein: farblos im Sauren, pink im Alkalischen.' },
            { text: 'Die Bürette mit der Lösung bekannter Konzentration füllen und den Startwert ablesen.' },
            { text: 'Tropfenweise zugeben und dabei umschwenken.' },
            { text: 'Beim ersten dauerhaften Farbumschlag stoppen.', detail: 'Das ist der Äquivalenzpunkt.' },
            { text: 'Verbrauchtes Volumen ablesen und die Konzentration berechnen.' },
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Am Äquivalenzpunkt',
          html: 'Am <strong>Äquivalenzpunkt</strong> sind genau so viele Oxonium-Ionen zugegeben worden, '
            + 'wie Hydroxid-Ionen vorhanden waren — die Stoffmengen entsprechen sich.',
        },
        { type: 'formula', text: 'n = c · V', caption: 'Stoffmenge = Konzentration · Volumen' },
        { type: 'formula', text: 'c₁ · V₁ = c₂ · V₂', caption: 'Gilt am Äquivalenzpunkt bei einprotonigen Säuren und einwertigen Basen' },
        {
          type: 'example',
          title: 'Beispiel 2 — Konzentration berechnen',
          task: '25 mL Natronlauge unbekannter Konzentration werden mit Salzsäure der Konzentration 0,1 mol/L titriert. Verbrauch bis zum Umschlag: 20 mL. Wie konzentriert war die Lauge?',
          steps: [
            { text: 'Stoffmenge der zugegebenen Säure berechnen', math: 'n = 0,1 mol/L · 0,020 L = 0,002 mol' },
            { text: 'Am Äquivalenzpunkt gilt: gleiche Stoffmenge Lauge', math: 'n(NaOH) = 0,002 mol' },
            { text: 'Konzentration berechnen', math: 'c = n / V = 0,002 mol / 0,025 L' },
            { text: 'Ergebnis', math: 'c = 0,08 mol/L' },
          ],
          result: 'Die Natronlauge hatte die Konzentration 0,08 mol/L.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Milliliter in Liter umrechnen',
          html: 'Die Konzentration wird in mol/<strong>L</strong> angegeben, die Volumina meist in mL. '
            + 'Vor dem Rechnen umrechnen: <strong>20 mL = 0,020 L</strong>. '
            + 'Wer das vergisst, erhält ein um den Faktor 1000 falsches Ergebnis.',
        },
        { type: 'text', html: 'Neutralisation begegnet einem täglich: Zahnpasta neutralisiert Säuren im Mund, Magentabletten die Magensäure, Kalk neutralisiert saure Böden, und Kläranlagen stellen den pH-Wert des Abwassers ein.' },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Neutralisation: H₃O⁺ + OH⁻ → 2 H₂O.',
    'Säure + Lauge → Salz + Wasser.',
    'Das Salz besteht aus dem Metall-Ion der Lauge und dem Säurerest-Ion der Säure.',
    'Die Reaktion ist exotherm.',
    'Am Äquivalenzpunkt entsprechen sich die Stoffmengen von Säure und Base.',
    'n = c · V und am Äquivalenzpunkt c₁ · V₁ = c₂ · V₂.',
    'Volumina vor dem Rechnen von mL in L umrechnen.',
    'Phenolphthalein: farblos im Sauren, pink im Alkalischen.',
  ],
  commonMistakes: [
    {
      mistake: 'Bei der Neutralisation entsteht „nichts" oder nur Wasser.',
      why: 'Man sieht nur, dass die Wirkung verschwindet.',
      fix: 'Es entsteht immer auch ein Salz. Dampft man das Wasser ab, bleibt es als Kristall zurück.',
    },
    {
      mistake: 'Die Reaktionsgleichung wird nicht ausgeglichen.',
      why: 'Sie sieht auf den ersten Blick fertig aus.',
      fix: 'Bei mehrprotonigen Säuren wie H₂SO₄ braucht man zwei Formeleinheiten Lauge: H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O.',
    },
    {
      mistake: 'Milliliter werden direkt in c = n/V eingesetzt.',
      why: 'Die Aufgabe nennt mL.',
      fix: '20 mL sind 0,020 L. Sonst ist das Ergebnis 1000-fach falsch.',
    },
    {
      mistake: 'Der Äquivalenzpunkt liegt immer bei pH 7.',
      why: 'Neutralisation klingt nach neutral.',
      fix: 'Nur bei starker Säure und starker Base. Bei einer schwachen Säure mit starker Base liegt er im alkalischen Bereich, weil das entstehende Salz basisch reagiert.',
    },
  ],
  recap: 'Bei der Neutralisation reagieren Oxonium- und Hydroxid-Ionen zu Wasser: H₃O⁺ + OH⁻ → 2 H₂O. Damit verschwinden beide Wirkungen gleichzeitig, weil die verantwortlichen Teilchen verbraucht werden. Übrig bleiben Metall- und Säurerest-Ionen, die zusammen ein Salz bilden — allgemein gilt Säure + Lauge → Salz + Wasser. Die Reaktion ist exotherm. Als Messverfahren nutzt die Titration diese Reaktion: Man gibt aus einer Bürette eine Lösung bekannter Konzentration zu, bis der Indikator umschlägt. Am Äquivalenzpunkt gilt c₁ · V₁ = c₂ · V₂, woraus sich die unbekannte Konzentration berechnen lässt.',
  simpler: 'Säuren und Laugen sind Gegenspieler. In einer Säure schwimmen bestimmte Teilchen herum, die sie sauer machen; in einer Lauge andere Teilchen, die sie alkalisch machen. Gibt man beide zusammen, packen sich diese Teilchen gegenseitig und werden zu ganz normalem Wasser. Deshalb ist die Mischung dann weder sauer noch alkalisch. Übrig bleibt außerdem ein Salz — bei Salzsäure und Natronlauge ist das ganz normales Kochsalz. Mit einem Farbstoff kann man genau sehen, wann der Punkt erreicht ist, an dem sich beide gerade aufheben.',
  deeper: 'Der Äquivalenzpunkt fällt nur bei starker Säure und starker Base mit dem Neutralpunkt pH 7 zusammen. Titriert man Essigsäure mit Natronlauge, entsteht Natriumacetat, dessen Acetat-Ion als Base wirkt — der Äquivalenzpunkt liegt dann bei pH 8 bis 9, und man wählt Phenolphthalein als Indikator. Umgekehrt liegt er bei der Titration von Ammoniak mit Salzsäure im Sauren, weshalb dort Methylorange passt: Der Indikator muss zum erwarteten Äquivalenzpunkt passen. Die Titrationskurve zeigt in der Nähe des Äquivalenzpunkts einen steilen Sprung; bei schwachen Säuren erkennt man zusätzlich den Pufferbereich, in dem der pH-Wert kaum reagiert. Halbäquivalenzpunkt und pKs-Wert stimmen dort überein — darauf beruht die experimentelle Bestimmung von Säurestärken.',
  glossary: [
    { term: 'Neutralisation', definition: 'Reaktion von Oxonium- und Hydroxid-Ionen zu Wasser.' },
    { term: 'Salz', definition: 'Ionenverbindung aus Metall-Ion und Säurerest-Ion.' },
    { term: 'Titration', definition: 'Verfahren zur Konzentrationsbestimmung durch schrittweise Zugabe einer Lösung bekannter Konzentration.' },
    { term: 'Äquivalenzpunkt', definition: 'Punkt, an dem sich die Stoffmengen von Säure und Base genau entsprechen.' },
    { term: 'Bürette', definition: 'Graduiertes Glasrohr mit Hahn zur tropfenweisen Zugabe.' },
    { term: 'exotherm', definition: 'Unter Wärmeabgabe verlaufend.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'reaktion',
      prompt: 'Welche Teilchen reagieren bei der Neutralisation miteinander?',
      options: [
        { id: 'a', text: 'Natrium-Ionen und Chlorid-Ionen' },
        { id: 'b', text: 'Oxonium-Ionen und Hydroxid-Ionen' },
        { id: 'c', text: 'Wassermoleküle und Salzkristalle' },
        { id: 'd', text: 'Protonen und Neutronen' },
      ],
      answer: 'b',
      explanation: 'H₃O⁺ + OH⁻ → 2 H₂O. Diese beiden Ionen sind für die saure bzw. alkalische Wirkung verantwortlich und verschwinden gemeinsam.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'reaktion',
      prompt: 'Vervollständige die allgemeine Aussage zur Neutralisation.',
      segments: [
        'Säure + Lauge → ',
        { blank: 'a', accept: ['Salz'] },
        ' + ',
        { blank: 'b', accept: ['Wasser'] },
        '. Die Reaktion verläuft ',
        { blank: 'c', accept: ['exotherm'] },
        ', es wird also Wärme frei.',
      ],
      explanation: 'Es entstehen immer ein Salz und Wasser, und die Reaktion gibt Wärme ab.',
    },
    {
      id: 'q3', type: 'match', difficulty: 2, competency: 'salzbildung',
      prompt: 'Ordne jeder Kombination das entstehende Salz zu.',
      pairs: [
        { left: 'HCl + NaOH', right: 'NaCl' },
        { left: 'HNO₃ + NaOH', right: 'NaNO₃' },
        { left: 'H₂SO₄ + 2 NaOH', right: 'Na₂SO₄' },
        { left: 'HCl + KOH', right: 'KCl' },
      ],
      explanation: 'Das Salz besteht aus dem Metall-Ion der Lauge und dem Säurerest-Ion der Säure.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 2, competency: 'salzbildung',
      prompt: 'Wie viele Formeleinheiten Natronlauge werden benötigt, um eine Formeleinheit Schwefelsäure (H₂SO₄) vollständig zu neutralisieren?',
      answer: 2, tolerance: 0.01,
      hint: 'Wie viele Protonen kann Schwefelsäure abgeben?',
      explanation: 'Schwefelsäure ist zweiprotonig und gibt zwei H⁺ ab. Man braucht also zwei OH⁻, also 2 NaOH: H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O.',
    },
    {
      id: 'q5', type: 'order', difficulty: 2, competency: 'titration',
      prompt: 'Bringe die Schritte einer Titration in die richtige Reihenfolge.',
      items: [
        'Ein bekanntes Volumen der unbekannten Lösung in den Kolben geben',
        'Einige Tropfen Indikator zugeben',
        'Die Bürette füllen und den Startwert ablesen',
        'Tropfenweise zugeben und dabei umschwenken',
        'Beim ersten dauerhaften Farbumschlag stoppen',
        'Verbrauchtes Volumen ablesen und die Konzentration berechnen',
      ],
      explanation: 'Vorlage und Indikator zuerst, dann die Zugabe aus der Bürette bis zum Umschlag, zuletzt die Auswertung.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'rechnen',
      prompt: '20 mL Kalilauge werden mit Salzsäure der Konzentration 0,1 mol/L titriert. Bis zum Umschlag werden 25 mL verbraucht. Wie groß ist die Konzentration der Kalilauge in mol/L?',
      answer: 0.125, tolerance: 0.002, unit: 'mol/L',
      hint: 'c₁ · V₁ = c₂ · V₂. Denk an die Umrechnung von mL in L.',
      explanation: 'n(HCl) = 0,1 mol/L · 0,025 L = 0,0025 mol. Diese Stoffmenge entspricht der Lauge: c = 0,0025 mol / 0,020 L = 0,125 mol/L.',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 3, competency: 'titration',
      prompt: 'Der Äquivalenzpunkt einer Titration liegt immer bei pH 7.',
      answer: false,
      explanation: 'Falsch. Nur bei starker Säure und starker Base. Titriert man eine schwache Säure mit einer starken Base, liegt der Äquivalenzpunkt im alkalischen Bereich, weil das entstehende Salz basisch reagiert.',
    },
    {
      id: 'q8', type: 'multi', difficulty: 2, competency: 'alltag',
      prompt: 'Welche Alltagsvorgänge beruhen auf einer Neutralisation?',
      options: [
        { id: 'a', text: 'Magentabletten gegen Sodbrennen' },
        { id: 'b', text: 'Kalken saurer Böden in der Landwirtschaft' },
        { id: 'c', text: 'Zahnpasta gegen Säuren im Mund' },
        { id: 'd', text: 'Einfrieren von Lebensmitteln' },
        { id: 'e', text: 'pH-Einstellung in der Kläranlage' },
      ],
      answer: ['a', 'b', 'c', 'e'],
      explanation: 'Einfrieren ist ein physikalischer Vorgang ohne chemische Reaktion. Alle anderen Beispiele beruhen darauf, dass Säuren oder Basen neutralisiert werden.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'reaktion',
      prompt: 'Erkläre, warum eine neutralisierte Lösung weder sauer noch alkalisch reagiert, obwohl vorher beide Wirkungen vorhanden waren.',
      keywords: [
        { label: 'H₃O⁺ und OH⁻ reagieren miteinander', any: ['h3o', 'oxonium', 'oh', 'hydroxid', 'reagieren'] },
        { label: 'es entsteht Wasser', any: ['wasser', 'h2o'] },
        { label: 'verantwortliche Teilchen verbraucht', any: ['verbraucht', 'nicht mehr vorhanden', 'aufgebraucht', 'verschwinden'] },
        { label: 'Salz-Ionen bleiben zurück', any: ['salz', 'ionen bleiben', 'zurueck'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Die saure Wirkung einer Lösung geht von den Oxonium-Ionen aus, die alkalische von den Hydroxid-Ionen. Bei der Neutralisation reagieren genau diese beiden Teilchen miteinander und bilden Wassermoleküle. Damit sind die Teilchen, die für beide Wirkungen verantwortlich waren, verbraucht — es können also weder saure noch alkalische Eigenschaften mehr auftreten. In der Lösung bleiben nur die Metall-Ionen der Lauge und die Säurerest-Ionen der Säure zurück; sie bilden das Salz und beeinflussen den pH-Wert bei starken Säuren und Basen nicht.',
      explanation: 'Beide Wirkungen verschwinden gleichzeitig, weil die verantwortlichen Ionen zu Wasser reagieren. Zurück bleiben nur die Salz-Ionen.',
    },
  ],
};
