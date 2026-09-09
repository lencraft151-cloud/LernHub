export default {
  id: 'rel9-ethik-verantwortung',
  title: 'Ethische Entscheidungen treffen',
  summary: 'Ethik fragt, was richtig ist und warum. Drei große Theorien geben unterschiedliche Antworten — und helfen, eigene Entscheidungen zu begründen.',
  estimatedMinutes: 30,
  aliases: ['Dilemma', 'Utilitarismus', 'Pflichtethik', 'Kant', 'kategorischer Imperativ', 'Tugendethik', 'Gewissen'],
  competencies: [
    { id: 'grundbegriffe', title: 'Grundbegriffe', description: 'Ethik, Moral, Werte und Normen unterscheiden.' },
    { id: 'pflichtethik', title: 'Pflichtethik', description: 'Kants Ansatz und den kategorischen Imperativ erklären.' },
    { id: 'utilitarismus', title: 'Utilitarismus', description: 'Das Nützlichkeitsprinzip anwenden und kritisieren.' },
    { id: 'tugendethik', title: 'Tugendethik', description: 'Den Ansatz der Tugendethik beschreiben.' },
    { id: 'argumentieren', title: 'Ethisch argumentieren', description: 'Dilemmata analysieren und Positionen begründen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Worum es in der Ethik geht',
      blocks: [
        {
          type: 'table',
          caption: 'Die wichtigsten Begriffe',
          head: ['Begriff', 'Bedeutung'],
          rows: [
            ['Moral', 'die tatsächlich geltenden Vorstellungen von Gut und Böse in einer Gruppe'],
            ['Ethik', 'die wissenschaftliche Reflexion über Moral: Warum ist etwas richtig?'],
            ['Wert', 'etwas, das als erstrebenswert gilt — Freiheit, Gerechtigkeit, Leben'],
            ['Norm', 'konkrete Handlungsregel, die sich aus Werten ergibt — „Du sollst nicht lügen"'],
            ['Gewissen', 'die innere Instanz, die eigenes Handeln beurteilt'],
            ['Dilemma', 'Situation, in der jede Handlungsoption eine Norm verletzt'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Moral und Ethik nicht verwechseln',
          html: '<strong>Moral</strong> ist das, was Menschen <em>tatsächlich</em> für richtig halten. '
            + '<strong>Ethik</strong> fragt <em>begründet</em> nach, ob das zu Recht so ist. '
            + 'Moral ist also der Gegenstand, Ethik die Untersuchung.',
        },
        { type: 'text', html: 'Ein <strong>Dilemma</strong> macht deutlich, warum Begründungen nötig sind: Wenn jede Möglichkeit gegen eine Regel verstößt, muss man abwägen — und die Abwägung offenlegen.' },
        {
          type: 'example',
          title: 'Beispiel 1 — ein klassisches Dilemma',
          task: 'Eine Freundin bittet dich, ihren Eltern nicht zu erzählen, dass sie die Schule schwänzt. Später merkst du, dass es ihr sehr schlecht geht.',
          steps: [
            { text: 'Kollidierende Werte benennen', detail: 'Loyalität und Vertrauen gegen Fürsorge und Verantwortung.' },
            { text: 'Handlungsoptionen sammeln', detail: 'Schweigen, mit ihr reden, Eltern informieren, eine Vertrauensperson einbeziehen.' },
            { text: 'Folgen abschätzen', detail: 'Was passiert bei jeder Option — kurzfristig und langfristig?' },
            { text: 'Prinzipien prüfen', detail: 'Gibt es Regeln, die unbedingt gelten? Was würde ich mir selbst wünschen?' },
            { text: 'Entscheiden und begründen', detail: 'Nicht das Gefühl allein, sondern die Begründung zählt.' },
          ],
          result: 'Eine ethische Entscheidung wird nicht dadurch gut, dass sie sich gut anfühlt, sondern dadurch, dass sie begründet ist.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Drei große Antworten',
      blocks: [
        {
          type: 'note',
          variant: 'info',
          title: 'Pflichtethik (Immanuel Kant)',
          html: 'Eine Handlung ist gut, wenn sie aus <strong>Pflicht</strong> geschieht und die Regel dahinter '
            + 'allgemein gelten könnte. Die Folgen spielen keine Rolle — es zählt die <strong>Absicht</strong>.<br>'
            + '<strong>Kategorischer Imperativ:</strong> „Handle nur nach derjenigen Maxime, durch die du '
            + 'zugleich wollen kannst, dass sie ein allgemeines Gesetz werde."<br>'
            + '<strong>Selbstzweckformel:</strong> Behandle Menschen niemals nur als Mittel, sondern immer '
            + 'auch als Zweck.',
        },
        { type: 'text', html: 'Der Test ist einfach: <em>Was wäre, wenn das jeder täte?</em> Wer beim Lügen ertappt darüber nachdenkt: Könnte „Man darf lügen, wenn es nützt" ein allgemeines Gesetz sein? Nein — dann würde niemand mehr jemandem glauben, und das Lügen selbst wäre sinnlos. Die Regel widerspricht sich also selbst.' },
        {
          type: 'note',
          variant: 'info',
          title: 'Utilitarismus (Bentham, Mill)',
          html: 'Eine Handlung ist gut, wenn ihre <strong>Folgen</strong> das größte Glück für die größte Zahl bringen. '
            + 'Man rechnet Nutzen und Schaden für alle Betroffenen zusammen und wählt die Option mit der besten Bilanz.',
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Tugendethik (Aristoteles)',
          html: 'Nicht die einzelne Handlung, sondern der <strong>Charakter</strong> steht im Mittelpunkt: '
            + 'Was würde ein guter Mensch tun? Tugenden wie Mut, Gerechtigkeit, Besonnenheit und Ehrlichkeit '
            + 'werden durch <strong>Übung</strong> erworben und liegen jeweils in der Mitte zwischen zwei '
            + 'Extremen — Mut liegt zwischen Feigheit und Tollkühnheit.',
        },
        {
          type: 'table',
          caption: 'Die drei Ansätze im Vergleich',
          head: ['', 'Pflichtethik', 'Utilitarismus', 'Tugendethik'],
          rows: [
            ['Leitfrage', 'Was ist meine Pflicht?', 'Was bringt den größten Nutzen?', 'Was würde ein guter Mensch tun?'],
            ['Maßstab', 'Verallgemeinerbarkeit der Regel', 'Folgen für alle Betroffenen', 'Charakter und Tugenden'],
            ['Stärke', 'schützt die Menschenwürde unbedingt', 'nimmt echte Folgen ernst', 'sieht den ganzen Menschen'],
            ['Schwäche', 'starr in Notlagen', 'kann Minderheiten opfern', 'gibt keine klare Handlungsregel'],
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 2 — derselbe Fall, drei Urteile',
          task: 'Darf man lügen, um einen Freund vor einer Bestrafung zu schützen?',
          steps: [
            { text: 'Pflichtethik', detail: 'Nein. „Man darf lügen, wenn es einem passt" könnte kein allgemeines Gesetz sein. Man muss anders helfen.' },
            { text: 'Utilitarismus', detail: 'Vielleicht ja — wenn der Schaden durch die Lüge geringer ist als der abgewendete Schaden.' },
            { text: 'Tugendethik', detail: 'Kommt darauf an: Zeigt die Lüge Treue oder Feigheit? Ein aufrichtiger Mensch sucht einen ehrlichen Weg zu helfen.' },
          ],
          result: 'Die Ansätze führen zu unterschiedlichen Ergebnissen — deshalb muss man in einer Argumentation offenlegen, mit welchem man arbeitet.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Ethisch argumentieren',
      blocks: [
        {
          type: 'steps',
          items: [
            { text: 'Situation klären', detail: 'Was ist überhaupt der Fall? Welche Tatsachen sind gesichert, welche unklar?' },
            { text: 'Beteiligte und Betroffene benennen', detail: 'Wer ist betroffen — auch indirekt und in der Zukunft?' },
            { text: 'Kollidierende Werte herausarbeiten', detail: 'Welche Werte stehen gegeneinander?' },
            { text: 'Handlungsoptionen sammeln', detail: 'Mindestens drei — es gibt selten nur ja oder nein.' },
            { text: 'Optionen mit den Theorien prüfen', detail: 'Was sagen Pflichtethik, Utilitarismus und Tugendethik?' },
            { text: 'Entscheiden und begründen', detail: 'Position nennen, Gegenargument benennen und entkräften.' },
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Der Sein-Sollen-Fehlschluss',
          html: 'Aus einer <strong>Tatsache</strong> folgt nicht automatisch eine <strong>Norm</strong>. '
            + '„Das war immer so" oder „Alle machen das" begründet nicht, dass es richtig <em>ist</em>. '
            + 'Ebenso ist „das ist natürlich" kein ethisches Argument. '
            + 'Man braucht immer eine Wertaussage als Zwischenschritt.',
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Woran man eine gute ethische Argumentation erkennt',
          html: 'Sie nennt die betroffenen Werte, prüft mehrere Optionen, bezieht sich auf mindestens eine '
            + 'Theorie, nimmt das <strong>starke Gegenargument</strong> ernst und kommt zu einem klaren, '
            + 'begründeten Urteil. Was fehlt, ist meist das Gegenargument.',
        },
        { type: 'text', html: 'Zum <strong>Gewissen</strong>: Es meldet sich als Gefühl, ist aber nicht unfehlbar — es wird durch Erziehung und Umgebung geprägt. Deshalb spricht man von <strong>Gewissensbildung</strong>: Das Gewissen muss durch Wissen, Nachdenken und Gespräch geschult werden. Ein Gefühl allein ist keine Begründung.' },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Moral = geltende Vorstellungen; Ethik = begründete Reflexion darüber.',
    'Werte sind erstrebenswerte Ziele, Normen die daraus folgenden Regeln.',
    'Pflichtethik (Kant): Die Regel muss verallgemeinerbar sein; Folgen zählen nicht.',
    'Kategorischer Imperativ: Was wäre, wenn das jeder täte?',
    'Selbstzweckformel: Menschen nie nur als Mittel behandeln.',
    'Utilitarismus: größtes Glück für die größte Zahl — Folgen entscheiden.',
    'Tugendethik: Was würde ein guter Mensch tun? Tugend als Mitte zwischen Extremen.',
    'Sein-Sollen-Fehlschluss: Aus „ist so" folgt kein „soll so sein".',
  ],
  commonMistakes: [
    {
      mistake: 'Ethik und Moral werden gleichgesetzt.',
      why: 'Umgangssprachlich werden die Wörter synonym benutzt.',
      fix: 'Moral ist das, was gilt. Ethik ist die begründete Untersuchung, ob es zu Recht gilt.',
    },
    {
      mistake: '„Ich finde das einfach falsch" gilt als Begründung.',
      why: 'Ethische Fragen wecken starke Gefühle.',
      fix: 'Ein Gefühl ist ein Hinweis, keine Begründung. Es braucht Werte, Folgen oder Prinzipien als Argument.',
    },
    {
      mistake: '„Das ist natürlich" oder „das war immer so" wird als Argument benutzt.',
      why: 'Es klingt zwingend.',
      fix: 'Das ist der Sein-Sollen-Fehlschluss. Aus einer Tatsache folgt keine Norm.',
    },
    {
      mistake: 'Nur eine Position wird dargestellt.',
      why: 'Man will überzeugen.',
      fix: 'Eine ethische Argumentation nimmt das starke Gegenargument ernst und entkräftet es. Sonst bleibt sie einseitig.',
    },
  ],
  recap: 'Moral bezeichnet die tatsächlich geltenden Vorstellungen von Gut und Böse, Ethik die begründete Reflexion darüber. Werte sind erstrebenswerte Ziele, Normen die daraus abgeleiteten Regeln. Drei große Theorien geben unterschiedliche Antworten: Die Pflichtethik Kants fragt, ob die Regel hinter einer Handlung allgemein gelten könnte, und verbietet, Menschen nur als Mittel zu behandeln. Der Utilitarismus fragt nach den Folgen und will das größte Glück für die größte Zahl. Die Tugendethik fragt nach dem Charakter: Was würde ein guter Mensch tun? Eine gute ethische Argumentation klärt die Situation, benennt die kollidierenden Werte, prüft mehrere Optionen mit mindestens einer Theorie, nimmt das Gegenargument ernst und urteilt begründet.',
  simpler: 'Ethik ist das Nachdenken darüber, was richtig ist — und vor allem warum. Es gibt drei bekannte Wege, das zu beantworten. Der erste fragt: Könnte jeder so handeln? Wenn nicht, ist es falsch — egal was dabei herauskommt. Der zweite fragt: Was hat am Ende die besten Folgen für die meisten Menschen? Der dritte fragt: Was würde ein anständiger Mensch tun? Diese Wege führen manchmal zu verschiedenen Antworten. Wichtig ist deshalb: Sag nicht nur, was du denkst, sondern auch, warum — und nenne auch das beste Gegenargument.',
  deeper: 'Kant unterscheidet den hypothetischen Imperativ („Wenn du X willst, tue Y") vom kategorischen, der unbedingt gilt. Sein Ansatz gilt als deontologisch: Die Pflicht bemisst sich an der Handlung selbst, nicht an ihren Folgen. Der Utilitarismus ist dagegen konsequentialistisch. Beide haben bekannte Grenzen: Kants Verbot der Lüge führt in Notlagen zu kaum haltbaren Ergebnissen — schon Benjamin Constant konfrontierte ihn mit dem Fall des Mörders, der nach seinem Opfer fragt. Der Utilitarismus kann umgekehrt die Opferung Einzelner rechtfertigen, wenn die Bilanz stimmt; das deutsche Bundesverfassungsgericht erklärte 2006 genau deshalb das Luftsicherheitsgesetz für nichtig, das den Abschuss eines entführten Passagierflugzeugs erlaubt hätte: Die Menschenwürde verbietet es, Menschen zum Mittel zu machen. Neuere Ansätze wie die Diskursethik von Habermas verlagern die Begründung in das Verfahren: Gültig ist, was alle Betroffenen in einem freien Gespräch akzeptieren könnten.',
  glossary: [
    { term: 'Moral', definition: 'Die in einer Gruppe tatsächlich geltenden Vorstellungen von Gut und Böse.' },
    { term: 'Ethik', definition: 'Begründete Reflexion über Moral.' },
    { term: 'Norm', definition: 'Konkrete Handlungsregel, die aus Werten folgt.' },
    { term: 'Dilemma', definition: 'Situation, in der jede Option eine Norm verletzt.' },
    { term: 'Kategorischer Imperativ', definition: 'Kants Prüfregel: Kann die Maxime meiner Handlung allgemeines Gesetz werden?' },
    { term: 'Utilitarismus', definition: 'Ethik, die Handlungen nach ihrem Nutzen für alle Betroffenen beurteilt.' },
    { term: 'Tugend', definition: 'Erworbene Charakterhaltung, die in der Mitte zwischen zwei Extremen liegt.' },
    { term: 'Sein-Sollen-Fehlschluss', definition: 'Fehler, aus einer Tatsache unmittelbar eine Norm abzuleiten.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'grundbegriffe',
      prompt: 'Was unterscheidet Ethik von Moral?',
      options: [
        { id: 'a', text: 'Ethik gilt für Gläubige, Moral für alle' },
        { id: 'b', text: 'Moral sind die tatsächlich geltenden Vorstellungen, Ethik ist die begründete Reflexion darüber' },
        { id: 'c', text: 'Ethik ist strenger als Moral' },
        { id: 'd', text: 'Es gibt keinen Unterschied' },
      ],
      answer: 'b',
      explanation: 'Moral ist der Gegenstand, Ethik die wissenschaftliche Untersuchung: Sie fragt, ob und warum etwas zu Recht als richtig gilt.',
    },
    {
      id: 'q2', type: 'match', difficulty: 2, competency: 'grundbegriffe',
      prompt: 'Ordne jedem Begriff das passende Beispiel zu.',
      pairs: [
        { left: 'Wert', right: 'Gerechtigkeit' },
        { left: 'Norm', right: 'Du sollst nicht stehlen' },
        { left: 'Dilemma', right: 'Jede Option verletzt eine Regel' },
        { left: 'Gewissen', right: 'Die innere Instanz, die das eigene Handeln beurteilt' },
      ],
      explanation: 'Werte sind allgemeine Ziele, Normen konkrete Regeln. Ein Dilemma entsteht, wenn Normen kollidieren.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'pflichtethik',
      prompt: 'Was prüft der kategorische Imperativ?',
      options: [
        { id: 'a', text: 'Ob die Handlung nützliche Folgen hat' },
        { id: 'b', text: 'Ob die Regel hinter meiner Handlung ein allgemeines Gesetz sein könnte' },
        { id: 'c', text: 'Ob ein guter Mensch so handeln würde' },
        { id: 'd', text: 'Ob die Handlung erlaubt ist' },
      ],
      answer: 'b',
      explanation: 'Kant fragt nach der Verallgemeinerbarkeit der Maxime — nicht nach den Folgen. Die Nutzenfrage gehört zum Utilitarismus, die Charakterfrage zur Tugendethik.',
    },
    {
      id: 'q4', type: 'match', difficulty: 2, competency: 'utilitarismus',
      prompt: 'Ordne jeder Theorie ihre Leitfrage zu.',
      pairs: [
        { left: 'Pflichtethik', right: 'Was ist meine Pflicht?' },
        { left: 'Utilitarismus', right: 'Was bringt den größten Nutzen für die meisten?' },
        { left: 'Tugendethik', right: 'Was würde ein guter Mensch tun?' },
      ],
      explanation: 'Pflicht, Folgen und Charakter sind die drei unterschiedlichen Maßstäbe.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 3, competency: 'argumentieren',
      prompt: 'Welche Aussage ist ein Sein-Sollen-Fehlschluss?',
      options: [
        { id: 'a', text: 'Lügen ist falsch, weil es das Vertrauen zerstört, das Zusammenleben möglich macht.' },
        { id: 'b', text: 'Konkurrenz ist in der Natur überall zu finden, also ist Rücksichtslosigkeit gerechtfertigt.' },
        { id: 'c', text: 'Man sollte helfen, weil man sich selbst Hilfe wünschen würde.' },
        { id: 'd', text: 'Diese Handlung ist falsch, weil sie einen Menschen nur als Mittel behandelt.' },
      ],
      answer: 'b',
      explanation: 'Aus der Tatsache, dass etwas in der Natur vorkommt, folgt keine Norm. Die anderen Aussagen enthalten jeweils eine Wertaussage als Begründung.',
    },
    {
      id: 'q6', type: 'multi', difficulty: 2, competency: 'argumentieren',
      prompt: 'Was gehört zu einer guten ethischen Argumentation?',
      options: [
        { id: 'a', text: 'Die kollidierenden Werte werden benannt' },
        { id: 'b', text: 'Mehrere Handlungsoptionen werden geprüft' },
        { id: 'c', text: 'Das starke Gegenargument wird ernst genommen' },
        { id: 'd', text: 'Das eigene Gefühl ersetzt die Begründung' },
        { id: 'e', text: 'Es wird auf mindestens eine ethische Theorie Bezug genommen' },
      ],
      answer: ['a', 'b', 'c', 'e'],
      explanation: 'Ein Gefühl kann ein Hinweis sein, ist aber keine Begründung. Alles Übrige gehört dazu.',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 2, competency: 'pflichtethik',
      prompt: 'Nach Kant hängt die moralische Bewertung einer Handlung von ihren Folgen ab.',
      answer: false,
      explanation: 'Falsch. Kant beurteilt die Absicht und die Verallgemeinerbarkeit der Maxime. Die Bewertung nach Folgen ist der Ansatz des Utilitarismus.',
    },
    {
      id: 'q8', type: 'free', difficulty: 3, competency: 'utilitarismus',
      prompt: 'Nenne eine Stärke und eine Schwäche des Utilitarismus und begründe beide.',
      keywords: [
        { label: 'Stärke: Folgen werden ernst genommen', any: ['folgen', 'realistisch', 'praktisch', 'nutzen', 'abwaegen'] },
        { label: 'Schwäche: Minderheiten können geopfert werden', any: ['minderheit', 'einzelne', 'geopfert', 'wuerde', 'mittel'] },
        { label: 'Begründung / Beispiel', any: ['beispiel', 'weil', 'etwa', 'zum beispiel'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Eine Stärke des Utilitarismus ist, dass er die tatsächlichen Folgen einer Handlung ernst nimmt. Gerade in politischen Entscheidungen, in denen begrenzte Mittel verteilt werden müssen, ist es sinnvoll zu fragen, welche Option den größten Nutzen für die meisten Menschen bringt. Eine Schwäche ist, dass die Rechte einzelner Menschen oder kleiner Gruppen geopfert werden können, wenn die Gesamtbilanz dadurch besser aussieht. Wenn etwa das Leiden weniger dem Wohl vieler dient, wäre das nach reiner Nutzenrechnung zu rechtfertigen — genau das widerspricht aber der Menschenwürde, die nach Kant unbedingt gilt und Menschen nie zum bloßen Mittel machen darf.',
      explanation: 'Stärke: Folgenorientierung und praktische Abwägbarkeit. Schwäche: Die Nutzenbilanz kann die Rechte Einzelner übergehen.',
    },
    {
      id: 'q9', type: 'analysis', difficulty: 3, competency: 'argumentieren',
      prompt: 'Analysiere den Fall: Benenne die kollidierenden Werte, prüfe zwei ethische Ansätze und komm zu einem begründeten Urteil.',
      context: 'Mia bemerkt, dass ihr Mitschüler Jonas in der Klassenarbeit abgeschrieben hat. Die Lehrerin fragt '
        + 'die Klasse, ob jemand etwas beobachtet hat. Mia weiß: Sagt sie nichts, wird Jonas mit einer guten Note '
        + 'davonkommen, während andere ehrlich gearbeitet haben. Sagt sie etwas, gilt sie als Verräterin und Jonas, '
        + 'der ohnehin schlechte Noten hat, bekommt eine Sechs und muss möglicherweise wiederholen.',
      keywords: [
        { label: 'kollidierende Werte benannt', any: ['gerechtigkeit', 'loyalitaet', 'ehrlichkeit', 'solidaritaet', 'werte'] },
        { label: 'Pflichtethik angewandt', any: ['kant', 'pflichtethik', 'verallgemeiner', 'kategorisch', 'jeder'] },
        { label: 'Utilitarismus angewandt', any: ['utilitar', 'folgen', 'nutzen', 'bilanz'] },
        { label: 'mehrere Handlungsoptionen', any: ['optionen', 'moeglichkeit', 'zuerst mit jonas', 'gespraech', 'alternativ'] },
        { label: 'begründetes Urteil', any: ['ich wuerde', 'meiner', 'urteil', 'entscheidung', 'ueberzeugt'] },
      ],
      minKeywords: 4,
      modelAnswer: 'In dem Fall kollidieren mehrere Werte: Gerechtigkeit gegenüber den Mitschülern, die ehrlich gearbeitet haben, und Ehrlichkeit gegenüber der Lehrerin auf der einen Seite; Loyalität gegenüber Jonas und Rücksicht auf seine schwierige Lage auf der anderen. Nach der Pflichtethik wäre zu fragen, ob „Ich verschweige Regelverstöße, wenn der Betroffene sonst Nachteile hat" ein allgemeines Gesetz sein könnte. Das ist kaum möglich, denn dann verlören Prüfungen jeden Sinn und die ehrlichen Schüler würden systematisch benachteiligt. Der Utilitarismus fragt nach den Folgen: Schweigen nützt Jonas kurzfristig, schadet aber allen anderen und untergräbt langfristig das Vertrauen in Noten; ein Verrat vor der ganzen Klasse würde Jonas dagegen erheblich schaden und Mia isolieren. Wichtig ist, dass es nicht nur zwei Optionen gibt: Mia könnte zuerst mit Jonas selbst sprechen und ihn auffordern, sich zu melden, oder sich vertraulich an die Lehrerin oder eine Vertrauensperson wenden, statt öffentlich zu antworten. Ich halte diesen Weg für den überzeugendsten: Er nimmt die Gerechtigkeit gegenüber den Mitschülern ernst, wahrt aber Jonas Würde und gibt ihm die Möglichkeit, selbst Verantwortung zu übernehmen. Das Gegenargument, damit werde Loyalität verraten, überzeugt mich nicht, weil Loyalität nicht bedeutet, jemanden in einem Fehlverhalten zu bestätigen.',
      explanation: 'Erwartet werden die kollidierenden Werte, die Anwendung von mindestens zwei Ansätzen, mehr als zwei Handlungsoptionen und ein begründetes Urteil mit Blick auf das Gegenargument.',
    },
    {
      id: 'q10', type: 'term', difficulty: 2, competency: 'tugendethik',
      prompt: 'Erkläre, was die Tugendethik unter einer Tugend versteht.',
      keywords: [
        { label: 'Charakterhaltung', any: ['charakter', 'haltung', 'eigenschaft', 'person'] },
        { label: 'durch Übung erworben', any: ['uebung', 'gewohnheit', 'lernen', 'erwerben', 'einueben'] },
        { label: 'Mitte zwischen Extremen', any: ['mitte', 'zwischen', 'extrem', 'mass'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Eine Tugend ist in der Tugendethik keine einzelne gute Handlung, sondern eine dauerhafte Haltung des Charakters. Sie wird nicht einfach gewusst, sondern durch Übung und Gewohnheit erworben — man wird mutig, indem man immer wieder mutig handelt. Nach Aristoteles liegt jede Tugend dabei in der Mitte zwischen zwei Extremen: Mut liegt zwischen Feigheit und Tollkühnheit, Großzügigkeit zwischen Geiz und Verschwendung. Die Leitfrage der Tugendethik lautet deshalb nicht „Welche Regel gilt?", sondern „Was würde ein Mensch mit gutem Charakter in dieser Situation tun?"',
      explanation: 'Tugend = eingeübte Charakterhaltung, die als Mitte zwischen zwei Extremen liegt.',
    },
  ],
};
