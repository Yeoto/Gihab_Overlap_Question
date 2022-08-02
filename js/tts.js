export function textToSpeech(input_text) {
    const utterance = new SpeechSynthesisUtterance(input_text);
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
}