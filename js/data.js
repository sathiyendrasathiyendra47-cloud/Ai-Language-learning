/**
 * Data store derived directly from Capstone 4 Curriculum
 * AI Language Learning Companion for Beginners (A1 English + Tamil Support)
 */

export const APP_DATA = {
  meta: {
    title: "AI Language Learning Companion",
    targetLanguage: "English (A1 Beginner)",
    supportLanguage: "Tamil (தமிழ்)",
    duration: "14 Days",
    researchQuestion: "Can free AI tools act as a safe and accurate practice partner for basic English conversation?"
  },

  // 14-Day Practice Plan (from 01_Practice_Plan/practice_plan.md)
  planDays: [
    {
      day: 1,
      title: "Baseline Assessment",
      topic: "Self-Introduction & Diagnostic Quiz",
      activity: "Write 5 self-introduction sentences and complete the 10-question diagnostic quiz before practice.",
      evidence: "Day 1 baseline quiz score and self-intro transcript.",
      targetModule: "quiz",
      dailyChecklist: [
        "Take the 10-Question Diagnostic Quiz",
        "Draft 5 basic sentences introducing yourself",
        "Record your initial confidence rating (1-5)"
      ]
    },
    {
      day: 2,
      title: "Greetings & Polite Expressions",
      topic: "Basic Greetings (வணக்கம் & மரியாதைச் சொற்கள்)",
      activity: "Practise greetings, polite pleasantries (Hello, Good morning, How are you?) with the AI tutor.",
      evidence: "Chat conversation transcript with polite exchanges.",
      targetModule: "tutor",
      scenario: "greetings",
      dailyChecklist: [
        "Review 3 greeting words",
        "Exchange at least 5 messages with AI Partner",
        "Read aloud each polite phrase"
      ]
    },
    {
      day: 3,
      title: "Everyday Vocabulary",
      topic: "10 Essential A1 Words",
      activity: "Learn 10 everyday words with Tamil meanings and create 1 example sentence per word.",
      evidence: "Vocabulary notes and practice sentences.",
      targetModule: "vocab",
      dailyChecklist: [
        "Review all 10 vocabulary flashcards",
        "Listen to audio pronunciation for each word",
        "Write 3 original sentences using the new words"
      ]
    },
    {
      day: 4,
      title: "Core Grammar: Am, Is, Are",
      topic: "Verb 'To Be' in Present Tense",
      activity: "Practise sentence construction with am, is, and are with subject pronouns (I, he, she, it, we, they).",
      evidence: "Five corrected sentences tested in the Grammar Evaluator.",
      targetModule: "evaluator",
      dailyChecklist: [
        "Rule check: I am, He/She/It is, We/You/They are",
        "Test 5 sample sentences in the evaluator",
        "Check Tamil grammar explanations"
      ]
    },
    {
      day: 5,
      title: "Daily Routine",
      topic: "Simple Present Tense Description",
      activity: "Describe your typical daily routine (wake up, eat, study, sleep) using simple present verbs.",
      evidence: "Corrected daily routine paragraph.",
      targetModule: "tutor",
      scenario: "routine",
      dailyChecklist: [
        "List 4 routine actions in English",
        "Practice routine conversation with AI tutor",
        "Log any subject-verb agreement errors"
      ]
    },
    {
      day: 6,
      title: "Question Formation",
      topic: "5W Questions (Who, What, Where, When, Why)",
      activity: "Practise asking and answering direct questions with standard word order.",
      evidence: "Eight question-and-answer exchanges.",
      targetModule: "tutor",
      scenario: "questions",
      dailyChecklist: [
        "Observe inversion: Question word + auxiliary + subject + verb",
        "Ask 4 questions to the AI tutor",
        "Answer 4 questions asked by the AI tutor"
      ]
    },
    {
      day: 7,
      title: "Midpoint Review",
      topic: "Midpoint Milestone & Quiz Check",
      activity: "Review cumulative vocabulary and grammar; retake the diagnostic quiz to measure progress.",
      evidence: "Midpoint quiz score and review notes.",
      targetModule: "quiz",
      dailyChecklist: [
        "Retake the 10-Question Quiz",
        "Compare score against Day 1 baseline",
        "Review mistake log entries"
      ]
    },
    {
      day: 8,
      title: "Shopping Roleplay",
      topic: "In a Shop (பொருட்கள் வாங்குதல்)",
      activity: "Role-play a conversation in a grocery shop or market (asking prices, quantities, polite requests).",
      evidence: "Shop dialogue transcript.",
      targetModule: "tutor",
      scenario: "shopping",
      dailyChecklist: [
        "Practise: 'How much is this?', 'Can I have...?'",
        "Complete a 6-turn roleplay with AI shopkeeper",
        "Verify price inquiries and polite responses"
      ]
    },
    {
      day: 9,
      title: "Food & Dining",
      topic: "Ordering Food Politely (உணவு ஆர்டர் செய்தல்)",
      activity: "Practise ordering food politely using 'I would like...', 'Please', and asking for water or menu.",
      evidence: "Restaurant order dialogue transcript.",
      targetModule: "tutor",
      scenario: "food",
      dailyChecklist: [
        "Learn food ordering polite phrasing",
        "Roleplay ordering meal and water with AI",
        "Check pronunciation of food vocabulary"
      ]
    },
    {
      day: 10,
      title: "Giving & Asking Directions",
      topic: "Navigation Phrases (வழி கேட்டல்)",
      activity: "Ask for and give simple directions (Turn left, turn right, go straight, near the station).",
      evidence: "Direction dialogue notes.",
      targetModule: "tutor",
      scenario: "directions",
      dailyChecklist: [
        "Practise: 'Where is the bus stop / station?'",
        "Practice navigation dialogue with AI",
        "Record 1 spoken direction sentence"
      ]
    },
    {
      day: 11,
      title: "Grammar Correction Benchmark",
      topic: "Comparative Multi-AI Sentence Testing",
      activity: "Test the 10 standard benchmark sentences in ChatGPT, Gemini, and Claude; inspect differences.",
      evidence: "Completed Mistake Log entries with verification notes.",
      targetModule: "evaluator",
      dailyChecklist: [
        "Inspect all 10 benchmark sentences",
        "Compare outputs across ChatGPT, Gemini, Claude",
        "Add observations into the Mistake Log"
      ]
    },
    {
      day: 12,
      title: "Pronunciation Audio Lab",
      topic: "Speech Comparison & Voice Recording",
      activity: "Compare AI synthesized speech against native/reference audio; record your own pronunciation.",
      evidence: "Audio recordings and pronunciation rating.",
      targetModule: "audio",
      dailyChecklist: [
        "Listen to 5 benchmark audio sentences",
        "Record your voice for all 5 sentences",
        "Self-rate your clarity and syllable stress (1-5)"
      ]
    },
    {
      day: 13,
      title: "Free Conversation",
      topic: "5-Minute Fluent Beginner Chat",
      activity: "Engage in an unscripted 5-minute conversation with the AI tutor covering your hobbies and day.",
      evidence: "Chat transcript and self-reflection.",
      targetModule: "tutor",
      scenario: "free",
      dailyChecklist: [
        "Chat with AI tutor continuously for 5 minutes",
        "Try speaking answers via voice input",
        "Review grammar suggestions after conversation"
      ]
    },
    {
      day: 14,
      title: "Final Assessment & Demo",
      topic: "Day 14 Final Evaluation & Capstone Report",
      activity: "Take final assessment quiz, complete Before & After analysis, and generate final demo summary.",
      evidence: "Final scores, Before/After comparison report, Poster.",
      targetModule: "beforeAfter",
      dailyChecklist: [
        "Final Quiz attempt and record score",
        "Fill out Day 14 Before & After comparison",
        "View Capstone Final Demo Presentation Deck"
      ]
    }
  ],

  // 10 Core Vocabulary Words (from 05_Vocabulary_Sheet/vocabulary_sheet.csv)
  vocabularyWords: [
    {
      id: 1,
      english: "Hello",
      tamil: "வணக்கம்",
      phonetic: "hə-ˈlō (ஹலோ)",
      exampleSentence: "Hello, how are you?",
      tamilTranslation: "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?",
      usageNote: "General greeting used at any time of day.",
      category: "Greetings",
      verified: true
    },
    {
      id: 2,
      english: "Water",
      tamil: "தண்ணீர்",
      phonetic: "ˈwɔː-tər (வாட்டர்)",
      exampleSentence: "I drink water.",
      tamilTranslation: "நான் தண்ணீர் குடிக்கிறேன்.",
      usageNote: "Common everyday noun. Essential for dining and health.",
      category: "Daily Life",
      verified: true
    },
    {
      id: 3,
      english: "Food",
      tamil: "உணவு",
      phonetic: "fuːd (ஃபுட்)",
      exampleSentence: "The food is good.",
      tamilTranslation: "உணவு நன்றாக உள்ளது.",
      usageNote: "General word for food or meals.",
      category: "Daily Life",
      verified: true
    },
    {
      id: 4,
      english: "Friend",
      tamil: "நண்பர்",
      phonetic: "frend (ஃபிரண்ட்)",
      exampleSentence: "He is my friend.",
      tamilTranslation: "அவர் என் நண்பர்.",
      usageNote: "Wording can vary by context and register (தோழன் / நண்பர்).",
      category: "Social",
      verified: true
    },
    {
      id: 5,
      english: "School",
      tamil: "பள்ளி",
      phonetic: "skuːl (ஸ்கூல்)",
      exampleSentence: "I go to school.",
      tamilTranslation: "நான் பள்ளிக்குச் செல்கிறேன்.",
      usageNote: "Place of learning; used with 'to' for attendance.",
      category: "Places",
      verified: true
    },
    {
      id: 6,
      english: "Book",
      tamil: "புத்தகம்",
      phonetic: "bʊk (புக்)",
      exampleSentence: "This is my book.",
      tamilTranslation: "இது என் புத்தகம்.",
      usageNote: "Common physical or digital reading item.",
      category: "Objects",
      verified: true
    },
    {
      id: 7,
      english: "House",
      tamil: "வீடு",
      phonetic: "haʊs (ஹவுஸ்)",
      exampleSentence: "My house is small.",
      tamilTranslation: "என் வீடு சிறியது.",
      usageNote: "Dwelling building. Note difference from 'home' (feeling of belonging).",
      category: "Places",
      verified: true
    },
    {
      id: 8,
      english: "Happy",
      tamil: "மகிழ்ச்சியாக",
      phonetic: "ˈhæp-i (ஹேப்பி)",
      exampleSentence: "I am happy.",
      tamilTranslation: "நான் மகிழ்ச்சியாக இருக்கிறேன்.",
      usageNote: "Natural adjective / adverbial form in Tamil for emotional state.",
      category: "Feelings",
      verified: true
    },
    {
      id: 9,
      english: "Learn",
      tamil: "கற்றுக்கொள்",
      phonetic: "lɜːrn (லேர்ன்)",
      exampleSentence: "I learn English.",
      tamilTranslation: "நான் ஆங்கிலம் கற்றுக்கொள்கிறேன்.",
      usageNote: "Action verb; inflection changes according to tense and subject.",
      category: "Actions",
      verified: true
    },
    {
      id: 10,
      english: "Thank you",
      tamil: "நன்றி",
      phonetic: "θæŋk juː (தேங்க் யூ)",
      exampleSentence: "Thank you for your help.",
      tamilTranslation: "உங்கள் உதவிக்கு நன்றி.",
      usageNote: "Polite gratitude expression essential in everyday interactions.",
      category: "Social",
      verified: true
    }
  ],

  // 10 Common Test Sentences (from 03_AI_Tool_Testing/test_sentences.md)
  testSentences: [
    {
      no: 1,
      originalSentence: "He go to school every day.",
      status: "Incorrect",
      referenceCorrection: "He goes to school every day.",
      grammarRule: "Subject-verb agreement: third-person singular (he, she, it) in simple present takes -s or -es ('goes').",
      tamilTranslation: "அவர் தினமும் பள்ளிக்குச் செல்கிறார்.",
      chatgptOutput: "Correction: 'He goes to school every day.' Rule: In simple present tense with 'he', the verb takes '-es'. Tamil: அவர் தினமும் பள்ளிக்கு செல்கிறார்.",
      geminiOutput: "Corrected: 'He goes to school every day.' Subject-verb agreement requires 'goes' for third person singular. தமிழ் விளக்கம்: அவர் நாள்தோறும் பள்ளிக்குச் செல்கிறார்.",
      claudeOutput: "Standard correction: 'He goes to school every day.' Rule: Third-person singular requires -s/-es. தமிழ்: அவர் தினமும் பள்ளிக்கு போகிறார்.",
      notes: "Clear grammatical error. All three tools reliably identify subject-verb mismatch."
    },
    {
      no: 2,
      originalSentence: "I am go to college.",
      status: "Ambiguous / Context Dependent",
      referenceCorrection: "“I am going to college” (present continuous) or “I go to college” (habitual present).",
      grammarRule: "Auxiliary 'am' cannot be followed directly by base verb 'go'. Use present continuous ('am going') or simple present ('go').",
      tamilTranslation: "நான் கல்லூரிக்கு போகிறேன் / செல்கிறேன்.",
      chatgptOutput: "Depends on intent: 'I am going to college' (now/in progress) or 'I go to college' (regular habit). Tamil: நான் கல்லூரிக்கு செல்கிறேன்.",
      geminiOutput: "Incorrect as written. If describing routine: 'I go to college'. If right now: 'I am going to college'. தமிழ்: நான் கல்லூரிக்கு சென்று கொண்டிருக்கிறேன்.",
      claudeOutput: "Ambiguous intent. Suggests both: 1) 'I am going to college' (continuous), 2) 'I go to college' (habitual). தமிழ்: நான் கல்லூரி படிக்கிறேன்.",
      notes: "Crucial benchmark for ambiguity handling. Tools should explain both continuous and simple present interpretations."
    },
    {
      no: 3,
      originalSentence: "She don't like tea.",
      status: "Incorrect",
      referenceCorrection: "She doesn't like tea.",
      grammarRule: "Subject-verb agreement in negative present: third-person singular (she) takes 'does not' ('doesn't'), not 'do not' ('don't').",
      tamilTranslation: "அவருக்கு தேநீர் பிடிக்காது.",
      chatgptOutput: "Correction: 'She doesn't like tea.' Rule: Use 'doesn't' (does not) with third-person singular subjects. Tamil: அவளுக்கு டீ பிடிக்காது.",
      geminiOutput: "Corrected: 'She doesn't like tea.' 'She' takes 'does not' / 'doesn't' in negative present simple. தமிழ்: அவருக்கு தேநீர் பிடிப்பதில்லை.",
      claudeOutput: "Correction: 'She doesn't like tea.' Standard English requires 'does not' for she/he/it. தமிழ்: அவளுக்கு தேநீர் பிடிக்காது.",
      notes: "Standard negative auxiliary requirement."
    },
    {
      no: 4,
      originalSentence: "They is my friends.",
      status: "Incorrect",
      referenceCorrection: "They are my friends.",
      grammarRule: "Plural subject-verb agreement: plural pronoun 'they' requires plural verb 'are', not singular 'is'.",
      tamilTranslation: "அவர்கள் என் நண்பர்கள்.",
      chatgptOutput: "Correction: 'They are my friends.' Rule: Plural pronoun 'they' takes 'are'. Tamil: அவர்கள் என்னுடைய நண்பர்கள்.",
      geminiOutput: "Corrected: 'They are my friends.' 'They' is plural, so use 'are'. தமிழ் விளக்கம்: அவர்கள் என் நண்பர்கள் ஆவார்கள்.",
      claudeOutput: "Correction: 'They are my friends.' Plural subject 'they' matches plural 'are'. தமிழ்: அவர்கள் என் நண்பர்கள்.",
      notes: "Fundamental to-be verb distinction."
    },
    {
      no: 5,
      originalSentence: "I have a apple.",
      status: "Incorrect",
      referenceCorrection: "I have an apple.",
      grammarRule: "Article usage: use 'an' before words beginning with a vowel sound ('apple' starts with /æ/).",
      tamilTranslation: "என்னிடம் ஒரு ஆப்பிள் உள்ளது.",
      chatgptOutput: "Correction: 'I have an apple.' Rule: Use indefinite article 'an' before vowel sounds. Tamil: என்னிடம் ஒரு ஆப்பிள் இருக்கிறது.",
      geminiOutput: "Corrected: 'I have an apple.' 'Apple' starts with a vowel sound, so use 'an'. தமிழ்: என்னிடம் ஒரு ஆப்பிள் உள்ளது.",
      claudeOutput: "Correction: 'I have an apple.' Articles: 'an' precedes words with initial vowel sounds. தமிழ்: என்னிடம் ஆப்பிள் இருக்கிறது.",
      notes: "Phonetic article rule."
    },
    {
      no: 6,
      originalSentence: "Yesterday I go to market.",
      status: "Incorrect",
      referenceCorrection: "Yesterday I went to the market.",
      grammarRule: "Past tense: past time marker 'Yesterday' requires simple past tense 'went' and typically definite article 'the market'.",
      tamilTranslation: "நேற்று நான் சந்தைக்குச் சென்றேன்.",
      chatgptOutput: "Correction: 'Yesterday I went to the market.' Rule: 'Yesterday' indicates past time, requiring past tense 'went'. Tamil: நேற்று நான் சந்தைக்கு சென்றேன்.",
      geminiOutput: "Corrected: 'Yesterday I went to the market.' Use past tense 'went' for events completed yesterday. தமிழ்: நேற்று நான் மார்க்கெட்டுக்கு போனேன்.",
      claudeOutput: "Correction: 'Yesterday I went to the market.' Time adverb 'yesterday' mandates simple past 'went'. தமிழ்: நேற்று நான் சந்தைக்கு சென்றேன்.",
      notes: "Past tense inflection with temporal indicator."
    },
    {
      no: 7,
      originalSentence: "He is taller than me.",
      status: "Acceptable (Informal/Contemporary)",
      referenceCorrection: "“He is taller than me” (Standard conversational) / “He is taller than I am” (Formal/Traditional).",
      grammarRule: "Widely accepted in contemporary English. In highly formal or traditional grammar, 'than I am' is preferred.",
      tamilTranslation: "அவர் என்னை விட உயரமாக இருக்கிறார்.",
      chatgptOutput: "Acceptable in modern conversation. In strict formal grammar, 'He is taller than I' or 'than I am' is used. Tamil: அவன் என்னைவிட உயரமானவன்.",
      geminiOutput: "Acceptable in ordinary conversation. Formal alternative: 'He is taller than I am'. தமிழ்: அவர் என்னை விட உயரம்.",
      claudeOutput: "Acceptable as conversational English. In prescriptive formal contexts: 'He is taller than I am'. தமிழ்: அவர் என்னைவிட உயரமானவர்.",
      notes: "Crucial benchmark for over-correction! An AI tool should not penalize this as strictly wrong."
    },
    {
      no: 8,
      originalSentence: "I didn't went there.",
      status: "Incorrect",
      referenceCorrection: "I didn't go there.",
      grammarRule: "Double past tense error: negative auxiliary 'did' / 'didn't' carries the past tense, so main verb must be base form 'go'.",
      tamilTranslation: "நான் அங்கு செல்லவில்லை.",
      chatgptOutput: "Correction: 'I didn't go there.' Rule: After 'didn't', use base verb 'go', not past tense 'went'. Tamil: நான் அங்கு போகவில்லை.",
      geminiOutput: "Corrected: 'I didn't go there.' Do not use double past tense; 'did' already indicates past. தமிழ்: நான் அங்கே செல்லவில்லை.",
      claudeOutput: "Correction: 'I didn't go there.' Auxiliary 'did' takes bare infinitive 'go'. தமிழ்: நான் அங்கு போகவில்லை.",
      notes: "Common beginner double past marking."
    },
    {
      no: 9,
      originalSentence: "Where you are going?",
      status: "Incorrect (as direct question)",
      referenceCorrection: "Where are you going?",
      grammarRule: "Question word order: direct questions require inversion of auxiliary verb and subject ('are you', not 'you are').",
      tamilTranslation: "நீங்கள் எங்கே போகிறீர்கள்?",
      chatgptOutput: "Correction: 'Where are you going?' Rule: In direct questions, invert subject and verb ('are' before 'you'). Tamil: நீங்கள் எங்கு செல்கிறீர்கள்?",
      geminiOutput: "Corrected: 'Where are you going?' Standard direct question order places auxiliary verb 'are' before subject 'you'. தமிழ்: எங்கே போகிறீர்கள்?",
      claudeOutput: "Correction: 'Where are you going?' Standard direct questions require subject-verb inversion. தமிழ்: நீங்கள் எங்கே போகிறீர்கள்?",
      notes: "Subject-auxiliary inversion in WH-questions."
    },
    {
      no: 10,
      originalSentence: "I can to swim.",
      status: "Incorrect",
      referenceCorrection: "I can swim.",
      grammarRule: "Modal verbs: 'can' is followed by the bare infinitive (base form without 'to').",
      tamilTranslation: "என்னால் நீந்த முடியும்.",
      chatgptOutput: "Correction: 'I can swim.' Rule: Modal verbs like 'can' take base verb directly without 'to'. Tamil: என்னால் நீந்த முடியும்.",
      geminiOutput: "Corrected: 'I can swim.' Modal auxiliary 'can' does not take 'to'. தமிழ் விளக்கம்: எனக்கு நீச்சல் தெரியும் / என்னால் நீந்த முடியும்.",
      claudeOutput: "Correction: 'I can swim.' Modals are followed directly by base infinitive. தமிழ்: என்னால் நீந்த முடியும்.",
      notes: "Modal auxiliary + bare infinitive rule."
    }
  ],

  // 10-Question Quiz (from 06_Quiz/quiz.md)
  quizQuestions: [
    {
      id: 1,
      question: "Choose the correct sentence:",
      options: [
        { key: "A", text: "She go to school." },
        { key: "B", text: "She goes to school." },
        { key: "C", text: "She going to school." }
      ],
      correct: "B",
      ruleExplanation: "Third-person singular ('she') in simple present tense takes the -s/-es suffix ('goes').",
      tamilExplanation: "மூன்றாம் நபர் ஒருமைக்கு (She) நிகழ்காலத்தில் வினைச்சொல்லுடன் -es சேர வேண்டும் ('goes')."
    },
    {
      id: 2,
      question: "Fill in the blank: I ___ a student.",
      options: [
        { key: "A", text: "am" },
        { key: "B", text: "is" },
        { key: "C", text: "are" }
      ],
      correct: "A",
      ruleExplanation: "The first-person singular pronoun 'I' always pairs with the auxiliary verb 'am'.",
      tamilExplanation: "'I' (நான்) என்பதற்கு நிகழ்காலத்தில் 'am' மட்டுமே பயன்படுத்தப்பட வேண்டும்."
    },
    {
      id: 3,
      question: "Choose the correct article: ___ orange.",
      options: [
        { key: "A", text: "A" },
        { key: "B", text: "An" },
        { key: "C", text: "The an" }
      ],
      correct: "B",
      ruleExplanation: "'Orange' begins with an 'o' vowel sound (/ɒ/), so the indefinite article 'an' is required.",
      tamilExplanation: "'Orange' உயிரொலியில் தொடங்குவதால் 'an' பயன்படுத்த வேண்டும்."
    },
    {
      id: 4,
      question: "What is the simple past of “go”?",
      options: [
        { key: "A", text: "Goed" },
        { key: "B", text: "Going" },
        { key: "C", text: "Went" }
      ],
      correct: "C",
      ruleExplanation: "'Go' is an irregular verb. Its simple past tense form is 'went'.",
      tamilExplanation: "'Go' என்ற சொல்லின் இறந்தகால வடிவம் 'went' ஆகும்."
    },
    {
      id: 5,
      question: "Choose the correct sentence:",
      options: [
        { key: "A", text: "They are happy." },
        { key: "B", text: "They is happy." },
        { key: "C", text: "They am happy." }
      ],
      correct: "A",
      ruleExplanation: "The plural subject 'they' requires the plural auxiliary verb 'are'.",
      tamilExplanation: "பன்மை எழுவாயான 'They' உடன் 'are' மட்டுமே பொருந்தும்."
    },
    {
      id: 6,
      question: "What is the common Tamil meaning of “water”?",
      options: [
        { key: "A", text: "உணவு" },
        { key: "B", text: "தண்ணீர்" },
        { key: "C", text: "புத்தகம்" }
      ],
      correct: "B",
      ruleExplanation: "Water translates directly to தண்ணீர் in Tamil. உணவு means food, and புத்தகம் means book.",
      tamilExplanation: "Water என்பதன் தமிழ் சொல் 'தண்ணீர்'. உணவு = Food, புத்தகம் = Book."
    },
    {
      id: 7,
      question: "Complete the sentence: He doesn't ___ coffee.",
      options: [
        { key: "A", text: "likes" },
        { key: "B", text: "like" },
        { key: "C", text: "liking" }
      ],
      correct: "B",
      ruleExplanation: "After the negative auxiliary 'doesn't', the main verb must remain in its base form ('like').",
      tamilExplanation: "'doesn't' வந்த பிறகு வினைச்சொல்லின் அடிப்படை வடிவம் (like) மட்டுமே வர வேண்டும்."
    },
    {
      id: 8,
      question: "Choose the standard direct question:",
      options: [
        { key: "A", text: "Where you are going?" },
        { key: "B", text: "Where are you going?" },
        { key: "C", text: "Where going you are?" }
      ],
      correct: "B",
      ruleExplanation: "In a direct question, the auxiliary verb ('are') comes before the subject ('you').",
      tamilExplanation: "நேரடி வினாவில் துணைவினை (are) எழுவாய்க்கு (you) முன்பாக வரவேண்டும்."
    },
    {
      id: 9,
      question: "What is the Tamil meaning of “Thank you”?",
      options: [
        { key: "A", text: "நன்றி" },
        { key: "B", text: "வணக்கம்" },
        { key: "C", text: "மன்னிக்கவும்" }
      ],
      correct: "A",
      ruleExplanation: "'Thank you' means நன்றி. வணக்கம் is Hello, and மன்னிக்கவும் is Sorry/Excuse me.",
      tamilExplanation: "'Thank you' என்றால் 'நன்றி'. வணக்கம் = Hello, மன்னிக்கவும் = Sorry."
    },
    {
      id: 10,
      question: "Choose the correct sentence:",
      options: [
        { key: "A", text: "I can to swim." },
        { key: "B", text: "I can swimming." },
        { key: "C", text: "I can swim." }
      ],
      correct: "C",
      ruleExplanation: "Modal auxiliaries such as 'can' must be followed by the bare infinitive ('swim') without 'to'.",
      tamilExplanation: "'Can' என்ற துணைவினைக்கு பின் 'to' இல்லாமல் நேரடி வினைச்சொல் (swim) வரவேண்டும்."
    }
  ],

  // 5 Audio Pronunciation Benchmark Sentences (from 07_Audio_Samples/audio_comparison.md)
  audioSamples: [
    {
      id: 1,
      sentence: "Hello, how are you?",
      phonetic: "/həˈloʊ haʊ ɑːr juː/",
      keyFocus: "Rising intonation on question; smooth link between 'how' and 'are'.",
      tamilMeaning: "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?",
      tempo: "Moderate"
    },
    {
      id: 2,
      sentence: "My name is Arun.",
      phonetic: "/maɪ neɪm ɪz ˈɑːrʊn/",
      keyFocus: "Clear diphthong in 'name' (/eɪ/); voiced 's' in 'is' (/z/).",
      tamilMeaning: "என் பெயர் அருண்.",
      tempo: "Moderate"
    },
    {
      id: 3,
      sentence: "I am learning English.",
      phonetic: "/aɪ æm ˈlɜːrnɪŋ ˈɪŋɡlɪʃ/",
      keyFocus: "Vowel /ɜː/ in 'learning' and /ŋ/ sound in 'English'.",
      tamilMeaning: "நான் ஆங்கிலம் கற்றுக்கொள்கிறேன்.",
      tempo: "Moderate"
    },
    {
      id: 4,
      sentence: "Where is the bus stop?",
      phonetic: "/wɛər ɪz ðə bʌs stɒp/",
      keyFocus: "Soft 'th' (/ð/) in 'the'; crisp stop consonant /p/ at the end.",
      tamilMeaning: "பேருந்து நிறுத்தம் எங்கே இருக்கிறது?",
      tempo: "Moderate"
    },
    {
      id: 5,
      sentence: "Thank you for your help.",
      phonetic: "/θæŋk juː fɔːr jɔːr hɛlp/",
      keyFocus: "Voiceless /θ/ in 'Thank'; clear aspiration on /h/ in 'help'.",
      tamilMeaning: "உங்கள் உதவிக்கு நன்றி.",
      tempo: "Moderate"
    }
  ],

  // 30 Initial Mistake Log Records (matching 04_Mistake_Log/mistake_log.csv)
  initialMistakeLog: [
    { id: 1, sentenceNo: 1, tool: "ChatGPT", original: "He go to school every day.", correction: "He goes to school every day.", translation: "அவர் தினமும் பள்ளிக்கு செல்கிறார்.", errorFound: "No", errorType: "None", verified: "Corrected accurately", severity: "Minor", notes: "Clear explanation" },
    { id: 2, sentenceNo: 1, tool: "Gemini", original: "He go to school every day.", correction: "He goes to school every day.", translation: "அவர் நாள்தோறும் பள்ளிக்குச் செல்கிறார்.", errorFound: "No", errorType: "None", verified: "Corrected accurately", severity: "Minor", notes: "Accurate Tamil spelling" },
    { id: 3, sentenceNo: 1, tool: "Claude", original: "He go to school every day.", correction: "He goes to school every day.", translation: "அவர் தினமும் பள்ளிக்கு போகிறார்.", errorFound: "No", errorType: "None", verified: "Corrected accurately", severity: "Minor", notes: "Conversational Tamil phrasing" },
    { id: 4, sentenceNo: 2, tool: "ChatGPT", original: "I am go to college.", correction: "I am going to college / I go to college", translation: "நான் கல்லூரிக்கு செல்கிறேன்", errorFound: "No", errorType: "None", verified: "Captured both meanings", severity: "Minor", notes: "Identified dual context" },
    { id: 5, sentenceNo: 2, tool: "Gemini", original: "I am go to college.", correction: "I am going to college", translation: "நான் கல்லூரிக்கு சென்று கொண்டிருக்கிறேன்", errorFound: "Uncertain", errorType: "Context nuance", verified: "Only gave continuous form", severity: "Minor", notes: "Missed simple present routine interpretation" },
    { id: 6, sentenceNo: 2, tool: "Claude", original: "I am go to college.", correction: "I go to college / I am going to college", translation: "நான் கல்லூரி படிக்கிறேன்", errorFound: "No", errorType: "None", verified: "Identified habit vs ongoing action", severity: "Minor", notes: "Clear distinction" },
    { id: 7, sentenceNo: 3, tool: "ChatGPT", original: "She don't like tea.", correction: "She doesn't like tea.", translation: "அவளுக்கு டீ பிடிக்காது.", errorFound: "No", errorType: "None", verified: "Correct auxiliary", severity: "Minor", notes: "Used loanword டீ" },
    { id: 8, sentenceNo: 3, tool: "Gemini", original: "She don't like tea.", correction: "She doesn't like tea.", translation: "அவருக்கு தேநீர் பிடிப்பதில்லை.", errorFound: "No", errorType: "None", verified: "High politeness register", severity: "Minor", notes: "Formal தேநீர்" },
    { id: 9, sentenceNo: 3, tool: "Claude", original: "She don't like tea.", correction: "She doesn't like tea.", translation: "அவளுக்கு தேநீர் பிடிக்காது.", errorFound: "No", errorType: "None", verified: "Standard correction", severity: "Minor", notes: "Natural register" },
    { id: 10, sentenceNo: 4, tool: "ChatGPT", original: "They is my friends.", correction: "They are my friends.", translation: "அவர்கள் என்னுடைய நண்பர்கள்.", errorFound: "No", errorType: "None", verified: "Correct plural match", severity: "Minor", notes: "Accurate" },
    { id: 11, sentenceNo: 4, tool: "Gemini", original: "They is my friends.", correction: "They are my friends.", translation: "அவர்கள் என் நண்பர்கள் ஆவார்கள்.", errorFound: "No", errorType: "None", verified: "Literary suffix", severity: "Minor", notes: "ஆவார்கள் used in formal Tamil" },
    { id: 12, sentenceNo: 4, tool: "Claude", original: "They is my friends.", correction: "They are my friends.", translation: "அவர்கள் என் நண்பர்கள்.", errorFound: "No", errorType: "None", verified: "Crisp and natural", severity: "Minor", notes: "Best direct translation" },
    { id: 13, sentenceNo: 5, tool: "ChatGPT", original: "I have a apple.", correction: "I have an apple.", translation: "என்னிடம் ஒரு ஆப்பிள் இருக்கிறது.", errorFound: "No", errorType: "None", verified: "Vowel article rule", severity: "Minor", notes: "Accurate" },
    { id: 14, sentenceNo: 5, tool: "Gemini", original: "I have a apple.", correction: "I have an apple.", translation: "என்னிடம் ஒரு ஆப்பிள் உள்ளது.", errorFound: "No", errorType: "None", verified: "Vowel article rule", severity: "Minor", notes: "Accurate" },
    { id: 15, sentenceNo: 5, tool: "Claude", original: "I have a apple.", correction: "I have an apple.", translation: "என்னிடம் ஆப்பிள் இருக்கிறது.", errorFound: "No", errorType: "None", verified: "Vowel article rule", severity: "Minor", notes: "Omitted 'ஒரு', still valid" },
    { id: 16, sentenceNo: 6, tool: "ChatGPT", original: "Yesterday I go to market.", correction: "Yesterday I went to the market.", translation: "நேற்று நான் சந்தைக்கு சென்றேன்.", errorFound: "No", errorType: "None", verified: "Past tense 'went'", severity: "Minor", notes: "Accurate" },
    { id: 17, sentenceNo: 6, tool: "Gemini", original: "Yesterday I go to market.", correction: "Yesterday I went to the market.", translation: "நேற்று நான் மார்க்கெட்டுக்கு போனேன்.", errorFound: "No", errorType: "None", verified: "Colloquial transliteration", severity: "Minor", notes: "Used மார்க்கெட்" },
    { id: 18, sentenceNo: 6, tool: "Claude", original: "Yesterday I go to market.", correction: "Yesterday I went to the market.", translation: "நேற்று நான் சந்தைக்கு சென்றேன்.", errorFound: "No", errorType: "None", verified: "Pure Tamil word சந்தை", severity: "Minor", notes: "Culturally natural" },
    { id: 19, sentenceNo: 7, tool: "ChatGPT", original: "He is taller than me.", correction: "Acceptable as conversational (Formal: than I am)", translation: "அவன் என்னைவிட உயரமானவன்.", errorFound: "No", errorType: "None", verified: "Properly recognized informal acceptability", severity: "Minor", notes: "Did not falsely mark wrong" },
    { id: 20, sentenceNo: 7, tool: "Gemini", original: "He is taller than me.", correction: "Acceptable in modern English. Formal: than I am.", translation: "அவர் என்னை விட உயரம்.", errorFound: "No", errorType: "None", verified: "Balanced feedback", severity: "Minor", notes: "Clear register explanation" },
    { id: 21, sentenceNo: 7, tool: "Claude", original: "He is taller than me.", correction: "Acceptable conversational English.", translation: "அவர் என்னைவிட உயரமானவர்.", errorFound: "No", errorType: "None", verified: "Not marked as error", severity: "Minor", notes: "Respectful Tamil pronoun" },
    { id: 22, sentenceNo: 8, tool: "ChatGPT", original: "I didn't went there.", correction: "I didn't go there.", translation: "நான் அங்கு போகவில்லை.", errorFound: "No", errorType: "None", verified: "Eliminated double past", severity: "Minor", notes: "Accurate" },
    { id: 23, sentenceNo: 8, tool: "Gemini", original: "I didn't went there.", correction: "I didn't go there.", translation: "நான் அங்கே செல்லவில்லை.", errorFound: "No", errorType: "None", verified: "Base verb 'go'", severity: "Minor", notes: "Accurate" },
    { id: 24, sentenceNo: 8, tool: "Claude", original: "I didn't went there.", correction: "I didn't go there.", translation: "நான் அங்கு போகவில்லை.", errorFound: "No", errorType: "None", verified: "Bare infinitive", severity: "Minor", notes: "Accurate" },
    { id: 25, sentenceNo: 9, tool: "ChatGPT", original: "Where you are going?", correction: "Where are you going?", translation: "நீங்கள் எங்கு செல்கிறீர்கள்?", errorFound: "No", errorType: "None", verified: "Subject-verb inversion", severity: "Minor", notes: "Accurate direct question" },
    { id: 26, sentenceNo: 9, tool: "Gemini", original: "Where you are going?", correction: "Where are you going?", translation: "எங்கே போகிறீர்கள்?", errorFound: "No", errorType: "None", verified: "Inverted auxiliary", severity: "Minor", notes: "Concise Tamil phrasing" },
    { id: 27, sentenceNo: 9, tool: "Claude", original: "Where you are going?", correction: "Where are you going?", translation: "நீங்கள் எங்கே போகிறீர்கள்?", errorFound: "No", errorType: "None", verified: "Direct question order", severity: "Minor", notes: "Accurate" },
    { id: 28, sentenceNo: 10, tool: "ChatGPT", original: "I can to swim.", correction: "I can swim.", translation: "என்னால் நீந்த முடியும்.", errorFound: "No", errorType: "None", verified: "Removed 'to'", severity: "Minor", notes: "Accurate modal rule" },
    { id: 29, sentenceNo: 10, tool: "Gemini", original: "I can to swim.", correction: "I can swim.", translation: "எனக்கு நீச்சல் தெரியும்.", errorFound: "No", errorType: "None", verified: "Alternative natural Tamil expression", severity: "Minor", notes: "Idiomatic Tamil" },
    { id: 30, sentenceNo: 10, tool: "Claude", original: "I can to swim.", correction: "I can swim.", translation: "என்னால் நீந்த முடியும்.", errorFound: "No", errorType: "None", verified: "Bare verb following can", severity: "Minor", notes: "Accurate" }
  ],

  // Before & After Metrics (from 10_Before_After_Analysis/before_after_template.csv)
  beforeAfterMetrics: [
    {
      id: "grammarScore",
      name: "Grammar Quiz Score (out of 10)",
      day1: 4,
      day14: 9,
      unit: "/10",
      notes: "Significant mastery of subject-verb agreement and auxiliaries."
    },
    {
      id: "handledSentences",
      name: "Correctly Handled Sentences (out of 10)",
      day1: 3,
      day14: 9,
      unit: "/10",
      notes: "High awareness of double past tense and question inversion."
    },
    {
      id: "vocabRemembered",
      name: "Vocabulary Words Remembered",
      day1: 4,
      day14: 10,
      unit: "words",
      notes: "All 10 core A1 bilingual vocabulary words retained with correct spelling."
    },
    {
      id: "questionsAnswered",
      name: "Conversation Questions Answered",
      day1: 2,
      day14: 8,
      unit: "exchanges",
      notes: "Comfortably engaged in 5-minute unscripted conversation with AI partner."
    },
    {
      id: "pronunciationRating",
      name: "Pronunciation Self-Rating (out of 5)",
      day1: 2,
      day14: 4.5,
      unit: "/5 ★",
      notes: "Noticeable improvement in vowel clarity, stop consonants, and rhythm."
    }
  ],

  // Presentation Deck Slides (from 11_Final_Demo/demo_outline.md)
  demoSlides: [
    {
      slideNo: 1,
      title: "AI Language Learning Companion for Beginners",
      subtitle: "Capstone Project Demo & Research Findings",
      bullets: [
        "Target Language: English (CEFR A1 Beginner Level)",
        "Support Language: Tamil (தமிழ்)",
        "Structured 14-Day Practice Plan with daily measurable evidence",
        "Primary Goal: Empower beginner learners using accessible free AI tools"
      ]
    },
    {
      slideNo: 2,
      title: "Core Research Question",
      subtitle: "Investigation Framework",
      bullets: [
        "“Can free AI tools act as a safe and accurate practice partner for basic English conversation?”",
        "Tested across three leading AI models: ChatGPT, Gemini, and Claude",
        "Examined grammatical accuracy, pedagogical tone, and Tamil translation nuance",
        "Evaluated with objective criteria to avoid over-trust and hallucination risk"
      ]
    },
    {
      slideNo: 3,
      title: "14-Day Structured Practice Plan",
      subtitle: "Daily 20–30 Minute Routine",
      bullets: [
        "Phase 1 (Days 1–3): Baseline diagnostic, Greetings & Everyday Vocabulary",
        "Phase 2 (Days 4–7): Core grammar (am/is/are), Routines, Inverted Questions & Review",
        "Phase 3 (Days 8–10): Real-life situational roleplays (Shopping, Food, Directions)",
        "Phase 4 (Days 11–14): Multi-AI evaluation, Pronunciation lab, Free chat & Final assessment"
      ]
    },
    {
      slideNo: 4,
      title: "Standardized Prompt Engineering",
      subtitle: "Controlling AI Output for A1 Learners",
      bullets: [
        "Constrained prompt library with 6 targeted scenarios",
        "One question at a time to prevent cognitive overload",
        "Explicit request for Tamil explanations (எளிய தமிழ் விளக்கம்)",
        "Rule to avoid giving away answers before the learner attempts"
      ]
    },
    {
      slideNo: 5,
      title: "Three-Tool Comparative Testing",
      subtitle: "Benchmark Evaluation Across 10 Sentences",
      bullets: [
        "Identical 10 test sentences run on ChatGPT, Gemini, and Claude",
        "Grammar accuracy: 100% detection of clear errors across all three tools",
        "Ambiguity handling (Sentence 2: 'I am go to college'): ChatGPT and Claude excelled by providing both continuous and habitual forms",
        "Over-correction avoidance (Sentence 7: 'He is taller than me'): All three correctly recognized conversational acceptability"
      ]
    },
    {
      slideNo: 6,
      title: "Mistake Log & Verification Process",
      subtitle: "Rigorous 30-Entry Test Log",
      bullets: [
        "No fabricated outputs: verified by independent grammar and Tamil speaker checks",
        "Categorized by error type, severity, and register variation",
        "Observed difference in Tamil tone: Gemini leaned formal (தேநீர், ஆவார்கள்), while ChatGPT and Claude used natural conversational registers",
        "Exportable evidence spreadsheet supporting academic audit"
      ]
    },
    {
      slideNo: 7,
      title: "Bilingual Vocabulary & Illustrated Poster",
      subtitle: "Visual & Phonetic Retention",
      bullets: [
        "10 core everyday words mapped between English and Tamil",
        "Phonetic pronunciation tips adapted for Tamil phonology",
        "Interactive digital flashcards and printable visual poster",
        "Pre-verified translations to prevent AI graphic rendering errors"
      ]
    },
    {
      slideNo: 8,
      title: "Audio Pronunciation Lab",
      subtitle: "TTS Synthesis vs. Human Speech Comparison",
      bullets: [
        "5 benchmark test phrases evaluated for consonant articulation and intonation",
        "Speech synthesis allows adjustable speed (0.8x) for beginners",
        "Browser-based audio recorder allows learners to capture and review their speech",
        "Self-rating on word stress, pause duration, and clarity"
      ]
    },
    {
      slideNo: 9,
      title: "Before & After Measured Progress",
      subtitle: "Day 1 Baseline vs. Day 14 Final",
      bullets: [
        "Grammar Quiz Score: +125% increase (4/10 → 9/10)",
        "Sentence error identification: +200% increase (3/10 → 9/10)",
        "Vocabulary retention: 100% mastery (10/10 words with active usage)",
        "Pronunciation confidence: Rose from 2.0/5 to 4.5/5"
      ]
    },
    {
      slideNo: 10,
      title: "Responsible AI & Limitations",
      subtitle: "Safety, Nuance, and Learner Safeguards",
      bullets: [
        "Cultural nuance: Literal AI translations can miss honorifics and local idioms",
        "Over-trust warning: AI responses must be cross-checked with dictionaries",
        "Privacy protection: Never submit personal or sensitive identifiers",
        "Accent equity: Regional varieties of English and Tamil are recognized as valid"
      ]
    },
    {
      slideNo: 11,
      title: "Live Application Architecture",
      subtitle: "Interactive Companion Software Suite",
      bullets: [
        "Built with high-performance modern web standards and responsive CSS",
        "Native Web Speech API for real-time TTS and voice microphone input",
        "Local persistent storage for progress tracking without remote data leaks",
        "Instant multi-AI simulator for classroom demonstration"
      ]
    },
    {
      slideNo: 12,
      title: "Conclusion & Key Takeaways",
      subtitle: "Final Research Decision",
      bullets: [
        "Verdict: YES — Free AI tools are highly effective practice partners for A1 beginners when guided by structured prompts and independent verification.",
        "They offer unlimited patience, zero judgment, and rapid bilingual scaffolding.",
        "Crucial requirement: Learners must be trained to verify rather than blindly accept.",
        "Next steps: Expanding vocabulary modules and integrating multi-dialect speech analysis."
      ]
    }
  ],

  // Responsible AI Principles (from 12_Responsible_AI/limitations.md)
  responsibleAi: [
    {
      icon: "globe",
      title: "Cultural Nuance & Honorifics",
      summary: "Literal translations often overlook cultural politeness, relationships, and colloquial register in Tamil. Always encourage verifying with native speakers."
    },
    {
      icon: "mic",
      title: "Dialect & Accent Variation",
      summary: "Both English and Tamil feature rich regional dialects. Differences in accent or vocabulary choices are not necessarily errors."
    },
    {
      icon: "shield-alert",
      title: "Mitigating Over-Trust & Hallucination",
      summary: "AI systems can generate grammatically polished but factually incorrect explanations. Learners must maintain healthy skepticism and check reputable references."
    },
    {
      icon: "lock",
      title: "Data Privacy & Safety",
      summary: "Never share personal identification, passwords, or confidential details in chat prompts. Practice conversations should remain strictly focused on learning scenarios."
    },
    {
      icon: "check-circle",
      title: "Fair & Grounded Evaluation",
      summary: "Evaluate all AI systems with identical benchmark sentences and prompts. Never fabricate test scores, audio files, or benchmark comparisons."
    }
  ]
};
