/**
 * Audio, Speech Synthesis (TTS), Speech Recognition (STT), and Microphone Recording
 */
import { StorageManager } from './storage.js';

export class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.recognition = null;
    this.isListening = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioContext = null;
    this.analyser = null;

    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;
    const updateVoices = () => {
      this.voices = this.synth.getVoices();
      // Prefer standard English voices (en-US, en-GB, en-IN)
      this.selectedVoice = this.voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.default))
        || this.voices.find(v => v.lang.startsWith('en'))
        || this.voices[0];
    };

    updateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = updateVoices;
    }
  }

  speak(text, options = {}) {
    if (!this.synth) {
      console.warn("Speech synthesis is not supported on this browser.");
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.synth.cancel(); // Stop any currently playing audio

      const utterance = new SpeechSynthesisUtterance(text);
      const settings = StorageManager.getSettings();
      utterance.rate = options.rate || settings.speechRate || 0.85; // A1 beginner tempo
      utterance.pitch = options.pitch || 1.0;
      utterance.lang = options.lang || 'en-US';

      if (this.selectedVoice && (!options.lang || options.lang.startsWith('en'))) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = (e) => {
        console.warn("Speech synthesis error", e);
        resolve(false);
      };

      this.synth.speak(utterance);
    });
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.info("SpeechRecognition API not available in this browser environment.");
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    } catch (e) {
      console.warn("Could not initialize SpeechRecognition", e);
    }
  }

  startListening(onResult, onStatus) {
    if (!this.recognition) {
      if (onStatus) onStatus({ status: 'unsupported', message: 'Speech recognition is not supported in this browser. Please type your response.' });
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStatus) onStatus({ status: 'listening' });
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onStatus) onStatus({ status: 'error', error: event.error });
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onStatus) onStatus({ status: 'idle' });
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Error starting speech recognition", e);
      this.isListening = false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // MediaRecorder Voice Lab Recording
  async startRecording(canvasElement = null) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Microphone access is not supported in this browser.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);

    // Audio Visualizer Setup
    if (canvasElement) {
      this.setupVisualizer(stream, canvasElement);
    }

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    return new Promise((resolve) => {
      this.mediaRecorder.start();
      resolve(true);
    });
  }

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Stop all tracks in stream
        if (this.mediaRecorder.stream) {
          this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }

        if (this.audioContext && this.audioContext.state !== 'closed') {
          this.audioContext.close();
        }

        resolve({ blob: audioBlob, url: audioUrl });
      };

      this.mediaRecorder.stop();
    });
  }

  setupVisualizer(stream, canvas) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      source.connect(this.analyser);
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const ctx = canvas.getContext('2d');

      const draw = () => {
        if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') return;
        requestAnimationFrame(draw);

        this.analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height;

          // Gradient color: Cyan to Violet
          ctx.fillStyle = `rgb(${dataArray[i] + 50}, 99, 235)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      };

      draw();
    } catch (e) {
      console.warn("Visualizer setup error", e);
    }
  }
}

export const speechService = new SpeechService();
