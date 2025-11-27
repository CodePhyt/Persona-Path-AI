const { GoogleGenerativeAI } = require('@google/generative-ai');

const initializeAiClients = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not defined in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

// Personality-specific image themes for unique visual experiences
const getPersonalityImageTheme = (mbtiType) => {
  const themes = {
    'INTJ': 'strategic architectural blueprint dark elegant professional modern minimalist',
    'ENFJ': 'warm inspiring leadership collaborative vibrant energetic social',
    'INTP': 'analytical scientific innovative intellectual clean modern thought',
    'ENFP': 'colorful creative artistic warm vibrant imaginative dynamic',
    'ISTJ': 'organized structured professional clean systematic orderly',
    'ESFJ': 'warm friendly community social caring supportive welcoming',
    'ISTP': 'practical mechanical hands-on technical realistic rugged',
    'ESFP': 'dynamic spontaneous entertaining vibrant lively energetic social',
    'INFJ': 'deep insightful mystical calm thoughtful visionary serene',
    'ENTJ': 'powerful commanding strategic bold professional executive leadership',
    'INFP': 'dreamy artistic creative gentle idealistic peaceful artistic',
    'ENTP': 'innovative dynamic experimental clever strategic creative bold',
    'ISFJ': 'caring traditional warm supportive reliable comforting protective',
    'ESTJ': 'organized authoritative structured professional systematic executive',
    'ISFP': 'artistic gentle creative harmonious natural peaceful expressive',
    'ESTP': 'bold adventurous energetic dynamic action-oriented exciting thrilling'
  };
  return themes[mbtiType] || themes['ENTJ'];
};

const getPersonalityGroup = (mbti) => {
  const groups = {
    'INTJ': 'Analysts', 'INTP': 'Analysts', 'ENTJ': 'Analysts', 'ENTP': 'Analysts',
    'INFJ': 'Diplomats', 'INFP': 'Diplomats', 'ENFJ': 'Diplomats', 'ENFP': 'Diplomats',
    'ISTJ': 'Sentinels', 'ISFJ': 'Sentinels', 'ESTJ': 'Sentinels', 'ESFJ': 'Sentinels',
    'ISTP': 'Explorers', 'ISFP': 'Explorers', 'ESTP': 'Explorers', 'ESFP': 'Explorers'
  };
  return groups[mbti] || 'Analysts';
};

// Helper to generate roadmap based on group and language
const getRoadmap = (lang, grp, context) => {
  // Base templates for each group (English)
  const templates = {
    Analysts: [
      { step: "Step 1", title: "Analyze Your Objective", description: `Deconstruct your goal "${context.goal}" into logical components. Define clear success metrics and identify potential bottlenecks. Create a strategic blueprint.` },
      { step: "Step 2", title: "Engineer Your System", description: "Design an efficient workflow. Eliminate redundancies. Focus on high-leverage activities that yield the maximum output for your input." },
      { step: "Step 3", title: "Execute & Optimize", description: "Implement your plan with precision. Monitor data points daily. Iterate rapidly based on feedback loops. Optimization is a continuous process." },
      { step: "Step 4", title: "Leverage Expertise", description: "Consult with subject matter experts. Validate your assumptions against empirical data. Build a network of competence around your goal." },
      { step: "Step 5", title: "Review & Scale", description: "Conduct a post-mortem after 90 days. Analyze the data. Systematize your success and scale your operations. Set a higher benchmark." }
    ],
    Diplomats: [
      { step: "Step 1", title: "Clarify Your Purpose", description: `Connect "${context.goal}" to your deeper values. Visualize the impact on yourself and others. Let your intuition guide your vision of success.` },
      { step: "Step 2", title: "Align Your Actions", description: "Create a plan that feels authentic to you. Focus on activities that energize you and align with your mission. Ensure harmony between your goal and your life." },
      { step: "Step 3", title: "Inspire Momentum", description: "Take action driven by passion. Celebrate the journey and the connections you make. Stay open to creative possibilities and flow." },
      { step: "Step 4", title: "Connect & Collaborate", description: "Share your vision with your community. Seek support from those who understand your heart. Growth happens through meaningful connection." },
      { step: "Step 5", title: "Reflect & Evolve", description: "After 90 days, reflect on your personal growth. How have you changed? Nurture the seeds you've planted and continue your journey of self-discovery." }
    ],
    Sentinels: [
      { step: "Step 1", title: "Define Your Plan", description: `Establish a clear, structured plan for "${context.goal}". Set concrete milestones and deadlines. Ensure every detail is accounted for.` },
      { step: "Step 2", title: "Establish Routines", description: "Create reliable daily habits. Consistency is your superpower. Organize your environment to support your steady progress." },
      { step: "Step 3", title: "Maintain Discipline", description: "Stick to the schedule. Track your progress with precision. Honor your commitments to yourself and others. Steady effort wins the race." },
      { step: "Step 4", title: "Secure Support", description: "Rely on trusted methods and mentors. Build a stable support system. Ensure you have the resources and security you need to succeed." },
      { step: "Step 5", title: "Review & Stabilize", description: "After 90 days, review your results against your plan. Solidify your gains. Establish new standards for the future. Maintain your foundation." }
    ],
    Explorers: [
      { step: "Step 1", title: "Identify Opportunities", description: `Scout the landscape for "${context.goal}". Look for immediate openings and exciting possibilities. Trust your instincts and be ready to adapt.` },
      { step: "Step 2", title: "Take Bold Action", description: "Don't overplan—start doing. Experiment with different approaches. Use your hands-on skills to tackle challenges head-on. Learn by doing." },
      { step: "Step 3", title: "Adapt & Overcome", description: "Stay flexible. Pivot quickly when things change. Use your resourcefulness to solve problems in the moment. Keep the energy high." },
      { step: "Step 4", title: "Rally Your Team", description: "Engage others with your enthusiasm. Show them what's possible. Use your charisma to get the support you need. Make it an adventure." },
      { step: "Step 5", title: "Review & Pivot", description: "After 90 days, look back at your adventures. Keep what works, discard what doesn't. Find the next thrill. Keep moving forward." }
    ]
  };

  // Translations
  const translations = {
    de: {
      Analysts: [
        { step: "Schritt 1", title: "Analysieren Sie Ihr Ziel", description: `Zerlegen Sie Ihr Ziel "${context.goal}" in logische Komponenten. Definieren Sie klare Erfolgsmetriken.` },
        { step: "Schritt 2", title: "Entwickeln Sie Ihr System", description: "Entwerfen Sie einen effizienten Arbeitsablauf. Eliminieren Sie Redundanzen. Konzentrieren Sie sich auf Aktivitäten mit hoher Hebelwirkung." },
        { step: "Schritt 3", title: "Ausführen & Optimieren", description: "Setzen Sie Ihren Plan präzise um. Überwachen Sie Datenpunkte täglich. Optimierung ist ein kontinuierlicher Prozess." },
        { step: "Schritt 4", title: "Nutzen Sie Expertise", description: "Konsultieren Sie Fachexperten. Validieren Sie Ihre Annahmen. Bauen Sie ein Kompetenznetzwerk auf." },
        { step: "Schritt 5", title: "Überprüfen & Skalieren", description: "Führen Sie nach 90 Tagen eine Analyse durch. Systematisieren Sie Ihren Erfolg und skalieren Sie Ihre Operationen." }
      ],
      Diplomats: [
        { step: "Schritt 1", title: "Klären Sie Ihren Zweck", description: `Verbinden Sie "${context.goal}" mit Ihren tieferen Werten. Visualisieren Sie die Auswirkungen auf sich und andere.` },
        { step: "Schritt 2", title: "Richten Sie Ihre Handlungen aus", description: "Erstellen Sie einen Plan, der sich authentisch anfühlt. Konzentrieren Sie sich auf Aktivitäten, die Sie energetisieren." },
        { step: "Schritt 3", title: "Inspirieren Sie Momentum", description: "Handeln Sie aus Leidenschaft. Feiern Sie die Reise und die Verbindungen, die Sie knüpfen." },
        { step: "Schritt 4", title: "Verbinden & Zusammenarbeiten", description: "Teilen Sie Ihre Vision mit Ihrer Gemeinschaft. Suchen Sie Unterstützung bei denen, die Ihr Herz verstehen." },
        { step: "Schritt 5", title: "Reflektieren & Entwickeln", description: "Reflektieren Sie nach 90 Tagen über Ihr persönliches Wachstum. Pflegen Sie die Samen, die Sie gesät haben." }
      ],
      Sentinels: [
        { step: "Schritt 1", title: "Definieren Sie Ihren Plan", description: `Erstellen Sie einen klaren, strukturierten Plan für "${context.goal}". Setzen Sie konkrete Meilensteine.` },
        { step: "Schritt 2", title: "Etablieren Sie Routinen", description: "Schaffen Sie verlässliche tägliche Gewohnheiten. Konsistenz ist Ihre Superkraft." },
        { step: "Schritt 3", title: "Bewahren Sie Disziplin", description: "Halten Sie sich an den Zeitplan. Verfolgen Sie Ihren Fortschritt präzise. Stetige Anstrengung gewinnt das Rennen." },
        { step: "Schritt 4", title: "Sichern Sie Unterstützung", description: "Verlassen Sie sich auf bewährte Methoden. Bauen Sie ein stabiles Unterstützungssystem auf." },
        { step: "Schritt 5", title: "Überprüfen & Stabilisieren", description: "Überprüfen Sie nach 90 Tagen Ihre Ergebnisse. Festigen Sie Ihre Gewinne. Bewahren Sie Ihr Fundament." }
      ],
      Explorers: [
        { step: "Schritt 1", title: "Identifizieren Sie Chancen", description: `Suchen Sie nach Möglichkeiten für "${context.goal}". Vertrauen Sie Ihren Instinkten und seien Sie bereit, sich anzupassen.` },
        { step: "Schritt 2", title: "Handeln Sie Mutig", description: "Planen Sie nicht zu viel – fangen Sie an. Experimentieren Sie mit verschiedenen Ansätzen. Lernen Sie durch Tun." },
        { step: "Schritt 3", title: "Anpassen & Überwinden", description: "Bleiben Sie flexibel. Ändern Sie die Richtung schnell, wenn sich die Dinge ändern. Nutzen Sie Ihren Einfallsreichtum." },
        { step: "Schritt 4", title: "Versammeln Sie Ihr Team", description: "Begeistern Sie andere mit Ihrem Enthusiasmus. Zeigen Sie ihnen, was möglich ist. Machen Sie es zu einem Abenteuer." },
        { step: "Schritt 5", title: "Überprüfen & Pivotieren", description: "Blicken Sie nach 90 Tagen auf Ihre Abenteuer zurück. Behalten Sie, was funktioniert. Finden Sie den nächsten Nervenkitzel." }
      ]
    },
    tr: {
      Analysts: [
        { step: "Adım 1", title: "Hedefinizi Analiz Edin", description: `"${context.goal}" hedefinizi mantıksal bileşenlere ayırın. Net başarı ölçütleri tanımlayın.` },
        { step: "Adım 2", title: "Sisteminizi Tasarlayın", description: "Verimli bir iş akışı tasarlayın. Gereksizleri eleyin. Maksimum çıktı sağlayan faaliyetlere odaklanın." },
        { step: "Adım 3", title: "Uygula ve Optimize Et", description: "Planınızı hassasiyetle uygulayın. Verileri günlük olarak izleyin. Geri bildirimlere göre hızla yineleyin." },
        { step: "Adım 4", title: "Uzmanlıktan Yararlanın", description: "Konu uzmanlarına danışın. Varsayımlarınızı doğrulayın. Hedefiniz etrafında bir yetkinlik ağı kurun." },
        { step: "Adım 5", title: "Gözden Geçir ve Ölçeklendir", description: "90 gün sonra bir analiz yapın. Başarınızı sistemleştirin ve operasyonlarınızı ölçeklendirin." }
      ],
      Diplomats: [
        { step: "Adım 1", title: "Amacınızı Netleştirin", description: `"${context.goal}" hedefini derin değerlerinizle bağlayın. Kendiniz ve başkaları üzerindeki etkisini hayal edin.` },
        { step: "Adım 2", title: "Eylemlerinizi Hizalayın", description: "Size otantik gelen bir plan oluşturun. Sizi enerjik kılan faaliyetlere odaklanın." },
        { step: "Adım 3", title: "İvme Kazandırın", description: "Tutkuyla hareket edin. Yolculuğu ve kurduğunuz bağlantıları kutlayın." },
        { step: "Adım 4", title: "Bağlan ve İşbirliği Yap", description: "Vizyonunuzu topluluğunuzla paylaşın. Kalbinizi anlayanlardan destek isteyin." },
        { step: "Adım 5", title: "Yansıt ve Geliş", description: "90 gün sonra kişisel büyümenizi düşünün. Ektiğiniz tohumları besleyin ve keşif yolculuğunuza devam edin." }
      ],
      Sentinels: [
        { step: "Adım 1", title: "Planınızı Tanımlayın", description: `"${context.goal}" için net, yapılandırılmış bir plan oluşturun. Somut kilometre taşları belirleyin.` },
        { step: "Adım 2", title: "Rutinler Oluşturun", description: "Güvenilir günlük alışkanlıklar yaratın. Tutarlılık sizin süper gücünüzdür." },
        { step: "Adım 3", title: "Disiplini Koruyun", description: "Programa sadık kalın. İlerlemenizi hassasiyetle takip edin. İstikrarlı çaba yarışı kazanır." },
        { step: "Adım 4", title: "Desteği Güvenceye Alın", description: "Güvenilir yöntemlere ve mentorlara güvenin. İstikrarlı bir destek sistemi kurun." },
        { step: "Adım 5", title: "Gözden Geçir ve Sabitle", description: "90 gün sonra sonuçlarınızı planınıza göre gözden geçirin. Kazanımlarınızı sağlamlaştırın." }
      ],
      Explorers: [
        { step: "Adım 1", title: "Fırsatları Belirleyin", description: `"${context.goal}" için ortamı araştırın. Anlık açılışları ve heyecan verici olasılıkları arayın.` },
        { step: "Adım 2", title: "Cesurca Harekete Geçin", description: "Fazla plan yapmayın—yapmaya başlayın. Farklı yaklaşımları deneyin. Yaparak öğrenin." },
        { step: "Adım 3", title: "Uyum Sağla ve Aş", description: "Esnek kalın. İşler değiştiğinde hızla yön değiştirin. Sorunları çözmek için becerikliliğinizi kullanın." },
        { step: "Adım 4", title: "Ekibini Topla", description: "Coşkunuzla başkalarını etkileyin. Onlara neyin mümkün olduğunu gösterin. Bunu bir maceraya dönüştürün." },
        { step: "Adım 5", title: "Gözden Geçir ve Yön Değiştir", description: "90 gün sonra maceralarınıza geri dönüp bakın. İşe yarayanı tutun, yaramayanı atın. Bir sonraki heyecanı bulun." }
      ]
    },
    es: {
      Analysts: [{ step: "Paso 1", title: "Analiza tu Objetivo", description: `Desglosa tu objetivo "${context.goal}" en componentes lógicos.` }, { step: "Paso 2", title: "Diseña tu Sistema", description: "Diseña un flujo de trabajo eficiente." }, { step: "Paso 3", title: "Ejecutar y Optimizar", description: "Implementa tu plan con precisión." }, { step: "Paso 4", title: "Aprovecha la Experiencia", description: "Consulta con expertos." }, { step: "Paso 5", title: "Revisar y Escalar", description: "Realiza un análisis después de 90 días." }],
      Diplomats: [{ step: "Paso 1", title: "Aclara tu Propósito", description: `Conecta "${context.goal}" con tus valores profundos.` }, { step: "Paso 2", title: "Alinea tus Acciones", description: "Crea un plan que se sienta auténtico." }, { step: "Paso 3", title: "Inspira Impulso", description: "Actúa con pasión." }, { step: "Paso 4", title: "Conectar y Colaborar", description: "Comparte tu visión." }, { step: "Paso 5", title: "Reflexionar y Evolucionar", description: "Reflexiona sobre tu crecimiento." }],
      Sentinels: [{ step: "Paso 1", title: "Define tu Plan", description: `Establece un plan claro para "${context.goal}".` }, { step: "Paso 2", title: "Establece Rutinas", description: "Crea hábitos diarios confiables." }, { step: "Paso 3", title: "Mantén la Disciplina", description: "Apégate al horario." }, { step: "Paso 4", title: "Asegura el Apoyo", description: "Confía en métodos probados." }, { step: "Paso 5", title: "Revisar y Estabilizar", description: "Revisa tus resultados." }],
      Explorers: [{ step: "Paso 1", title: "Identifica Oportunidades", description: `Busca oportunidades para "${context.goal}".` }, { step: "Paso 2", title: "Toma Acción Audaz", description: "No planeje demasiado, empiece a hacer." }, { step: "Paso 3", title: "Adaptar y Superar", description: "Mantente flexible." }, { step: "Paso 4", title: "Reúne a tu Equipo", description: "Involucra a otros." }, { step: "Paso 5", title: "Revisar y Pivotar", description: "Mira hacia atrás en tus aventuras." }]
    },
    fr: {
      Analysts: [{ step: "Étape 1", title: "Analysez Votre Objectif", description: `Décomposez votre objectif "${context.goal}" en composants logiques.` }, { step: "Étape 2", title: "Concevez Votre Système", description: "Concevez un flux de travail efficace." }, { step: "Étape 3", title: "Exécuter et Optimiser", description: "Mettez en œuvre votre plan avec précision." }, { step: "Étape 4", title: "Tirez Parti de l'Expertise", description: "Consultez des experts." }, { step: "Étape 5", title: "Revoir et Évoluer", description: "Effectuez une analyse après 90 jours." }],
      Diplomats: [{ step: "Étape 1", title: "Clarifiez Votre Raison d'Être", description: `Connectez "${context.goal}" à vos valeurs profondes.` }, { step: "Étape 2", title: "Alignez Vos Actions", description: "Créez un plan authentique." }, { step: "Étape 3", title: "Inspirez l'Élan", description: "Agissez avec passion." }, { step: "Étape 4", title: "Connecter et Collaborer", description: "Partagez votre vision." }, { step: "Étape 5", title: "Réfléchir et Évoluer", description: "Réfléchissez à votre croissance." }],
      Sentinels: [{ step: "Étape 1", title: "Définissez Votre Plan", description: `Établissez un plan clair pour "${context.goal}".` }, { step: "Étape 2", title: "Établissez des Routines", description: "Créez des habitudes fiables." }, { step: "Étape 3", title: "Maintenez la Discipline", description: "Respectez le calendrier." }, { step: "Étape 4", title: "Sécurisez le Soutien", description: "Faites confiance aux méthodes éprouvées." }, { step: "Étape 5", title: "Revoir et Stabiliser", description: "Passez en revue vos résultats." }],
      Explorers: [{ step: "Étape 1", title: "Identifiez les Opportunités", description: `Recherchez des opportunités pour "${context.goal}".` }, { step: "Étape 2", title: "Agissez avec Audace", description: "Ne planifiez pas trop, commencez à faire." }, { step: "Étape 3", title: "S'adapter et Surmonter", description: "Restez flexible." }, { step: "Étape 4", title: "Rassemblez Votre Équipe", description: "Engagez les autres." }, { step: "Étape 5", title: "Revoir et Pivoter", description: "Regardez en arrière sur vos aventures." }]
    },
    it: {
      Analysts: [{ step: "Passo 1", title: "Analizza il Tuo Obiettivo", description: `Scomponi il tuo obiettivo "${context.goal}" in componenti logici.` }, { step: "Passo 2", title: "Progetta il Tuo Sistema", description: "Progetta un flusso di lavoro efficiente." }, { step: "Passo 3", title: "Esegui e Ottimizza", description: "Attua il tuo piano con precisione." }, { step: "Passo 4", title: "Sfrutta l'Esperienza", description: "Consulta esperti." }, { step: "Passo 5", title: "Rivedi e Scala", description: "Conduci un'analisi dopo 90 giorni." }],
      Diplomats: [{ step: "Passo 1", title: "Chiarisci il Tuo Scopo", description: `Collega "${context.goal}" ai tuoi valori profondi.` }, { step: "Passo 2", title: "Allinea le Tue Azioni", description: "Crea un piano autentico." }, { step: "Passo 3", title: "Ispira Slancio", description: "Agisci con passione." }, { step: "Passo 4", title: "Connetti e Collabora", description: "Condividi la tua visione." }, { step: "Passo 5", title: "Rifletti ed Evolvi", description: "Rifletti sulla tua crescita." }],
      Sentinels: [{ step: "Passo 1", title: "Definisci il Tuo Piano", description: `Stabilisci un piano chiaro per "${context.goal}".` }, { step: "Passo 2", title: "Stabilisci Routine", description: "Crea abitudini affidabili." }, { step: "Passo 3", title: "Mantieni la Disciplina", description: "Attieniti al programma." }, { step: "Passo 4", title: "Assicura il Supporto", description: "Affidati a metodi collaudati." }, { step: "Passo 5", title: "Rivedi e Stabilizza", description: "Rivedi i tuoi risultati." }],
      Explorers: [{ step: "Passo 1", title: "Identifica Opportunità", description: `Cerca opportunità per "${context.goal}".` }, { step: "Passo 2", title: "Agisci con Audacia", description: "Non pianificare troppo, inizia a fare." }, { step: "Passo 3", title: "Adattati e Supera", description: "Rimani flessibile." }, { step: "Passo 4", title: "Raduna la Tua Squadra", description: "Coinvolgi gli altri." }, { step: "Passo 5", title: "Rivedi e Cambia", description: "Guarda indietro alle tue avventure." }]
    },
    pt: {
      Analysts: [{ step: "Passo 1", title: "Analise Seu Objetivo", description: `Decomponha seu objetivo "${context.goal}" em componentes lógicos.` }, { step: "Passo 2", title: "Projete Seu Sistema", description: "Projete um fluxo de trabalho eficiente." }, { step: "Passo 3", title: "Execute e Otimize", description: "Implemente seu plano com precisão." }, { step: "Passo 4", title: "Aproveite a Experiência", description: "Consulte especialistas." }, { step: "Passo 5", title: "Revise e Escale", description: "Realize uma análise após 90 dias." }],
      Diplomats: [{ step: "Passo 1", title: "Clarifique Seu Propósito", description: `Conecte "${context.goal}" aos seus valores profundos.` }, { step: "Passo 2", title: "Alinhe Suas Ações", description: "Crie um plano autêntico." }, { step: "Passo 3", title: "Inspire Impulso", description: "Aja com paixão." }, { step: "Passo 4", title: "Conecte e Colabore", description: "Compartilhe sua visão." }, { step: "Passo 5", title: "Reflita e Evolua", description: "Reflita sobre seu crescimento." }],
      Sentinels: [{ step: "Passo 1", title: "Defina Seu Plano", description: `Estabeleça um plano claro para "${context.goal}".` }, { step: "Passo 2", title: "Estabeleça Rotinas", description: "Crie hábitos confiáveis." }, { step: "Passo 3", title: "Mantenha a Disciplina", description: "Siga o cronograma." }, { step: "Passo 4", title: "Garanta Apoio", description: "Confie em métodos comprovados." }, { step: "Passo 5", title: "Revise e Estabilize", description: "Revise seus resultados." }],
      Explorers: [{ step: "Passo 1", title: "Identifique Oportunidades", description: `Busque oportunidades para "${context.goal}".` }, { step: "Passo 2", title: "Aja com Ousadia", description: "Não planeje demais, comece a fazer." }, { step: "Passo 3", title: "Adapte e Supere", description: "Mantenha-se flexível." }, { step: "Passo 4", title: "Reúna Sua Equipe", description: "Envolva os outros." }, { step: "Passo 5", title: "Revise e Pivote", description: "Olhe para trás em suas aventuras." }]
    },
    ja: {
      Analysts: [{ step: "ステップ 1", title: "目的を分析する", description: `目標「${context.goal}」を論理的な要素に分解します。` }, { step: "ステップ 2", title: "システムを設計する", description: "効率的なワークフローを設計します。" }, { step: "ステップ 3", title: "実行と最適化", description: "計画を正確に実行します。" }, { step: "ステップ 4", title: "専門知識を活用する", description: "専門家に相談します。" }, { step: "ステップ 5", title: "見直しと拡大", description: "90日後に分析を行います。" }],
      Diplomats: [{ step: "ステップ 1", title: "目的を明確にする", description: `「${context.goal}」を深い価値観と結びつけます。` }, { step: "ステップ 2", title: "行動を一致させる", description: "自分らしい計画を作成します。" }, { step: "ステップ 3", title: "勢いを刺激する", description: "情熱を持って行動します。" }, { step: "ステップ 4", title: "つながりと協力", description: "ビジョンを共有します。" }, { step: "ステップ 5", title: "振り返りと進化", description: "成長を振り返ります。" }],
      Sentinels: [{ step: "ステップ 1", title: "計画を定義する", description: `「${context.goal}」のための明確な計画を立てます。` }, { step: "ステップ 2", title: "ルーチンを確立する", description: "信頼できる習慣を作ります。" }, { step: "ステップ 3", title: "規律を維持する", description: "スケジュールを守ります。" }, { step: "ステップ 4", title: "サポートを確保する", description: "実績のある方法に頼ります。" }, { step: "ステップ 5", title: "見直しと安定化", description: "結果を見直します。" }],
      Explorers: [{ step: "ステップ 1", title: "機会を特定する", description: `「${context.goal}」の機会を探します。` }, { step: "ステップ 2", title: "大胆に行動する", description: "計画しすぎず、行動を始めます。" }, { step: "ステップ 3", title: "適応と克服", description: "柔軟性を保ちます。" }, { step: "ステップ 4", title: "チームを集める", description: "他者を巻き込みます。" }, { step: "ステップ 5", title: "見直しと転換", description: "冒険を振り返ります。" }]
    }
  };

  // Return translated roadmap or fallback to English
  if (lang === 'en') return templates[grp];

  // Check if translation exists for lang and group
  if (translations[lang] && translations[lang][grp]) {
    return translations[lang][grp];
  }

  // Fallback to English if translation missing
  return templates[grp];
};

const getAnalysisAndRoadmap = async (context, answers, language = 'en') => {
  // Normalize language code (e.g. 'de-DE' -> 'de')
  const normalizedLang = language.split('-')[0].toLowerCase();

  // TEMPORARY MOCK - Enhanced with personality-specific images and language support
  console.log('Using MOCK response with context-aware, personality-specific roadmap');
  console.log('User Goal:', context.goal, '| Language:', language, '| Normalized:', normalizedLang);

  // Mock MBTI determination (random for now, or based on answers if we had logic)
  // For consistency in mock, let's pick one or use a fixed one. 
  // Let's assume ENTJ for now as per previous context or random.
  // Actually, let's use a deterministic one based on answers length or something to vary it, 
  // or just default to ENTJ 'The Commander' as a placeholder.
  const mbti = 'ENTJ';
  const group = getPersonalityGroup(mbti);

  const roadmap = getRoadmap(normalizedLang, group, context);

  // Mock Analysis Text
  let analysis = `Based on your answers, you have the **${mbti}** personality type. You are driven by a desire to achieve "${context.goal}". Your strengths lie in strategic thinking and determination. You value efficiency and structure in your approach to life and work.`;

  if (normalizedLang === 'tr') {
    analysis = `Cevaplarınıza dayanarak, **${mbti}** kişilik tipine sahipsiniz. "${context.goal}" hedefine ulaşma arzusuyla hareket ediyorsunuz. Güçlü yönleriniz stratejik düşünme ve kararlılıkta yatmaktadır. Yaşama ve çalışmaya yaklaşımınızda verimliliğe ve yapıya değer veriyorsunuz.`;
  } else if (normalizedLang === 'fr') {
    analysis = `D'après vos réponses, vous avez un type de personnalité **${mbti}**. Vous êtes motivé par le désir d'atteindre "${context.goal}". Vos forces résident dans la pensée stratégique et la détermination. Vous valorisez l'efficacité et la structure dans votre approche de la vie et du travail.`;
  } else if (normalizedLang === 'de') {
    analysis = `Basierend auf Ihren Antworten haben Sie den Persönlichkeitstyp **${mbti}**. Sie werden von dem Wunsch angetrieben, "${context.goal}" zu erreichen. Ihre Stärken liegen im strategischen Denken und in der Entschlossenheit. Sie schätzen Effizienz und Struktur in Ihrer Lebens- und Arbeitsweise.`;
  }

  return {
    analysis: analysis,
    roadmap: roadmap,
    language: normalizedLang,
    personalityType: mbti
  };
};

module.exports = {
  initializeAiClients,
  getAnalysisAndRoadmap
};
