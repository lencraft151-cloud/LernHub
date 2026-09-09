export default {
  id: 'ge9-weimarer-republik',
  title: 'Weimarer Republik',
  summary: 'Deutschlands erste Demokratie entstand 1919 unter schwierigsten Bedingungen — und scheiterte 1933 an Krisen, Verfassungsschwächen und dem fehlenden Rückhalt in der Bevölkerung.',
  estimatedMinutes: 34,
  aliases: ['Weimar', 'Hyperinflation', 'Artikel 48', 'Goldene Zwanziger', 'Weltwirtschaftskrise', 'Versailles', 'Dolchstoßlegende'],
  competencies: [
    { id: 'gruendung', title: 'Gründung und Verfassung', description: 'Entstehung der Republik und Aufbau der Verfassung erklären.' },
    { id: 'belastungen', title: 'Belastungen von Anfang an', description: 'Versailler Vertrag, Dolchstoßlegende und Putschversuche einordnen.' },
    { id: 'krise1923', title: 'Krisenjahr 1923', description: 'Ruhrbesetzung und Hyperinflation erklären.' },
    { id: 'zwanziger', title: 'Goldene Zwanziger', description: 'Stabilisierungsphase und ihre Grenzen beschreiben.' },
    { id: 'scheitern', title: 'Scheitern der Republik', description: 'Ursachen des Endes 1933 gewichten.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Gründung und Verfassung',
      blocks: [
        { type: 'text', html: 'Im November 1918 brach das Kaiserreich zusammen. Nach der Novemberrevolution wurde die Republik ausgerufen, und im Januar 1919 wählten die Deutschen eine Nationalversammlung — erstmals durften auch <strong>Frauen wählen</strong>. Sie tagte in Weimar, weil in Berlin Unruhen herrschten. Daher der Name.' },
        {
          type: 'table',
          caption: 'Die Weimarer Verfassung von 1919 — Stärken und Schwächen',
          head: ['Element', 'Regelung', 'Bewertung'],
          rows: [
            ['Wahlrecht', 'allgemein, gleich, geheim, ab 20 Jahren, Männer und Frauen', 'sehr fortschrittlich'],
            ['Grundrechte', 'ausführlicher Grundrechtskatalog', 'fortschrittlich'],
            ['Wahlsystem', 'reines Verhältniswahlrecht ohne Sperrklausel', 'viele Kleinparteien, instabile Mehrheiten'],
            ['Reichspräsident', 'direkt gewählt, Oberbefehl, Notverordnungsrecht (Artikel 48)', 'zu mächtig — „Ersatzkaiser"'],
            ['Reichskanzler', 'vom Präsidenten ernannt, Reichstag konnte ihn stürzen', 'schwache Stellung'],
            ['Volksentscheide', 'plebiszitäre Elemente', 'anfällig für Kampagnen'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Artikel 48 — die entscheidende Schwachstelle',
          html: 'Der Reichspräsident durfte bei „erheblicher Störung der öffentlichen Sicherheit" '
            + '<strong>Notverordnungen ohne den Reichstag</strong> erlassen und Grundrechte aussetzen. '
            + 'Ab 1930 wurde damit dauerhaft regiert — das Parlament verlor seine Bedeutung, '
            + 'lange bevor die Demokratie offiziell endete.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Belastet von Anfang an — und das Krisenjahr 1923',
      blocks: [
        { type: 'text', html: 'Die junge Republik trug eine schwere Last: Die demokratischen Parteien mussten den <strong>Versailler Vertrag</strong> unterschreiben, den kaum jemand akzeptierte.' },
        {
          type: 'list',
          items: [
            '<strong>Gebietsverluste:</strong> etwa 13 % des Staatsgebiets, alle Kolonien',
            '<strong>Militär:</strong> Beschränkung auf 100 000 Mann, keine Luftwaffe, keine Panzer',
            '<strong>Reparationen:</strong> 1921 auf 132 Milliarden Goldmark festgesetzt',
            '<strong>Kriegsschuldartikel 231:</strong> Deutschland allein verantwortlich — innenpolitisch besonders umstritten',
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Dolchstoßlegende',
          html: 'Militärführung und rechte Kreise verbreiteten die Lüge, das „im Felde unbesiegte" Heer '
            + 'sei von Demokraten, Sozialisten und Juden in der Heimat „von hinten erdolcht" worden. '
            + 'Die Republikgründer wurden so zu „Novemberverbrechern" — eine Propaganda, '
            + 'die die Demokratie dauerhaft delegitimierte.',
        },
        { type: 'text', html: 'Von links und rechts kamen <strong>Umsturzversuche</strong>: Kapp-Putsch 1920 (rechts, scheiterte am Generalstreik), Hitlerputsch 1923 in München (rechts, scheiterte), kommunistische Aufstände (links). Politische Morde trafen unter anderem Außenminister Walther Rathenau.' },
        {
          type: 'example',
          title: 'Das Krisenjahr 1923 — Kettenreaktion',
          task: 'Wie kam es zur Hyperinflation?',
          steps: [
            { text: 'Deutschland kann Reparationen nicht mehr zahlen.', detail: 'Januar 1923' },
            { text: 'Frankreich und Belgien besetzen das Ruhrgebiet, um Sachleistungen zu erzwingen.' },
            { text: 'Die Regierung ruft zum „passiven Widerstand" auf — die Arbeit wird eingestellt.' },
            { text: 'Der Staat bezahlt die streikenden Arbeiter, hat aber keine Einnahmen — und druckt Geld.' },
            { text: 'Die Geldmenge explodiert, das Geld verliert jeden Wert.', detail: 'Im November 1923 kostet ein Brot Milliarden Mark.' },
            { text: 'Währungsreform: die Rentenmark beendet die Inflation.', detail: 'November 1923, unter Reichskanzler Stresemann' },
          ],
          result: 'Sparer und der Mittelstand verloren ihre Ersparnisse. Das Vertrauen in den Staat war dauerhaft beschädigt — eine wichtige Vorgeschichte für 1933.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Goldene Zwanziger und das Ende',
      blocks: [
        { type: 'text', html: 'Zwischen 1924 und 1929 stabilisierte sich die Republik: Der <strong>Dawes-Plan</strong> streckte die Reparationen, amerikanische Kredite belebten die Wirtschaft, der <strong>Vertrag von Locarno</strong> und der Eintritt in den Völkerbund verbesserten die Außenpolitik. Kultur, Kino, Architektur (Bauhaus) und Wissenschaft blühten auf.' },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Der Schein der „Goldenen Zwanziger"',
          html: 'Der Aufschwung war <strong>auf Pump gebaut</strong>: Er beruhte auf kurzfristigen US-Krediten. '
            + 'Die Arbeitslosigkeit blieb hoch, die Landwirtschaft steckte weiter in der Krise, '
            + 'und die Demokratiefeinde blieben stark. „Golden" war das Jahrzehnt vor allem kulturell.',
        },
        { type: 'text', html: 'Der <strong>Börsenkrach vom Oktober 1929</strong> beendete alles. Die USA zogen ihre Kredite zurück, die deutsche Wirtschaft brach ein.' },
        {
          type: 'table',
          caption: 'Weltwirtschaftskrise und politische Folgen',
          head: ['Jahr', 'Arbeitslose', 'NSDAP-Stimmenanteil (Reichstagswahl)'],
          rows: [
            ['1928', 'ca. 1,4 Mio.', '2,6 %'],
            ['1930', 'ca. 3,0 Mio.', '18,3 %'],
            ['Juli 1932', 'ca. 5,6 Mio.', '37,3 %'],
            ['Nov. 1932', 'ca. 5,8 Mio.', '33,1 %'],
            ['März 1933', 'ca. 6,0 Mio.', '43,9 % (unter Terrorbedingungen)'],
          ],
        },
        { type: 'text', html: 'Ab 1930 regierten Präsidialkabinette (Brüning, Papen, Schleicher) mit Notverordnungen. Der Reichstag war handlungsunfähig, weil sich NSDAP und KPD zu einer „negativen Mehrheit" ergänzten, die jede Regierung blockieren konnte. Am <strong>30. Januar 1933</strong> ernannte Reichspräsident Hindenburg Hitler zum Reichskanzler — im Glauben, ihn einbinden zu können.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Ursachen des Scheiterns — mehrere Ebenen',
          html: '<strong>Strukturell:</strong> Artikel 48, Verhältniswahlrecht ohne Sperrklausel, mächtiger Präsident.<br>'
            + '<strong>Ökonomisch:</strong> Hyperinflation 1923 und Weltwirtschaftskrise ab 1929.<br>'
            + '<strong>Politisch:</strong> Verfassungsfeinde in Justiz, Verwaltung und Militär; zerstrittene Demokraten.<br>'
            + '<strong>Mental:</strong> Fehlende Verankerung der Demokratie, Dolchstoßlegende, Sehnsucht nach dem „starken Mann".<br>'
            + '<strong>Personell:</strong> Fehlentscheidungen der konservativen Eliten um Hindenburg.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    '1919: Nationalversammlung in Weimar, erstmals Frauenwahlrecht.',
    'Fortschrittliche Verfassung, aber Artikel 48 gab dem Präsidenten Notverordnungsrecht.',
    'Verhältniswahlrecht ohne Sperrklausel → viele Parteien, instabile Regierungen.',
    'Versailler Vertrag und Dolchstoßlegende belasteten die Republik von Anfang an.',
    '1923: Ruhrbesetzung, Hyperinflation, Hitlerputsch — Rettung durch die Währungsreform.',
    '1924–1929: Stabilisierung, aber auf US-Kredite gebaut.',
    '1929: Weltwirtschaftskrise → Massenarbeitslosigkeit → Aufstieg der NSDAP.',
    'Ab 1930 Regieren mit Notverordnungen; 30. Januar 1933 Hitler zum Reichskanzler ernannt.',
  ],
  commonMistakes: [
    {
      mistake: '„Hitler wurde 1933 zum Kanzler gewählt."',
      why: 'Die hohen Wahlergebnisse der NSDAP legen das nahe.',
      fix: 'Der Reichskanzler wurde nicht gewählt, sondern vom Reichspräsidenten ernannt. Hindenburg ernannte Hitler am 30. Januar 1933.',
    },
    {
      mistake: 'Die Weimarer Verfassung wird als rückständig beschrieben.',
      why: 'Man schließt vom Scheitern auf die Qualität.',
      fix: 'Sie war für ihre Zeit sehr fortschrittlich (Frauenwahlrecht, Grundrechte). Problematisch waren einzelne Konstruktionsfehler wie Artikel 48.',
    },
    {
      mistake: 'Die Hyperinflation wird als Ursache von 1933 bezeichnet.',
      why: 'Beide Ereignisse gelten als „die Krise".',
      fix: 'Die Hyperinflation war 1923 und wurde beendet. Der unmittelbare Auslöser 1929/33 war die Weltwirtschaftskrise. 1923 wirkte als Vertrauensverlust nach.',
    },
    {
      mistake: 'Nur eine Ursache für das Scheitern wird genannt.',
      why: 'Einfache Erklärungen sind leichter zu merken.',
      fix: 'In der Bewertung wird ein Zusammenspiel erwartet: strukturelle, wirtschaftliche, politische, mentale und personelle Faktoren.',
    },
  ],
  recap: 'Die Weimarer Republik war Deutschlands erste Demokratie. Ihre Verfassung von 1919 war fortschrittlich — Frauenwahlrecht, Grundrechte —, hatte aber Konstruktionsfehler: ein Verhältniswahlrecht ohne Sperrklausel und den Artikel 48, der dem Reichspräsidenten das Regieren per Notverordnung erlaubte. Belastet durch den Versailler Vertrag und die Dolchstoßlegende überstand die Republik das Krisenjahr 1923 mit Ruhrbesetzung und Hyperinflation und stabilisierte sich von 1924 bis 1929 — allerdings auf der Basis kurzfristiger US-Kredite. Die Weltwirtschaftskrise ab 1929 führte zu Massenarbeitslosigkeit, dem Aufstieg der NSDAP und dem Regieren mit Notverordnungen. Am 30. Januar 1933 ernannte Hindenburg Hitler zum Reichskanzler.',
  simpler: 'Nach dem Ersten Weltkrieg bekam Deutschland zum ersten Mal eine Demokratie. Sie hatte gute Ideen: Frauen durften wählen, es gab Grundrechte. Aber sie hatte auch zwei große Baufehler: Es kamen sehr viele kleine Parteien ins Parlament, sodass Regierungen kaum eine Mehrheit hatten. Und der Präsident durfte im Notfall alleine Gesetze erlassen. Dazu kamen zwei schwere Wirtschaftskrisen: 1923 wurde das Geld wertlos, und ab 1929 verloren Millionen ihre Arbeit. Viele Menschen verloren das Vertrauen in die Demokratie und wählten Parteien, die sie abschaffen wollten. 1933 machte der Präsident Hitler zum Kanzler.',
  deeper: 'Die Forschung diskutiert bis heute, wie zwangsläufig das Scheitern war. Die ältere „Strukturthese" betont die Verfassungsfehler und die Erblast des Kaiserreichs (unveränderte Eliten in Justiz, Verwaltung, Militär). Die „Handlungsthese" hebt hervor, dass 1932/33 mehrere Alternativen bestanden — Hindenburg hätte Hitler nicht ernennen müssen; ein Verbot der SA oder eine Tolerierungsregierung waren im Gespräch. Umstritten ist auch Brünings Deflationspolitik: Sie sollte die Reparationen als unerfüllbar erweisen, verschärfte aber die Krise. Ein Vergleich mit dem Grundgesetz von 1949 zeigt, welche Lehren gezogen wurden: Fünf-Prozent-Hürde, konstruktives Misstrauensvotum, schwacher Bundespräsident, Ewigkeitsklausel und Verfassungsgerichtsbarkeit.',
  glossary: [
    { term: 'Artikel 48', definition: 'Verfassungsartikel, der dem Reichspräsidenten Notverordnungen ohne Reichstag erlaubte.' },
    { term: 'Dolchstoßlegende', definition: 'Propagandalüge, das deutsche Heer sei 1918 durch die Heimat verraten worden.' },
    { term: 'Hyperinflation', definition: 'Extremer Geldwertverfall, in Deutschland 1923.' },
    { term: 'Dawes-Plan', definition: 'Abkommen von 1924, das die Reparationszahlungen neu regelte.' },
    { term: 'Präsidialkabinett', definition: 'Regierung, die nicht auf einer Reichstagsmehrheit, sondern auf dem Vertrauen des Präsidenten beruhte.' },
    { term: 'negative Mehrheit', definition: 'Mehrheit aus Parteien, die zwar jede Regierung stürzen, sich aber auf keine eigene einigen konnten.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'gruendung',
      prompt: 'Warum tagte die Nationalversammlung 1919 in Weimar und nicht in Berlin?',
      options: [
        { id: 'a', text: 'Weimar lag geografisch günstiger' },
        { id: 'b', text: 'In Berlin herrschten Unruhen und Kämpfe' },
        { id: 'c', text: 'Berlin war im Krieg zerstört worden' },
        { id: 'd', text: 'Der Kaiser residierte noch in Berlin' },
      ],
      answer: 'b',
      explanation: 'Nach der Novemberrevolution kam es in Berlin zu bewaffneten Auseinandersetzungen. Weimar galt als sicherer und stand zugleich für die kulturelle Tradition Goethes und Schillers.',
    },
    {
      id: 'q2', type: 'multi', difficulty: 2, competency: 'gruendung',
      prompt: 'Welche Elemente der Weimarer Verfassung gelten als fortschrittlich?',
      options: [
        { id: 'a', text: 'Wahlrecht für Frauen' },
        { id: 'b', text: 'Ausführlicher Grundrechtskatalog' },
        { id: 'c', text: 'Notverordnungsrecht des Reichspräsidenten' },
        { id: 'd', text: 'Allgemeines, gleiches und geheimes Wahlrecht' },
        { id: 'e', text: 'Verhältniswahlrecht ohne Sperrklausel' },
      ],
      answer: ['a', 'b', 'd'],
      explanation: 'Frauenwahlrecht, Grundrechte und das moderne Wahlrecht waren fortschrittlich. Artikel 48 und das fehlende Sperrklausel gelten dagegen als Konstruktionsfehler.',
    },
    {
      id: 'q3', type: 'order', difficulty: 3, competency: 'krise1923',
      prompt: 'Bringe die Kettenreaktion des Krisenjahres 1923 in die richtige Reihenfolge.',
      items: [
        'Deutschland kann die Reparationen nicht mehr zahlen',
        'Französische und belgische Truppen besetzen das Ruhrgebiet',
        'Die Regierung ruft zum passiven Widerstand auf',
        'Der Staat bezahlt die streikenden Arbeiter mit neu gedrucktem Geld',
        'Die Hyperinflation macht das Geld wertlos',
        'Die Währungsreform mit der Rentenmark beendet die Inflation',
      ],
      explanation: 'Zahlungsausfall → Ruhrbesetzung → passiver Widerstand → Notenpresse → Hyperinflation → Währungsreform im November 1923.',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'belastungen',
      prompt: 'Vervollständige die Aussagen zum Versailler Vertrag.',
      segments: [
        'Der Kriegsschuldartikel trägt die Nummer ',
        { blank: 'artikel', accept: ['231'] },
        '. Die Reichswehr durfte nur noch ',
        { blank: 'soldaten', accept: ['100000', '100.000', '100 000'] },
        ' Soldaten umfassen. Die Propagandalüge, das Heer sei aus der Heimat verraten worden, heißt ',
        { blank: 'legende', accept: ['Dolchstoßlegende', 'Dolchstosslegende', 'Dolchstoßlüge'] },
        '.',
      ],
      explanation: 'Artikel 231 wies Deutschland die Alleinschuld zu, das Militär wurde auf 100 000 Mann begrenzt. Die Dolchstoßlegende diente der Delegitimierung der Republik.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 2, competency: 'zwanziger',
      prompt: 'Warum bezeichnet man den Aufschwung der „Goldenen Zwanziger" als brüchig?',
      options: [
        { id: 'a', text: 'Weil die Kultur stagnierte' },
        { id: 'b', text: 'Weil er auf kurzfristigen US-Krediten beruhte' },
        { id: 'c', text: 'Weil die Reparationen abgeschafft wurden' },
        { id: 'd', text: 'Weil es keine Regierungen mehr gab' },
      ],
      answer: 'b',
      explanation: 'Der Dawes-Plan brachte amerikanische Kredite. Als die USA sie nach dem Börsenkrach 1929 zurückzogen, brach die deutsche Wirtschaft ein.',
    },
    {
      id: 'q6', type: 'truefalse', difficulty: 2, competency: 'scheitern',
      prompt: 'Hitler wurde 1933 durch eine Reichstagswahl zum Reichskanzler gewählt.',
      answer: false,
      explanation: 'Falsch. Der Reichskanzler wurde vom Reichspräsidenten ernannt. Hindenburg ernannte Hitler am 30. Januar 1933 — die NSDAP hatte bei der letzten freien Wahl im November 1932 sogar Stimmen verloren.',
    },
    {
      id: 'q7', type: 'match', difficulty: 2, competency: 'scheitern',
      prompt: 'Ordne jeder Ursachenebene das passende Beispiel zu.',
      pairs: [
        { left: 'strukturelle Ursache', right: 'Artikel 48 und fehlende Sperrklausel' },
        { left: 'wirtschaftliche Ursache', right: 'Weltwirtschaftskrise ab 1929' },
        { left: 'mentale Ursache', right: 'Dolchstoßlegende und Sehnsucht nach dem starken Mann' },
        { left: 'personelle Ursache', right: 'Hindenburgs Entscheidung, Hitler zu ernennen' },
      ],
      explanation: 'Das Scheitern hatte mehrere Ebenen: Verfassungsfehler, Wirtschaftskrisen, fehlende demokratische Überzeugung und konkrete Fehlentscheidungen der Eliten.',
    },
    {
      id: 'q8', type: 'analysis', difficulty: 3, competency: 'krise1923',
      prompt: 'Untersuche die Statistik: Welchen Zusammenhang zeigt sie, und wie ist er zu erklären?',
      context: 'Reichstagswahlen und Arbeitslosigkeit\n'
        + '1928: 1,4 Mio. Arbeitslose — NSDAP 2,6 %\n'
        + '1930: 3,0 Mio. Arbeitslose — NSDAP 18,3 %\n'
        + 'Juli 1932: 5,6 Mio. Arbeitslose — NSDAP 37,3 %',
      keywords: [
        { label: 'Zusammenhang Arbeitslosigkeit und NSDAP-Stimmen', any: ['zusammenhang', 'steigt', 'parallel', 'je mehr', 'korrel'] },
        { label: 'Weltwirtschaftskrise als Auslöser', any: ['weltwirtschaftskrise', '1929', 'boersenkrach', 'krise'] },
        { label: 'Vertrauensverlust in die Demokratie', any: ['vertrauen', 'demokratie', 'unzufrieden', 'protest', 'verzweifl'] },
        { label: 'einfache Versprechen der NSDAP', any: ['versprechen', 'propaganda', 'arbeit', 'schuldige', 'suendenbock'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Die Statistik zeigt einen deutlichen Zusammenhang: Je stärker die Arbeitslosigkeit stieg, desto höher wurde der Stimmenanteil der NSDAP. Zwischen 1928 und Juli 1932 vervierfachte sich die Zahl der Arbeitslosen, und die NSDAP steigerte ihren Anteil von 2,6 auf 37,3 Prozent. Ursache der Massenarbeitslosigkeit war die Weltwirtschaftskrise ab 1929, in deren Folge die USA ihre Kredite zurückzogen. Viele Menschen verloren nicht nur ihre Arbeit, sondern auch das Vertrauen in die Handlungsfähigkeit der demokratischen Parteien, die mit Notverordnungen und Sparpolitik reagierten. Die NSDAP nutzte diese Verzweiflung mit einfachen Versprechen — Arbeit und Brot — und mit der Benennung angeblicher Schuldiger. Ein Zusammenhang ist allerdings kein Beweis für eine einfache Ursache: Auch Verfassungsschwächen und Fehlentscheidungen der Eliten spielten eine Rolle.',
      explanation: 'Die Zahlen belegen die Parallelität von Krise und Radikalisierung. Wichtig ist, sie zu erklären (Weltwirtschaftskrise, Vertrauensverlust, NS-Propaganda) und nicht mit einer monokausalen Deutung zu schließen.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'gruendung',
      prompt: 'Nenne zwei Lehren, die das Grundgesetz von 1949 aus dem Scheitern der Weimarer Republik gezogen hat, und erkläre sie.',
      keywords: [
        { label: 'Fünf-Prozent-Hürde', any: ['fuenf prozent', '5 prozent', 'sperrklausel', 'huerde'] },
        { label: 'konstruktives Misstrauensvotum', any: ['misstrauensvotum', 'konstruktiv'] },
        { label: 'schwächere Stellung des Staatsoberhaupts', any: ['bundespraesident', 'praesident', 'repraesentativ', 'notverordnung'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Erstens gibt es die Fünf-Prozent-Hürde: Parteien unter fünf Prozent kommen nicht in den Bundestag. Damit soll die Zersplitterung des Parlaments verhindert werden, die in Weimar stabile Regierungsmehrheiten unmöglich machte. Zweitens gilt das konstruktive Misstrauensvotum: Der Bundestag kann den Kanzler nur stürzen, wenn er gleichzeitig einen Nachfolger wählt. In Weimar konnten NSDAP und KPD jede Regierung stürzen, ohne selbst eine bilden zu müssen. Außerdem ist der Bundespräsident heute überwiegend repräsentativ und hat kein Notverordnungsrecht wie einst Artikel 48.',
      explanation: 'Fünf-Prozent-Hürde gegen Zersplitterung, konstruktives Misstrauensvotum gegen destruktive Mehrheiten, schwaches Staatsoberhaupt gegen Artikel-48-Missbrauch.',
    },
  ],
};
