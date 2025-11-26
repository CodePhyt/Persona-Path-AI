const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'client/src/i18n/locales');
const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'tr', 'ja'];

const economicKeys = {
    en: { economicStruggling: "Struggling", economicTight: "Tight", economicStable: "Stable", economicComfortable: "Comfortable", economicWealthy: "Wealthy" },
    es: { economicStruggling: "Luchando", economicTight: "Apretado", economicStable: "Estable", economicComfortable: "Cómodo", economicWealthy: "Rico" },
    fr: { economicStruggling: "En difficulté", economicTight: "Serré", economicStable: "Stable", economicComfortable: "Confortable", economicWealthy: "Riche" },
    de: { economicStruggling: "Kämpfend", economicTight: "Knapp", economicStable: "Stabil", economicComfortable: "Komfortabel", economicWealthy: "Wohlhabend" },
    it: { economicStruggling: "In difficoltà", economicTight: "Stretto", economicStable: "Stabile", economicComfortable: "Confortevole", economicWealthy: "Benestante" },
    pt: { economicStruggling: "Lutando", economicTight: "Apertado", economicStable: "Estável", economicComfortable: "Confortável", economicWealthy: "Rico" },
    tr: { economicStruggling: "Mücadele eden", economicTight: "Sıkışık", economicStable: "Dengeli", economicComfortable: "Rahat", economicWealthy: "Varlıklı" },
    ja: { economicStruggling: "苦労している", economicTight: "厳しい", economicStable: "安定", economicComfortable: "快適", economicWealthy: "裕福" }
};

const pdfKeys = {
    en: { downloadPDF: "Download PDF", downloadingPDF: "Generating PDF..." },
    es: { downloadPDF: "Descargar PDF", downloadingPDF: "Generando PDF..." },
    fr: { downloadPDF: "Télécharger PDF", downloadingPDF: "Génération du PDF..." },
    de: { downloadPDF: "PDF herunterladen", downloadingPDF: "PDF wird erstellt..." },
    it: { downloadPDF: "Scarica PDF", downloadingPDF: "Generazione PDF..." },
    pt: { downloadPDF: "Baixar PDF", downloadingPDF: "Gerando PDF..." },
    tr: { downloadPDF: "PDF İndir", downloadingPDF: "PDF Oluşturuluyor..." },
    ja: { downloadPDF: "PDFをダウンロード", downloadingPDF: "PDFを作成中..." }
};

const personasContent = {
    title: "Personality Archetypes",
    subtitle: "Explore the diverse frameworks that shape human behavior and potential",
    strengths: "Strengths",
    careers: "Careers",
    systems: {
        mbti: "MBTI",
        enneagram: "Enneagram",
        disc: "DISC",
        temperament: "Temperament",
        bigFive: "Big Five"
    },
    mbti: {
        INTJ: { title: "The Architect", description: "Imaginative and strategic thinkers", strengths: ["Strategic planning", "Independent thinking", "Complex problem solving"], careers: ["Data Scientist", "Strategic Planner", "Software Architect"] },
        ENFJ: { title: "The Protagonist", description: "Charismatic and inspiring leaders", strengths: ["Natural leadership", "Empathy", "Communication"], careers: ["HR Manager", "Teacher", "Marketing Director"] },
        INTP: { title: "The Logician", description: "Innovative inventors with thirst for knowledge", strengths: ["Analytical thinking", "Original ideas", "Open-mindedness"], careers: ["Software Developer", "Research Scientist", "Systems Analyst"] },
        ENFP: { title: "The Campaigner", description: "Enthusiastic and creative free spirits", strengths: ["Creativity", "People skills", "Enthusiasm"], careers: ["Counselor", "Journalist", "Artist"] },
        ISTJ: { title: "The Inspector", description: "Practical and fact-minded individuals", strengths: ["Organized", "Honest", "Strong-willed"], careers: ["Accountant", "Military Officer", "Judge"] },
        ESFJ: { title: "The Consul", description: "Caring and social people persons", strengths: ["Supporting others", "Social skills", "Organized"], careers: ["Nurse", "Event Coordinator", "Social Worker"] },
        ISTP: { title: "The Virtuoso", description: "Bold and practical experimenters", strengths: ["Practical skills", "Problem solving", "Adaptable"], careers: ["Mechanic", "Engineer", "Pilot"] },
        ESFP: { title: "The Entertainer", description: "Spontaneous and energetic performers", strengths: ["Enthusiasm", "Social skills", "Creativity"], careers: ["Entertainer", "Sales Representative", "Event Planner"] },
        INFJ: { title: "The Advocate", description: "Quiet and mystical idealists", strengths: ["Deep insight", "Creative vision", "Idealism"], careers: ["Counselor", "Writer", "Life Coach"] },
        ENTJ: { title: "The Commander", description: "Bold and imaginative leaders", strengths: ["Leadership", "Strategic thinking", "Charisma"], careers: ["CEO", "Lawyer", "Political Leader"] },
        INFP: { title: "The Mediator", description: "Poetic and kind altruists", strengths: ["Idealism", "Creativity", "Empathy"], careers: ["Writer", "Therapist", "Artist"] },
        ENTP: { title: "The Debater", description: "Smart and curious thinkers", strengths: ["Quick thinking", "Original", "Knowledgeable"], careers: ["Engineer", "Lawyer", "Scientist"] },
        ISFJ: { title: "The Defender", description: "Dedicated and warm protectors", strengths: ["Supportive", "Reliable", "Practical"], careers: ["Nurse", "Teacher", "Administrator"] },
        ESTJ: { title: "The Executive", description: "Excellent administrators", strengths: ["Organized", "Direct", "Strong principles"], careers: ["Manager", "Judge", "Business Owner"] },
        ISFP: { title: "The Adventurer", description: "Flexible and charming artists", strengths: ["Artistic", "Adaptable", "Practical creativity"], careers: ["Artist", "Designer", "Veterinarian"] },
        ESTP: { title: "The Entrepreneur", description: "Smart and perceptive risk-takers", strengths: ["Risk-taking", "Adaptability", "Problem-solving"], careers: ["Entrepreneur", "Sales Executive", "Sports Coach"] }
    },
    enneagram: {
        "Type 1": { title: "The Reformer", description: "Principled and perfectionistic", strengths: ["Ethical", "Reliable", "Improvement-oriented"], careers: ["Quality Assurance", "Editor", "Legal Professional"] },
        "Type 2": { title: "The Helper", description: "Generous and people-pleasing", strengths: ["Empathy", "Generosity", "Emotional intelligence"], careers: ["Nurse", "Teacher", "Social Worker"] },
        "Type 3": { title: "The Achiever", description: "Success-oriented and pragmatic", strengths: ["Efficient", "Goal-oriented", "Self-assured"], careers: ["Executive", "Entrepreneur", "Sales Manager"] },
        "Type 4": { title: "The Individualist", description: "Sensitive and expressive", strengths: ["Creativity", "Emotional awareness", "Authenticity"], careers: ["Artist", "Therapist", "Writer"] },
        "Type 5": { title: "The Investigator", description: "Intense and innovative thinkers", strengths: ["Perceptive", "Independent", "Knowledgeable"], careers: ["Researcher", "Scientist", "Analyst"] },
        "Type 6": { title: "The Loyalist", description: "Committed and security-oriented", strengths: ["Loyalty", "Problem anticipation", "Team player"], careers: ["Risk Manager", "Security", "HR Professional"] },
        "Type 7": { title: "The Enthusiast", description: "Busy and fun-loving", strengths: ["Optimism", "Versatility", "Productivity"], careers: ["Marketing Creative", "Travel Agent", "Entrepreneur"] },
        "Type 8": { title: "The Challenger", description: "Powerful and self-confident", strengths: ["Leadership", "Protection", "Decision-making"], careers: ["Executive", "Lawyer", "Military Leader"] },
        "Type 9": { title: "The Peacemaker", description: "Easy-going and receptive", strengths: ["Mediation", "Listening", "Creating harmony"], careers: ["Mediator", "Diplomat", "Counselor"] }
    },
    disc: {
        "D-Style": { title: "Dominance", description: "Direct and results-oriented", strengths: ["Leadership", "Problem-solving", "Taking initiative"], careers: ["Executive", "Entrepreneur", "Sales Director"] },
        "I-Style": { title: "Influence", description: "Outgoing and enthusiastic", strengths: ["Communication", "Networking", "Collaboration"], careers: ["Sales Representative", "Public Relations", "Marketing Manager"] },
        "S-Style": { title: "Steadiness", description: "Even-tempered and patient", strengths: ["Listening", "Teamwork", "Follow-through"], careers: ["HR Professional", "Counselor", "Customer Service"] },
        "C-Style": { title: "Conscientiousness", description: "Analytical and precise", strengths: ["Accuracy", "Problem-solving", "Organization"], careers: ["Analyst", "Programmer", "Accountant"] }
    },
    temperament: {
        "Choleric": { title: "The Leader", description: "Ambitious and purposeful natural leaders", strengths: ["Goal-oriented", "Self-confident", "Decision making"], careers: ["Executive", "Entrepreneur", "Political Leader"] },
        "Sanguine": { title: "The Socializer", description: "Outgoing and naturally cheerful", strengths: ["Communication", "Enthusiasm", "Creativity"], careers: ["Sales", "Entertainment", "Teaching"] },
        "Phlegmatic": { title: "The Peacemaker", description: "Relaxed and adaptable", strengths: ["Consistency", "Diplomacy", "Administrative ability"], careers: ["Counselor", "Administrator", "Support Role"] },
        "Melancholic": { title: "The Thinker", description: "Deep and analytical perfectionists", strengths: ["Detail-oriented", "Organization", "Analytical thinking"], careers: ["Researcher", "Writer", "Quality Control"] }
    },
    bigFive: {
        "High Openness": { title: "The Explorer", description: "Curious and creative", strengths: ["Innovation", "Abstract thinking", "Appreciation for art"], careers: ["Artist", "Researcher", "Writer"] },
        "High Conscientiousness": { title: "The Organizer", description: "Responsible and organized", strengths: ["Self-discipline", "Planning", "Attention to detail"], careers: ["Project Manager", "Financial Analyst", "Systems Analyst"] },
        "High Extraversion": { title: "The Energizer", description: "Outgoing and energetic", strengths: ["Leadership", "Networking", "Enthusiasm"], careers: ["Sales Representative", "Event Planner", "Public Relations"] },
        "High Agreeableness": { title: "The Diplomat", description: "Cooperative and compassionate", strengths: ["Empathy", "Teamwork", "Conflict resolution"], careers: ["Counselor", "Social Worker", "Teacher"] },
        "High Neuroticism": { title: "The Sensitive", description: "Emotionally aware and responsive", strengths: ["Emotional depth", "Awareness", "Caution"], careers: ["Therapist", "Artist", "Researcher"] }
    }
};

languages.forEach(lang => {
    // Update common.json
    const commonPath = path.join(localesDir, lang, 'common.json');
    if (fs.existsSync(commonPath)) {
        try {
            const common = JSON.parse(fs.readFileSync(commonPath, 'utf8'));

            // Add economic keys
            if (!common.userInfo) common.userInfo = {};
            Object.assign(common.userInfo, economicKeys[lang]);

            // Add PDF keys
            if (!common.results) common.results = {};
            Object.assign(common.results, pdfKeys[lang]);

            fs.writeFileSync(commonPath, JSON.stringify(common, null, 2));
            console.log(`Updated common.json for ${lang}`);
        } catch (e) {
            console.error(`Error updating common.json for ${lang}:`, e);
        }
    }

    // Create/Update personas.json
    const personasPath = path.join(localesDir, lang, 'personas.json');
    // For now, use English content for all languages to ensure structure exists
    // In a real app, we would translate this content
    fs.writeFileSync(personasPath, JSON.stringify(personasContent, null, 2));
    console.log(`Created personas.json for ${lang}`);
});
