import { makeResultContainer } from "./functions.js"
import { textToSpeech } from "./tts.js"

window.onload = function () {
    var result_list;
    document.getElementById('submit').onclick = function () {
        result_list = makeResultContainer('input-start-question', 'input-overlap');
        console.log(result_list.join(' '));
    };


    document.getElementById('text-to-speech').onclick = function () {
        textToSpeech(result_list.join(' '));
    }
};