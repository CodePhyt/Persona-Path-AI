import { questions } from '../data/questions';

/**
 * Comprehensive personality matching algorithm
 * Analyzes questionnaire answers and determines personality types across multiple frameworks
 */

// MBTI (Myers-Briggs Type Indicator) - 16 types
export function calculateMBTI(answers) {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach((q, index) => {
        const answer = answers[index] || 3; // Default to neutral if no answer
        const strength = Math.abs(answer - 3); // How strong is the answer (0-2)

        // E/I (Extraversion/Introversion) - Social energy and orientation
        if (['social_orientation', 'networking', 'sports_social'].includes(q.trait)) {
            if (answer > 3) scores.E += strength;
            else scores.I += strength;
        }

        // S/N (Sensing/Intuition) - Information processing
        if (['detail_orientation', 'structure_preference', 'organization_preference'].includes(q.trait)) {
            if (answer > 3) scores.S += strength;
            else scores.N += strength;
        }
        if (['creative_interests', 'innovation', 'abstract_thinking'].includes(q.trait)) {
            if (answer > 3) scores.N += strength;
            else scores.S += strength;
        }

        // T/F (Thinking/Feeling) - Decision making
        if (['analytical_thinking', 'sports_strategy', 'intellectual_hobbies'].includes(q.trait)) {
            if (answer > 3) scores.T += strength;
            else scores.F += strength;
        }
        if (['empathy', 'emotional_expression', 'altruistic_hobbies'].includes(q.trait)) {
            if (answer > 3) scores.F += strength;
            else scores.T += strength;
        }

        // J/P (Judging/Perceiving) - Lifestyle approach
        if (['planning', 'organization_preference', 'structure_preference'].includes(q.trait)) {
            if (answer > 3) scores.J += strength;
            else scores.P += strength;
        }
        if (['adaptability', 'ambiguity_tolerance', 'relocation_openness'].includes(q.trait)) {
            if (answer > 3) scores.P += strength;
            else scores.J += strength;
        }
    });

    // Determine 4-letter type
    const type =
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.N > scores.S ? 'N' : 'S') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');

    return type;
}

// Enneagram - 9 types based on core motivations
export function calculateEnneagram(answers) {
    const scores = {
        1: 0, // Reformer - Perfectionist
        2: 0, // Helper - Giver
        3: 0, // Achiever - Performer
        4: 0, // Individualist - Romantic
        5: 0, // Investigator - Observer
        6: 0, // Loyalist - Loyal Skeptic
        7: 0, // Enthusiast - Epicure
        8: 0, // Challenger - Protector
        9: 0  // Peacemaker - Mediator
    };

    questions.forEach((q, index) => {
        const answer = answers[index] || 3;
        const value = answer > 3 ? answer - 3 : 0;

        // Type 1 - Reformer: Detail-oriented, ethical, perfectionistic
        if (['detail_orientation', 'structure_preference', 'quality_focus'].includes(q.trait)) {
            scores[1] += value;
        }

        // Type 2 - Helper: Empathetic, generous, people-pleasing
        if (['empathy', 'altruistic_hobbies', 'collaboration'].includes(q.trait)) {
            scores[2] += value;
        }

        // Type 3 - Achiever: Goal-oriented, competitive, success-driven
        if (['goal_orientation', 'competitiveness', 'achievement'].includes(q.trait)) {
            scores[3] += value;
        }

        // Type 4 - Individualist: Creative, emotional, authentic
        if (['creative_interests', 'emotional_expression', 'uniqueness'].includes(q.trait)) {
            scores[4] += value;
        }

        // Type 5 - Investigator: Analytical, knowledgeable, independent
        if (['intellectual_hobbies', 'learning_orientation', 'analytical_thinking'].includes(q.trait)) {
            scores[5] += value;
        }

        // Type 6 - Loyalist: Loyal, security-oriented, team player
        if (['collaboration', 'risk_aversion', 'planning'].includes(q.trait)) {
            scores[6] += value;
        }

        // Type 7 - Enthusiast: Optimistic, versatile, spontaneous
        if (['adaptability', 'variety_seeking', 'enthusiasm'].includes(q.trait)) {
            scores[7] += value;
        }

        // Type 8 - Challenger: Leadership, confident, decisive
        if (['leadership', 'risk_tolerance', 'decisiveness'].includes(q.trait)) {
            scores[8] += value;
        }

        // Type 9 - Peacemaker: Peaceful, empathetic, harmonious
        if (['conflict_resolution', 'empathy', 'patience'].includes(q.trait)) {
            scores[9] += value;
        }
    });

    // Return type with highest score
    const maxType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return `Type ${maxType}`;
}

// DISC - 4 behavioral styles
export function calculateDISC(answers) {
    const scores = { D: 0, I: 0, S: 0, C: 0 };

    questions.forEach((q, index) => {
        const answer = answers[index] || 3;
        const value = answer > 3 ? answer - 3 : 0;

        // D - Dominance: Results-oriented, decisive, direct
        if (['leadership', 'risk_tolerance', 'goal_orientation', 'decisiveness'].includes(q.trait)) {
            scores.D += value;
        }

        // I - Influence: Outgoing, enthusiastic, optimistic
        if (['social_orientation', 'networking', 'communication', 'enthusiasm'].includes(q.trait)) {
            scores.I += value;
        }

        // S - Steadiness: Patient, team player, supportive
        if (['collaboration', 'empathy', 'patience', 'consistency'].includes(q.trait)) {
            scores.S += value;
        }

        // C - Conscientiousness: Analytical, precise, systematic
        if (['detail_orientation', 'analytical_thinking', 'organization_preference', 'quality_focus'].includes(q.trait)) {
            scores.C += value;
        }
    });

    const maxStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return `${maxStyle}-Style`;
}

// Temperament - 4 classical types
export function calculateTemperament(answers) {
    const scores = {
        Choleric: 0,
        Sanguine: 0,
        Phlegmatic: 0,
        Melancholic: 0
    };

    questions.forEach((q, index) => {
        const answer = answers[index] || 3;
        const value = answer > 3 ? answer - 3 : 0;

        // Choleric - Leader: Goal-oriented, decisive, confident
        if (['leadership', 'goal_orientation', 'decisiveness', 'competitiveness'].includes(q.trait)) {
            scores.Choleric += value;
        }

        // Sanguine - Socializer: Outgoing, enthusiastic, creative
        if (['social_orientation', 'enthusiasm', 'creativity', 'optimism'].includes(q.trait)) {
            scores.Sanguine += value;
        }

        // Phlegmatic - Peacemaker: Calm, patient, diplomatic
        if (['patience', 'empathy', 'conflict_resolution', 'consistency'].includes(q.trait)) {
            scores.Phlegmatic += value;
        }

        // Melancholic - Thinker: Analytical, detail-oriented, perfectionist
        if (['analytical_thinking', 'detail_orientation', 'planning', 'quality_focus'].includes(q.trait)) {
            scores.Melancholic += value;
        }
    });

    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

// Big Five - Identify dominant traits
export function calculateBigFive(answers) {
    const scores = {
        Openness: 0,
        Conscientiousness: 0,
        Extraversion: 0,
        Agreeableness: 0,
        'Emotional Stability': 0
    };

    questions.forEach((q, index) => {
        const answer = answers[index] || 3;
        const value = answer > 3 ? answer - 3 : 0;

        // Openness - Curious, creative, open to new experiences
        if (['creative_interests', 'innovation', 'intellectual_hobbies', 'learning_orientation'].includes(q.trait)) {
            scores.Openness += value;
        }

        // Conscientiousness - Organized, responsible, disciplined
        if (['planning', 'organization_preference', 'detail_orientation', 'goal_orientation'].includes(q.trait)) {
            scores.Conscientiousness += value;
        }

        // Extraversion - Outgoing, energetic, social
        if (['social_orientation', 'networking', 'enthusiasm', 'leadership'].includes(q.trait)) {
            scores.Extraversion += value;
        }

        // Agreeableness - Cooperative, empathetic, kind
        if (['empathy', 'collaboration', 'altruistic_hobbies', 'conflict_resolution'].includes(q.trait)) {
            scores.Agreeableness += value;
        }

        // Emotional Stability - Calm, resilient, stable
        if (['adaptability', 'stress_management', 'emotional_control'].includes(q.trait)) {
            scores['Emotional Stability'] += value;
        }
    });

    // Return top 2 traits
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 2).map(([trait]) => `High ${trait}`);
}

// Master function to get all personality types
export function matchPersonality(answers) {
    return {
        mbti: calculateMBTI(answers),
        enneagram: calculateEnneagram(answers),
        disc: calculateDISC(answers),
        temperament: calculateTemperament(answers),
        bigFive: calculateBigFive(answers)
    };
}

// Get personality details from persona data
export function getPersonalityDetails(type, framework) {
    // Import persona data
    const personaData = {
        mbti: [
            { type: 'INTJ', title: 'The Architect', description: 'Imaginative and strategic thinkers' },
            { type: 'ENFJ', title: 'The Protagonist', description: 'Charismatic and inspiring leaders' },
            { type: 'INTP', title: 'The Logician', description: 'Innovative inventors with thirst for knowledge' },
            { type: 'ENFP', title: 'The Campaigner', description: 'Enthusiastic and creative free spirits' },
            { type: 'ISTJ', title: 'The Inspector', description: 'Practical and fact-minded individuals' },
            { type: 'ESFJ', title: 'The Consul', description: 'Caring and social people persons' },
            { type: 'ISTP', title: 'The Virtuoso', description: 'Bold and practical experimenters' },
            { type: 'ESFP', title: 'The Entertainer', description: 'Spontaneous and energetic performers' },
            { type: 'INFJ', title: 'The Advocate', description: 'Quiet and mystical idealists' },
            { type: 'ENTJ', title: 'The Commander', description: 'Bold and imaginative leaders' },
            { type: 'INFP', title: 'The Mediator', description: 'Poetic and kind altruists' },
            { type: 'ENTP', title: 'The Debater', description: 'Smart and curious thinkers' },
            { type: 'ISFJ', title: 'The Defender', description: 'Dedicated and warm protectors' },
            { type: 'ESTJ', title: 'The Executive', description: 'Excellent administrators' },
            { type: 'ISFP', title: 'The Adventurer', description: 'Flexible and charming artists' },
            { type: 'ESTP', title: 'The Entrepreneur', description: 'Smart and perceptive risk-takers' },
        ],
        enneagram: [
            { type: 'Type 1', title: 'The Reformer', description: 'Principled and perfectionistic' },
            { type: 'Type 2', title: 'The Helper', description: 'Generous and people-pleasing' },
            { type: 'Type 3', title: 'The Achiever', description: 'Success-oriented and pragmatic' },
            { type: 'Type 4', title: 'The Individualist', description: 'Sensitive and expressive' },
            { type: 'Type 5', title: 'The Investigator', description: 'Intense and innovative thinkers' },
            { type: 'Type 6', title: 'The Loyalist', description: 'Committed and security-oriented' },
            { type: 'Type 7', title: 'The Enthusiast', description: 'Busy and fun-loving' },
            { type: 'Type 8', title: 'The Challenger', description: 'Powerful and self-confident' },
            { type: 'Type 9', title: 'The Peacemaker', description: 'Easy-going and receptive' },
        ],
        disc: [
            { type: 'D-Style', title: 'Dominance', description: 'Direct and results-oriented' },
            { type: 'I-Style', title: 'Influence', description: 'Outgoing and enthusiastic' },
            { type: 'S-Style', title: 'Steadiness', description: 'Even-tempered and patient' },
            { type: 'C-Style', title: 'Conscientiousness', description: 'Analytical and precise' },
        ],
        temperament: [
            { type: 'Choleric', title: 'The Leader', description: 'Ambitious and purposeful natural leaders' },
            { type: 'Sanguine', title: 'The Socializer', description: 'Outgoing and naturally cheerful' },
            { type: 'Phlegmatic', title: 'The Peacemaker', description: 'Relaxed and adaptable' },
            { type: 'Melancholic', title: 'The Thinker', description: 'Deep and analytical perfectionists' },
        ],
        bigFive: [
            { type: 'High Openness', title: 'The Explorer', description: 'Curious and creative' },
            { type: 'High Conscientiousness', title: 'The Organizer', description: 'Responsible and organized' },
            { type: 'High Extraversion', title: 'The Energizer', description: 'Outgoing and energetic' },
            { type: 'High Agreeableness', title: 'The Diplomat', description: 'Cooperative and compassionate' },
        ]
    };

    const data = personaData[framework];
    if (!data) return null;

    return data.find(p => p.type === type) || null;
}
