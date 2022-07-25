
import { generateOverlapQuestion } from "./functions.js"

window.onload = function () {
    document.getElementById('submit').onclick = function () {
        var input_start_txt = document.getElementById('input_start_txt').value;
        var input_overlap = document.getElementById('input_overlap').valueAsNumber;
        var result_text_list= generateOverlapQuestion(input_start_txt, input_overlap);
        var result_container = document.getElementById('result-container');


        let start_question_area = document.createElement('span');
        let mid_question_area = document.createElement('span');
        let end_question_area = document.createElement('span');

        start_question_area.setAttribute('style', 'font-size: 20px');
        mid_question_area.setAttribute('style', 'font-size: 15px');
        end_question_area.setAttribute('style', 'font-size: 20px');

        start_question_area.textContent = result_text_list[0]
        mid_question_area.textContent = result_text_list[1]
        end_question_area.textContent = result_text_list[2]

        while (result_container.hasChildNodes()) {
            result_container.removeChild(result_container.firstChild);
        }

        result_container.appendChild(start_question_area);
        result_container.appendChild(mid_question_area);
        result_container.appendChild(end_question_area);
    };
};