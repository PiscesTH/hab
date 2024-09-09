import axios from "./axios";
import { useState } from "react";

function SelectOption(props) {
    return <option value={props.icategory}>{props.category}</option>;
  }

function MyForm(props) {
  /*   const changeTitle = (event) => {
      // const targetValue = event.target.value;
      const targetValue = event.target.options[event.target.selectedIndex].text;
      // document.querySelector('form-title').setAttribute('value', {targetValue});
      setSelectedValue(targetValue);
    }; */

  const changeSelect = (event) => {
    const { name, value } = event.target; // select 태그의 name과 value를 가져옴
    setSelectedValue(event.target.options[event.target.selectedIndex].text); // 선택된 텍스트를 업데이트
    props.setFormData({ target: { name, value } }); // 이름과 값을 올바르게 설정하여 handleInputChange 호출
  };

  const [selectedValue, setSelectedValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    try {
      const res = await axios.post("/history", props.formData);

      alert("등록 완료 !");

      const res2 = await axios.get("/history");
      props.setHistoryList(res2.data.data);

    } catch (error) {
      console.log(error);
      alert("등록 실패...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <input
          type="date"
          id="date"
          name="date"
          className="form-date"
          value={props.formData.date}
          onChange={props.setFormData}
          required
        ></input>
        <select
          id="icategory"
          name="icategory"
          value={props.formData.icategory}
          onChange={changeSelect}
        >
          {props.category.map((item, index) => (
            <SelectOption
              key={item.icategory}
              icategory={item.icategory}
              category={item.category}
            ></SelectOption>
          ))}
        </select>
        <input
          type="text"
          className="form-title"
          id="purpose"
          name="purpose"
          placeholder="메모"
          value={props.formData.purpose}
          onChange={props.setFormData}
          required
          autoComplete="off"
        />
        <input
          className="form-expense"
          placeholder="금액"
          id="amount"
          name="amount"
          value={props.formData.amount}
          onChange={props.setFormData}
          required
          autoComplete="off"
        ></input>
        <button className="form-submit" type="submit">
          등록하기
        </button>
      </div>
    </form>
  );
}
export default MyForm;
