/**
 * LocalStorage manager for persisting user progress, logs, and settings
 */
import { APP_DATA } from './data.js';

const STORAGE_KEYS = {
  COMPLETED_DAYS: 'allc_completed_days',
  QUIZ_HISTORY: 'allc_quiz_history',
  CUSTOM_VOCAB: 'allc_custom_vocab',
  MISTAKE_LOG: 'allc_mistake_log',
  AUDIO_RATINGS: 'allc_audio_ratings',
  BEFORE_AFTER: 'allc_before_after',
  SETTINGS: 'allc_settings',
  CHAT_MESSAGES: 'allc_chat_messages'
};

export class StorageManager {
  static getCompletedDays() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
      return data ? JSON.parse(data) : [1]; // Day 1 completed by default as baseline
    } catch {
      return [1];
    }
  }

  static toggleDay(dayNumber) {
    const days = new Set(this.getCompletedDays());
    if (days.has(dayNumber)) {
      days.delete(dayNumber);
    } else {
      days.add(dayNumber);
    }
    const updated = Array.from(days).sort((a, b) => a - b);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(updated));
    return updated;
  }

  static getQuizHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveQuizAttempt(score, total, answers) {
    const history = this.getQuizHistory();
    const attempt = {
      id: Date.now(),
      date: new Date().toISOString(),
      score,
      total,
      percentage: Math.round((score / total) * 100),
      answers
    };
    history.push(attempt);
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
    return attempt;
  }

  static getMistakeLog() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKE_LOG);
      if (data) return JSON.parse(data);
      // Initialize with default 30 records
      localStorage.setItem(STORAGE_KEYS.MISTAKE_LOG, JSON.stringify(APP_DATA.initialMistakeLog));
      return APP_DATA.initialMistakeLog;
    } catch {
      return APP_DATA.initialMistakeLog;
    }
  }

  static addMistakeRecord(record) {
    const logs = this.getMistakeLog();
    const newRecord = {
      id: Date.now(),
      sentenceNo: record.sentenceNo || (logs.length + 1),
      tool: record.tool || 'ChatGPT',
      original: record.original || '',
      correction: record.correction || '',
      translation: record.translation || '',
      errorFound: record.errorFound || 'No',
      errorType: record.errorType || 'Grammar',
      verified: record.verified || 'Learner verified',
      severity: record.severity || 'Minor',
      notes: record.notes || ''
    };
    logs.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.MISTAKE_LOG, JSON.stringify(logs));
    return logs;
  }

  static deleteMistakeRecord(id) {
    const logs = this.getMistakeLog().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.MISTAKE_LOG, JSON.stringify(logs));
    return logs;
  }

  static getCustomVocab() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_VOCAB);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static addCustomVocab(word) {
    const list = this.getCustomVocab();
    const newWord = {
      id: Date.now(),
      english: word.english,
      tamil: word.tamil,
      phonetic: word.phonetic || '',
      exampleSentence: word.exampleSentence || '',
      tamilTranslation: word.tamilTranslation || '',
      usageNote: word.usageNote || 'User added word',
      category: word.category || 'General',
      verified: true
    };
    list.push(newWord);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_VOCAB, JSON.stringify(list));
    return list;
  }

  static getBeforeAfter() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BEFORE_AFTER);
      if (data) return JSON.parse(data);
      return APP_DATA.beforeAfterMetrics;
    } catch {
      return APP_DATA.beforeAfterMetrics;
    }
  }

  static saveBeforeAfter(metrics) {
    localStorage.setItem(STORAGE_KEYS.BEFORE_AFTER, JSON.stringify(metrics));
    return metrics;
  }

  static getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        speechRate: 0.85,
        theme: 'dark',
        autoSpeech: true,
        tamilHints: true
      };
    } catch {
      return { speechRate: 0.85, theme: 'dark', autoSpeech: true, tamilHints: true };
    }
  }

  static saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  }

  static getChatMessages(scenario = 'general') {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.CHAT_MESSAGES}_${scenario}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static saveChatMessages(scenario = 'general', messages) {
    try {
      localStorage.setItem(`${STORAGE_KEYS.CHAT_MESSAGES}_${scenario}`, JSON.stringify(messages));
    } catch (e) {
      console.warn("Storage quota exceeded or error saving chat", e);
    }
  }

  static resetAllData() {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.setItem(STORAGE_KEYS.MISTAKE_LOG, JSON.stringify(APP_DATA.initialMistakeLog));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify([1]));
  }
}
