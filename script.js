// Questionnaire data
const questions = [
    {
        id: 'release-planning',
        question: 'When you plan a release, how far ahead do you need to coordinate?',
        description: 'Think about the last time you shipped a feature. How much planning was involved?',
        options: [
            { value: 'quarter', label: 'Releases are planned a quarter ahead', description: 'Releases are big events that need extensive coordination', architecture: ['monolith'] },
            { value: 'month', label: 'Releases are planned a month or so ahead', description: 'Some coordination needed, but not too rigid', architecture: ['modular-monolith', 'soa'] },
            { value: 'week', label: 'Maybe a week, sometimes less', description: 'Releases happen more frequently with minimal coordination', architecture: ['soa', 'microservices'] },
            { value: 'whenever', label: 'Teams deploy whenever they want', description: 'Teams deploy independently, no coordination needed', architecture: ['microservices'] }
        ]
    },
    {
        id: 'bug-impact',
        question: 'When there\'s a bug in production, what happens?',
        description: 'Remember the last time something broke. What was the impact?',
        options: [
            { value: 'everything-stops', label: 'Everything stops working', description: 'The whole application goes down or becomes unusable', architecture: ['monolith'] },
            { value: 'feature-breaks', label: 'Just that feature breaks', description: 'Only the specific feature is affected, rest works fine', architecture: ['modular-monolith', 'soa', 'microservices'] },
            { value: 'barely-notice', label: 'Barely noticeable, other teams keep working', description: 'The issue is isolated and doesn\'t affect other teams', architecture: ['microservices'] }
        ]
    },
    {
        id: 'hotfix-strategy',
        question: 'When something breaks, what happens?',
        description: 'Think about the last production issue. What was the response?',
        options: [
            { value: 'rollback', label: 'The entire release gets rolled back', description: 'Everything reverts, teams figure it out later', architecture: ['monolith', 'modular-monolith'] },
            { value: 'hotfix', label: 'Hotfix deployed like nothing happened', description: 'Quick fix goes out, minimal disruption', architecture: ['soa', 'microservices'] },
            { value: 'disable-feature', label: 'That feature gets disabled, rest keeps running', description: 'The broken part is turned off, everything else continues', architecture: ['microservices'] }
        ]
    },
    {
        id: 'team-coordination',
        question: 'To change a feature, how many teams need to coordinate?',
        description: 'Think about the last feature change. How many meetings were needed?',
        options: [
            { value: 'everyone', label: 'Multiple teams need to coordinate', description: 'Changes require meetings, planning, and coordination across teams', architecture: ['monolith', 'soa'] },
            { value: 'one-team', label: 'One team, maybe a quick chat with another', description: 'Mostly independent, minimal coordination', architecture: ['modular-monolith', 'microservices'] },
            { value: 'solo', label: 'One team owns it completely', description: 'Changes happen without talking to anyone else', architecture: ['microservices'] }
        ]
    },
    {
        id: 'database-changes',
        question: 'When a database change is needed, who else needs to be notified?',
        description: 'Think about the last time the database structure changed',
        options: [
            { value: 'everyone-knows', label: 'Everyone needs to know immediately', description: 'Database changes affect multiple teams and require coordination', architecture: ['monolith', 'modular-monolith'] },
            { value: 'some-teams', label: 'A few teams need a heads up', description: 'Some coordination needed, but not everyone', architecture: ['soa'] },
            { value: 'nobody', label: 'Nobody, that team owns their data', description: 'Changes don\'t affect other teams', architecture: ['microservices'] }
        ]
    },
    {
        id: 'deployment-coordination',
        question: 'When Team A wants to deploy, do they need to wait for Team B?',
        description: 'Think about deployment day. Is it a coordinated effort?',
        options: [
            { value: 'always-wait', label: 'Yes, always. Deployments are synchronized', description: 'Teams deploy together or wait for each other', architecture: ['monolith', 'modular-monolith', 'soa'] },
            { value: 'sometimes', label: 'Sometimes, depends on what changed', description: 'Coordination needed for some changes, not all', architecture: ['soa'] },
            { value: 'never', label: 'Never. Teams deploy independently', description: 'Each team deploys on their own schedule', architecture: ['microservices'] }
        ]
    },
    {
        id: 'feature-discovery',
        question: 'When something happens in your system (like an order is placed), how do other parts find out?',
        description: 'Think about how information flows between different features',
        options: [
            { value: 'direct-call', label: 'They call each other directly', description: 'One part directly calls another when needed', architecture: ['request-response', 'monolith'] },
            { value: 'events', label: 'Events get published, others listen', description: 'Things happen via events that others can subscribe to', architecture: ['event-driven', 'microservices'] },
            { value: 'database', label: 'They check the database', description: 'Different parts read from shared data stores', architecture: ['monolith', 'modular-monolith'] }
        ]
    },
    {
        id: 'scaling-decisions',
        question: 'When traffic spikes, who decides to scale up?',
        description: 'Think about a busy day or a marketing campaign launch',
        options: [
            { value: 'team-decides', label: 'Teams decide and provision servers', description: 'Manual scaling decisions and infrastructure provisioning', architecture: ['traditional'] },
            { value: 'auto-scales', label: 'It just scales automatically', description: 'Cloud handles it, no one needs to think about it', architecture: ['serverless', 'microservices'] },
            { value: 'platform-team', label: 'Platform team handles it', description: 'Infrastructure team manages scaling', architecture: ['platform-managed', 'soa'] }
        ]
    }
];

// Architecture definitions
const architectures = {
    'monolith': {
        name: 'Monolith',
        description: 'A monolithic architecture where all components are tightly coupled and deployed together.',
        characteristics: [
            'Single deployment unit',
            'Shared codebase and database',
            'Tight coupling between components',
            'Easier to develop initially',
            'Can become complex as it grows'
        ]
    },
    'modular-monolith': {
        name: 'Modular Monolith',
        description: 'A monolith with clear module boundaries, but still deployed as a single unit.',
        characteristics: [
            'Single deployment unit',
            'Clear module boundaries',
            'Shared infrastructure',
            'Easier to evolve than pure monolith',
            'Good balance of simplicity and structure'
        ]
    },
    'soa': {
        name: 'Service-Oriented Architecture (SOA)',
        description: 'Multiple services that can be deployed independently, with shared ownership and infrastructure.',
        characteristics: [
            'Multiple deployable services',
            'Shared infrastructure and standards',
            'Service boundaries exist',
            'More flexibility than monolith',
            'Requires coordination between teams'
        ]
    },
    'microservices': {
        name: 'Microservices',
        description: 'Independent services with clear ownership, deployed separately with their own infrastructure.',
        characteristics: [
            'Independent deployment per service',
            'Single team ownership per service',
            'Network boundaries between services',
            'High autonomy and scalability',
            'Requires mature DevOps practices'
        ]
    },
    'event-driven': {
        name: 'Event-Driven Architecture',
        description: 'Your system uses events as the primary communication pattern. When something happens, it publishes events that other parts can react to asynchronously.',
        characteristics: [
            'Events are published when actions occur',
            'Components react to events independently',
            'Loose coupling between different parts',
            'High scalability and flexibility',
            'Asynchronous processing patterns'
        ]
    },
    'request-response': {
        name: 'Request-Response Architecture',
        description: 'Traditional synchronous communication pattern where components directly call each other.',
        characteristics: [
            'Synchronous communication',
            'Direct component calls',
            'Immediate responses',
            'Simpler to reason about',
            'Tighter coupling'
        ]
    },
    'traditional': {
        name: 'Traditional Deployment',
        description: 'Your team manages infrastructure, servers, and scaling manually.',
        characteristics: [
            'Full control over infrastructure',
            'Manual scaling decisions',
            'Team manages servers',
            'More operational overhead',
            'Greater flexibility'
        ]
    },
    'serverless': {
        name: 'Serverless Execution Model',
        description: 'Cloud provider manages infrastructure automatically, scaling based on demand.',
        characteristics: [
            'Automatic scaling',
            'Pay-per-use model',
            'No server management',
            'Reduced operational overhead',
            'Vendor lock-in considerations'
        ]
    },
    'platform-managed': {
        name: 'Platform-Managed Infrastructure',
        description: 'A dedicated platform team manages infrastructure, providing services to application teams.',
        characteristics: [
            'Centralized infrastructure management',
            'Platform team handles operations',
            'Application teams focus on features',
            'Consistent infrastructure patterns',
            'Requires strong platform team'
        ]
    },
    'hybrid': {
        name: 'Hybrid Communication',
        description: 'Your system uses both synchronous and asynchronous communication patterns.',
        characteristics: [
            'Mix of sync and async patterns',
            'Flexible communication',
            'Optimized for different use cases',
            'More complex to manage',
            'Best of both worlds'
        ]
    }
};

// State management
let currentQuestionIndex = 0;
let answers = {};
let architectureScores = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeQuestionnaire();
    setupEventListeners();
});

function initializeQuestionnaire() {
    showAllQuestions();
}

function setupEventListeners() {
    document.getElementById('restartBtn').addEventListener('click', () => {
        restartQuestionnaire();
    });
}

function showAllQuestions() {
    const container = document.getElementById('questionnaireContainer');
    
    let html = questions.map((question, qIndex) => `
        <div class="question-card">
            <h3>${question.question}</h3>
            <div class="options-container">
                ${question.options.map((option, optIndex) => `
                    <div class="option ${answers[question.id] === option.value ? 'selected' : ''}" 
                         data-question-id="${question.id}"
                         data-value="${option.value}">
                        <input type="radio" 
                               id="${question.id}-${optIndex}" 
                               name="${question.id}" 
                               value="${option.value}"
                               ${answers[question.id] === option.value ? 'checked' : ''}>
                        <label for="${question.id}-${optIndex}">
                            ${option.label}
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    html += '<button type="button" class="btn btn-primary" id="submitBtn">See Results</button>';
    
    container.innerHTML = html;
    
    // Add click handlers for all options
    container.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', (e) => {
            const questionId = option.dataset.questionId;
            const value = option.dataset.value;
            const radio = option.querySelector('input[type="radio"]');
            
            // Update UI for this question only
            const questionCard = option.closest('.question-card');
            questionCard.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            radio.checked = true;
            
            // Save answer
            answers[questionId] = value;
            updateSubmitButton();
        });
    });
    
    // Allow radio button clicks
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', (e) => {
            e.stopPropagation();
            const questionId = radio.name;
            const value = radio.value;
            answers[questionId] = value;
            
            // Update UI
            const questionCard = radio.closest('.question-card');
            questionCard.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            radio.closest('.option').classList.add('selected');
            updateSubmitButton();
        });
    });
    
    // Submit button handler
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!validateAllQuestions()) {
                alert('Please answer all questions before viewing results.');
                return;
            }
            
            showResults();
        });
    }
    
    updateSubmitButton();
}

function validateAllQuestions() {
    return questions.every(question => answers[question.id] !== undefined);
}

function updateSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const allAnswered = validateAllQuestions();
        submitBtn.disabled = !allAnswered;
        // Also update cursor style
        if (allAnswered) {
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.style.cursor = 'not-allowed';
        }
    }
}

function calculateArchitecture() {
    // Reset scores - focus on the 5 main architectures
    const targetArchitectures = ['monolith', 'modular-monolith', 'soa', 'microservices', 'event-driven'];
    architectureScores = {
        'monolith': 0,
        'modular-monolith': 0,
        'soa': 0,
        'microservices': 0,
        'event-driven': 0
    };
    
    // Question weights - some questions are more important indicators
    const questionWeights = {
        'release-planning': 2,      // High importance - deployment independence
        'deployment-coordination': 2, // High importance - deployment independence
        'team-coordination': 1.5,    // Medium-high - ownership
        'database-changes': 1.5,     // Medium-high - data ownership
        'bug-impact': 1,             // Medium - failure isolation
        'hotfix-strategy': 1,        // Medium - operational flexibility
        'feature-discovery': 1.5,    // Medium-high - communication pattern
        'scaling-decisions': 0.5     // Low - infrastructure detail
    };
    
    // Score each answer
    questions.forEach(question => {
        const answer = answers[question.id];
        if (answer) {
            const selectedOption = question.options.find(opt => opt.value === answer);
            if (selectedOption && selectedOption.architecture) {
                const weight = questionWeights[question.id] || 1;
                selectedOption.architecture.forEach(arch => {
                    if (targetArchitectures.includes(arch)) {
                        architectureScores[arch] = (architectureScores[arch] || 0) + weight;
                    }
                });
            }
        }
    });
    
    // Special rules for event-driven architecture
    // If events are the primary communication pattern, boost event-driven score
    if (answers['feature-discovery'] === 'events') {
        architectureScores['event-driven'] += 2;
        // If also has independent deployments, it's likely event-driven microservices
        if (answers['deployment-coordination'] === 'never' || answers['deployment-coordination'] === 'sometimes') {
            architectureScores['event-driven'] += 1;
        }
    }
    
    // Decision rules to distinguish between similar architectures
    
    // Monolith vs Modular Monolith
    // If deployments are coordinated but failures are isolated, likely modular monolith
    if (answers['deployment-coordination'] === 'always-wait' && 
        answers['bug-impact'] === 'feature-breaks') {
        architectureScores['modular-monolith'] += 1.5;
        architectureScores['monolith'] -= 0.5;
    }
    
    // SOA vs Microservices
    // Key differentiator: independent deployments and single team ownership = microservices
    if (answers['deployment-coordination'] === 'never' && 
        answers['team-coordination'] === 'solo') {
        architectureScores['microservices'] += 2;
        architectureScores['soa'] -= 1;
    }
    
    // If deployments are independent but teams coordinate = SOA
    if (answers['deployment-coordination'] === 'sometimes' && 
        answers['team-coordination'] === 'everyone') {
        architectureScores['soa'] += 1.5;
        architectureScores['microservices'] -= 0.5;
    }
    
    // Database ownership is a strong indicator
    if (answers['database-changes'] === 'nobody') {
        architectureScores['microservices'] += 1.5;
    } else if (answers['database-changes'] === 'everyone-knows') {
        architectureScores['monolith'] += 1;
        architectureScores['modular-monolith'] += 0.5;
    }
    
    // Final decision: Check if event-driven should override
    // If event-driven score is high and communication is event-based, prioritize it
    const eventDrivenScore = architectureScores['event-driven'];
    const maxOtherScore = Math.max(
        architectureScores['monolith'],
        architectureScores['modular-monolith'],
        architectureScores['soa'],
        architectureScores['microservices']
    );
    
    // If event-driven is significantly higher, it's the primary pattern
    // Otherwise, it's a communication pattern layered on top of another architecture
    let primaryArch = null;
    let maxScore = 0;
    
    // First, find the base architecture (excluding event-driven)
    const baseArchitectures = ['monolith', 'modular-monolith', 'soa', 'microservices'];
    let baseArch = null;
    let baseScore = 0;
    
    for (const arch of baseArchitectures) {
        if (architectureScores[arch] > baseScore) {
            baseScore = architectureScores[arch];
            baseArch = arch;
        }
    }
    
    // If event-driven is the dominant pattern (score is 2+ higher than base), use it
    // Otherwise, use the base architecture and note event-driven as a characteristic
    if (eventDrivenScore >= baseScore + 2 && answers['feature-discovery'] === 'events') {
        primaryArch = 'event-driven';
        maxScore = eventDrivenScore;
    } else {
        primaryArch = baseArch || 'monolith';
        maxScore = baseScore;
    }
    
    // Get top architectures for display
    const sortedArchs = Object.entries(architectureScores)
        .filter(([arch]) => targetArchitectures.includes(arch))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([arch]) => arch);
    
    return {
        primary: primaryArch,
        top: sortedArchs,
        scores: architectureScores,
        isEventDriven: answers['feature-discovery'] === 'events' && eventDrivenScore > 0
    };
}

function showResults() {
    const result = calculateArchitecture();
    const primaryArch = architectures[result.primary];
    const resultCard = document.getElementById('resultCard');
    const questionnaireContainer = document.getElementById('questionnaireContainer');
    const resultContainer = document.getElementById('resultContainer');
    
    // Hide questionnaire
    questionnaireContainer.style.display = 'none';
    
    // Show results
    resultContainer.style.display = 'block';
    
    // Build result HTML
    let resultHTML = `
        <div class="architecture-type">${primaryArch.name}</div>
        <div class="description">${primaryArch.description}</div>
    `;
    
    // If event-driven is significant but not primary, mention it
    if (result.isEventDriven && result.primary !== 'event-driven' && 
        result.scores['event-driven'] > 2) {
        resultHTML += `
            <div style="margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.15); border-radius: 10px;">
                <strong>Note:</strong> Your system also uses event-driven communication patterns.
            </div>
        `;
    }
    
    resultHTML += `
        <div class="characteristics">
            <h4>Key Characteristics:</h4>
            <ul>
                ${primaryArch.characteristics.map(char => `<li>${char}</li>`).join('')}
            </ul>
        </div>
    `;
    
    resultCard.innerHTML = resultHTML;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartQuestionnaire() {
    answers = {};
    architectureScores = {};
    
    document.getElementById('questionnaireContainer').style.display = 'block';
    document.getElementById('resultContainer').style.display = 'none';
    
    initializeQuestionnaire();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

