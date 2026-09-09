export default {
  id: 'de9-eroerterung',
  title: 'Erörterung',
  summary: 'In einer Erörterung wägst du Argumente zu einer Streitfrage ab und kommst zu einem begründeten Urteil. Es gibt eine lineare und eine dialektische Form.',
  estimatedMinutes: 32,
  aliases: ['Pro und Contra', 'dialektisch', 'linear', 'Argumentation', 'Sanduhrprinzip', 'Reißverschluss'],
  competencies: [
    { id: 'aufbau', title: 'Aufbau kennen', description: 'Einleitung, Hauptteil und Schluss einer Erörterung gliedern.' },
    { id: 'argument', title: 'Argumente bauen', description: 'These, Argument, Beleg und Beispiel unterscheiden und verbinden.' },
    { id: 'formen', title: 'Lineare und dialektische Form', description: 'Beide Formen unterscheiden und die passende wählen.' },
    { id: 'anordnung', title: 'Argumente anordnen', description: 'Argumente sinnvoll gewichten und reihen.' },
    { id: 'sprache', title: 'Sprache und Stil', description: 'Sachlich formulieren und Argumente sprachlich verknüpfen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Was eine Erörterung ist',
      blocks: [
        { type: 'text', html: 'Eine Erörterung ist ein <strong>Sachtext</strong>, in dem du eine strittige Frage untersuchst — zum Beispiel: „Sollten Smartphones an Schulen verboten werden?" Du sammelst Argumente, ordnest sie und kommst am Ende zu einem <strong>begründeten Urteil</strong>.' },
        { type: 'text', html: 'Wichtig: Eine Erörterung ist keine Meinungsäußerung ohne Begründung. Jede Behauptung muss <strong>gestützt</strong> werden.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Bausteine eines Arguments',
          html: '<strong>Behauptung (These):</strong> Was du sagen willst.<br>'
            + '<strong>Begründung (Argument):</strong> Das „weil …".<br>'
            + '<strong>Beleg/Beispiel:</strong> Studie, Zahl, Erfahrung, konkreter Fall.<br>'
            + 'Kurz: <strong>B–B–B</strong> — Behauptung, Begründung, Beispiel.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — ein vollständiges Argument',
          task: 'Baue ein Argument gegen ein generelles Handyverbot.',
          steps: [
            { text: 'Behauptung', detail: 'Ein generelles Verbot geht zu weit.' },
            { text: 'Begründung', detail: 'weil Schülerinnen und Schüler den verantwortungsvollen Umgang mit digitalen Geräten lernen müssen' },
            { text: 'Beispiel/Beleg', detail: 'An der Gesamtschule Musterstadt werden Handys im Unterricht gezielt zur Recherche eingesetzt; die Zahl der Konflikte in den Pausen ging dort nach Einführung klarer Regeln zurück.' },
          ],
          result: 'Erst die Kombination aus Behauptung, Begründung und Beispiel macht aus einer Meinung ein Argument.',
        },
        {
          type: 'table',
          caption: 'Wie stark ist ein Argument?',
          head: ['Art', 'Beschreibung', 'Stärke'],
          rows: [
            ['Faktenargument', 'stützt sich auf nachprüfbare Tatsachen und Zahlen', 'sehr stark'],
            ['Autoritätsargument', 'beruft sich auf Fachleute oder Studien', 'stark'],
            ['Normatives Argument', 'beruft sich auf Werte und Normen', 'stark'],
            ['Analogisierendes Argument', 'vergleicht mit einem ähnlichen Fall', 'mittel'],
            ['Erfahrungsargument', 'stützt sich auf eigene Beobachtung', 'schwächer'],
            ['Plausibilitätsargument', 'stützt sich auf allgemeine Einsicht', 'schwach'],
          ],
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Lineare und dialektische Erörterung',
      blocks: [
        { type: 'text', html: 'Es gibt zwei Grundformen — die Aufgabenstellung verrät, welche gemeint ist.' },
        {
          type: 'table',
          caption: 'Die beiden Formen im Vergleich',
          head: ['', 'Lineare Erörterung', 'Dialektische Erörterung'],
          rows: [
            ['Frage', '„Welche Vorteile hat …?"', '„Sollte man … ?" / „Pro und Contra"'],
            ['Perspektive', 'nur eine Seite', 'zwei Seiten'],
            ['Aufbau', 'Argumente steigend nach Gewicht', 'Pro und Contra gegenübergestellt'],
            ['Schluss', 'Fazit und Ausblick', 'begründetes eigenes Urteil'],
          ],
        },
        { type: 'text', html: 'Für die <strong>dialektische</strong> Form gibt es zwei bewährte Anordnungen:' },
        {
          type: 'list',
          ordered: false,
          items: [
            '<strong>Sanduhrprinzip (Blockprinzip):</strong> Erst alle Argumente der Gegenseite (schwächstes zuerst), '
              + 'dann alle Argumente der eigenen Seite (stärkstes zuletzt). Vorteil: klar und einfach zu schreiben.',
            '<strong>Reißverschlussprinzip:</strong> Immer abwechselnd ein Pro- und ein Contra-Argument, jeweils direkt entgegnet. '
              + 'Vorteil: wirkt lebendiger, verlangt aber sichere Verknüpfungen.',
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Das Wichtigste zum Schluss',
          html: 'Ordne deine Argumente <strong>steigend</strong>: Das stärkste Argument kommt zuletzt. '
            + 'Es bleibt dem Leser am besten im Gedächtnis und stützt dein Fazit.',
        },
        {
          type: 'steps',
          items: [
            { text: 'Einleitung', detail: 'Hinführung zum Thema (aktueller Anlass, Zahl, Zitat), Nennung der Streitfrage, kurze Ankündigung des Vorgehens. Keine eigene Meinung!' },
            { text: 'Hauptteil', detail: 'Argumente nach dem gewählten Prinzip, jeweils mit Behauptung, Begründung und Beispiel. Absätze für jedes Argument.' },
            { text: 'Schluss', detail: 'Zusammenfassung der Abwägung, begründetes eigenes Urteil, Ausblick oder Lösungsvorschlag.' },
          ],
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Sprache und Formulierungshilfen',
      blocks: [
        { type: 'text', html: 'Eine Erörterung ist <strong>sachlich</strong>: kein „ich finde das blöd", keine Umgangssprache, keine Übertreibungen. Statt „ich" darf man aber im Schlussteil durchaus Stellung nehmen — begründet und in gehobenem Stil.' },
        {
          type: 'table',
          caption: 'Nützliche Wendungen',
          head: ['Funktion', 'Formulierungen'],
          rows: [
            ['Argument einführen', 'Ein wesentlicher Aspekt ist … / Zunächst ist festzuhalten, dass … / Hinzu kommt, dass …'],
            ['Begründen', '… weil / da … / Der Grund dafür liegt darin, dass …'],
            ['Belegen', 'Dies zeigt sich daran, dass … / Ein Beispiel dafür ist … / Laut einer Studie von …'],
            ['Gegenargument einführen', 'Dagegen wird eingewandt, dass … / Kritiker führen an, dass … / Allerdings …'],
            ['Entgegnen', 'Dieser Einwand überzeugt jedoch nicht, weil … / Dabei wird übersehen, dass …'],
            ['Gewichten', 'Schwerer wiegt jedoch … / Entscheidend ist letztlich, dass …'],
            ['Fazit ziehen', 'Abwägend lässt sich festhalten, dass … / Aus den genannten Gründen …'],
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Häufigster Aufbaufehler',
          html: 'Viele nennen ihre Meinung schon in der <strong>Einleitung</strong>. Damit ist die Abwägung entwertet — '
            + 'der Leser weiß das Ergebnis, bevor die Argumente kommen. Die Einleitung stellt nur die <strong>Frage</strong>.',
        },
        { type: 'text', html: 'Achte auf die <strong>Zeitform</strong>: Die Erörterung steht im <strong>Präsens</strong>. Vergangene Sachverhalte werden im Perfekt oder Präteritum eingebettet.' },
      ],
      check: ['q5'],
    },
  ],
  keyFacts: [
    'Argument = Behauptung + Begründung + Beispiel/Beleg (B–B–B).',
    'Lineare Erörterung: eine Seite, steigende Argumentation. Dialektisch: Pro und Contra.',
    'Sanduhrprinzip: Gegenseite zuerst, eigene Seite danach. Reißverschluss: abwechselnd.',
    'Argumente steigend ordnen — das stärkste zuletzt.',
    'Einleitung nennt die Streitfrage, aber noch nicht die eigene Meinung.',
    'Das eigene Urteil gehört begründet in den Schluss.',
    'Sachlicher Stil, Präsens, klare Absätze pro Argument.',
  ],
  commonMistakes: [
    {
      mistake: 'Die eigene Meinung steht bereits in der Einleitung.',
      why: 'Man will gleich zum Punkt kommen.',
      fix: 'Die Einleitung führt zum Thema und nennt die Streitfrage. Das Urteil kommt erst im Schluss — nach der Abwägung.',
    },
    {
      mistake: 'Behauptungen ohne Begründung: „Handys sind schlecht für die Konzentration."',
      why: 'Die Meinung erscheint selbstverständlich.',
      fix: 'Jede Behauptung braucht ein „weil" und einen Beleg. Ohne Begründung ist es kein Argument.',
    },
    {
      mistake: 'Alle Argumente stehen in einem einzigen Absatz.',
      why: 'Der Text wird als Fließtext geschrieben.',
      fix: 'Pro Argument ein Absatz. Das macht die Gliederung sichtbar und wird in der Bewertung erwartet.',
    },
    {
      mistake: 'Umgangssprache und Übertreibungen: „total krass", „das geht ja gar nicht".',
      why: 'Man schreibt, wie man spricht.',
      fix: 'Sachlicher Stil: „Dieser Aspekt wiegt schwer", „Dieser Einwand überzeugt nicht".',
    },
    {
      mistake: 'Der Schluss wiederholt nur die Argumente.',
      why: 'Man traut sich kein Urteil zu.',
      fix: 'Der Schluss gewichtet: Welche Seite überzeugt und warum? Dazu gehört ein Ausblick oder Lösungsvorschlag.',
    },
  ],
  recap: 'Eine Erörterung untersucht eine Streitfrage und endet mit einem begründeten Urteil. Jedes Argument besteht aus Behauptung, Begründung und Beleg. Die lineare Form beleuchtet nur eine Seite, die dialektische stellt Pro und Contra gegenüber — entweder blockweise nach dem Sanduhrprinzip oder abwechselnd nach dem Reißverschlussprinzip. Argumente werden steigend geordnet, das stärkste kommt zuletzt. Die Einleitung nennt die Frage, aber nicht die Meinung; erst der Schluss wägt ab und urteilt. Der Stil ist sachlich, die Zeitform ist Präsens, und jedes Argument bekommt einen eigenen Absatz.',
  simpler: 'Eine Erörterung ist wie eine Gerichtsverhandlung, in der du beide Seiten hörst und am Ende ein Urteil sprichst. Am Anfang sagst du nur, worum gestritten wird — nicht, was du denkst. Dann kommen die Argumente. Jedes Argument braucht drei Teile: Was du behauptest, warum das so ist, und ein Beispiel, das es zeigt. Die besten Argumente sparst du für den Schluss auf. Und erst am Ende sagst du, welche Seite dich überzeugt hat und warum.',
  deeper: 'Die dialektische Erörterung folgt dem Dreischritt These – Antithese – Synthese: Die eigene Position wird an den Gegenargumenten geprüft und dadurch geschärft. In der Argumentationstheorie nach Toulmin besteht ein Argument aus Behauptung (claim), Datum (data) und Schlussregel (warrant) — die Schlussregel ist genau das, was Schüler oft weglassen, weil sie ihnen selbstverständlich erscheint. Für die Oberstufe kommen die textgebundene Erörterung (Argumente aus einer Vorlage werden analysiert und beurteilt) und die literarische Erörterung hinzu, bei der die Belege aus dem literarischen Text stammen.',
  glossary: [
    { term: 'These', definition: 'Behauptung, die begründet werden muss.' },
    { term: 'Argument', definition: 'Begründung, die eine These stützt.' },
    { term: 'Antithese', definition: 'Gegenbehauptung zur These.' },
    { term: 'Sanduhrprinzip', definition: 'Blockweise Anordnung: erst alle Gegenargumente, dann alle eigenen.' },
    { term: 'Reißverschlussprinzip', definition: 'Abwechselnde Anordnung von Pro- und Contra-Argumenten.' },
    { term: 'Synthese', definition: 'Abwägendes Urteil, das beide Seiten berücksichtigt.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'argument',
      prompt: 'Welche Aussage ist ein vollständiges Argument?',
      options: [
        { id: 'a', text: 'Hausaufgaben sind sinnlos.' },
        { id: 'b', text: 'Hausaufgaben sind sinnvoll, weil sie den Stoff festigen — Studien zeigen, dass regelmäßiges Wiederholen die Behaltensleistung deutlich erhöht.' },
        { id: 'c', text: 'Ich finde Hausaufgaben furchtbar.' },
        { id: 'd', text: 'Viele Schüler mögen keine Hausaufgaben.' },
      ],
      answer: 'b',
      explanation: 'Nur b enthält alle drei Bausteine: Behauptung („sind sinnvoll"), Begründung („weil sie den Stoff festigen") und Beleg (Hinweis auf Studien).',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'argument',
      prompt: 'Vervollständige die drei Bausteine eines Arguments.',
      segments: [
        'Ein Argument besteht aus der ',
        { blank: 'a', accept: ['Behauptung', 'These'] },
        ', der ',
        { blank: 'b', accept: ['Begründung', 'Begruendung'] },
        ' und einem ',
        { blank: 'c', accept: ['Beispiel', 'Beleg'] },
        '.',
      ],
      explanation: 'Merkhilfe B–B–B: Behauptung, Begründung, Beispiel/Beleg.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'formen',
      prompt: 'Welche Aufgabenstellung verlangt eine dialektische Erörterung?',
      options: [
        { id: 'a', text: 'Erläutere die Vorteile des Fahrradfahrens in der Stadt.' },
        { id: 'b', text: 'Sollte in Innenstädten ein Tempolimit von 30 km/h gelten? Erörtere.' },
        { id: 'c', text: 'Beschreibe den Aufbau eines Fahrrads.' },
        { id: 'd', text: 'Fasse den Text zusammen.' },
      ],
      answer: 'b',
      explanation: 'Eine Entscheidungsfrage („Sollte …?") verlangt die Abwägung beider Seiten — also eine dialektische Erörterung. Aufgabe a ist linear.',
    },
    {
      id: 'q4', type: 'order', difficulty: 2, competency: 'aufbau',
      prompt: 'Bringe die Bestandteile einer dialektischen Erörterung nach dem Sanduhrprinzip in die richtige Reihenfolge.',
      items: [
        'Einleitung: Hinführung und Nennung der Streitfrage',
        'Argumente der Gegenposition, beginnend mit dem schwächsten',
        'Argumente der eigenen Position, endend mit dem stärksten',
        'Abwägung und begründetes eigenes Urteil',
        'Ausblick oder Lösungsvorschlag',
      ],
      explanation: 'Beim Sanduhrprinzip kommt zuerst die Gegenseite (aufsteigend), dann die eigene Seite (aufsteigend). Das Urteil folgt im Schluss.',
    },
    {
      id: 'q5', type: 'multi', difficulty: 2, competency: 'sprache',
      prompt: 'Welche Formulierungen passen in eine Erörterung?',
      options: [
        { id: 'a', text: 'Ein wesentlicher Aspekt ist, dass …' },
        { id: 'b', text: 'Dagegen wird eingewandt, dass …' },
        { id: 'c', text: 'Das finde ich echt total daneben.' },
        { id: 'd', text: 'Schwerer wiegt jedoch, dass …' },
        { id: 'e', text: 'Jeder weiß doch, dass das Quatsch ist.' },
      ],
      answer: ['a', 'b', 'd'],
      explanation: 'Erörterungen sind sachlich. Umgangssprache („echt total daneben") und pauschale Behauptungen („jeder weiß doch") gehören nicht dazu.',
    },
    {
      id: 'q6', type: 'truefalse', difficulty: 2, competency: 'aufbau',
      prompt: 'In der Einleitung einer Erörterung soll die eigene Meinung deutlich genannt werden.',
      answer: false,
      explanation: 'Falsch. Die Einleitung führt zum Thema und nennt die Streitfrage. Das eigene Urteil gehört begründet in den Schluss.',
    },
    {
      id: 'q7', type: 'match', difficulty: 3, competency: 'argument',
      prompt: 'Ordne jeder Argumentart das passende Beispiel zu.',
      pairs: [
        { left: 'Faktenargument', right: 'Die Unfallzahlen sanken nach Einführung von Tempo 30 um 22 Prozent.' },
        { left: 'Autoritätsargument', right: 'Der Deutsche Verkehrssicherheitsrat empfiehlt diese Maßnahme.' },
        { left: 'Normatives Argument', right: 'Der Schutz von Kindern muss Vorrang vor kurzen Fahrzeiten haben.' },
        { left: 'Erfahrungsargument', right: 'In meiner Straße fühle ich mich seit dem Tempolimit sicherer.' },
      ],
      explanation: 'Faktenargumente nutzen nachprüfbare Zahlen, Autoritätsargumente berufen sich auf Fachleute, normative auf Werte, Erfahrungsargumente auf eigene Beobachtung.',
    },
    {
      id: 'q8', type: 'analysis', difficulty: 3, competency: 'argument',
      prompt: 'Untersuche den folgenden Textausschnitt: Welche Bausteine eines Arguments fehlen und wie ließe sich der Abschnitt verbessern?',
      context: 'Soziale Netzwerke sollten für Kinder unter 14 Jahren verboten werden. Das ist einfach so. '
        + 'Meine Cousine ist elf und hängt den ganzen Tag am Handy. Deshalb muss der Staat endlich handeln.',
      keywords: [
        { label: 'Begründung fehlt', any: ['begruendung', 'weil', 'grund', 'nicht begruendet'] },
        { label: 'Beleg zu schwach / nur Einzelfall', any: ['einzelfall', 'cousine', 'beleg', 'studie', 'zahlen', 'verallgemein'] },
        { label: 'unsachlicher Stil', any: ['einfach so', 'unsachlich', 'stil', 'behauptung'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Der Abschnitt stellt eine Behauptung auf („sollten verboten werden"), begründet sie aber nicht: „Das ist einfach so" ist keine Begründung, sondern eine unsachliche Behauptung. Als Beleg dient nur ein Einzelfall (die Cousine), der sich nicht verallgemeinern lässt. Verbessern ließe sich der Abschnitt so: Die Behauptung erhält eine sachliche Begründung — etwa, dass Kinder in diesem Alter Risiken wie Cybermobbing und Suchtverhalten noch schlecht einschätzen können — und einen belastbaren Beleg, zum Beispiel Zahlen einer Studie zur Mediennutzung. Der Schluss „deshalb muss der Staat endlich handeln" sollte sachlich formuliert werden.',
      explanation: 'Es fehlen die Begründung und ein belastbarer Beleg; ein Einzelfall genügt nicht. Zusätzlich ist der Stil unsachlich.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'anordnung',
      prompt: 'Erkläre, warum man in einer Erörterung das stärkste Argument nicht an den Anfang, sondern ans Ende des Hauptteils stellt.',
      keywords: [
        { label: 'steigende Anordnung', any: ['steigend', 'aufsteigend', 'reihenfolge', 'zunehmend'] },
        { label: 'bleibt im Gedächtnis', any: ['gedaechtnis', 'erinnert', 'merkt', 'nachwirk', 'eindruck'] },
        { label: 'stützt das Fazit', any: ['fazit', 'schluss', 'urteil', 'ueberleitung'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Die Argumente werden steigend angeordnet, damit die Argumentation immer überzeugender wird. Das stärkste Argument steht direkt vor dem Schluss und bleibt dem Leser deshalb am besten im Gedächtnis. Außerdem leitet es unmittelbar zum Fazit über und stützt das eigene Urteil. Stünde es am Anfang, würden die schwächeren Argumente danach den Gesamteindruck abschwächen.',
      explanation: 'Steigende Anordnung nutzt den Effekt, dass das Letztgesagte am stärksten nachwirkt — und liefert die Überleitung zum Urteil.',
    },
  ],
};
