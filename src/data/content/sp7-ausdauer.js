export default {
  id: 'sp7-ausdauer',
  title: 'Ausdauertraining',
  summary: 'Ausdauer ist die Fähigkeit, eine Belastung lange durchzuhalten und sich danach schnell zu erholen. Der Puls zeigt, ob das Tempo dafür passt.',
  estimatedMinutes: 26,
  aliases: ['Ausdauer', 'Puls', 'Herzfrequenz', 'aerob', 'anaerob', 'Dauermethode', 'Trainingsplan', 'Grundlagenausdauer'],
  competencies: [
    { id: 'herzfrequenz', title: 'Herzfrequenz', description: 'Ruhe-, Belastungs- und Maximalpuls unterscheiden und berechnen.' },
    { id: 'energie', title: 'Aerob und anaerob', description: 'Die beiden Arten der Energiebereitstellung erklären.' },
    { id: 'anpassung', title: 'Anpassungen des Körpers', description: 'Wirkungen regelmäßigen Ausdauertrainings benennen.' },
    { id: 'methoden', title: 'Trainingsmethoden', description: 'Dauer-, Intervall- und Wiederholungsmethode unterscheiden.' },
    { id: 'planung', title: 'Trainingsplanung', description: 'Belastung sinnvoll steuern und ein Training planen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Was Ausdauer ist und was der Puls verrät',
      blocks: [
        { type: 'text', html: '<strong>Ausdauer</strong> ist die Fähigkeit, einer Belastung möglichst lange zu widerstehen und sich danach möglichst schnell zu erholen. Beides gehört zusammen: Wer schneller wieder zu Atem kommt, ist ausdauernder.' },
        { type: 'text', html: 'Wie stark der Körper gerade belastet wird, zeigt die <strong>Herzfrequenz</strong> — die Zahl der Herzschläge pro Minute (Schläge/min).' },
        {
          type: 'table',
          caption: 'Drei wichtige Pulswerte',
          head: ['Wert', 'Bedeutung', 'Typisch'],
          rows: [
            ['Ruhepuls', 'Herzschläge in völliger Ruhe, am besten morgens im Liegen gemessen', '60–80 Schläge/min, bei Ausdauersportlern 40–50'],
            ['Belastungspuls', 'Herzfrequenz während der Bewegung', 'je nach Tempo 120–190 Schläge/min'],
            ['Maximalpuls', 'höchstmögliche Herzfrequenz', 'Faustformel: 220 − Lebensalter'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Maximalpuls abschätzen',
          html: 'Faustformel: <strong>HF<sub>max</sub> = 220 − Lebensalter</strong>.<br>'
            + 'Für die <strong>Grundlagenausdauer</strong> trainiert man bei etwa <strong>60–75 %</strong> dieses Werts.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Trainingsbereich berechnen',
          task: 'Ein 13-jähriger Schüler will seine Grundlagenausdauer trainieren. In welchem Pulsbereich sollte er laufen?',
          steps: [
            { text: 'Maximalpuls abschätzen', math: '220 − 13 = 207 Schläge/min' },
            { text: 'Untere Grenze (60 %)', math: '0,60 · 207 ≈ 124 Schläge/min' },
            { text: 'Obere Grenze (75 %)', math: '0,75 · 207 ≈ 155 Schläge/min' },
          ],
          result: 'Er sollte etwa zwischen 124 und 155 Schlägen pro Minute laufen.',
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Der Sprechtest',
          html: 'Auch ohne Pulsuhr lässt sich das Tempo prüfen: Wer beim Laufen noch <strong>in ganzen Sätzen sprechen</strong> kann, ist im richtigen Bereich für die Grundlagenausdauer. '
            + 'Wer nur noch einzelne Wörter herausbringt, läuft zu schnell.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Die Faustformel ist nur eine Schätzung',
          html: 'Der tatsächliche Maximalpuls kann um 10 bis 20 Schläge nach oben oder unten abweichen. '
            + 'Die Formel liefert einen Anhaltspunkt, keinen Messwert.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Aerobe und anaerobe Energiebereitstellung',
      blocks: [
        { type: 'text', html: 'Jede Muskelbewegung braucht Energie. Woher der Körper sie nimmt, hängt davon ab, ob genug <strong>Sauerstoff</strong> in der Muskelzelle ankommt.' },
        {
          type: 'table',
          caption: 'Die beiden Wege im Vergleich',
          head: ['', 'aerob', 'anaerob'],
          rows: [
            ['Sauerstoff', 'ausreichend vorhanden', 'zu wenig vorhanden'],
            ['Brennstoff', 'Kohlenhydrate und Fette', 'vor allem Kohlenhydrate'],
            ['Nebenprodukt', 'Kohlenstoffdioxid und Wasser', 'Laktat (Milchsäure)'],
            ['Energiemenge', 'sehr hoch', 'gering'],
            ['Tempo der Freisetzung', 'langsam', 'sehr schnell'],
            ['Typische Belastung', 'Dauerlauf, Radfahren, Schwimmen', 'Sprint, Zweikampf, Endspurt'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Kurz gemerkt',
          html: '<strong>aerob = mit Sauerstoff</strong> — langsam, sparsam, sehr lange durchhaltbar.<br>'
            + '<strong>anaerob = ohne Sauerstoff</strong> — schnell verfügbar, aber nach kurzer Zeit erschöpft, weil Laktat anfällt.',
        },
        { type: 'text', html: 'Beim Sprint arbeitet die Muskulatur überwiegend anaerob. Das anfallende <strong>Laktat</strong> übersäuert den Muskel, er brennt und wird langsamer — deshalb lässt sich ein Sprinttempo nur wenige Sekunden halten. Beim lockeren Dauerlauf reicht der Sauerstoff aus, es entsteht kaum Laktat, und die Belastung ist über eine Stunde und länger durchhaltbar.' },
        {
          type: 'note',
          variant: 'info',
          title: 'Beide Wege laufen gleichzeitig',
          html: 'Aerob und anaerob sind kein Entweder-oder. Es geht immer um den <strong>Anteil</strong>: '
            + 'Je höher die Intensität, desto größer wird der anaerobe Anteil an der Energiebereitstellung.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Wirkungen und Trainingsplanung',
      blocks: [
        { type: 'text', html: 'Wer regelmäßig ausdauernd trainiert, verändert seinen Körper messbar:' },
        {
          type: 'list',
          items: [
            'Das <strong>Herz</strong> wird kräftiger und pumpt pro Schlag mehr Blut. Es muss deshalb seltener schlagen — der <strong>Ruhepuls sinkt</strong>.',
            'In der Muskulatur bilden sich mehr <strong>Kapillaren</strong>, die feinsten Blutgefäße. Der Muskel wird besser mit Sauerstoff versorgt.',
            'Die <strong>Lunge</strong> arbeitet ökonomischer: tiefere Atemzüge statt schneller, flacher Atmung.',
            'Die <strong>Erholung</strong> nach der Belastung verläuft schneller.',
            'Das Immunsystem wird gestärkt, das Risiko für Herz-Kreislauf-Erkrankungen sinkt.',
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Warum der Ruhepuls sinkt',
          html: 'Ein trainiertes Herz befördert pro Schlag mehr Blut. '
            + 'Für dieselbe Menge Blut braucht es also <strong>weniger Schläge</strong> — der Ruhepuls ist deshalb der einfachste Nachweis für Trainingsfortschritt.',
        },
        { type: 'text', html: 'Für die Planung eines Trainings gibt es drei Stellschrauben:' },
        {
          type: 'table',
          caption: 'Belastungsgrößen',
          head: ['Größe', 'Frage', 'Beispiel'],
          rows: [
            ['Intensität', 'Wie anstrengend?', '65 % des Maximalpulses'],
            ['Dauer und Umfang', 'Wie lange, wie viel insgesamt?', '30 Minuten, 5 km'],
            ['Häufigkeit', 'Wie oft pro Woche?', 'dreimal, mit Pausentagen dazwischen'],
          ],
        },
        {
          type: 'table',
          caption: 'Trainingsmethoden der Ausdauer',
          head: ['Methode', 'Ablauf', 'Ziel'],
          rows: [
            ['Dauermethode', 'gleichmäßig ohne Pause laufen', 'Grundlagenausdauer'],
            ['Intervallmethode', 'Belastung und kurze, unvollständige Pausen im Wechsel', 'Tempohärte'],
            ['Wiederholungsmethode', 'hohes Tempo, dazwischen vollständige Erholung', 'Wettkampftempo'],
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Einstieg in ein Lauftraining',
          task: 'Wie plant eine Anfängerin ihr Ausdauertraining sinnvoll?',
          steps: [
            { text: 'Methode wählen', math: 'Dauermethode, gleichmäßiges Tempo' },
            { text: 'Intensität festlegen', math: 'Sprechtempo, ca. 60–70 % HFmax' },
            { text: 'Dauer festlegen', math: '20 Minuten, notfalls mit Gehpausen' },
            { text: 'Häufigkeit festlegen', math: '2- bis 3-mal pro Woche mit Pausentagen' },
            { text: 'Steigern', math: 'zuerst die Dauer erhöhen, erst später das Tempo' },
          ],
          result: 'Erst der Umfang, dann die Intensität. Die Pausentage gehören zum Training, weil die Anpassung in der Erholung stattfindet.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Zu schnell ist nicht besser',
          html: 'Der häufigste Anfängerfehler ist ein zu hohes Tempo. '
            + 'Wer ständig im anaeroben Bereich läuft, ermüdet früh, verbessert die Grundlagenausdauer aber kaum. '
            + 'Langsames, langes Laufen bringt für die Ausdauer mehr als kurzes, schnelles.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Ausdauer heißt: eine Belastung lange durchhalten und sich danach schnell erholen.',
    'Faustformel für den Maximalpuls: 220 − Lebensalter (nur eine Schätzung).',
    'Grundlagenausdauer trainiert man bei etwa 60–75 % des Maximalpulses.',
    'Sprechtest: Wer beim Laufen noch in ganzen Sätzen sprechen kann, ist im richtigen Bereich.',
    'Aerob = mit Sauerstoff, viel Energie, lange durchhaltbar. Anaerob = ohne Sauerstoff, schnell verfügbar, es entsteht Laktat.',
    'Regelmäßiges Ausdauertraining senkt den Ruhepuls, weil das Herz pro Schlag mehr Blut befördert.',
    'Belastung wird über Intensität, Dauer/Umfang und Häufigkeit gesteuert.',
    'Dauermethode ohne Pausen, Intervallmethode mit unvollständigen Pausen, Wiederholungsmethode mit vollständiger Erholung.',
    'Anfänger steigern zuerst die Dauer, erst danach das Tempo.',
  ],
  commonMistakes: [
    {
      mistake: 'Ein niedriger Ruhepuls wird für ein Zeichen von Schwäche gehalten.',
      why: 'Bei anderen Messwerten gilt oft: mehr ist besser.',
      fix: 'Ein niedriger Ruhepuls ist ein Zeichen guter Ausdauer. Das trainierte Herz pumpt pro Schlag mehr Blut und braucht deshalb weniger Schläge.',
    },
    {
      mistake: 'Anaerobes Training wird für das bessere Ausdauertraining gehalten, weil es anstrengender ist.',
      why: 'Anstrengung wird mit Wirksamkeit gleichgesetzt.',
      fix: 'Die Grundlagenausdauer entsteht im aeroben Bereich. Zu hohes Tempo führt zu früher Ermüdung durch Laktat und bringt für die Ausdauer wenig.',
    },
    {
      mistake: 'Der Maximalpuls aus der Faustformel wird als exakter Wert behandelt.',
      why: 'Die Formel liefert eine glatte Zahl.',
      fix: '220 − Lebensalter ist ein Schätzwert; der wirkliche Maximalpuls kann um 10 bis 20 Schläge abweichen.',
    },
    {
      mistake: 'Pausentage werden als verlorene Trainingszeit gesehen.',
      why: 'Fortschritt wird nur mit Belastung verbunden.',
      fix: 'Die Anpassung des Körpers findet in der Erholungsphase statt. Ohne Pausen bleibt der Trainingseffekt aus.',
    },
    {
      mistake: 'Laktat wird für den Grund von Muskelkater gehalten.',
      why: 'Beides tritt nach harter Belastung auf.',
      fix: 'Laktat ist wenige Stunden später abgebaut. Muskelkater entsteht durch kleinste Risse in den Muskelfasern und zeigt sich erst nach einem Tag.',
    },
  ],
  recap: 'Ausdauer bedeutet, eine Belastung lange durchzuhalten und sich danach schnell zu erholen. Wie stark der Körper belastet ist, zeigt die Herzfrequenz: Der Maximalpuls lässt sich grob mit 220 − Lebensalter abschätzen, die Grundlagenausdauer trainiert man bei etwa 60 bis 75 Prozent davon. Reicht der Sauerstoff aus, arbeitet der Muskel aerob, gewinnt viel Energie aus Kohlenhydraten und Fetten und kann die Belastung lange halten. Bei hoher Intensität arbeitet er anaerob, gewinnt schnell, aber wenig Energie und bildet Laktat, das rasch zur Ermüdung führt. Regelmäßiges Training macht das Herz kräftiger, senkt den Ruhepuls, verbessert die Sauerstoffversorgung der Muskulatur und beschleunigt die Erholung. Gesteuert wird das Training über Intensität, Dauer und Häufigkeit; Anfänger arbeiten mit der Dauermethode und steigern zuerst die Dauer, erst danach das Tempo.',
  simpler: 'Ausdauer heißt, dass du lange durchhältst, ohne schlappzumachen — und danach schnell wieder fit bist. Dein Puls zeigt dir, wie anstrengend es gerade ist. Für gutes Ausdauertraining darfst du nicht zu schnell laufen: Du solltest dich dabei noch unterhalten können. Dann bekommt dein Körper genug Sauerstoff und kann stundenlang Energie liefern. Sprintest du dagegen, geht dem Muskel der Sauerstoff aus, es entsteht Milchsäure und nach kurzer Zeit brennen die Beine. Wenn du regelmäßig läufst, wird dein Herz stärker und schlägt in Ruhe langsamer. Wichtig: Steigere zuerst, wie lange du läufst, und erst später, wie schnell.',
  deeper: 'Der Übergang vom vorwiegend aeroben zum vorwiegend anaeroben Stoffwechsel wird als anaerobe Schwelle bezeichnet. Sie liegt näherungsweise dort, wo im Blut etwa 4 Millimol Laktat pro Liter gemessen werden, und markiert die höchste Intensität, bei der Laktatbildung und Laktatabbau sich noch die Waage halten. Trainierte verschieben diese Schwelle zu höheren Geschwindigkeiten: Sie laufen bei gleichem Laktatwert schneller. Ein weiterer Kennwert ist die maximale Sauerstoffaufnahme (VO2max) in Millilitern pro Kilogramm Körpergewicht und Minute; sie gilt als Bruttokriterium der Ausdauerleistungsfähigkeit. Die Vergrößerung des Herzens durch Ausdauertraining, das sogenannte Sportherz, ist eine gesunde Anpassung: Das Schlagvolumen steigt von rund 70 auf über 100 Milliliter, weshalb der Ruhepuls bei Spitzenausdauersportlern bis auf 35 Schläge pro Minute sinken kann.',
  glossary: [
    { term: 'Ruhepuls', definition: 'Herzfrequenz in völliger Ruhe; sinkt durch Ausdauertraining.' },
    { term: 'Maximalpuls', definition: 'Höchste erreichbare Herzfrequenz; Faustformel 220 − Lebensalter.' },
    { term: 'aerob', definition: 'Energiegewinnung mit ausreichend Sauerstoff.' },
    { term: 'anaerob', definition: 'Energiegewinnung ohne ausreichend Sauerstoff; es entsteht Laktat.' },
    { term: 'Laktat', definition: 'Milchsäure; Nebenprodukt der anaeroben Energiebereitstellung.' },
    { term: 'Grundlagenausdauer', definition: 'Ausdauerbasis, die im aeroben Bereich bei 60–75 % HFmax trainiert wird.' },
    { term: 'Kapillaren', definition: 'Feinste Blutgefäße im Muskel; ihre Zahl steigt durch Ausdauertraining.' },
  ],
  questions: [
    {
      id: 'q1', type: 'numeric', difficulty: 1, competency: 'herzfrequenz',
      prompt: 'Wie hoch ist der geschätzte Maximalpuls eines 14-Jährigen nach der Faustformel (in Schlägen pro Minute)?',
      answer: 206, tolerance: 0.5, unit: 'Schläge/min',
      hint: 'HFmax = 220 − Lebensalter.',
      explanation: '220 − 14 = 206 Schläge/min. Der Wert ist eine Schätzung und kann individuell abweichen.',
    },
    {
      id: 'q2', type: 'numeric', difficulty: 3, competency: 'herzfrequenz',
      prompt: 'Ein 20-Jähriger möchte bei 70 % seines geschätzten Maximalpulses trainieren. Bei welcher Herzfrequenz liegt das (in Schlägen pro Minute)?',
      answer: 140, tolerance: 1, unit: 'Schläge/min',
      hint: 'Erst den Maximalpuls berechnen, dann 70 % davon.',
      explanation: '220 − 20 = 200 Schläge/min. Davon 70 %: 0,70 · 200 = 140 Schläge/min.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'energie',
      prompt: 'Was bedeutet „anaerobe Energiebereitstellung"?',
      options: [
        { id: 'a', text: 'Energiegewinnung ohne ausreichend Sauerstoff' },
        { id: 'b', text: 'Energiegewinnung ausschließlich aus Fetten' },
        { id: 'c', text: 'Energiegewinnung mit besonders viel Sauerstoff' },
        { id: 'd', text: 'Energiegewinnung im Schlaf' },
      ],
      answer: 'a',
      explanation: 'Die Vorsilbe „an-" bedeutet „ohne". Ohne ausreichend Sauerstoff wird Energie schnell, aber nur kurz bereitgestellt; dabei entsteht Laktat.',
    },
    {
      id: 'q4', type: 'match', difficulty: 2, competency: 'energie',
      prompt: 'Ordne jeder Belastung die überwiegende Art der Energiebereitstellung zu.',
      pairs: [
        { left: '60-Minuten-Dauerlauf im Sprechtempo', right: 'überwiegend aerob' },
        { left: '100-Meter-Sprint', right: 'überwiegend anaerob' },
        { left: 'lockeres Radfahren', right: 'überwiegend aerob' },
        { left: 'Endspurt auf den letzten 200 Metern', right: 'überwiegend anaerob' },
      ],
      explanation: 'Je höher die Intensität und je kürzer die Belastung, desto größer der anaerobe Anteil.',
    },
    {
      id: 'q5', type: 'truefalse', difficulty: 2, competency: 'anpassung',
      prompt: 'Durch regelmäßiges Ausdauertraining steigt der Ruhepuls an.',
      answer: false,
      explanation: 'Falsch. Der Ruhepuls sinkt. Das trainierte Herz befördert pro Schlag mehr Blut und braucht deshalb weniger Schläge pro Minute.',
    },
    {
      id: 'q6', type: 'multi', difficulty: 3, competency: 'anpassung',
      prompt: 'Welche Anpassungen bewirkt regelmäßiges Ausdauertraining?',
      options: [
        { id: 'a', text: 'Das Herz befördert pro Schlag mehr Blut.' },
        { id: 'b', text: 'In der Muskulatur bilden sich mehr Kapillaren.' },
        { id: 'c', text: 'Die Erholung nach Belastung dauert länger.' },
        { id: 'd', text: 'Der Ruhepuls sinkt.' },
      ],
      answer: ['a', 'b', 'd'],
      explanation: 'Die Erholung verläuft schneller, nicht langsamer — genau das ist ein Kennzeichen guter Ausdauer.',
    },
    {
      id: 'q7', type: 'cloze', difficulty: 2, competency: 'methoden',
      prompt: 'Vervollständige die Beschreibung der Trainingsmethoden.',
      segments: [
        'Bei der ',
        { blank: 'a', accept: ['Dauermethode', 'dauermethode'] },
        ' läuft man gleichmäßig und ohne Pause; sie schult die Grundlagenausdauer. Bei der Intervallmethode folgen auf die Belastung ',
        { blank: 'b', accept: ['unvollständige', 'unvollstaendige', 'kurze', 'lohnende'] },
        ' Pausen. Bei der Wiederholungsmethode erholt man sich dagegen ',
        { blank: 'c', accept: ['vollständig', 'vollstaendig', 'komplett'] },
        '.',
      ],
      explanation: 'Die Methoden unterscheiden sich vor allem in der Pausengestaltung: keine Pause, unvollständige Pause, vollständige Erholung.',
    },
    {
      id: 'q8', type: 'mc', difficulty: 2, competency: 'planung',
      prompt: 'Eine Anfängerin läuft seit vier Wochen dreimal wöchentlich 20 Minuten. Was sollte sie als Nächstes steigern?',
      options: [
        { id: 'a', text: 'Das Tempo, bis sie nicht mehr sprechen kann' },
        { id: 'b', text: 'Die Dauer, zum Beispiel auf 25 bis 30 Minuten' },
        { id: 'c', text: 'Die Häufigkeit auf sieben Einheiten pro Woche' },
        { id: 'd', text: 'Gar nichts, Ausdauer lässt sich nicht steigern' },
      ],
      answer: 'b',
      explanation: 'Im Ausdauertraining gilt: erst den Umfang, dann die Intensität steigern. Tägliches Training ohne Pausentage verhindert außerdem die Anpassung.',
    },
    {
      id: 'q9', type: 'order', difficulty: 3, competency: 'planung',
      prompt: 'Bringe die Schritte einer sinnvollen Trainingsplanung in die richtige Reihenfolge.',
      items: [
        'Ziel festlegen (z. B. 30 Minuten am Stück laufen)',
        'Ausgangslage prüfen (Ruhepuls messen, aktuelle Laufzeit testen)',
        'Methode und Intensität wählen (Dauermethode im Sprechtempo)',
        'Umfang und Häufigkeit festlegen (20 Minuten, dreimal pro Woche)',
        'Training durchführen und Erholungstage einplanen',
        'Fortschritt überprüfen und Belastung anpassen',
      ],
      explanation: 'Planung beginnt mit Ziel und Ausgangslage; erst danach werden Methode, Intensität und Umfang festgelegt. Am Ende steht die Überprüfung, aus der sich die nächste Steigerung ergibt.',
    },
    {
      id: 'q10', type: 'term', difficulty: 3, competency: 'energie',
      prompt: 'Erkläre, warum man ein Sprinttempo nur wenige Sekunden halten kann, ein Dauerlauftempo aber über eine Stunde.',
      keywords: [
        { label: 'Sprint anaerob / ohne Sauerstoff', any: ['anaerob', 'ohne sauerstoff', 'zu wenig sauerstoff'] },
        { label: 'Laktat führt zur Ermüdung', any: ['laktat', 'milchsaeure', 'milchsäure', 'uebersaeuer', 'übersäuer'] },
        { label: 'Dauerlauf aerob mit Sauerstoff', any: ['aerob', 'mit sauerstoff', 'genug sauerstoff'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Beim Sprint braucht der Muskel sofort sehr viel Energie. Der Kreislauf kann in dieser Zeit nicht genug Sauerstoff heranschaffen, deshalb arbeitet der Muskel anaerob. Dabei entsteht Laktat, das den Muskel übersäuert und ihn schnell ermüden lässt — nach wenigen Sekunden bricht das Tempo ein. Beim Dauerlauf ist die Intensität so niedrig, dass genug Sauerstoff in der Muskelzelle ankommt. Der Muskel arbeitet aerob, verbrennt Kohlenhydrate und Fette vollständig, und es fällt kaum Laktat an. Diese Energiebereitstellung liefert zwar langsamer Energie, dafür aber sehr viel — die Belastung ist deshalb über eine Stunde und länger durchhaltbar.',
      explanation: 'Sprint: anaerob, Laktat, schnelle Ermüdung. Dauerlauf: aerob, kaum Laktat, lange durchhaltbar.',
    },
  ],
};
