import { question_data } from "./question_data.js"

export function rand (max) {
    // 0 부터 Max 미만의 정수를 하나 뽑음
    return Math.floor(Math.random() * max);
}

export function getNextLul (str) {
    // 문자열의 마지막에 '를'/'을'이 와야하는지에 대해 질문 문자열의 마지막 문자에 종성(받침)이 있는가 없는가로 판단한다. '를'이 와야하면 true, '을'이 와야하면 false를 반환한다.
    // 종성이 있으면 '을' 예) 분진을
    // 종성이 없으면 '를' 예) 벽지를
    // 한글 유니코드 표기 관련 Reference : https://hanggoo.tistory.com/10

    // 한글문자 하나 = 0xAC00 (한글 유니코드 표기) + 초성_index * 0x24C(21 * 28) + 중성_index(28) * 0x1C + 종성_index

    var last_char_code = str.charCodeAt(str.length - 1);
    var last_char_chong_sung_code = (last_char_code - 0xAC00) % 28 + 0xAC00;

    if (last_char_chong_sung_code == 0xAC00) {
        // 종성이 없는 경우, '를' 이 와야함 (isLul =  true)
        return true;
    } else {
        // 종성이 있는 경우, '을' 이 와야함 (isLul = false)
        return false;
    }
}

export function makeString (str, is_lul) {
    // question의 첫 문자가 예를 들어 '를'이면, '를'이 와야 하는 상황이 맞는지(is_Lul)판단하여 아니라면 '을'로 바꿈. 똑같은 판단을 '이'/'가', '은'/'는'에도 수행.
    var start_char = str[0];

    if (start_char == '을' || start_char == '를') {
        start_char = is_lul == false ? '을' : '를';
    } else if (start_char == '이' || start_char == '가') {
        start_char = is_lul == false ? '이' : '가';
    } else if (start_char == '은' || start_char == '는') {
        start_char = is_lul == false ? '은' : '는';
    }

    var return_char = start_char + str.slice(1);

    return return_char;
}

export function generateOverlapQuestion (input_start_question, input_overlap)
{
    var data_mid_questions = question_data["mid_questions"];
    var data_end_questions = question_data["end_questions"];

    var return_mid_questions = "";
    var is_lul = getNextLul(input_start_question);

    var mid_questions_temp = [];

    // 중첩의문문 붙이기 시작!
    for (var i = 0; i < input_overlap; i++) {

        if (mid_questions_temp.length == 0) {
            mid_questions_temp = data_mid_questions.slice();
        }

        const idx = rand(mid_questions_temp.length);
        return_mid_questions += makeString(mid_questions_temp[idx], is_lul);

        is_lul = getNextLul(mid_questions_temp[idx]);
        mid_questions_temp.splice(idx, 1);
    }

    var return_end_question = makeString(data_end_questions[rand(data_end_questions.length)], is_lul);

    var generatedTextList = [input_start_question, return_mid_questions, return_end_question];

    return generatedTextList;
}