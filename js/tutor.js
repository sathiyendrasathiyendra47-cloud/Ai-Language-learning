/**
 * AI Practice Partner engine for A1 English learners with Tamil scaffolding
 * Based on 02_Prompt_Library/prompts.md
 */

export class TutorEngine {
  constructor() {
    this.apiKey = localStorage.getItem('allc_gemini_key') || '';
    this.scenarios = {
      greetings: {
        id: 'greetings',
        name: 'Greetings & Introductions (வணக்கம் & அறிமுகம்)',
        day: 2,
        aiOpening: "Hello! Welcome to our English practice. My name is Priya, your English partner. What is your name? (வணக்கம்! உங்கள் பெயர் என்ன?)",
        systemPrompt: "Act as a friendly English teacher for an A1 beginner whose support language is Tamil. Topic: Greetings and introductions.",
        hints: ["My name is [Your Name].", "Nice to meet you!", "Hello, I am [Your Name]."]
      },
      routine: {
        id: 'routine',
        name: 'Daily Routine (தினசரி வழக்கம்)',
        day: 5,
        aiOpening: "Good day! Let's talk about your daily routine. What time do you wake up every morning? (நீங்கள் தினமும் காலையில் எத்தனை மணிக்கு எழுவீர்கள்?)",
        systemPrompt: "Act as a friendly English teacher for an A1 beginner whose support language is Tamil. Topic: Daily routine using simple present tense.",
        hints: ["I wake up at 6:00 AM.", "I brush my teeth and drink coffee.", "I go to work / college."]
      },
      questions: {
        id: 'questions',
        name: 'Asking Questions (வினா அமைப்புகள்)',
        day: 6,
        aiOpening: "Hello! Today we practise asking questions with Who, What, Where, When, and Why. Ask me any question about my hobbies! (என் விருப்பங்களைப் பற்றி ஒரு கேள்வி கேளுங்கள்!)",
        systemPrompt: "Topic: Question formation. Pay attention to auxiliary verb inversion (e.g. Where are you going).",
        hints: ["What do you like to do?", "Where do you live?", "When do you read books?"]
      },
      shopping: {
        id: 'shopping',
        name: 'Shopping Roleplay (பொருட்கள் வாங்குதல்)',
        day: 8,
        aiOpening: "Welcome to Fresh Market! How can I help you today? (வணக்கம்! இன்று உங்களுக்கு என்ன பொருட்கள் வேண்டும்?)",
        systemPrompt: "Topic: In a shop. Role-play shopkeeper and customer. Ask prices and quantities.",
        hints: ["How much is this apple?", "I want one kilo of apples, please.", "Do you have fresh milk?"]
      },
      food: {
        id: 'food',
        name: 'Food & Dining (உணவு ஆர்டர் செய்தல்)',
        day: 9,
        aiOpening: "Welcome to Sun Cafe! Are you ready to order lunch? What would you like to eat? (வணக்கம்! மதிய உணவு என்ன சாப்பிட விரும்புகிறீர்கள்?)",
        systemPrompt: "Topic: Ordering food politely using 'I would like' and 'Please'.",
        hints: ["I would like vegetable rice, please.", "Can I have a glass of water?", "Is this dish spicy?"]
      },
      directions: {
        id: 'directions',
        name: 'Directions & Places (வழி கேட்டல்)',
        day: 10,
        aiOpening: "Excuse me! I am new to this town. Can you tell me where the nearest bus stop is? (மன்னிக்கவும்! பேருந்து நிறுத்தம் எங்குள்ளது என்று கூற முடியுமா?)",
        systemPrompt: "Topic: Asking for and giving directions. Words: left, right, straight, near.",
        hints: ["Go straight and turn left.", "The bus stop is near the station.", "It is across the street."]
      },
      free: {
        id: 'free',
        name: 'Free 5-Minute Conversation (சுய உரையாடல்)',
        day: 13,
        aiOpening: "Hello my friend! Today is our free conversation day. Tell me, how was your day today and what are you learning? (இன்று உங்கள் நாள் எப்படி இருந்தது?)",
        systemPrompt: "Topic: Free friendly conversation for A1 English. Keep answers simple and encouraging.",
        hints: ["Today was a good day.", "I am learning English with you.", "I like watching movies and reading."]
      }
    };
  }

  // Built-in rule-based grammar and pedagogical analyzer
  analyzeGrammar(input) {
    const text = input.trim();
    const lower = text.toLowerCase().replace(/[.,!?;:]/g, '');
    const tokens = lower.split(/\s+/);

    const issues = [];

    // Rule 1: Subject-verb agreement (he go, she go, it go)
    if (/\b(he|she|it)\s+(go|like|want|play|eat|drink|work|live)\b/i.test(text)) {
      const match = text.match(/\b(he|she|it)\s+(go|like|want|play|eat|drink|work|live)\b/i);
      const sub = match[1];
      const verb = match[2];
      const fixed = verb === 'go' ? 'goes' : verb + 's';
      issues.push({
        type: 'Subject-Verb Agreement',
        bad: `${sub} ${verb}`,
        good: `${sub} ${fixed}`,
        rule: `In simple present, third-person singular (${sub}) requires verb + -s/-es.`,
        tamil: `நிகழ்காலத்தில் '${sub}' வரும்போது வினைச்சொல்லுடன் -s அல்லது -es சேர்க்க வேண்டும் (எ.கா: ${sub} ${fixed}).`
      });
    }

    // Rule 2: "I am go" or "I am wake up"
    if (/\b(i am|he is|she is|they are|we are)\s+(go|wake|eat|drink|sleep|work|study)\b/i.test(text)) {
      const match = text.match(/\b(i am|he is|she is|they are|we are)\s+(\w+)\b/i);
      issues.push({
        type: 'Auxiliary Verb Clash',
        bad: match[0],
        good: `${match[1]} ${match[2]}ing (or use simple present without 'am/is/are')`,
        rule: "Do not combine 'am/is/are' with a base verb. Use continuous (-ing) or simple present alone.",
        tamil: "'am/is/are' உடன் அடிப்படை வினைச்சொல்லை சேர்க்கக்கூடாது. ஒன்று 'I go' என கூறவும், அல்லது 'I am going' என கூறவும்."
      });
    }

    // Rule 3: "She don't" / "He don't"
    if (/\b(he|she|it)\s+(don't|do not)\b/i.test(text)) {
      issues.push({
        type: 'Negative Auxiliary',
        bad: "don't with he/she/it",
        good: "doesn't (does not)",
        rule: "Use 'doesn't' with third-person singular subjects (he, she, it).",
        tamil: "'He/She/It' வரும்போது 'don't' பதிலாக 'doesn't' (does not) பயன்படுத்த வேண்டும்."
      });
    }

    // Rule 4: "They is" / "We is"
    if (/\b(they|we|you)\s+is\b/i.test(text)) {
      issues.push({
        type: 'Plural Verb Agreement',
        bad: "They/We is",
        good: "They/We are",
        rule: "Plural pronouns require plural auxiliary 'are', not 'is'.",
        tamil: "பன்மை எழுவாயான They/We உடன் 'are' மட்டுமே பயன்படுத்த வேண்டும்."
      });
    }

    // Rule 5: "a apple" / "a orange"
    if (/\ba\s+([aeiou]\w+)/i.test(text)) {
      const match = text.match(/\ba\s+([aeiou]\w+)/i);
      issues.push({
        type: 'Indefinite Article',
        bad: match[0],
        good: `an ${match[1]}`,
        rule: "Use 'an' before words starting with vowel sounds (a, e, i, o, u).",
        tamil: "உயிரொலியில் தொடங்கும் வார்த்தைகளுக்கு முன் 'a' பதிலாக 'an' பயன்படுத்த வேண்டும்."
      });
    }

    // Rule 6: "didn't went"
    if (/\b(didn't|did not)\s+(\w+ed|went|saw|ate|came)\b/i.test(text)) {
      issues.push({
        type: 'Double Past Tense',
        bad: "didn't + past verb",
        good: "didn't + base verb (e.g. didn't go)",
        rule: "'Did' already indicates past tense. The main verb must be in its base form.",
        tamil: "'didn't' வந்தவுடன் கடந்த கால சொல் வரக்கூடாது. அடிப்படை சொல் (go/see) மட்டுமே வர வேண்டும்."
      });
    }

    // Rule 7: "Where you are going" (question without inversion)
    if (/\b(where|what|when|why|who|how)\s+(you are|he is|she is|they are)\b/i.test(text) && text.includes('?')) {
      const match = text.match(/\b(where|what|when|why|who|how)\s+(\w+)\s+(\w+)\b/i);
      issues.push({
        type: 'Question Inversion',
        bad: `${match[1]} ${match[2]} ${match[3]}`,
        good: `${match[1]} ${match[3]} ${match[2]}?`,
        rule: "Direct questions require subject-auxiliary inversion (e.g. 'Where are you...?').",
        tamil: "கேள்வி கேட்கும்போது துணைவினை எழுவாய்க்கு முன்னால் வர வேண்டும் (எ.கா: Where are you going?)."
      });
    }

    // Rule 8: "can to"
    if (/\bcan\s+to\s+(\w+)/i.test(text)) {
      const match = text.match(/\bcan\s+to\s+(\w+)/i);
      issues.push({
        type: 'Modal Verb Structure',
        bad: match[0],
        good: `can ${match[1]}`,
        rule: "Modal verbs like 'can' are followed directly by base verb without 'to'.",
        tamil: "'Can' என்ற சொல்லுக்கு பின் 'to' இல்லாமல் நேரடி வினைச்சொல் மட்டுமே வரவேண்டும்."
      });
    }

    return issues;
  }

  // Generates contextual simulated partner response tailored for A1
  generatePartnerReply(scenarioId, userText, history = []) {
    const issues = this.analyzeGrammar(userText);
    const textLower = userText.toLowerCase();

    let correctionFeedback = null;
    if (issues.length > 0) {
      const primaryIssue = issues[0];
      correctionFeedback = {
        hasError: true,
        original: userText,
        correctionHint: primaryIssue.good,
        rule: primaryIssue.rule,
        tamilExplanation: primaryIssue.tamil
      };
    }

    // Generate responsive teacher turn
    let aiResponse = "";
    let naturalExample = "";

    if (scenarioId === 'greetings') {
      if (textLower.includes('my name is') || textLower.includes('i am')) {
        aiResponse = "Pleasure to meet you! How are you feeling today? Are you happy to learn English? (உங்களைச் சந்தித்ததில் மகிழ்ச்சி! இன்று உங்கள் நாள் எப்படி இருக்கிறது?)";
        naturalExample = "Example: I am fine, thank you! (நான் நலமாக உள்ளேன், நன்றி!)";
      } else if (textLower.includes('fine') || textLower.includes('good') || textLower.includes('happy')) {
        aiResponse = "That is wonderful to hear! Where are you from? (நீங்கள் எந்த ஊரிலிருந்து வருகிறீர்கள்?)";
        naturalExample = "Example: I am from Chennai. (நான் சென்னையிலிருந்து வருகிறேன்.)";
      } else {
        aiResponse = "Thank you for sharing! Could you tell me: What do you do? Are you a student or working? (நீங்கள் என்ன செய்கிறீர்கள்? மாணவரா அல்லது பணிபுரிகிறீர்களா?)";
        naturalExample = "Example: I am a student. / I work in an office.";
      }
    } else if (scenarioId === 'routine') {
      if (textLower.includes('wake') || textLower.includes('clock') || textLower.includes('morning') || textLower.includes('am')) {
        aiResponse = "Great! That is an early start. What do you usually have for breakfast? (காலை உணவாக பொதுவாக என்ன சாப்பிடுவீர்கள்?)";
        naturalExample = "Example: I eat idli and drink tea. (நான் இட்லி சாப்பிடுகிறேன் மற்றும் டீ குடிக்கிறேன்.)";
      } else if (textLower.includes('eat') || textLower.includes('tea') || textLower.includes('coffee') || textLower.includes('food')) {
        aiResponse = "Delicious! And what time do you usually sleep at night? (இரவில் எத்தனை மணிக்கு தூங்குவீர்கள்?)";
        naturalExample = "Example: I sleep at 10:00 PM. (நான் இரவு 10 மணிக்கு தூங்குகிறேன்.)";
      } else {
        aiResponse = "Very good routine! Do you like to read books or watch TV in the evening? (மாலையில் புத்தகம் படிக்க அல்லது டிவி பார்க்க பிடிக்குமா?)";
        naturalExample = "Example: I like to read books. (எனக்கு புத்தகம் படிக்க பிடிக்கும்.)";
      }
    } else if (scenarioId === 'shopping') {
      if (textLower.includes('how much') || textLower.includes('price') || textLower.includes('cost')) {
        aiResponse = "These fresh apples are 120 rupees per kilogram. How many kilograms would you like to buy? (ஒரு கிலோ ஆப்பிள் 120 ரூபாய். எத்தனை கிலோ வேண்டும்?)";
        naturalExample = "Example: Please give me one kilogram. (எனக்கு ஒரு கிலோ கொடுங்கள்.)";
      } else if (textLower.includes('kilo') || textLower.includes('one') || textLower.includes('two') || textLower.includes('give')) {
        aiResponse = "Here you go! One kilogram of fresh apples. Anything else for you today, like milk or bread? (இதோ உங்கள் ஆப்பிள்! வேறு ஏதேனும் பால் அல்லது பிரெட் வேண்டுமா?)";
        naturalExample = "Example: No thank you, that is all. (இல்லை நன்றி, இது போதும்.)";
      } else {
        aiResponse = "Your total bill is 120 rupees. Will you pay with cash or card? (மொத்தம் 120 ரூபாய். பணம் பணமாகவா அல்லது கார்டு மூலமாகவா?)";
        naturalExample = "Example: I will pay with cash. (நான் ரொக்கமாக செலுத்துகிறேன்.)";
      }
    } else if (scenarioId === 'food') {
      if (textLower.includes('like') || textLower.includes('want') || textLower.includes('rice') || textLower.includes('menu')) {
        aiResponse = "Excellent choice! Would you like some cold water or hot tea to drink with that? (அதனுடன் குடிக்க குளிர்ந்த தண்ணீர் வேண்டுமா அல்லது சூடான டீ வேண்டுமா?)";
        naturalExample = "Example: I would like a glass of water, please. (தயவுசெய்து ஒரு டம்ளர் தண்ணீர் கொடுங்கள்.)";
      } else if (textLower.includes('water') || textLower.includes('tea') || textLower.includes('coffee')) {
        aiResponse = "Right away! Your food will arrive in 10 minutes. Enjoy your meal! (உடனடியாக கொண்டு வருகிறேன். உணவு பத்து நிமிடங்களில் வரும்!)";
        naturalExample = "Example: Thank you very much! (மிக்க நன்றி!)";
      } else {
        aiResponse = "Is the food tasty and good? (உணவு சுவையாகவும் நன்றாக உள்ளதா?)";
        naturalExample = "Example: Yes, the food is very good! (ஆம், உணவு மிகவும் அருமையாக உள்ளது!)";
      }
    } else if (scenarioId === 'directions') {
      if (textLower.includes('bus') || textLower.includes('stop') || textLower.includes('where')) {
        aiResponse = "The bus stop is just two minutes away! Walk straight and turn right at the bakery. Did you see the big tree? (நேராக நடந்து பேக்கரி அருகே வலதுபுறம் திரும்புங்கள்.)";
        naturalExample = "Example: Yes, I see the tree. Thank you! (ஆம், நான் அந்த மரத்தைப் பார்க்கிறேன். நன்றி!)";
      } else {
        aiResponse = "You are very welcome! Is there any other place you are searching for today? (இன்று வேறு ஏதேனும் இடத்தை தேடுகிறீர்களா?)";
        naturalExample = "Example: Where is the railway station? (ரயில் நிலையம் எங்கே உள்ளது?)";
      }
    } else {
      // General or free conversation
      aiResponse = `That is great! You are expressing yourself well. Tell me more about what you like to do on weekends. (வார இறுதி நாட்களில் என்ன செய்ய பிடிக்கும் என்று சொல்லுங்கள்.)`;
      naturalExample = "Example: On Sunday, I visit my friends and relax. (ஞாயிற்றுக்கிழமைகளில் நான் நண்பர்களை சந்தித்து ஓய்வெடுக்கிறேன்.)";
    }

    return {
      reply: aiResponse,
      example: naturalExample,
      correction: correctionFeedback
    };
  }
}

export const tutorEngine = new TutorEngine();
