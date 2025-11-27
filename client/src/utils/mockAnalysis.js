// Mock analysis generator for standalone frontend deployment
// This replicates the backend mock logic from googleAiClient.js

export function generateMockAnalysis(context, answers, language = 'en') {
    // Normalize language code (e.g., 'de-DE' -> 'de')
    const normalizedLang = language.split('-')[0].toLowerCase();

    // Simple MBTI personality assignment (in production, this would use actual analysis)
    const mbti = 'ENTJ';
    const group = getPersonalityGroup(mbti);

    const roadmap = getRoadmap(normalizedLang, group, context);

    // Generate analysis text based on language
    let analysis = `Based on your answers, you have the **${mbti}** personality type. You are driven by a desire to achieve "${context.goal}". Your strengths lie in strategic thinking and determination. You value efficiency and structure in your approach to life and work.`;

    if (normalizedLang === 'tr') {
        analysis = `Cevaplarınıza dayanarak, **${mbti}** kişilik tipine sahipsiniz. "${context.goal}" hedefine ulaşma arzusuyla hareket ediyorsunuz. Güçlü yönleriniz stratejik düşünme ve kararlılıkta yatmaktadır. Yaşama ve çalışmaya yaklaşımınızda verimliliğe ve yapıya değer veriyorsunuz.`;
    } else if (normalizedLang === 'fr') {
        analysis = `D'après vos réponses, vous avez un type de personnalité **${mbti}**. Vous êtes motivé par le désir d'atteindre "${context.goal}". Vos forces résident dans la pensée stratégique et la détermination. Vous valorisez l'efficacité et la structure dans votre approche de la vie et du travail.`;
    } else if (normalizedLang === 'de') {
        analysis = `Basierend auf Ihren Antworten haben Sie den Persönlichkeitstyp **${mbti}**. Sie werden von dem Wunsch angetrieben, "${context.goal}" zu erreichen. Ihre Stärken liegen im strategischen Denken und in der Entschlossenheit. Sie schätzen Effizienz und Struktur in Ihrer Lebens- und Arbeitsweise.`;
    } else if (normalizedLang === 'es') {
        analysis = `Según sus respuestas, tiene el tipo de personalidad **${mbti}**. Está motivado por el deseo de lograr "${context.goal}". Sus fortalezas radican en el pensamiento estratégico y la determinación. Valora la eficiencia y la estructura en su enfoque de la vida y el trabajo.`;
    }

    return {
        analysis,
        roadmap,
        language: normalizedLang,
        personalityType: mbti
    };
}

function getPersonalityGroup(mbti) {
    const analysts = ['INTJ', 'INTP', 'ENTJ', 'ENTP'];
    const diplomats = ['INFJ', 'INFP', 'ENFJ', 'ENFP'];
    const sentinels = ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'];
    const explorers = ['ISTP', 'ISFP', 'ESTP', 'ESFP'];

    if (analysts.includes(mbti)) return 'Analysts';
    if (diplomats.includes(mbti)) return 'Diplomats';
    if (sentinels.includes(mbti)) return 'Sentinels';
    if (explorers.includes(mbti)) return 'Explorers';
    return 'Analysts'; // default
}

function getRoadmap(lang, grp, context) {
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
            ]
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
}
