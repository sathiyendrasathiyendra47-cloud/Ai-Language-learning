/**
 * Main Application Orchestrator for AI Language Learning Companion
 */
import { APP_DATA } from './data.js';
import { StorageManager } from './storage.js';
import { speechService } from './speech.js';
import { tutorEngine } from './tutor.js';

class App {
  constructor() {
    this.currentTab = 'dashboard';
    this.activeScenario = 'greetings';
    this.chatMessages = [];
    this.currentQuizIndex = 0;
    this.quizAnswers = [];
    this.quizScore = 0;
    this.currentSlideIndex = 0;
    this.activeRecorderSampleId = null;

    this.init();
  }

  init() {
    this.initTheme();
    this.initSpeedToggle();
    this.initTabNavigation();
    this.renderDashboard();
    this.renderPlan();
    this.initTutor();
    this.renderBenchmark();
    this.renderVocab();
    this.initQuiz();
    this.renderAudioLab();
    this.renderMistakeLog();
    this.renderPoster();
    this.renderBeforeAfter();
    this.renderSlide(0);
    this.renderResponsibleAi();
    this.updateProgressSummary();

    // Expose app instance globally for inline event handlers if needed
    window.app = this;
  }

  // -------------------------------------------------------------
  // THEME & CONTROLS
  // -------------------------------------------------------------
  initTheme() {
    const settings = StorageManager.getSettings();
    const html = document.documentElement;
    html.setAttribute('data-theme', settings.theme || 'dark');
    this.updateThemeButtonUI(settings.theme || 'dark');

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        settings.theme = next;
        StorageManager.saveSettings(settings);
        this.updateThemeButtonUI(next);
      });
    }

    const exportBtn = document.getElementById('btn-export-all');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportAllProgress());
    }
  }

  updateThemeButtonUI(theme) {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (icon && text) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
      text.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  }

  initSpeedToggle() {
    const speeds = [0.75, 0.85, 1.0, 1.2];
    const settings = StorageManager.getSettings();
    let currentRate = settings.speechRate || 0.85;

    const btn = document.getElementById('btn-toggle-speed');
    const lbl = document.getElementById('lbl-speed');

    const updateLabel = (rate) => {
      if (lbl) lbl.textContent = `Speed: ${rate.toFixed(2)}x`;
    };

    updateLabel(currentRate);

    if (btn) {
      btn.addEventListener('click', () => {
        const nextIdx = (speeds.indexOf(currentRate) + 1) % speeds.length;
        currentRate = speeds[nextIdx >= 0 ? nextIdx : 1];
        settings.speechRate = currentRate;
        StorageManager.saveSettings(settings);
        updateLabel(currentRate);
        speechService.speak(`Speed set to ${currentRate.toFixed(2)}`, { rate: currentRate });
      });
    }
  }

  // -------------------------------------------------------------
  // TAB NAVIGATION
  // -------------------------------------------------------------
  initTabNavigation() {
    const tabButtons = document.querySelectorAll('.sidebar-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    const brandHome = document.getElementById('nav-brand-home');
    if (brandHome) {
      brandHome.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchTab('dashboard');
      });
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update buttons
    document.querySelectorAll('.sidebar-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Update views
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateProgressSummary();
  }

  updateProgressSummary() {
    const completedDays = StorageManager.getCompletedDays();
    const pct = Math.round((completedDays.length / 14) * 100);

    const bar = document.getElementById('sidebar-progress-bar');
    const pctLbl = document.getElementById('sidebar-progress-pct');
    const statusLbl = document.getElementById('sidebar-progress-status');

    if (bar) bar.style.width = `${pct}%`;
    if (pctLbl) pctLbl.textContent = `${pct}%`;
    if (statusLbl) statusLbl.textContent = `${completedDays.length} of 14 Days Done`;

    const dashDays = document.getElementById('dash-stat-days');
    if (dashDays) dashDays.textContent = `${completedDays.length} / 14`;

    const history = StorageManager.getQuizHistory();
    if (history.length > 0) {
      const highest = Math.max(...history.map(h => h.score));
      const dashQuiz = document.getElementById('dash-stat-quiz');
      if (dashQuiz) dashQuiz.textContent = `${highest} / 10`;
    }

    const mistakes = StorageManager.getMistakeLog();
    const dashLogs = document.getElementById('dash-stat-logs');
    if (dashLogs) dashLogs.textContent = `${mistakes.length}`;
  }

  // -------------------------------------------------------------
  // DASHBOARD
  // -------------------------------------------------------------
  renderDashboard() {
    // Stats are updated dynamically via updateProgressSummary
  }

  // -------------------------------------------------------------
  // 14-DAY PRACTICE PLAN
  // -------------------------------------------------------------
  renderPlan() {
    const container = document.getElementById('plan-container');
    if (!container) return;

    const completedDays = new Set(StorageManager.getCompletedDays());
    container.innerHTML = '';

    APP_DATA.planDays.forEach(dayItem => {
      const isDone = completedDays.has(dayItem.day);
      const card = document.createElement('div');
      card.className = `day-card ${isDone ? 'completed' : ''}`;
      card.id = `plan-day-${dayItem.day}`;

      card.innerHTML = `
        <div class="day-card-header">
          <span class="day-pill">Day ${dayItem.day}: ${dayItem.title}</span>
          <button class="day-check-btn" title="Toggle completed status" id="btn-check-day-${dayItem.day}">
            ${isDone ? '✓' : '○'}
          </button>
        </div>
        <h4 class="day-topic">${dayItem.topic}</h4>
        <p class="day-activity">${dayItem.activity}</p>
        <ul class="day-checklist">
          ${dayItem.dailyChecklist.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div style="font-size: 0.76rem; color: var(--text-muted);">
          <strong>Evidence:</strong> ${dayItem.evidence}
        </div>
        <div class="day-actions">
          <button class="btn-primary" style="flex: 1; padding: 0.6rem 1rem; font-size: 0.85rem;" id="btn-start-day-${dayItem.day}">
            Start Day ${dayItem.day} ➔
          </button>
        </div>
      `;

      // Checkbox event
      const checkBtn = card.querySelector(`#btn-check-day-${dayItem.day}`);
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        StorageManager.toggleDay(dayItem.day);
        this.renderPlan();
        this.updateProgressSummary();
      });

      // Start action event
      const startBtn = card.querySelector(`#btn-start-day-${dayItem.day}`);
      startBtn.addEventListener('click', () => {
        if (dayItem.targetModule === 'tutor') {
          this.switchTab('tutor');
          if (dayItem.scenario) this.selectScenario(dayItem.scenario);
        } else if (dayItem.targetModule === 'quiz') {
          this.switchTab('quiz');
        } else if (dayItem.targetModule === 'evaluator') {
          this.switchTab('benchmark');
        } else if (dayItem.targetModule === 'audio') {
          this.switchTab('audio');
        } else if (dayItem.targetModule === 'vocab') {
          this.switchTab('vocab');
        } else if (dayItem.targetModule === 'beforeAfter') {
          this.switchTab('before-after');
        }
      });

      container.appendChild(card);
    });

    const resetPlanBtn = document.getElementById('btn-reset-plan-progress');
    if (resetPlanBtn) {
      resetPlanBtn.onclick = () => {
        if (confirm("Reset all 14-day checklist progress back to Day 1?")) {
          localStorage.removeItem('allc_completed_days');
          this.renderPlan();
          this.updateProgressSummary();
        }
      };
    }
  }

  // -------------------------------------------------------------
  // AI PRACTICE PARTNER (TUTOR)
  // -------------------------------------------------------------
  initTutor() {
    this.renderScenarioList();
    this.selectScenario('greetings');

    const sendBtn = document.getElementById('btn-send-message');
    const inputField = document.getElementById('chat-user-input');
    const micBtn = document.getElementById('btn-tutor-mic');
    const clearBtn = document.getElementById('btn-clear-chat');

    const handleSend = () => {
      const text = inputField.value.trim();
      if (!text) return;
      this.sendTutorMessage(text);
      inputField.value = '';
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (inputField) {
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (speechService.isListening) {
          speechService.stopListening();
          micBtn.classList.remove('recording');
        } else {
          micBtn.classList.add('recording');
          speechService.startListening(
            (transcript) => {
              inputField.value = transcript;
              micBtn.classList.remove('recording');
              handleSend();
            },
            (status) => {
              if (status.status !== 'listening') {
                micBtn.classList.remove('recording');
              }
              if (status.status === 'unsupported') {
                alert(status.message);
              }
            }
          );
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm("Clear this conversation history?")) {
          this.chatMessages = [];
          StorageManager.saveChatMessages(this.activeScenario, []);
          this.selectScenario(this.activeScenario);
        }
      });
    }
  }

  renderScenarioList() {
    const list = document.getElementById('scenario-list');
    if (!list) return;
    list.innerHTML = '';

    Object.values(tutorEngine.scenarios).forEach(scen => {
      const btn = document.createElement('button');
      btn.className = `scenario-btn ${scen.id === this.activeScenario ? 'active' : ''}`;
      btn.id = `scenario-btn-${scen.id}`;
      btn.innerHTML = `
        <span class="scenario-name">${scen.name}</span>
        <span class="scenario-day">Plan Day ${scen.day}</span>
      `;
      btn.addEventListener('click', () => this.selectScenario(scen.id));
      list.appendChild(btn);
    });
  }

  selectScenario(scenId) {
    this.activeScenario = scenId;
    const scen = tutorEngine.scenarios[scenId];

    document.querySelectorAll('.scenario-btn').forEach(b => {
      b.classList.toggle('active', b.id === `scenario-btn-${scenId}`);
    });

    const partnerName = document.getElementById('chat-partner-name');
    if (partnerName) {
      partnerName.textContent = `Priya — ${scen.name.split('(')[0]}`;
    }

    // Load persisted chat or seed with opening message
    const saved = StorageManager.getChatMessages(scenId);
    if (saved && saved.length > 0) {
      this.chatMessages = saved;
    } else {
      this.chatMessages = [
        {
          id: 1,
          sender: 'ai',
          text: scen.aiOpening,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      StorageManager.saveChatMessages(scenId, this.chatMessages);
    }

    this.renderChatHistory();
    this.renderHintsBar(scen.hints);
  }

  renderChatHistory() {
    const historyContainer = document.getElementById('chat-history');
    if (!historyContainer) return;
    historyContainer.innerHTML = '';

    this.chatMessages.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${msg.sender}`;

      let feedbackHtml = '';
      if (msg.feedback && msg.feedback.hasError) {
        feedbackHtml = `
          <div class="feedback-card">
            <span class="feedback-tag">💡 Grammar Guide & Correction:</span>
            <div style="font-weight: 600; color: #ffffff;">Better phrasing: "${msg.feedback.correctionHint}"</div>
            <div class="feedback-rule">${msg.feedback.rule}</div>
            <div class="feedback-tamil">${msg.feedback.tamilExplanation}</div>
          </div>
        `;
      }

      msgDiv.innerHTML = `
        <div class="message-bubble">
          <div>${msg.text}</div>
          ${feedbackHtml}
        </div>
        <button class="message-audio-btn" title="Listen to this message">
          <span>🔊</span> <span>Listen</span>
        </button>
      `;

      const audioBtn = msgDiv.querySelector('.message-audio-btn');
      audioBtn.addEventListener('click', () => {
        // Speak the English part
        const englishPortion = msg.text.split('(')[0].trim();
        speechService.speak(englishPortion);
      });

      historyContainer.appendChild(msgDiv);
    });

    historyContainer.scrollTop = historyContainer.scrollHeight;
  }

  renderHintsBar(hints) {
    const bar = document.getElementById('chat-hints-bar');
    if (!bar) return;
    bar.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-muted);">💡 Suggestions:</span>';

    hints.forEach(hint => {
      const chip = document.createElement('button');
      chip.className = 'hint-chip';
      chip.textContent = hint;
      chip.addEventListener('click', () => {
        const input = document.getElementById('chat-user-input');
        if (input) {
          input.value = hint;
          input.focus();
        }
      });
      bar.appendChild(chip);
    });
  }

  sendTutorMessage(userText) {
    // 1. Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.chatMessages.push(userMsg);
    this.renderChatHistory();

    // 2. Generate teacher response & correction
    const result = tutorEngine.generatePartnerReply(this.activeScenario, userText, this.chatMessages);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: result.reply,
        feedback: result.correction,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.chatMessages.push(aiMsg);
      StorageManager.saveChatMessages(this.activeScenario, this.chatMessages);
      this.renderChatHistory();

      // Speak AI reply in English
      const speechSettings = StorageManager.getSettings();
      if (speechSettings.autoSpeech) {
        const englishPart = result.reply.split('(')[0].trim();
        speechService.speak(englishPart);
      }
    }, 450);
  }

  // -------------------------------------------------------------
  // 3-TOOL BENCHMARK & TEST SENTENCES
  // -------------------------------------------------------------
  renderBenchmark() {
    const container = document.getElementById('benchmark-container');
    if (!container) return;
    container.innerHTML = '';

    APP_DATA.testSentences.forEach(item => {
      const card = document.createElement('div');
      card.className = 'benchmark-card';
      card.id = `benchmark-item-${item.no}`;

      card.innerHTML = `
        <div class="benchmark-sentence-bar">
          <div>
            <span style="font-weight: 700; color: var(--accent-primary); margin-right: 0.4rem;">Sentence ${item.no}:</span>
            <span class="sentence-display">"${item.originalSentence}"</span>
          </div>
          <span class="badge-tag" style="${item.status.includes('Incorrect') ? 'background: var(--danger-bg); color: #f87171; border-color: rgba(239,68,68,0.3);' : 'background: var(--success-bg); color: #34d399; border-color: rgba(16,185,129,0.3);'}">
            ${item.status}
          </span>
        </div>

        <div class="tool-comparison-grid">
          <div class="tool-box">
            <span class="tool-badge chatgpt">ChatGPT</span>
            <div>${item.chatgptOutput}</div>
          </div>
          <div class="tool-box">
            <span class="tool-badge gemini">Gemini</span>
            <div>${item.geminiOutput}</div>
          </div>
          <div class="tool-box">
            <span class="tool-badge claude">Claude</span>
            <div>${item.claudeOutput}</div>
          </div>
        </div>

        <div class="reference-verdict-box">
          <div style="font-weight: 700; color: #ffffff;">Standard Reference Correction:</div>
          <div>${item.referenceCorrection}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.3rem;">
            <strong>Grammar Rule:</strong> ${item.grammarRule}
          </div>
          <div style="font-size: 0.82rem; color: var(--text-tamil); font-family: var(--font-tamil);">
            <strong>தமிழ்:</strong> ${item.tamilTranslation}
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Custom Sentence Tester handler
    const runBtn = document.getElementById('btn-run-custom-test');
    const input = document.getElementById('custom-test-input');
    const resultBox = document.getElementById('custom-test-result');

    if (runBtn && input && resultBox) {
      runBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        const issues = tutorEngine.analyzeGrammar(text);
        resultBox.style.display = 'block';

        if (issues.length === 0) {
          resultBox.innerHTML = `
            <div style="background: var(--success-bg); border: 1px solid var(--success); padding: 1rem; border-radius: var(--radius-sm); color: #34d399;">
              <strong>✓ Valid Standard Sentence:</strong> No typical A1 beginner grammatical clashes detected!
            </div>
          `;
        } else {
          const issue = issues[0];
          resultBox.innerHTML = `
            <div style="background: var(--danger-bg); border: 1px solid var(--danger); padding: 1.2rem; border-radius: var(--radius-sm);">
              <div style="color: #f87171; font-weight: 700; margin-bottom: 0.4rem;">⚠️ Issue Identified: ${issue.type}</div>
              <div style="color: #ffffff; margin-bottom: 0.4rem;"><strong>Suggested Correction:</strong> "${issue.good}"</div>
              <div style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Rule:</strong> ${issue.rule}</div>
              <div style="font-size: 0.9rem; color: var(--text-tamil); font-family: var(--font-tamil);"><strong>தமிழ் விளக்கம்:</strong> ${issue.tamil}</div>
              <button class="btn-primary" style="margin-top: 0.8rem; padding: 0.45rem 0.9rem; font-size: 0.8rem;" id="btn-quick-log-mistake">
                + Add To Mistake Log
              </button>
            </div>
          `;

          const quickLogBtn = resultBox.querySelector('#btn-quick-log-mistake');
          if (quickLogBtn) {
            quickLogBtn.onclick = () => {
              StorageManager.addMistakeRecord({
                tool: 'AI Practice Partner',
                original: text,
                correction: issue.good,
                translation: issue.tamil,
                errorFound: 'Yes',
                errorType: issue.type,
                severity: 'Minor',
                notes: 'Logged from Live Sentence Tester'
              });
              alert('Record added to Mistake & Verification Log!');
              this.renderMistakeLog();
            };
          }
        }
      });
    }
  }

  // -------------------------------------------------------------
  // BILINGUAL VOCABULARY HUB
  // -------------------------------------------------------------
  renderVocab() {
    const container = document.getElementById('vocab-cards-container');
    if (!container) return;

    const baseWords = APP_DATA.vocabularyWords;
    const customWords = StorageManager.getCustomVocab();
    const allWords = [...baseWords, ...customWords];

    const badge = document.getElementById('badge-vocab-count');
    if (badge) badge.textContent = `${allWords.length} Words`;

    const renderFiltered = (filterText = '') => {
      container.innerHTML = '';
      const filtered = allWords.filter(w => 
        w.english.toLowerCase().includes(filterText.toLowerCase()) ||
        w.tamil.includes(filterText)
      );

      filtered.forEach(word => {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        card.innerHTML = `
          <div class="vocab-english">
            <span>${word.english}</span>
            <button class="ctrl-btn" style="padding: 0.3rem 0.6rem;" title="Pronounce word" id="btn-audio-vocab-${word.id}">
              🔊
            </button>
          </div>
          <div class="vocab-tamil">${word.tamil}</div>
          <div class="vocab-phonetic">${word.phonetic}</div>
          <div class="vocab-example">
            <div style="font-weight: 500; color: #ffffff;">"${word.exampleSentence}"</div>
            <div style="font-size: 0.8rem; color: var(--text-tamil); font-family: var(--font-tamil); margin-top: 0.2rem;">${word.tamilTranslation || ''}</div>
          </div>
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: auto;">
            <strong>Category:</strong> ${word.category} • ${word.usageNote}
          </div>
        `;

        const audioBtn = card.querySelector(`#btn-audio-vocab-${word.id}`);
        audioBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          speechService.speak(word.english);
        });

        card.addEventListener('click', () => {
          speechService.speak(`${word.english}. ${word.exampleSentence}`);
        });

        container.appendChild(card);
      });
    };

    renderFiltered();

    const searchInput = document.getElementById('vocab-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => renderFiltered(e.target.value.trim());
    }

    const addWordBtn = document.getElementById('btn-add-vocab-modal');
    if (addWordBtn) {
      addWordBtn.onclick = () => {
        const en = prompt("Enter English word (e.g. Teacher):");
        if (!en) return;
        const ta = prompt(`Enter Tamil meaning for "${en}" (e.g. ஆசிரியர்):`);
        if (!ta) return;
        const ex = prompt(`Enter short example sentence (e.g. She is a teacher):`, `${en} is important.`);

        StorageManager.addCustomVocab({
          english: en,
          tamil: ta,
          phonetic: `${en.toLowerCase()}`,
          exampleSentence: ex || `I like ${en}.`,
          category: 'Learner Added'
        });

        this.renderVocab();
      };
    }
  }

  // -------------------------------------------------------------
  // A1 DIAGNOSTIC QUIZ
  // -------------------------------------------------------------
  initQuiz() {
    this.currentQuizIndex = 0;
    this.quizAnswers = [];
    this.quizScore = 0;
    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const container = document.getElementById('quiz-question-container');
    const fill = document.getElementById('quiz-progress-fill');
    const badge = document.getElementById('quiz-score-badge');
    if (!container) return;

    const questions = APP_DATA.quizQuestions;
    const q = questions[this.currentQuizIndex];

    const currentNum = this.currentQuizIndex + 1;
    const total = questions.length;

    if (fill) fill.style.width = `${(currentNum / total) * 100}%`;
    if (badge) badge.textContent = `Question ${currentNum} of ${total} • Score: ${this.quizScore}`;

    container.innerHTML = `
      <div style="font-size: 0.8rem; color: var(--accent-primary); font-weight: 700; margin-bottom: 0.4rem;">
        QUESTION ${currentNum} OF ${total}
      </div>
      <h3 class="quiz-question-text">${q.question}</h3>
      <div class="quiz-options-list">
        ${q.options.map(opt => `
          <button class="quiz-option-btn" data-key="${opt.key}" id="quiz-opt-${opt.key}">
            <span class="quiz-opt-letter">${opt.key}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
      <div id="quiz-explanation-box" style="display: none; margin-top: 1.2rem;"></div>
      <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
        <button class="btn-primary" id="btn-quiz-next" style="display: none;">Next Question ➔</button>
      </div>
    `;

    const optionButtons = container.querySelectorAll('.quiz-option-btn');
    const nextBtn = container.querySelector('#btn-quiz-next');
    const explBox = container.querySelector('#quiz-explanation-box');

    let answered = false;

    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const selectedKey = btn.getAttribute('data-key');
        const isCorrect = selectedKey === q.correct;

        if (isCorrect) {
          this.quizScore++;
          btn.classList.add('correct');
        } else {
          btn.classList.add('incorrect');
          const correctBtn = container.querySelector(`#quiz-opt-${q.correct}`);
          if (correctBtn) correctBtn.classList.add('correct');
        }

        // Show detailed explanation
        explBox.style.display = 'block';
        explBox.innerHTML = `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem;">
            <div style="font-weight: 700; color: ${isCorrect ? 'var(--success)' : '#f87171'}; margin-bottom: 0.3rem;">
              ${isCorrect ? '✓ Correct Answer!' : `✗ Incorrect (Correct: ${q.correct})`}
            </div>
            <div style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.3rem;">
              <strong>Grammar Rule:</strong> ${q.ruleExplanation}
            </div>
            <div style="font-size: 0.88rem; color: var(--text-tamil); font-family: var(--font-tamil);">
              <strong>தமிழ் விளக்கம்:</strong> ${q.tamilExplanation}
            </div>
          </div>
        `;

        if (nextBtn) {
          nextBtn.style.display = 'inline-flex';
          nextBtn.focus();
        }
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentQuizIndex < total - 1) {
          this.currentQuizIndex++;
          this.renderQuizQuestion();
        } else {
          this.renderQuizSummary();
        }
      });
    }
  }

  renderQuizSummary() {
    const container = document.getElementById('quiz-question-container');
    const total = APP_DATA.quizQuestions.length;
    const pct = Math.round((this.quizScore / total) * 100);

    // Save score attempt
    StorageManager.saveQuizAttempt(this.quizScore, total, this.quizAnswers);
    this.updateProgressSummary();

    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
        <h3 style="font-size: 1.8rem; font-family: var(--font-heading); margin-bottom: 0.5rem;">Quiz Completed!</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          You scored <strong style="color: #ffffff; font-size: 1.4rem;">${this.quizScore} / ${total}</strong> (${pct}%)
        </p>
        <div style="max-width: 480px; margin: 0 auto 2rem; background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem; color: var(--text-secondary);">
          ${this.quizScore >= 8 
            ? "🌟 Outstanding! You demonstrate strong mastery of basic English A1 grammar structures." 
            : "👍 Good effort! Review the 14-day practice lessons and vocabulary to strengthen your foundation."}
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn-primary" id="btn-quiz-retry">Retake Quiz ↻</button>
          <button class="ctrl-btn" onclick="window.app.switchTab('before-after');">View Before/After Delta ➔</button>
        </div>
      </div>
    `;

    const retryBtn = container.querySelector('#btn-quiz-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.initQuiz());
    }
  }

  // -------------------------------------------------------------
  // AUDIO PRONUNCIATION LAB
  // -------------------------------------------------------------
  renderAudioLab() {
    const container = document.getElementById('audio-samples-container');
    if (!container) return;
    container.innerHTML = '';

    APP_DATA.audioSamples.forEach(sample => {
      const card = document.createElement('div');
      card.className = 'audio-card';
      card.id = `audio-sample-${sample.id}`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: var(--accent-primary);">Sample ${sample.id}</span>
          <span class="badge-tag" style="background: rgba(99,102,241,0.2); color: #a5b4fc;">0.85x Beginner</span>
        </div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #ffffff;">"${sample.sentence}"</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); font-family: monospace;">${sample.phonetic}</div>
        <div style="font-size: 0.88rem; color: var(--text-tamil); font-family: var(--font-tamil);">${sample.tamilMeaning}</div>
        
        <div style="background: var(--bg-surface); border-radius: var(--radius-sm); padding: 0.6rem 0.8rem; font-size: 0.78rem; color: var(--text-secondary);">
          <strong>Pronunciation Key:</strong> ${sample.keyFocus}
        </div>

        <!-- Waveform Visualizer Canvas -->
        <canvas class="audio-waveform-canvas" id="canvas-audio-${sample.id}" width="300" height="70"></canvas>

        <div class="audio-controls-row">
          <button class="btn-primary" style="padding: 0.55rem 1rem; font-size: 0.84rem;" id="btn-play-ai-speech-${sample.id}">
            🔊 Listen AI Voice
          </button>
          <button class="btn-mic" style="width: 40px; height: 40px; font-size: 1rem;" id="btn-record-voice-${sample.id}" title="Record your own pronunciation">
            🎙️
          </button>
          <span id="record-status-${sample.id}" style="font-size: 0.78rem; color: var(--text-muted);">Click mic to record</span>
        </div>

        <div id="user-playback-area-${sample.id}" style="display: none; margin-top: 0.5rem;">
          <audio controls style="width: 100%; height: 36px;" id="audio-player-${sample.id}"></audio>
        </div>
      `;

      // Listen TTS button
      const playBtn = card.querySelector(`#btn-play-ai-speech-${sample.id}`);
      playBtn.addEventListener('click', () => {
        speechService.speak(sample.sentence, { rate: 0.85 });
      });

      // Record mic button
      const recordBtn = card.querySelector(`#btn-record-voice-${sample.id}`);
      const statusLbl = card.querySelector(`#record-status-${sample.id}`);
      const playbackArea = card.querySelector(`#user-playback-area-${sample.id}`);
      const audioPlayer = card.querySelector(`#audio-player-${sample.id}`);
      const canvas = card.querySelector(`#canvas-audio-${sample.id}`);

      let isRecordingThis = false;

      recordBtn.addEventListener('click', async () => {
        if (!isRecordingThis) {
          try {
            await speechService.startRecording(canvas);
            isRecordingThis = true;
            recordBtn.classList.add('recording');
            statusLbl.textContent = 'Recording... speak now!';
          } catch (err) {
            alert("Microphone error: " + err.message);
          }
        } else {
          isRecordingThis = false;
          recordBtn.classList.remove('recording');
          statusLbl.textContent = 'Saving audio...';
          const result = await speechService.stopRecording();
          if (result && result.url) {
            playbackArea.style.display = 'block';
            audioPlayer.src = result.url;
            statusLbl.textContent = '✓ Recorded! Play below to self-evaluate:';
          }
        }
      });

      container.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // MISTAKE & VERIFICATION LOG
  // -------------------------------------------------------------
  renderMistakeLog() {
    const tbody = document.getElementById('mistake-table-body');
    const badge = document.getElementById('badge-mistakes-count');
    if (!tbody) return;

    const allLogs = StorageManager.getMistakeLog();
    if (badge) badge.textContent = `${allLogs.length} Rows`;

    const toolFilter = document.getElementById('filter-tool-select')?.value || 'All';
    const errorFilter = document.getElementById('filter-error-select')?.value || 'All';

    const filtered = allLogs.filter(row => {
      const matchTool = toolFilter === 'All' || row.tool === toolFilter;
      const matchError = errorFilter === 'All' || row.errorFound === errorFilter;
      return matchTool && matchError;
    });

    tbody.innerHTML = '';

    filtered.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td>
          <span class="tool-badge ${row.tool.toLowerCase()}">${row.tool}</span>
        </td>
        <td style="max-width: 200px; font-weight: 500;">${row.original}</td>
        <td style="max-width: 200px; color: #a5b4fc;">${row.correction}</td>
        <td style="max-width: 200px; font-family: var(--font-tamil); color: var(--text-tamil);">${row.translation}</td>
        <td>
          <span class="badge-tag" style="${row.errorFound === 'Yes' ? 'background: var(--danger-bg); color: #f87171;' : 'background: var(--success-bg); color: #34d399;'}">
            ${row.errorFound}
          </span>
        </td>
        <td style="font-size: 0.82rem;">${row.verified}</td>
        <td style="font-size: 0.82rem; color: var(--text-secondary);">${row.notes || '-'}</td>
        <td>
          <button class="ctrl-btn" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #f87171;" id="btn-del-log-${row.id}">
            ✕
          </button>
        </td>
      `;

      const delBtn = tr.querySelector(`#btn-del-log-${row.id}`);
      delBtn.addEventListener('click', () => {
        if (confirm("Delete this log row?")) {
          StorageManager.deleteMistakeRecord(row.id);
          this.renderMistakeLog();
          this.updateProgressSummary();
        }
      });

      tbody.appendChild(tr);
    });

    // Filters event binding
    const toolSelect = document.getElementById('filter-tool-select');
    const errSelect = document.getElementById('filter-error-select');
    if (toolSelect) toolSelect.onchange = () => this.renderMistakeLog();
    if (errSelect) errSelect.onchange = () => this.renderMistakeLog();

    // Export CSV handler
    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) {
      exportBtn.onclick = () => this.downloadMistakeCsv();
    }

    // Add entry button
    const addBtn = document.getElementById('btn-add-mistake-record');
    if (addBtn) {
      addBtn.onclick = () => {
        const tool = prompt("AI Tool (ChatGPT / Gemini / Claude):", "ChatGPT");
        if (!tool) return;
        const orig = prompt("Original Sentence (e.g. She don't like tea):");
        if (!orig) return;
        const corr = prompt("AI Correction:", "She doesn't like tea.");
        const ta = prompt("AI Tamil Translation:", "அவளுக்கு தேநீர் பிடிக்காது.");

        StorageManager.addMistakeRecord({
          tool,
          original: orig,
          correction: corr || '',
          translation: ta || '',
          errorFound: 'No',
          verified: 'Learner Verified',
          severity: 'Minor',
          notes: 'Added from web app interface'
        });

        this.renderMistakeLog();
        this.updateProgressSummary();
      };
    }
  }

  downloadMistakeCsv() {
    const logs = StorageManager.getMistakeLog();
    const headers = ["Sentence No", "AI Tool", "Original Sentence", "AI Correction", "AI Tamil Translation", "Error Found", "Error Type", "Verified Correction", "Severity", "Notes"];
    
    const rows = logs.map(l => [
      l.sentenceNo || 1,
      `"${l.tool}"`,
      `"${l.original.replace(/"/g, '""')}"`,
      `"${(l.correction || '').replace(/"/g, '""')}"`,
      `"${(l.translation || '').replace(/"/g, '""')}"`,
      `"${l.errorFound}"`,
      `"${l.errorType || 'None'}"`,
      `"${(l.verified || '').replace(/"/g, '""')}"`,
      `"${l.severity || 'Minor'}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `verified_mistake_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // -------------------------------------------------------------
  // ILLUSTRATED POSTER
  // -------------------------------------------------------------
  renderPoster() {
    const container = document.getElementById('poster-grid-container');
    if (!container) return;
    container.innerHTML = '';

    const icons = {
      Hello: "👋",
      Water: "💧",
      Food: "🍲",
      Friend: "🤝",
      School: "🏫",
      Book: "📖",
      House: "🏡",
      Happy: "😊",
      Learn: "🧠",
      "Thank you": "🙏"
    };

    APP_DATA.vocabularyWords.forEach(word => {
      const item = document.createElement('div');
      item.className = 'poster-item';
      item.innerHTML = `
        <div class="poster-item-icon">${icons[word.english] || '✨'}</div>
        <div class="poster-item-en">${word.english}</div>
        <div class="poster-item-ta">${word.tamil}</div>
        <div style="font-size: 0.75rem; color: #94a3b8; font-style: italic; margin-top: 0.3rem;">"${word.exampleSentence}"</div>
      `;
      container.appendChild(item);
    });
  }

  // -------------------------------------------------------------
  // BEFORE & AFTER ANALYSIS
  // -------------------------------------------------------------
  renderBeforeAfter() {
    const tbody = document.getElementById('before-after-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const metrics = StorageManager.getBeforeAfter();

    metrics.forEach(metric => {
      const change = metric.day14 - metric.day1;
      const pctChange = Math.round((change / metric.day1) * 100);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; color: #ffffff;">${metric.name}</td>
        <td><span style="font-weight: 700; color: #f87171;">${metric.day1}</span> ${metric.unit}</td>
        <td><span style="font-weight: 700; color: #34d399;">${metric.day14}</span> ${metric.unit}</td>
        <td>
          <span class="badge-tag" style="background: var(--success-bg); color: #34d399;">
            +${change} (${pctChange > 0 ? `+${pctChange}%` : '0%'})
          </span>
        </td>
        <td style="font-size: 0.82rem; color: var(--text-secondary);">${metric.notes}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // -------------------------------------------------------------
  // PRESENTATION SLIDES (DEMO)
  // -------------------------------------------------------------
  renderSlide(index) {
    const slides = APP_DATA.demoSlides;
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    this.currentSlideIndex = index;

    const content = document.getElementById('slide-content');
    const badge = document.getElementById('slide-counter-badge');
    const dotsContainer = document.getElementById('slide-dots');
    if (!content) return;

    const slide = slides[index];
    if (badge) badge.textContent = `Slide ${index + 1} of ${slides.length}`;

    content.innerHTML = `
      <div>
        <div class="slide-number-badge">CAPSTONE DEMO • SLIDE ${slide.slideNo}</div>
        <h3 class="slide-title">${slide.title}</h3>
        <p class="slide-subtitle">${slide.subtitle}</p>
        <ul class="slide-bullets">
          ${slide.bullets.map(b => `<li><span>${b}</span></li>`).join('')}
        </ul>
      </div>
    `;

    // Render dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.style.cssText = `
          width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer;
          background: ${i === index ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'};
          transition: background 0.2s;
        `;
        dot.onclick = () => this.renderSlide(i);
        dotsContainer.appendChild(dot);
      });
    }

    const prevBtn = document.getElementById('btn-prev-slide');
    const nextBtn = document.getElementById('btn-next-slide');

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;

    if (prevBtn) prevBtn.onclick = () => this.renderSlide(this.currentSlideIndex - 1);
    if (nextBtn) nextBtn.onclick = () => this.renderSlide(this.currentSlideIndex + 1);
  }

  // -------------------------------------------------------------
  // RESPONSIBLE AI
  // -------------------------------------------------------------
  renderResponsibleAi() {
    const container = document.getElementById('responsible-ai-container');
    if (!container) return;
    container.innerHTML = '';

    const iconMap = {
      globe: "🌐",
      mic: "🎙️",
      "shield-alert": "🛡️",
      lock: "🔒",
      "check-circle": "✅"
    };

    APP_DATA.responsibleAi.forEach(item => {
      const card = document.createElement('div');
      card.className = 'day-card';
      card.innerHTML = `
        <div class="day-card-header">
          <span class="day-pill" style="background: rgba(99,102,241,0.2); color: #a5b4fc;">Ethics & Safeguard</span>
          <span style="font-size: 1.4rem;">${iconMap[item.icon] || '🛡️'}</span>
        </div>
        <h4 class="day-topic">${item.title}</h4>
        <p class="day-activity">${item.summary}</p>
      `;
      container.appendChild(card);
    });
  }

  exportAllProgress() {
    const data = {
      completedDays: StorageManager.getCompletedDays(),
      quizHistory: StorageManager.getQuizHistory(),
      mistakeLog: StorageManager.getMistakeLog(),
      customVocab: StorageManager.getCustomVocab(),
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_companion_progress_backup_${Date.now()}.json`;
    a.click();
  }
}

// Instantiate upon DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
