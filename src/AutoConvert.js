// 한글 자모를 영어 키보드 자판에 맞게 변환하기 위한 매핑 테이블
const koreanToEnglishMap = {
  "ㅂ": "q", "ㅈ": "w", "ㄷ": "e", "ㄱ": "r", "ㅅ": "t", "ㅛ": "y", "ㅕ": "u", "ㅑ": "i", "ㅐ": "o", "ㅔ": "p",
  "ㅁ": "a", "ㄴ": "s", "ㅇ": "d", "ㄹ": "f", "ㅎ": "g", "ㅗ": "h", "ㅓ": "j", "ㅏ": "k", "ㅣ": "l",
  "ㅋ": "z", "ㅌ": "x", "ㅊ": "c", "ㅍ": "v", "ㅠ": "b", "ㅜ": "n", "ㅡ": "m",
  "ㅃ": "Q", "ㅉ": "W", "ㄸ": "E", "ㄲ": "R", "ㅆ": "T", "ㅒ": "O", "ㅖ": "P"
};

// 한글 문자열을 대응하는 영어 문자열로 변환하는 함수
const convertKoreanToEnglish = (input) => {
  // 입력된 문자열을 변환하여 반환
  return input.replace(/[\u3131-\u3163]/g, (char) => koreanToEnglishMap[char] || char);
};

const autoConvertInput = (value) => {
    const convertedValue = convertKoreanToEnglish(value); // 한글 입력을 영어로 변환
    return convertedValue;
  };

export { autoConvertInput };