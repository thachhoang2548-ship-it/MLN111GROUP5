// Web Audio API Synthesizer for Class Struggle Simulator
class SoundManager {
  constructor() {
    this.ctx = null;
    this.droneOsc = null;
    this.droneFilter = null;
    this.droneGain = null;
    this.isDronePlaying = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playDrone() {
    try {
      this.init();
      if (this.isDronePlaying) return;

      const ctx = this.ctx;
      
      // Low rumble osc
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc1.frequency.value = 55; // A1 note
      
      osc2.type = 'triangle';
      osc2.frequency.value = 55.4; // Slightly detuned

      filter.type = 'lowpass';
      filter.frequency.value = 150;
      filter.Q.value = 5;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3); // fade in over 3s

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.droneOsc = [osc1, osc2];
      this.droneFilter = filter;
      this.droneGain = gainNode;
      this.isDronePlaying = true;

      // Filter modulation for industrial sweeping effect
      this.modInterval = setInterval(() => {
        if (this.droneFilter && ctx.state === 'running') {
          const t = ctx.currentTime;
          const sweepFreq = 120 + Math.sin(t * 0.5) * 40;
          this.droneFilter.frequency.setValueAtTime(sweepFreq, t);
        }
      }, 100);

    } catch (e) {
      console.warn("Audio Context init blocked or failed: ", e);
    }
  }

  stopDrone() {
    if (!this.isDronePlaying) return;
    try {
      const ctx = this.ctx;
      if (this.droneGain && ctx) {
        const t = ctx.currentTime;
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, t);
        this.droneGain.gain.linearRampToValueAtTime(0, t + 1); // fade out over 1s
        setTimeout(() => {
          if (this.droneOsc) {
            this.droneOsc.forEach(osc => osc.stop());
          }
          clearInterval(this.modInterval);
          this.droneOsc = null;
          this.droneFilter = null;
          this.droneGain = null;
          this.isDronePlaying = false;
        }, 1050);
      }
    } catch (e) {
      console.error(e);
    }
  }

  playTick() {
    try {
      this.init();
      const ctx = this.ctx;
      const t = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);

      gainNode.gain.setValueAtTime(0.04, t);
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(t + 0.06);
    } catch (e) {}
  }

  playTrumpet() {
    // Revolutionary fanfare!
    try {
      this.init();
      const ctx = this.ctx;
      const t = ctx.currentTime;
      
      // We will play a chord: C4 (261.63), E4 (329.63), G4 (392.00)
      const freqs = [261.63, 329.63, 392.00, 523.25];
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, t + idx * 0.05);
        filter.frequency.exponentialRampToValueAtTime(2000, t + idx * 0.05 + 0.15);
        filter.frequency.exponentialRampToValueAtTime(500, t + idx * 0.05 + 0.8);

        gainNode.gain.setValueAtTime(0, t);
        gainNode.gain.linearRampToValueAtTime(0.05, t + idx * 0.05 + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.9);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 1.0);
      });
    } catch (e) {}
  }

  playClang() {
    // Metal clang of chains / industrial hammer
    try {
      this.init();
      const ctx = this.ctx;
      const t = ctx.currentTime;

      const freqs = [120, 243, 356, 567, 890]; // metallic non-harmonic frequencies
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.value = freq;

        gainNode.gain.setValueAtTime(0.06, t);
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(t + 0.45);
      });
    } catch (e) {}
  }
}

export const sound = new SoundManager();
